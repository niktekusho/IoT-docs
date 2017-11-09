import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import './App.css';

// import components
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FlashMessages from './components/FlashMessages';
import NotFound from './components/NotFound';
import SavedMovies from './components/SavedMovies';

// consts
const API_URL = 'http://www.omdbapi.com/?apikey=c5a8df09&s=';
const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL;
const MOVIES_SERVICE_URL = process.env.REACT_APP_MOVIES_SERVICE_URL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      movies:[],
      saved:[],
      flashMessages:[],
      isAuthenticated: false,
    };

    this.createFlashMessage.bind(this);
  }

  searchMovie(term) {
    axios.get(`${API_URL}${term}`)
      .then(res => this.setState({ movies: res.data.Search }))
      .catch(err => console.log(err));
  }

  createFlashMessage(text, type='success') {
    const message = { text, type };
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    });
  }

  deleteFlashMessage(index) {
    if (index > 0) {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(0, index),
          ...this.state.flashMessages.slice(index+1)
        ]
      });
    } else {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(index+1)
        ]
      });
    }
  }

  registerUser(userData, callback) {
    return axios.post(`${USERS_SERVICE_URL}/users/register`, userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token);
        window.localStorage.setItem('user', res.data.user);
        this.setState({
          isAuthenticated: true
        });
        this.createFlashMessage('Registration successful! Welcome!');
        this.props.history.push('/');
        this.getMovies();
      }).catch(error => callback(error.response.data.error));
  }

  loginUser(userData, callback) {
    return axios.post(`${USERS_SERVICE_URL}/users/login`, userData)
      .then((res) => {
        window.localStorage.setItem('authToken', res.data.token);
        window.localStorage.setItem('user', res.data.user);
        this.setState({
          isAuthenticated: true
        });
        this.createFlashMessage('Welcome back!');
        this.props.history.push('/');
        this.getMovies();
      }).catch(error => callback(error.response.data.error));
  }

  logoutUser(e) {
    e.preventDefault();
    window.localStorage.clear();
    this.setState({ isAuthenticated: false });
    this.props.history.push('/');
    this.createFlashMessage('You are now logged out.');
  }

  getCurrentUser() {
    return window.localStorage.user;
  }

  saveMovie(movie) {
    const options = {
      url: `${MOVIES_SERVICE_URL}/movies`,
      method: 'post',
      data: {
        title: movie
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${window.localStorage.authToken}`
      }
    };
    return axios(options)
      .then(res => this.setState({ saved: res.data.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { isAuthenticated, flashMessages} = this.state;
    const authenticatedUserHome = (
      <div className="container text-center">
        <h1>Movie search</h1>
        <SearchBar searchMovie={term => this.searchMovie(term)} />
        <a href="" onClick={e => this.logoutUser(e)}>
          Log out
        </a>
        &nbsp;&#124;&nbsp;
        <Link to="/collection">Collection</Link>
        <br/><br/><br/>
        <MovieList
          movies={this.state.movies}
          isAuthenticated={isAuthenticated}
          getCurrentUser={() => this.getCurrentUser()}
          saveMovie={movie => this.saveMovie(movie)}
        />
      </div>
    );
    return (
      <div className='App container'>
        <br/>
        <FlashMessages
          deleteFlashMessage={index => this.deleteFlashMessage(index)}
          messages={flashMessages}
        />
        <Switch>
          <Route exact path='/' render={() => (
              isAuthenticated ? authenticatedUserHome
                : <Redirect to={{pathname: '/login'}}/>
            )}
          />
          <Route path='/register' render={() => (
            isAuthenticated
            ? <Redirect to='/' />
            : <RegisterForm
            createFlashMessage={this.createFlashMessage}
            registerUser={this.registerUser.bind(this)} />
            )}
          />
        <Route path='/login' render={() => (
            isAuthenticated
            ? <Redirect to='/'/>
          : <LoginForm
            createFlashMessage={this.createFlashMessage}
            loginUser={this.loginUser.bind(this)}/>
          )}
          />
          <Route path='/collection' render={() => (
            isAuthenticated
            ? <SavedMovies
              createFlashMessage={this.createFlashMessage}
              saved={this.state.saved} />
            : <Redirect to={{ pathname: '/login' }} />
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
