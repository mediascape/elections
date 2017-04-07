/*
** Long Library Name:
**	Adaptation toolkit Module
**
** Acronym and its version:
**	Adaptation toolkit v1.0
**
** Copyright claim:
**	Copyright ( C ) 2013-2014 Vicomtech-IK4 ( http://www.vicomtech.org/ ),
**	all rights reserved.
**
** Authors (in alphabetical order):
**      Ana Dominguez <adominguez@vicomtech.org>
**	Iñigo Tamayo <itamayo@vicomteh.org>,
**      Mikel Zorrila <mzorrilla@vicomtech.org>,
**
** Description:
**	The Adaptation toolkit Module finds the modules defined in the folder
**	"adaptation/" and  "componentenManager" and returns the objects and functions defined.
**
** Development Environment:
** 	The software has-been Implemented in JavaScript, and tested in Chrome and firefox
**	browsers.
**
** Dependencies:
** 	As accounts package depends on other libraries, the user must adhere to and
**	keep in place any Licencing terms of those libraries:
**		requirejs v2.1.14 (http://requirejs.org/)
**
** Licenses dependencies:
**	License Agreement for requirejs:
**		BSD 3-Clause license (http://opensource.org/licenses/BSD-3-Clause)
**		MIT license (http://opensource.org/licenses/MIT)
**
*/
/**
* AdaptationToolkit module wraps all functionality for webcomponents adaptation:
* adaptation modules, uicomponents user interface widgets, componentManager
* : parse webcomponents, normalize and css rules assocaition, utils that could be used
* for manipulated webcompoents etc..
* @module mediascape/AdaptationToolkit/AdaptationToolkit
* @requires mediascape/AdaptationToolkit/adaptation/modules
* @requires mediascape/AdaptationToolkit/componentManager/modules
* @requires mediascape/AdaptationToolkit/uiComponents/uiComponents
* @requires mediascape/AdaptationToolkit/utils/utils
* @alias mediascape/AdaptationToolkit/AdaptationToolkit
*/
define(
	[	"mediascape/AdaptationToolkit/adaptation/modules",
		"mediascape/AdaptationToolkit/componentManager/modules",
		"mediascape/AdaptationToolkit/uiComponents/uiComponents",
		"mediascape/AdaptationToolkit/Motion/motion",
		"mediascape/AdaptationToolkit/utils/utils"

	],
	function(){
		/**
		* Module of AdaptationToolkit
		* @alias mediascape/AdaptationToolkit/AdaptationToolkit
		* @exports mediascape/AdaptationToolkit/AdaptationToolkit
	  */
		var moduleList   = Array.prototype.slice.apply( arguments );
		var AdaptationToolkit = {};
		var  AdaptationToolkit =function AdaptationToolkit( mediascape, _mediascape, config ){
			var modules = [],
			loadedModules = 0,
			readyModules = 0;

			for( var i=0; i<moduleList.length; ++i ){
				var name = moduleList[ i ].__moduleName;
				/*if (name==="Motion") 	AdaptationToolkit[ name ] =  moduleList[ i ]
				else */AdaptationToolkit[ name ] = new moduleList[ i ]( AdaptationToolkit, "gq"+i, AdaptationToolkit );
				//modules.push( AdaptationToolkit[ name ] );



			}
			return AdaptationToolkit;

		};
		AdaptationToolkit.__moduleName ="AdaptationToolkit";
		return AdaptationToolkit;

	});
	Function.prototype.getBody =
	function() {
		// Get content between first { and last }
		var m = this.toString().match(/\{([\s\S]*)\}/m)[1];
		// Strip comments
		return m.replace(/^\s*\/\/.*$/mg,'');
	};

	function foo() {
		var a = 1, b = "bar";
		alert(b + a);
		return null;
	}
	window.dataRegister = {
		save:function(key,value){
			if(typeof(Storage) !== "undefined") {
				localStorage.setItem(key,JSON.stringify(value));

			} else {
				console.warn('Not local storage supported');
			}
		},
		get: function(key){
				return JSON.parse(localStorage.getItem(key));
		},
		init:function(){
			function onlayoutchange(e){
					var timestamp = new Date().getTime();

			}
			function onComponentChange (e){
				var timestamp = new Date().getTime();
			}
			document.addEventListener('onlayoutchange',onlayoutchange.bind(this),true);
			document.addEventListener('onComponentChange',onComponentChange.bind(this),true);
		}
	}
