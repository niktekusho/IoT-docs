[_Torna al documento indice/Back_](./README.md)

# Specifica Tecnica

## Introduzione

### Scopo del documento

Lo scopo di questo documento è quello di definire la progettazione dell'architettura ad alto livello del progetto di stage.
Il presente, tra le altre cose, tratta di:

-   tecnologie utilizzate;
-   architettura del sistema e dei relativi componenti software;
-   Design Pattern<sub>[1](#1)</sub> impiegati per la progettazione.

### Scopo del progetto

Lo stage prevede lo sviluppo e la realizzazione di una dashboard per la gestione di dispositivi interconnessi (IoT). L'idea alla base del sistema è quella di un centro di controllo attraverso cui l'utente del sistema gestisca i dispositivi smart presenti nella propria rete domestica.

## Tecnologie utilizzate

In questa sezione sono descritte le tecnologie che verranno utilizzate per lo sviluppo del progetto, includendo la motivazione che ha portato lo studente a sceglierle.
Gli strumenti di sviluppo che verranno impiegati sono inclusi in questa sezione.

| Tecnologia      | Sommario                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js         | Node.js è un'ambiente d'esecuzione utilizzato per l'implementazione di applicazioni server in JavaScript.                                   |
| React           | React è una libreria per il linguaggio JavaScript il cui scopo è costruire interfacce utente.                                               |
| EcmaScript 2017 | EcmaScript è un linguaggio di programmazione la cui implementazione standard più conosciuta è JavaScript.                                    |
| Jest            | Jest è un framework per l'implementazione di test per codice JavaScript.                                                                    |
| ESLint          | ESLint è uno strumento open-source per l'analisi statica del codice JavaScript prodotto.                                                    |
| HTML5           | HTML5 è un linguaggio di markup per la formattazione e impaginazione delle pagine Web pubblicato come W3C Recommendation dall'ottobre 2014. |
| CSS3            | CSS3 è un linguaggio di formattazione delle pagine Web.                                                                                     |
| Atom                | Atom è un editor di testo sviluppato da GitHub con tecnologie moderne e personalizzabile.                                                                                                                                             |

### Node.js

Node.js è un'ambiente d'esecuzione per JavaScript multipiattaforma e open-source utilizzato per l'implementazione di applicazioni server in JavaScript.

Per consentire l'esecuzione di JavaScript lato server, Node utilizza il motore di esecuzione JavaScript **V8** sviluppato da Google per il browser Chrome.

-   Aspetti positivi:
    -   Node utilizza il modello _event-driven_ per la gestione delle operazioni di _input_ e _output_ (I/O) e in questo modo semplifica la gestione asincrona delle richieste concorrenti.
    -   Node utilizza JavaScript, un linguaggio di programmazione dalla sintassi semplice da imparare.
    -   Node utilizza npm per la gestione delle librerie dell'applicazione, il quale è il più grande registro di componenti di codice riusabile.
-   Aspetti negativi:
    -   Node non sfrutta i molti core presenti nelle CPU moderne e quindi operazioni fortemente CPU-bound congelano l'intero ciclo di eventi fino al termine dell'esecuzione dell'operazione.
    -   Node favorisce l'utilizzo del Design Pattern "_callback_", tuttavia in funzioni complesse si potrebbe incorrere in una eccessiva complessità nella lettura del codice.


### React

React è una libreria per il linguaggio JavaScript il cui scopo è costruire interfacce utente.

-   Aspetti positivi:
    -   React utilizza un DOM virtuale per disegnare le interfacce, raggiungendo performance ed efficienza elevate. Grazie alla sua struttura a componenti, un aggiornamento ad uno di essi non richiede l'aggiornamento degli altri.
    -   I componenti sviluppati possono essere riutilizzati, garantendo un aumento di produttività degli sviluppatori.
    -   I dati in React seguono un flusso unidirezionale, in cui i componenti figli non possono modificare dati dei loro genitori, semplificando la manutenzione dei componenti.
-   Aspetti negativi:
    -   Data la natura molto dinamica di React, gli sviluppatori devono mantenersi aggiornati per tutte le nuove funzionalità inserite.


### EcmaScript 2017

ECMAScript 2017 è un linguaggio di programmazione standardizzato la cui ratifica è avvenuta nel giugno del 2017. L'implementazione dello standard più conosciuta è JavaScript.

L'edizione 2017 dello standard porta in dote le seguenti funzionalità:

1.  Nuova sintassi per le **funzioni asincrone**. La keyword `async` indica che una funzione o un metodo ritornano una Promise, ossia una classe di oggetti che evidenziano l'asincronia dell'operazione da eseguire. La keyword `await` aspetta che la funzione asincrona termini la sua esecuzione, ritornando il risultato della Promise.
2.  Supporto iniziale per l'elaborazione multithread, attraverso tipi di oggetti immutabili e condivisibili tra thread.
3.  Nuovi metodi per gli oggetti esistenti nel linguaggio (enumerazione dei membri di un oggetto e ulteriori funzionalità di manipolazione di stringhe).


-   Aspetti positivi:
    -   La nuova sintassi per la scrittura di funzioni asincrone è molto facilmente leggibile in quanto ricorda una programmazione sequenziale.
    -   Il supporto per l'elaborazione multithread consente a chi ha necessità e competenza di poter sfruttare le architetture a molti core delle moderne CPU, favorendo l'utilizzo di JavaScript anche per la programmazione di codice parallelo per le GPU.
    -   Poche nuove funzionalità rispetto alle edizioni precedenti permettono di imparare le nuove con maggior semplicità.
-   Aspetti negativi:
    -   Con la nuova sintassi per le funzioni asincrone è molto facile dimenticarsi della natura asincrona del codice scritto, omettendo quindi la keyword `await`.
    -   Il supporto alla nuova edizione dello standard è presente in maniera completa solamente nelle ultime versioni dei browser e di Node.js.<sub>[fonti](#fonte)</sub>




# Note

<a name="1">1:</a> Un _Design Pattern_ è una soluzione progettuale ad un problema ricorrente e opportunamente generalizzato, risultando così applicabile in altri contesti.

<a name="fonte">Fonti:</a>
-   Tabella di compatiblità dei browser: [http://kangax.github.io/compat-table/es2016plus/](http://kangax.github.io/compat-table/es2016plus/)
-   Tabella di compatiblità di Node.js:
[http://node.green/#ES2017](http://node.green/#ES2017)
