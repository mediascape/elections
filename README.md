## Elections prototype based on mediascape

Vicomtech-IK4 is leading a prototype about a live TV show with elections, where the user will be able to consume across multiple devices different cameras, vote counting information, etc.


You could see the video demonstration [here](https://www.youtube.com/watch?v=Ugnx0VYb7oc)

## Prototype Description

This project is based on mediascape libraries. Mediascape is an European project aims to simplify a multidevice interconected and synchronized application development. For more information you could check the project webpage.

In this sense, this is a demostration of the capacibilities that mediascape library offers. The base of the demostration is a basque country elections live version. We recorded all information on the last basque country elections in other to replay-ed anytime.

This prototype offers 5 different synchronized cameras located on different political-party home, and one more camera that is an EITB (basque broadcaster) emision. Also, offers a radio broadcaster signal synchronized with all content.Futhermore, it includes a twitter comments related with the content of the multimedia content and some twitter content analysis displaying on a map.

Election data is displayed on differents planes, that are synchronized with the live content.

## Deploy the Prototype

It is based on Node and mongodb, first it necessary to install nodejs and mongodb:

Install nodejs:

```bash
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install mongodb:

``` bash
sudo apt-get install -y mongodb-org

```
Download source:

```bash

git clone https://github.com/mediascape/elections.git

```
Install dependecies:

```bash

cd election
sudo npm install

```
Create log folder:

```bash
mkdir log
```
initialize server:

```bash

sudo nodejs index.js

```
To access to application just open chrome/firefox with the following URL:


```
http://localhost

*** Note is use port 80, so may need to stop other webserver as such apache.
```

### For Developers

It your interes is to develop, you must change the index.html file:

```html
<!-- UNCOMMENT THIS FILES FOR DEV, FOR PROD COMMENT  -->

<script  src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.17/webcomponents-lite.min.js"></script>
<script async src="../resources/libs/require.js"></script>
<script async src="js/mediascape.js"></script>

<!-- COMMET THIS ONE FOR DEV, FOR PROD UNCOMMENT-->
<script async src="dist/multideviceapplib.min.js"></script>
```
A this point, the source that runs this apps, you could find it at www/js folder.

#### Minifying code

Just install require node library:

```bash
sudo npm install -g require
```
Run the following code on the www folder:

```bash
r.js -o build.js
```
This will genetare multideviceapplib.min.js at dist/ folder. On production, it is recommend to use this file. Remeber to uncomment and comment the right lines on index.html.

### Prototype Structure
```
/ : Node source folder
/www/: web application resources.
/www/js: web app source.
/www/resources/: css, externals libs, config files, webcomponents ...
/www/resources/wcs/ webcomponents folder
/wwww/resources/configPanel Control panel to manage webcompoents and differents devices, developed only for this prototype.
```
