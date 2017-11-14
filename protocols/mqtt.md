# MQTT

[_Torna al documento indice_](./README.md)

## Introduzione
MQTT è un protocollo di messaggistica leggero basata sul design pattern Publish/Subscribe.
É un protocollo nato per l'utilizzo con sensori a basso consumo energetico, tuttavia è utilizzabile anche in altri scenari.

## Publish/Subscribe
Il protocollo MQTT si basa sul principio di pubblicare messaggi per argomento e registrarsi a determinati argomenti. Molti client si connettono a un _broker_<sub>[1](#1)</sub> e si sottoscrivono ad argomenti, ricevendo i messaggi pubblicati per quegli argomenti.

Gli argomenti in MQTT sono trattati gerarchicamente, separandoli attraverso `/`. Questo permette la creazione di argomenti e sottoargomenti, simili alla struttura ad albero di un filesystem.

## Qualità del Servizio (QoS)

MQTT definisce 3 livelli di qualità in base a quanto broker e client si impegneranno a ricevere un messaggio.
I client decidono il livello massimo di QoS che riceveranno.

La scala della QoS definisce i livelli 0, 1 e 2 con affidabilità crescente ma minori performance:

-   0: broken/client invieranno il messaggio al massimo una volta senza richiesta di conferma. A questo livello i messaggi vengono persi se una delle parti si disconnette;
-   1: broker/client invieranno il messaggio almeno una volta con la richiesta di conferma;
-   2: broker/client invieranno il messaggio una sola volta effettuando una trasmissione in 4 step.

Per esempio, se un messaggio è pubblicato con QoS 2 e il client è sottoscritto all'argomento con QoS 0, il client riceverà quel messaggio con QoS 0 (niente richieste di conferma, ecc).
Se un altro client è sottoscritto allo stesso argomento con QoS 2 allora riceverà il messaggio con QoS 2 (handshake in 4 step).

## Connessioni

Alla connessione il client imposta un flag di "sessione pulita" in base a come il client ritiene affidabile la connessione (`false` => connessione affidabile). Se il client si disconnette, in tutte le sottoscrizioni con QoS 1 o QoS 2 i messaggi verranno salvati e inviati alla prossima riconnessione del client.
