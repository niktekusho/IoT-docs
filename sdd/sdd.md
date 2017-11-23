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
| EcmaScript 2016 | EcmaScript è un linguaggio di programmazione la cui implementazione standard più conosciuta è JavaScript                                    |
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





# Note

<a name="1">1:</a> Un _Design Pattern_ è una soluzione progettuale ad un problema ricorrente e opportunamente generalizzato, risultando così applicabile in altri contesti.
