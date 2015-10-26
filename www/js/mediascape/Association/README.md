# WP3 Association API #

## Overview

The Association module is responsible of establish the communication mechanisms and protocols to perform the dynamic pairing of resources for a specific session. The major challenge of the Association module is how to provide a unique Session ID, the root of the URL to access to a concrete Shared State

This document summarizes the *Association* API to access the implemented JS library information. The target of this document is to reflect the status of design and development of the *Association* library and provide a list of available functions.

The solutions include three different situations that the association module has to address:
* **Anonymous**- Fully public, the acquaintance or capability to reach a device is transferred to the physical ISO layer (WLAN/LAN).
* **Personal** After the explicit User Auth, a unique temporal public key or secret could be employed to associate all the MediaScape devices inside a Shared Session.
* **Multi-user** The association of different users is based on the application specific users names acquaintance.

New functions are being implemented.

---

## API

In order to preserve the smoothness of the Web application, it is mandatory to perform asynchronous requests to avoid blocking the application runtime waiting for the association responses. Promises overcomes these issues by providing uniform patterns for the callbacks of asynchronous operations.

Thus, the pattern for the different **_target_** association technologies will be:
 ```javascript
 	mediascape.association.<function>("<target>",[parameters]).then(cbOk(returnedJSON),cbErr(returnedJSON));
 ```

And the result is a JavaScript object with this format:
 ```
 	{"functionName":"functionValue"}
 ```
* CreateSessionID
 ```javascript
 	mediascape.association.createSessionID(["<timeStamp>",]"<AppID>","<Token>").then(cb(sessionJSON),cb2(errorJSON));
 ```

---

### JS Association API
In this section, it is described the way the Association module will respond to the different scenarios involving dynamic association.

The complete set of JavaScript functions defined for association are listed below.

* CreateSessionID
```javascript
 	mediascape.association.createSessionID(["<timeStamp>",]"<AppID>","<Token>").then(cb(sessionJSON),cb2(errorJSON));
 ```
This function provides a sessionID for de association of devices/users to the same session. This sessionID will differentiate distinct "activity rooms" for an application.

The general form of the SessionID, that has to be transformed into a URL to be used into the Shared State, is structured as follows:
```html	
	SessionID (root) = Application ID + Party creator UserID + Timestamp creation (Epoch time)
```

Note 1: some extra security could be applied like a HASH encoding (MD5) - out of focus
Note 2: a timestamp different from a Epoch time could enforce the security - out of focus


> The SessionIDs that we propose for the three defferent cases:
> * Anonymous
```html
	SessionID = ApplicationID+DeviceID(from the NamedWebSocket)
```
> * Personal
```html
	SessionID= ApplicationID+TokenUSER
```
> * Multi-user
```html
	SessionID = ApplicationID+HostUserID+EpochCREATION
```
---

**Example of calls:**

The examples that follows show the use of Association API. In the first example we can see the creation of association ID for the first situations that we have defined, anonymous case.

However, in the second example we can see another way for the creation of association ID, in this case,for the first situations that we have defined, multi-user.

```html
	mediascape.association.createSessionID("AppID","deviceID").then(function(data) {console.log('createSessionID Ok'); console.log(data);}, function(data){console.log('Parameters Error');});
			
	mediascape.association.createSessionID("timeStamp","AppID","Token").then(function(data){console.log('createSessionID Ok');console.log(data);}, function(data){console.log("Parameters Error");});
```

---

## Examples

### Code Example

In future implementations.

