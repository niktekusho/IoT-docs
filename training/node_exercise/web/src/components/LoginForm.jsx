import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      username: '',
      password: '',
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state, (errorMessage) => {
      if (errorMessage) {
        this.props.createFlashMessage(errorMessage, 'error');
      }
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Login</h1>
          <hr/><br/>
          <form
            className="form-horizontal"
            onSubmit={event => this.onSubmit(event)}
          >
              <div className="form-group">
                <label
                  htmlFor="username"
                  className="col-md-2 control-label"
                >
                  Username
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={event => this.handleInputChange(event)}
                    />
                </div>
              </div>
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="col-md-2 control-label"
                >
                  Password
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={event => this.handleInputChange(event)}
                    />
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button
                    type="submit"
                    className="btn btn-success"
                  >Log in</button>
                  &nbsp;
                  <Link to="/" className="btn btn-primary">
                    Cancel
                  </Link>
                  <p>New here? <Link to="/register">Register</Link>!</p>
                </div>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
