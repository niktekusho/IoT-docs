# MQTT

[_Torna al documento indice_](./README.md)

## Introduzione
MQTT è un protocollo di messaggistica leggero basata sul design pattern Publish/Subscribe.
É un protocollo nato per l'utilizzo con sensori a basso consumo energetico, tuttavia è utilizzabile anche in altri scenari.

## Principi di design
MQTT è stato progettato tra la fine degli anni '90 e l'inizio degli anni 2000 per ambienti in cui l'affidabilità della rete non era garantita.

1.  MQTT mira ad assere una soluzione semplice da implementare, per permettere la maggior copertura di dispositivi possibile.
2.  MQTT usa messaggistica pub/sub per permettere ai dispositivi di pubblicare nella rete informazioni non predefinite.
3.  MQTT non richiede amministrazione in quanto cerca di rispondere ad eventi inaspettati in maniera semplice e con maggior buon senso possibile.
4.  MQTT minimizza il traffico sulla rete introducendo un overhead<sub>[1](#1)</sub> sui dati minimo.
5.  MQTT si aspetta di lavorare in reti con frequenti interruzioni, utilizzando il meccanismo dell'ultimo testamento.
6.  MQTT si accorge repentinamente di cambiamenti dello stato della sessione.
7.  MQTT si aspetta che i client abbiano risorse d'elaborazione limitate.
8.  MQTT mette a disposizione livelli di affidabilità per la trasmissione di informazioni critiche.
9.  MQTT non fa assunzioni sulla struttura né il contenuto dei dati.

## Publish/Subscribe
Il protocollo MQTT si basa sul principio che ogni client pubblica messaggi, i quali hanno uno o più argomenti/tipi.
Inoltre ogi client può  registrarsi a determinati argomenti, per ricevere tutti i messaggi che altri client **pubblicano** per quell'argomento. Molti client si connettono a un  _broker_<sub>[2](#2)</sub> che funziona da tramite, ricevendo i messaggi pubblicati e inoltrandoli a tutti i client sottoscritti per quegli argomenti.

Gli argomenti in MQTT sono trattati gerarchicamente. Questo permette la creazione di argomenti e sottoargomenti, simili alla struttura ad albero di un filesystem.

## Qualità del Servizio (QoS)

MQTT definisce 3 livelli di qualità in base a quanto_broker_e client si impegneranno a ricevere un messaggio.
I client decidono il livello massimo di QoS che riceveranno.

La scala della QoS definisce i livelli 0, 1 e 2 con affidabilità crescente ma minori performance:

-   0: broken/client invieranno il messaggio al massimo una volta senza richiesta di conferma. A questo livello i messaggi vengono persi se una delle parti si disconnette;
-   1: broker/client invieranno il messaggio almeno una volta con la richiesta di conferma;
-   2: broker/client invieranno il messaggio una sola volta effettuando una trasmissione in 4 step.

Per esempio, se un messaggio è pubblicato con QoS 2 e il client è sottoscritto all'argomento con QoS 0, il client riceverà quel messaggio con QoS 0 (niente richieste di conferma, ecc).
Se un altro client è sottoscritto allo stesso argomento con QoS 2 allora riceverà il messaggio con QoS 2 (handshake in 4 step).

## Connessioni

Alla connessione il client imposta un flag di "sessione pulita" in base a come il client ritiene affidabile la connessione (`false` => connessione affidabile). Se il client si disconnette, in tutte le sottoscrizioni con QoS 1 o QoS 2 i messaggi verranno salvati e inviati alla prossima riconnessione del client.

# Note

<a name="1">1:</a> Con _overhead_ si intendono quelle informazioni aggiuntive che un sistema è costretto ad aggiungere alle informazioni strettamente necessarie per ottenere uno scopo.

<a name="2">2:</a> Un _broker_ in MQTT è un server che reindirizza i messaggi pubblicati verso i client sottoscritti all'argomento di ciascun messaggio.
