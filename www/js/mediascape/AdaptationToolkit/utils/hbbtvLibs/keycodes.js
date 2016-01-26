var KeyEvent = {};
KeyEvent.KEY_UP = 38;
window.KeyEvent = KeyEvent;

// Cursor
KEY_UP = 38;
KEY_DOWN = 40;
KEY_LEFT = 37;
KEY_RIGHT = 39;

KEY_BACK = 461;
KEY_SELECT = 13;
KEY_ENTER = 13;

// Colors
KEY_RED = 403;
KEY_GREEN = 404;
KEY_YELLOW = 405;
KEY_BLUE = 406;

// Video
KEY_PLAY = 415;
KEY_PAUSE = 19;
KEY_PLAYPAUSE = 0;
KEY_STOP = 413;
KEY_FWD = 417;
KEY_RWD = 412;

// Numbers
KEY_NUM_0 = 48;
KEY_NUM_1 = 49;
KEY_NUM_2 = 50;
KEY_NUM_3 = 51;
KEY_NUM_4 = 52;
KEY_NUM_5 = 53;
KEY_NUM_6 = 54;
KEY_NUM_7 = 55;
KEY_NUM_8 = 56;
KEY_NUM_9 = 57;

var nav=0;

function setKeyset(mask) {
        // for HbbTV 0.5:
        try {
                var elemcfg = document['oipfcfg'];
                elemcfg.keyset.value = mask;
        } catch (e) {}
        try {
                var elemcfg = document['oipfcfg'];
                elemcfg.keyset.setValue(mask);
        } catch (e) {}
        // for HbbTV 1.0:
        try {
                var app = document['appmgr'].getOwnerApplication(document);
                app.privateData.keyset.setValue(mask);
                app.privateData.keyset.value = mask;
        } catch (e) {}
}
