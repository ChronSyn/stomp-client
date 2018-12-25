import zlib from 'zlib';
import stompit from 'stompit';
import EventEmitter from 'events';

export const symbols = new Map()
  .set('host', Symbol('host'))
  .set('port', Symbol('port'))
  .set('timeout', Symbol('timeout'))
  .set('channel', Symbol('channel'))
  .set('subscriptions', Symbol('subscriptions'));


/**
 * @class
 * @classdesc A client model for connecting to the National Rails DARWIN PushPort realtime data feed
 * @author Steven Collins <steven@carboncollins.uk>
 * @extends {EventEmitter}
 * 
 * @emits StompClient#event:error
 * @emits StompClient#event:connecting
 * @emits StompClient#event:connected
 * @emits StompClient#event:idle
 * @emits StompClient#event:message
 */
export class StompClient extends EventEmitter {
  /**
   * @constructor
   * @description Creates an instance of StompClient.
   * @author Steven Collins <steven@carboncollins.uk>
   * @param {Object} [options={}]
   */
  constructor(options = {}) {
    super();

    this[symbols.get('host')] = options.host;
    this[symbols.get('port')] = options.port;
    this[symbols.get('timeout')] = options.timeout;

    this[symbols.get('channel')] = null;

    this[symbols.get('subscriptions')] = [];
  }

  /** 
   * @member {String} host gets the host address for the stomp server
   * @memberof StompClient
   * @readonly
   * @instance
   * @public
   */
  get host() {
    return this[symbols.get('host')] || 'datafeeds.nationalrail.co.uk';
  }

  /** 
   * @member {Number} port gets the port number for the stomp server
   * @memberof StompClient
   * @readonly
   * @instance
   * @public
   */
  get port() {
    return this[symbols.get('port')] || 61613;
  }

  /** 
   * @member {Number} timeout gets the timeout in ms for the client
   * @memberof StompClient
   * @readonly
   * @instance
   * @public
   */
  get timeout() {
    return this[symbols.get('timeout')] || 3000;
  }

  /** 
   * @member {Object} timeout gets the servers configuration
   * @memberof StompClient
   * @readonly
   * @instance
   * @public
   */
  get serverConfig() {
    return {
      host: this.host,
      port: this.port,
      timeout: this.timeout,
      connectHeaders: {
        host: '/',
        login: 'd3user',
        passcode: 'd3password',
        'heart-beat': '5000,5000'
      }
    }
  }

  /** 
   * @member {Object} isInitialised determines if client is initialised
   * @memberof StompClient
   * @readonly
   * @instance
   * @public
   */
  get isInitialised() {
    return (this[symbols.get('channel')] !== null) || false;
  }

  /**
   * @method initialise
   * @memberof StompClient
   * @description initialises the stomp client
   * @author Steven Collins <steven@carboncollins.uk>
   * @instance
   */
  initialise() {
    return new Promise((resolve, reject) => {
      if (!this.isInitialised) {
        const servers = new stompit.ConnectFailover([this.serverConfig]);
        
        servers.on('error', (...args) => {
          /**
           * @event StompClient#error
           * @description fired when an error occurs with stomp
          */
          this.emit('error', ...args);
        });
        
        servers.on('connecting', (...args) => {
          /**
           * @event StompClient#connecting
           * @description fired when the stomp client is connecting to the stomp server
          */
          this.emit('connecting', ...args);
        });
        
        servers.on('connect', (...args) => {
          /**
           * @event StompClient#connected
           * @description fired when the stomp client has connected to the stomp server
          */
          this.emit('connected', ...args);
        });
        
        this[symbols.get('channel')] = new stompit.Channel(servers, { alwaysConnected: true });
        
        this[symbols.get('channel')].on('error', (...args) => {
          this.emit('error', ...args);
        });
        
        this[symbols.get('channel')].on('idle', () => {
          /**
           * @event StompClient#idle
           * @description fired when the stomp client is in idle mode
          */
          this.emit('idle');
        });

        this[symbols.get('subscriptions')] = [];

        resolve();
      } else {
        reject(new Error('Client has already been initialised'));
      }
    });
  }

  /**
   * @method subscribe
   * @memberof StompClient
   * @description subscribes to a queue on the stomp server
   * @author Steven Collins <steven@carboncollins.uk>
   * @instance
   */
  subscribe(queue) {
    return new Promise((resolve, reject) => {
      if (this.isInitialised) {
        this[symbols.get('channel')].subscribe(queue, (err, message) => {
          let buffer = Buffer([]);
      
          message
            .pipe(zlib.createGunzip())
            .on('error', (err) => {
              this.emit('error', err);
            })
            .on('data', (chunk) => {
              buffer = Buffer.concat([buffer, chunk]);
            })
            .on('end', () => {
              const xmlMessage = buffer.toString('utf-8');

              /**
               * @event StompClient#message
               * @description Fired when a message from Darwin PushPort is received
               *
               * @property {String} message the xml message received (this has already been decompressed)
               * @property {String} messageId the message Id from the stomp server for this message
               * @property {String} timestamp the timestamp for when this message was sent
               * @property {String} expires the timestamp for when this message expires
               * @property {String} queue the queue name that this message was received on
               */
              this.emit('message', {
                message: xmlMessage,
                messageId: message.headers['message-id'],
                timestamp: message.headers.timestamp,
                expires: message.headers.expires,
                queue
              });
            });
        });

        this[symbols.get('subscriptions')].push(queue);

        resolve();
      } else {
        reject('STOMP client needs to be initiliased before you can subscribe to a queue');
      }
    });
  }

  /**
   * @method close
   * @memberof StompClient
   * @description closes any connections to the STOMP server and unsubscibes from any queues
   * @author Steven Collins <steven@carboncollins.uk>
   * @instance
   */
  close() {
    return new Promise((resolve, reject) => {
      if (this.isInitialised) {
        this[symbols.get('channel')].close();
        this[symbols.get('subscriptions')] = [];

        resolve();
      } else {
        reject(new Error('client needs to be initialised in order to be able to close it'));
      }
    });
  }
}
