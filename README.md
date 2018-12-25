<!-- ![](https://gitlab.com/openrail/uk/darwin-nodejs/uploads/0ef819a8fbad3601e15c967effd4c442/stomp-client-banner.svg) -->

stomp-client

[![country](https://img.shields.io/badge/country-UK-blue.svg)](https://gitlab.com/groups/openrail/uk)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
[![npm (scoped)](https://img.shields.io/npm/v/@openrailuk/stomp-client.svg)](https://www.npmjs.com/package/@openrailuk/stomp-client)
[![status](https://img.shields.io/badge/status-WIP-yellow.svg)](https://gitlab.com/openrail/uk/stomp-client-nodejs)
[![pipeline](https://gitlab.com/openrail/uk/stomp-client-nodejs/badges/master/pipeline.svg)](https://gitlab.com/openrail/uk/stomp-client-nodejs/commits/master)
[![coverage](https://gitlab.com/openrail/uk/stomp-client-nodejs/badges/master/coverage.svg)](https://gitlab.com/openrail/uk/stomp-client-nodejs/commits/master)
[![Discord](https://img.shields.io/discord/478848557089030144.svg)](https://discord.gg/N9CPKaY)


## info

This repository is hosted on [GitLab as stomp-client-nodejs](https://gitlab.com/openrail/uk/stomp-client-nodejs). There is no downstream GitHub repository currently. Please raise any issues or pull requests on the GitLab repository.

## usage

To use the stomp-client-nodejs package you first need to add it as a dependency to your project by running:

```shell
yarn add @openrailuk/stomp-client --save
```

Once added and installed to your project you can import the client model by using:

```javascript
import { StompClient } from '@openrailuk/stomp-client';
```

To begin receiving live Darwin data you need to initialise the client and subscribe to a queue. The queue name can be found on the [National Rail Data Portal](https://datafeeds.nationalrail.co.uk/) on the [My Feeds](https://datafeeds.nationalrail.co.uk/#/filter) page under the `Real Time Feed Information` section.

This is an example on how to initialise and subscribe to a queue:

```javascript
import { StompClient } from '@openrailuk/stomp-client';

const client = new StompClient();

client.initialise()
  .then(() => {
    client.on('error', (err) => {
      console.error(err);
    });

    client.on('message', (data) => {
      console.log(data);
    });

    return client.subscribe(QUEUE_NAME);
  })
  .then(() => {
    console.log('subscribed');
  })
  .catch((err) => {
    
  });
```

## documentation 

You might be wondering where to find information about how to use this package, fear not all documentation for open rail packages can be found on the doc site and documentation specific to this package can be found under [@openrailuk/stomp-client](https://openrail.gitlab.io/docs/uk/stompclient)