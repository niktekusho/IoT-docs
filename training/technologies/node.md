# Node.js
[_Torna al documento indice_](./README.md)

## Introduzione
Node.js è un'ambiente d'esecuzione per JavaScript multipiattaforma e open-source utilizzato per l'implementazione di applicazioni server in JavaScript.

Per consentire l'esecuzione di JavaScript lato server, Node utilizza il motore di esecuzione JavaScript **V8** sviluppato da Google per il browser Chrome.

## Caratteristiche principali

### _Event-driven_
Node utilizza il modello _event-driven_ per la gestione delle operazioni di _input_ e _output_ (I/O): Node richiede al sistema di ricevere notifiche per determinati eventi, sospendendo l'esecuzione della funzione che ha richiesto tali operazioni.

Quando il sistema notifica Node, esso si occupa di riprendere l'esecuzione della funzione bloccante.

Questo è permesso grazie all'utilizzo del pattern Callback:
alle funzioni bloccanti viene passata una funzione detta "_callback_" che viene eseguita quando il sistema segnala a Node il successo o il fallimento dell'operazione richiesta.

La funzione di _callback_ deve quindi provvedere a gestire eventuali casi di errore, ricevendo eventuali informazioni come parametri di funzione.

Il vantaggio di questo pattern è che costringe lo sviluppatore a considerare i casi di errore: la _best-practice_ comune infatti definisce la seguente firma per le callback:

```js
function(err, result) {
  ...
}
```

in cui è possibile notare che il primo parametro passato dal sistema alla funzione è un oggetto di segnalazione di errori.
Nel caso in cui la richiesta sia avvenuta con successo tale oggetto sarà `null` o `undefined`.

### Concorrenza
Node non utilizza un modello di concorrenza multithread, bensì opera utilizzando un singolo thread in cui le richieste I/O sono non bloccanti.

I vantaggi di questo approccio alla concorrenza sono:

-   non ci sono costi di performance per il _context-switch_<sub>[1](#1)</sub> dei thread;
-   lo sviluppatore non deve preoccuparsi dei problemi riscontrabili negli ambienti multithread (_race conditions_, condivisione della memoria tra oggetti, ecc.).

Questo approccio tuttavia presenta un grave difetto: Node non sfrutta i molti core presenti nelle CPU moderne e quindi operazioni fortemente CPU-bound congelano l'intero ciclo di eventi fino al termine dell'esecuzione dell'operazione.

### Gestione dei pacchetti
Node utilizza npm (Node Package Manager) per installare le librerie utilizzabili nelle applicazioni. Npm scarica i pacchetti dal npm registry e gestisce le dipendenze tramite comandi disponibili da shell di comando.

# Note
<a name="1">1:</a> Il context switch è un'operazione del sistema operativo che cambia il processo correntemente in esecuzione, permettendo a più processi di condividere la stessa CPU.
