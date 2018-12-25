<a name="StompClient"></a>

## StompClient ⇐ <code>EventEmitter</code>
A client model for connecting to the National Rails DARWIN PushPort realtime data feed

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  
**Emits**: [<code>error</code>](#StompClient+event_error), [<code>connecting</code>](#StompClient+event_connecting), [<code>connected</code>](#StompClient+event_connected), [<code>idle</code>](#StompClient+event_idle), [<code>message</code>](#StompClient+event_message)  
**Author**: Steven Collins <steven@carboncollins.uk>  

* [StompClient](#StompClient) ⇐ <code>EventEmitter</code>
    * [new exports.StompClient([options])](#new_StompClient_new)
    * [.host](#StompClient+host) : <code>String</code>
    * [.port](#StompClient+port) : <code>Number</code>
    * [.timeout](#StompClient+timeout) : <code>Number</code>
    * [.timeout](#StompClient+timeout) : <code>Object</code>
    * [.isInitialised](#StompClient+isInitialised) : <code>Object</code>
    * [.initialise()](#StompClient+initialise)
    * [.subscribe()](#StompClient+subscribe)
    * [.close()](#StompClient+close)
    * ["error"](#StompClient+event_error)
    * ["connecting"](#StompClient+event_connecting)
    * ["connected"](#StompClient+event_connected)
    * ["idle"](#StompClient+event_idle)
    * ["message"](#StompClient+event_message)

<a name="new_StompClient_new"></a>

### new exports.StompClient([options])
Creates an instance of StompClient.


| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | 

<a name="StompClient+host"></a>

### stompClient.host : <code>String</code>
gets the host address for the stomp server

**Kind**: instance property of [<code>StompClient</code>](#StompClient)  
**Access**: public  
**Read only**: true  
<a name="StompClient+port"></a>

### stompClient.port : <code>Number</code>
gets the port number for the stomp server

**Kind**: instance property of [<code>StompClient</code>](#StompClient)  
**Access**: public  
**Read only**: true  
<a name="StompClient+timeout"></a>

### stompClient.timeout : <code>Number</code>
gets the timeout in ms for the client

**Kind**: instance property of [<code>StompClient</code>](#StompClient)  
**Access**: public  
**Read only**: true  
<a name="StompClient+timeout"></a>

### stompClient.timeout : <code>Object</code>
gets the servers configuration

**Kind**: instance property of [<code>StompClient</code>](#StompClient)  
**Access**: public  
**Read only**: true  
<a name="StompClient+isInitialised"></a>

### stompClient.isInitialised : <code>Object</code>
determines if client is initialised

**Kind**: instance property of [<code>StompClient</code>](#StompClient)  
**Access**: public  
**Read only**: true  
<a name="StompClient+initialise"></a>

### stompClient.initialise()
initialises the stomp client

**Kind**: instance method of [<code>StompClient</code>](#StompClient)  
**Author**: Steven Collins <steven@carboncollins.uk>  
<a name="StompClient+subscribe"></a>

### stompClient.subscribe()
subscribes to a queue on the stomp server

**Kind**: instance method of [<code>StompClient</code>](#StompClient)  
**Author**: Steven Collins <steven@carboncollins.uk>  
<a name="StompClient+close"></a>

### stompClient.close()
closes any connections to the STOMP server and unsubscibes from any queues

**Kind**: instance method of [<code>StompClient</code>](#StompClient)  
**Author**: Steven Collins <steven@carboncollins.uk>  
<a name="StompClient+event_error"></a>

### "error"
fired when an error occurs with stomp

**Kind**: event emitted by [<code>StompClient</code>](#StompClient)  
<a name="StompClient+event_connecting"></a>

### "connecting"
fired when the stomp client is connecting to the stomp server

**Kind**: event emitted by [<code>StompClient</code>](#StompClient)  
<a name="StompClient+event_connected"></a>

### "connected"
fired when the stomp client has connected to the stomp server

**Kind**: event emitted by [<code>StompClient</code>](#StompClient)  
<a name="StompClient+event_idle"></a>

### "idle"
fired when the stomp client is in idle mode

**Kind**: event emitted by [<code>StompClient</code>](#StompClient)  
<a name="StompClient+event_message"></a>

### "message"
Fired when a message from Darwin PushPort is received

**Kind**: event emitted by [<code>StompClient</code>](#StompClient)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| message | <code>String</code> | the xml message received (this has already been decompressed) |
| messageId | <code>String</code> | the message Id from the stomp server for this message |
| timestamp | <code>String</code> | the timestamp for when this message was sent |
| expires | <code>String</code> | the timestamp for when this message expires |
| queue | <code>String</code> | the queue name that this message was received on |

