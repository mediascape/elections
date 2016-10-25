/**
 * MediaScape SharedState - config.js
 * configuration file
 *
 * @author Andreas Bosl <bosl@irt.de>
 * @copyright 2014 Institut für Rundfunktechnik GmbH, All rights reserved.
 */

var os = require('os')
var config = {};


// configuration for authentication
config.auth = {
    useAuthentication: true, // Authentication Enabled true/false
    GOOGLE_CLIENT_ID: "--- XYZ ---", // obtain from https://console.developers.google.com/project
    GOOGLE_CLIENT_SECRET: "--- XYZ ---", // obtain from https://console.developers.google.com/project
    GOOGLE_CALLBACK_URL: "http:// --- XYZ ---/auth/google/callback", // Your Domain + /auth/google/callback
    session_secret: 'ForLittleKnowsMyRoyalDameThatRumpelstiltskinIsMyName!', // secret for the session cookie
    session_name: 'mappingAuth' // name for the session cookie
};


// config for mongodb / mongoose
config.mongoose = {
    uri: 'mongodb://localhost/mediascape',
    options: {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    }
};

// TableName used for mapping
config.mappingPath = 'mappingTable';

// config for express server
config.express = {
    port: 80,
    filePath: '/../www'
};

// which DB to use
config.db = {
    file: './MongoDB.js' // MongoDB
};



// Config for log4js
config.logConfig = {
    appenders: [
        {
            type: 'file',
            filename: './log/backend.log',
            maxLogSize: 10240,
            backups: 3
        },
        {
            type: "console"
        }
  ],
    replaceConsole: true
};
var networkInterfaces = os.networkInterfaces( );
config.webhost = 'http://'+networkInterfaces['eth0'][0].address+'/';
config.webhost = "http://192.168.43.9/";
config.db.host = 'localhost';
config.db.name = 'url_shortener';

module.exports = config;
