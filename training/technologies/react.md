# React
[_Torna al documento indice_](./README.md)

Fonti

-   [https://reactjs.org/](https://reactjs.org/)

## Introduzione
React è una libreria per il linguaggio JavaScript il cui scopo è costruire interfacce utente.

## Caratteristiche principali
Di seguito sono prese in considerazioni alcune delle caratteristiche che hanno reso popolare React.

### Componenti e modularizzazione
React consente di progettare l'interfaccia di un'applicazione partendo da un _mock_<sub>[1](#1)</sub> e ragionando sullo stesso per suddivisione.

Un esempio di questo processo di suddivisione porta a disegnare sul mock dell'interfaccia (Immagine 1) i confini di tutti gli elementi visibili (Immagine 2).

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
