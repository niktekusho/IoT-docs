# React
[_Torna al documento indice_](./README.md)

Fonti

-   [https://reactjs.org/](https://reactjs.org/)

## Introduzione
React è una libreria per il linguaggio JavaScript il cui scopo è costruire interfacce utente.

## Caratteristiche principali
Di seguito sono prese in considerazioni alcune delle caratteristiche che hanno reso popolare React.

### Componenti e modularizzazione
React consente di progettare l'interfaccia di un'applicazione partendo da un _mockup_<sub>[1](#1)</sub> e ragionando sullo stesso per suddivisione.

Un esempio di questo processo di suddivisione porta a disegnare sul _mockup_ dell'interfaccia (Immagine 1) i confini di tutti gli elementi visibili (Immagine 2).

![](./images/react_ui_mock.png)
_Immagine 1: Mock della pagina da progettare_

![](./images/react_ui_mock_boxed.png)
_Immagine 2: Suddivisione in componenti della pagina da progettare_

In React ogni componente dell'interfaccia dovrebbe essere responsabile di una sola funzionalità; questa modularità consente di:

-   aumentare la produttività: più sviluppatori in parallelo possono implementare i singoli componenti più velocemente data la semplicità di questi;
-   migliorare i processi di manutenzione dell'interfaccia: essendo componenti semplici, eventuali correzioni sono facili da localizzare;
-   diminuire la probabilità che bug gravi persistino nel codice per lungo tempo;
-   semplificare la creazione dei test.

### Viste dichiarative
React consente di progettare viste semplici per ogni stato dell'applicazione. React pone al centro della progettazione lo stato di ciascun componente dell'interfaccia: lo sviluppatore si deve preoccupare solamente di definire quali stati sono disponibili per un determinato componente in quanto se ne occuperà React di effettuare la transizione (_riscrivere_).

### Efficienza
L'esteso utilizzo di componenti permette a React di effettuare ottimizzazioni per la loro  visualizzazione: se i dati di un  componente cambiano, React aggiorna solamente quel componente, ignorando i componenti che non vengono influenzati dal cambiamento (incluso ricalcolo del layout).

### Multipiattaforma
React è indipendente dal resto delle tecnologie impiegate quindi può essere integrato in qualsiasi applicazione senza riscrivere il codice esistente.
Inoltre la sintassi proposta da React permette di riutilizzare le interfacce progettate per il web in ambito realtà virtuale (React VR<sub>[2](#2)</sub>) e per l'implementazione di applicazioni native per dispositivi mobili (React Native<sub>[3](#3)</sub>).

## Panoramica sulla API

### Componenti
I componenti in React sono definiti ereditando una delle due classi:

-   `React.Component`
-   `React.PureComponent`

In React un _componente puro_ è un componente non dotato di uno stato. I componenti puri sono quindi componenti puramente presentazionali. Il vantaggio dei componenti puri rispetto a quelli standard è da ricercarsi nelle migliori performance dei componenti puri durante il rendering.

### Metodi principali
I metodi seguenti sono presenti in tutti gli oggetti che ereditano da `React.Component`.

#### Costruttore
La creazione di un componente in React comincia con l'esecuzione del corpo del costruttore.
Il costruttore è il luogo migliore in cui inizializzare lo stato del componente (nel caso di componenti standard, non puri).


#### `render()`
É l'unico metodo d'interfaccia della classe `React.Component` e quindi è l'unico metodo che è obbligatorio implementare.
É il metodo responsabile di ciò che React mostrerà a schermo, utilizzando l'istruzione di ritorno:

-   stringhe e numeri vengono mostrati direttamente come testo;
-   valori logici (`boolean`) e  `null` non renderizzano;
-   altri componenti React.

La funzione `render()` dovrebbe essere pura, ossia non modificare lo stato del componente.

#### `shouldComponentUpdate()`
Il suo utilizzo è quello di intercettare un aggiornamento del componente per decidere se questo deve riflettere questo cambiamento. Il metodo deve ritornare un `boolean`:

-   `true` se il componente deve accettare l'aggiornamento (default);
-   `false` se il componente deve rifiutare l'aggiornamento.

#### `didComponentUpdate()`
Viene invocato quando il componente è stato aggiornato. L'utilizzo consigliato è quello di effettuare in questo metodo eventuali richieste di rete.


#### `setState()`
Lo sviluppatore invoca questo metodo quando desidera aggiornare lo stato del componente.
L'invocazione di questo metodo accoda la richiesta di modifica dello stato in una coda, avendo la garanzia che React effettuerà questa modifica prima della prossima chiamata al metodo `render()`.


# Note
<a name="1">1:</a> Un _mockup_ è una rappresentazione di un progetto, dispositivo o sistema utilizzata nell'insegnamento, nelle dimostrazioni, nella promozione e nella valutazione del progetto stesso.

<a name="2">2:</a> [React VR - https://facebook.github.io/react-vr/](https://facebook.github.io/react-vr/)

<a name="3">3:</a> [React Native - http://facebook.github.io/react-native/](http://facebook.github.io/react-native/)
