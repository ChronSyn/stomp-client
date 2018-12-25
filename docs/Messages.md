## Messages

There are several message types which are sent from the Darwin PushPort server which are emitted by this package under the `message` event, these are currently:

* [Train Status](https://wiki.openraildata.com/index.php/Darwin:Train_Status_Element)
* [Schedule](https://wiki.openraildata.com/index.php/Darwin:Schedule_Element)
* [Association](https://wiki.openraildata.com/index.php/Darwin:Association_Element)
* [Train Order](https://wiki.openraildata.com/index.php/Darwin:Train_Order_Element)
* [Station Message](https://wiki.openraildata.com/index.php/Darwin:Station_Message_Element)
* [Alarm](https://wiki.openraildata.com/index.php/Darwin:Alarm_Element)
* [Train Alert](https://wiki.openraildata.com/index.php/Darwin:Train_Alert_data)
* [Tracking ID Correction](https://wiki.openraildata.com/index.php/Darwin:Tracking_ID_corrections)

## Compression

All messages that are sent from Darwin are compressed using gunzip which means in order to read the data it needs decompressing first. This package makes use of the [zlib](https://nodejs.org/api/zlib.html) library to decompress all incoming messages into usable xml data before emitting it as an event.
