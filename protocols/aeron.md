# Aeron

[_Torna al documento indice_](./README.md)

## Introduzione
Aeron è un protocollo di comunicazione ad alto throughput e a bassa latenza utilizzato in comunicazioni unicast<sub>[1](#1)</sub> e multicast<sub>[2](#2)</sub>.

## Requisiti di progettazione

Aeron è progettato per essere usato in molti tipi diversi di canali di comunicazione: in process communication, UDP, TCP, WebSocket, ecc.

Data la variabilità dei canali di comunicazione, il protocollo deve rispettare le seguenti ipotesi:

1.  il canale di comunicazione potrebbe essere basato su stream, non su pacchetti di dati ben strutturati;
2.  il canale di comunicazione potrebbe supportare solamente operazioni punto a punto.

Aeron è un protocollo di trasporto (livello 4 del modello OSI) e può essere usato in canali di trasmissione non affidabili, per questo Aeron deve confrontarsi con:

1.  perdita di pacchetti;
2.  duplicazione di pacchetti;
3.  ordine errato di arrivo dei  pacchetti.

## Formato del header

Ogni frame<sub>[3](#3)</sub> in Aeron inizia con l'header.
La specifica dell'header cambia in base al tipo di operazione, tuttavia la struttura comune è:

```
     0                   1                   2                   3
     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
    |R|                       Frame Length                          |
    +---------------+---------------+-------------------------------+
    |    Version    |     Flags     |             Type              |
    +---------------+---------------+-------------------------------+
    |                       Depends on Type                        ...

```

-   **Frame Length/Lunghezza del frame**: lunghezza del frame, header incluso. Valore massimo: 2147483647 B.
-   **Version/Versione**: versione del protocollo. Attualmente vale 0.
-   **Flags**: opzioni dipendenti dal tipo di operazione.
-   **Type/Tipo**: tipo di operazione.

## Inizializzazione della comunicazione

Il flusso dei dati in Aeron è unidirezionale. Per instaurare una comunicazione bidirezionale è necessario aprire 2 flussi di dati.

Nelle trasmissioni unicast:
1.  il ricevitore resta in ascolto su un canale specificato;
2.  il trasmettitore invia un frame di inizializzazione al ricevitore e aspetta di ricevere un messaggio di conferma. Se il trasmettitore non riceve risposta, esso può ritrasmettere il frame di inizializzazione finchè non riceve risposta;
3.  il ricevitore, vista la richiesta di inizializzazione, invia una risposta con lo stato della sua interfaccia di rete;
4.  il trasmettitore, vista la risposta del ricevitore, può cominciare a trasmettere dati rispettando i requisiti dell'interfaccia di rete del ricevitore.

Nelle trasmissioni multicast:
1.  i ricevitori ascoltano uno specifico endpoint dedicato ai dati e opzionalmente anche un endpoint dedicato al controllo della comunicazione;
2.  i trasmettitori ascoltano uno specifico endpoint di controllo e inviano periodicamente frame di dati all'endpoint di dati;
3.  i ricevitori che ricevono frame di dati con ID di loro interesse, devono rispondere emettendo un segnale di richiesta inizializzazione all'endpoint di controllo;
4.  i trasmettitori che ricevono i segnali di inizializzazione inviano i corrispondenti frame di inizializzazione all'endpoint di controllo;
5.  ogni ricevitore, visto il frame di inizializzazione, commuta a una comunicazione unicast con il trasmettitore corrispondente.

## Gestione del recupero dati

Aeron per recuperare i dati si basa sul non riconoscimento (NAK, _"Not Acknowledged"_) dei frame.
É responsabilità di chi riceve i dati controllare la loro integrità ed eventualmente richiedere la ritrasmissione degli stessi.

Quando un ricevitore osserva mancanza di dati, **deve** rispondere con un segnale di non riconoscimento (NAK).
Quando il trasmettitore riceve il segnale NAK, **deve** ritrasmettere il frame segnalato immediatamente se possibile.
Dopo la ritrasmissione del frame, il trasmettitore **deve** ignorare **temporaneamente** eventuali segnali NAK per il frame.

## Gestione dello stato della comunicazione

Aeron utilizza messaggi di stato per controllare il flusso delle comunicazioni e per tenere sotto controllo la congestione nella rete.

Il principio chiave della gestione della congestione in Aeron risiede nel parametro "_Receiver window_", che definisce il numero di Byte massimi che il ricevitore desidera ricevere alla prossima trasmissione di frame dati. Questo parametro non conta le eventauli ritrasmissioni necessarie alla corretta ricezione dei dati.

### Tempo di vita della comunicazione

Dopo un periodo di inattività la comunicazione viene reclamata, rendendo necessaria l'esecuzione della procedura di inizializzazione della comunicazione.
Per estendere questo periodo di inattività, trasmettitore e ricevitore possono inviarsi dei frame senza dati, comunemente chiamati _heartbeats_.

# Note

<a name="1">1:</a> Nelle reti di calcolatori, unicast si riferisce a una trasmissione da un punto della rete a un altro. Richiede che trasmettitore e ricevitore siano unicamente identificabili attraverso un indirizzo di rete.

<a name="2">2:</a> Nelle reti di calcolatori, multicast si riferisce a una trasmissione da un gruppo di trasmettitori a un gruppo di ricevitori simultaneamente (_1 a molti_ o _molti a molti_).

<a name="3">3:</a> Il frame è una sequenza di bit che composti permettono la trasmissione di dati in una rete. Ogni frame è composto da un'intestazione seguita da un pacchetto. Generalmente il frame contiene informazioni extra necessarie a controllo e/o correzione degli errori e alla sincronizzazione dei dispositivi coinvolti nella comunicazione.
