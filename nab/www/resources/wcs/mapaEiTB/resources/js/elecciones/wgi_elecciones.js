//Elecciones terminadas cambiado a una hora en vez de 60 segundos
var wgi_update_time = 24 * 60 * 60 * 1000;
//var wgi_update_time= 60 * 1000;
var wgi_Municipios =
{
};

var wgi_anio_eleccion = 2015;
var wgi_anio_eleccion_ant = 2011;
var wgi_anio_autonomicas_cav_ant = 2012;

var data_partidos_m =
{
};
// municipales
var data_partidos_j =
{
};
// forales
var data_partidos_a =
{
};
// autonomicas

var data_partidos_m_ant =
{
};
// municipales
var data_partidos_j_ant =
{
};
// forales
var data_partidos_a_ant =
{
};
// autonomicas

var data_partidos_a_cav_ant =
{
};
// autonomicas cav (para proyeccion)

var wgi_tipHtml = "";
var wgi_over = false;
var wgi_tip = $('<div/>',
{
	id : 'wgi_tip'
}).css(
{
	'position' : 'absolute',
	'border' : '1px solid gray',
	'background-color' : '#fff',
	'padding' : 0,
	'margin' : 0,
	'z-index' : 10000,
	'max-width' : '500px'
});

var wgi_lang_pg = get_idioma();

var isInIframe = (window.location != window.parent.location) ? true : false;

var sameOrigin = false;
checkIframe();

function checkIframe()
{
	try
	{
		if (isInIframe && window.parent.location.origin == window.location.origin)
		{
			sameOrigin = true;
		}
	}
	catch( e )
	{
		return false;
	}
}

// <= IE8
var isBadIE = function()
{
	if (window.attachEvent && !window.addEventListener)
	{
		return true;
	}
	return false;
};

$(document).ready(function()
{

	if ($('#wgi_menu_elecciones').length)
	{

		if ($(window).width() < 736)
		{
			$('.wgi_especial_navegacion_elecciones .menu-toggle-elecciones').click(function()
			{
				$('.wgi_especial_navegacion_elecciones .tipo_peque').slideToggle();
			});
		}
	}

	wgi_tip.hide();
	$('body').append(wgi_tip);

	if ($(".wgi_compartir #share_destacado").length > 0)
	{

		$('.wgi_botonfacebook').click(function(e)
		{
			var urlcompartir = 'http://www.facebook.com/sharer.php?u=' + encodeURI(window.location.href) + '&t=' + encodeURI(document.getElementsByTagName('title')[0].innerHTML);

			var width = 650;
			var height = 450;
			var sheight = screen.height;
			var swidth = screen.width;

			var left = Math.round((swidth / 2) - (width / 2));

			var top = (sheight > height) ? Math.round((sheight / 2) - (height / 2)) : 0;

			window.open(urlcompartir, "Recomendar", "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
			return false;
		});

		$('.wgi_botontwitter').click(function(e)
		{
			var urlcompartir = 'http://twitter.com/share?url=' + encodeURI(window.location.href) + '&text=' + encodeURI(document.getElementsByTagName('title')[0].innerHTML);

			var width = 650;
			var height = 450;
			var sheight = screen.height;
			var swidth = screen.width;

			var left = Math.round((swidth / 2) - (width / 2));

			var top = (sheight > height) ? Math.round((sheight / 2) - (height / 2)) : 0;

			window.open(urlcompartir, "Recomendar", "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
			return false;
		});

	}

	// Cambiador de municipio

	if ($('.wgi_select_cambiador').length)
	{
		$('.wgi_select_cambiador').change(function()
		{

			var territorio = $(this).data("territorio");

			if (territorio == 'araba' && get_idioma() == 'es')
			{
				territorio = 'alava';
			}

			var ambito = "forales";
			var municipio = $(this).val();

			if (territorio == "araba" || territorio == "alava" || territorio == "bizkaia" || territorio == "gipuzkoa")
			{
				ambito = "wgi_url_municipales_forales_cav";
			}
			else
			{
				ambito = "wgi_url_municipales_forales_navarra";
			}

			municipio = wgi_limpiarMunicipio(municipio);
			municipio = municipio.replace(/\//g, "_");
			municipio = municipio.replace(/_/g, "-");

			var url = wgi_getUrlVer([elec_lang(ambito), territorio, municipio]);

			if (isInIframe)
			{
				window.open(url, '_blank');
			}
			else
			{
				window.location = url;
			}
		});
	}

	// Codigos para insertar gráficos

	if ($('.wgi_embed_visor').length)
	{
		$('.wgi_embed_visor').hide();
		$(".wgi_boton_embed button").click(function()
		{
			if ($(this).parent().find(".wgi_embed_visor").is(":visible"))
			{
				$(this).parent().find(".wgi_embed_visor").hide();
			}
			else
			{
				$(this).parent().find(".wgi_embed_visor").show();
			}
			return false;
		});
	}

	// detalle 1col

	if ($('.wgi_detalle_elecciones_1col').length)
	{

		initModulo1Col();

		$(".wgi_detalle_elecciones_1col .wgi_tab").click(function(event)
		{
			event.preventDefault();

			var relContent = $(this).data('content');

			$(".wgi_detalle_elecciones_1col .wgi_capa:not(.wgi_capa_buscador)").hide();
			$(".wgi_detalle_elecciones_1col .wgi_tab").removeClass("selected");
			$("#" + relContent).show();
			$(this).addClass("selected");
		});

		/*
		 $(".wgi_detalle_elecciones_1col .wgi_elecciones_buscador_title").click(function() {
		 if ( $("#wgi_1col_buscador").is(":visible") ) {
		 $("#wgi_1col_buscador").hide();
		 $(this).removeClass('is_open');
		 $(".wgi_detalle_elecciones_1col_tabs").show();
		 initModulo1Col();
		 } else {
		 $(".wgi_detalle_elecciones_1col .wgi_capa").hide();
		 $(".wgi_detalle_elecciones_1col_tabs").hide();
		 $("#wgi_1col_buscador").show();
		 $(this).addClass('is_open');
		 }
		 });
		 */
	}

});

$(window).load(function()
{

	if ($(".wgi_compartir #share_destacado").length > 0)
	{
		var botonwhatsapp = $(".wgi_whatsapp_elecciones iframe").contents().find('.wgi_botonwhatsapp');
		var whatsapptext = "whatsapp://send?text=" + encodeURIComponent(document.title) + ":%20";
		whatsapptext += encodeURIComponent(document.URL);
		botonwhatsapp.attr("href", whatsapptext);
	}
});

/*
 window.onload = function(){

 // igualamos la altura de las columnas del resumen

 if ($('.wgi_columnas_resumen_fist').length) {
 var max_col_height = 0;
 $('.wgi_columnas_resumen_fist .wgi_elecciones_col').each(function(index, item) {
 if ($(item).height() > max_col_height) {
 max_col_height = $(item).height();
 }
 });
 $('.wgi_columnas_resumen_fist .wgi_elecciones_col').height(max_col_height);
 }

 };
 */

function initModulo1Col()
{
	$(".wgi_detalle_elecciones_1col .wgi_capa").each(function()
	{
		if (!$(this).hasClass('wgi_capa_init'))
		{
			$(this).hide();
		}
		else
		{
			$(this).show();
		}
	});
	$(".wgi_detalle_elecciones_1col .wgi_tab").removeClass("selected");
	$(".wgi_detalle_elecciones_1col .wgi_tab_init").addClass("selected");
}

var wgi_euskadi_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var bizkaia = container.set(), gipuzkoa = container.set(), araba = container.set(), cav = container.set();

	for (var municipio in paths.municipios.cav)
	{
		eval(wgi_getHerrialde(municipio)).push(muns[municipio] = container.path(paths.municipios.cav[municipio]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
		cav.push(muns[municipio]);
	}

	container.araba = araba;
	container.bizkaia = bizkaia;
	container.gipuzkoa = gipuzkoa;
	container.cav = cav;

	return container;
};

var wgi_araba_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var araba = container.set();
	contador = 0;
	for (var municipio_g in paths.municipios.cav)
	{

		if (wgi_getHerrialde(municipio_g) == "araba")
		{

			// Estos son de Gipuzkoa y bizkaia
			if (municipio_g == "terreno_enirio_aralar" || municipio_g == "terreno_parzoneria" || municipio_g == "terreno_vvtrucios")
			{
				continue;
			}

			contador++;
			eval(wgi_getHerrialde(municipio_g)).push(muns[municipio_g] = container.path(paths.municipios.cav[municipio_g]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

			araba.push(muns[municipio_g]);
		}
	}

	// Estos terrenos los va a meter automáticamente porque cuando no puede
	// identificar a qué provincia pertenece un municipio (path), devuelve "araba"
	// terreno_badaia
	// terreno_entzia
	// terreno_comunidad
	// terreno_trevino

	container.araba = araba;

	return container;
};

var wgi_bizkaia_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var bizkaia = container.set();
	for (var municipio in paths.municipios.cav)
	{
		if (wgi_getHerrialde(municipio) == "bizkaia")
		{
			eval(wgi_getHerrialde(municipio)).push(muns[municipio] = container.path(paths.municipios.cav[municipio]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
			bizkaia.push(muns[municipio]);
		}
	}

	// Terrenos
	// Nosotros sabemos que son de bizkaia, aunque no venga en el get de municipios
	// Los metemos manualmente
	bizkaia.push(muns["terreno_vvtrucios"] = container.path(paths.municipios.cav["terreno_vvtrucios"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

	container.bizkaia = bizkaia;

	return container;
};

var wgi_gipuzkoa_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var gipuzkoa = container.set();
	contador = 0;
	for (var municipio_g in paths.municipios.cav)
	{
		if (wgi_getHerrialde(municipio_g) == "gipuzkoa")
		{
			contador++;
			eval(wgi_getHerrialde(municipio_g)).push(muns[municipio_g] = container.path(paths.municipios.cav[municipio_g]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

			gipuzkoa.push(muns[municipio_g]);

		}
	}

	// Terrenos
	// Nosotros sabemos que son de gipuzkoa, aunque no venga en el get de municipios
	// Los metemos manualmente
	gipuzkoa.push(muns["terreno_enirio_aralar"] = container.path(paths.municipios.cav["terreno_enirio_aralar"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	gipuzkoa.push(muns["terreno_parzoneria"] = container.path(paths.municipios.cav["terreno_parzoneria"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

	container.gipuzkoa = gipuzkoa;

	return container;
};
// Mapa Nafarroa con problaciones.
// Se usa esta función cuando pintamos el mapa entero
// CAV + Navarra con poblaciones.

var wgi_nafarroa_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var nafarroa = container.set();

	var translateString = "t" + translateX + "," + translateY;

	for (var municipio in paths.municipios.nafarroa)
	{
		nafarroa.push(muns[municipio] = container.path(paths.municipios.nafarroa[municipio]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	}

	container.nafarroa = nafarroa;

	return container;
};
// Mapa Araba solo provincia

var wgi_araba_general_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{

	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var araba = container.set();
	// for (var municipio in paths.provincia.cav){
	//if (municipio=="araba"){
	araba.push(muns['araba'] = container.path(paths.provincia.cav['araba']).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	//  }
	//}

	container.araba = araba;

	return container;
};
// Mapa Bizkaia solo provincia

var wgi_bizkaia_general_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var bizkaia = container.set();
	// for (var municipio in paths.provincia.cav){
	// if (municipio=="bizkaia"){
	bizkaia.push(muns['bizkaia'] = container.path(paths.provincia.cav['bizkaia']).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	//   }
	//}

	container.bizkaia = bizkaia;

	return container;
};
// Mapa Gipuzkoa solo provincia

var wgi_gipuzkoa_general_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var gipuzkoa = container.set();
	//for (var municipio in paths.provincia.cav){
	//if (municipio=="gipuzkoa"){
	gipuzkoa.push(muns['gipuzkoa'] = container.path(paths.provincia.cav['gipuzkoa']).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	//  }
	//}

	container.gipuzkoa = gipuzkoa;

	return container;
};
// Mapa navarra solo provincia

var wgi_nafarroa_general_mun_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var nafarroa = container.set();

	nafarroa.push(muns['navarra'] = container.path(wgi_paths.navarra).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

	container.nafarroa = nafarroa;

	return container;
};

var wgi_spain_auto_map = function(autos, container, attr, scaleX, scaleY, centerX, centerY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	var attr_borde =
	{
		fill : "none",
		stroke : "#666",
		"stroke-width" : 1,
		"stroke-linejoin" : "round"
	};

	autos.la_rioja = container.path(paths.rioja).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.la_rioja.color = Raphael.getColor();

	//autos.euskadi=container.path(paths.euskadi).attr(attr).scale(scaleX,scaleY,centerX,centerY);
	//autos.euskadi.color=Raphael.getColor();
	autos.eae = container.path(paths.euskadi).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.eae.color = Raphael.getColor();

	autos.cantabria = container.path(paths.cantabria).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.cantabria.color = Raphael.getColor();
	autos.galicia = container.path(paths.galicia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.galicia.color = Raphael.getColor();
	autos.baleares = container.path(paths.baleares).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.baleares.color = Raphael.getColor();
	autos.canarias = container.path(paths.canarias).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.canarias.color = Raphael.getColor();
	autos.canarias_borde = container.path(paths.canarias_borde).attr(attr_borde).scale(scaleX, scaleY, centerX, centerY);
	autos.canarias_borde.color = Raphael.getColor();
	autos.catalunya = container.path(paths.catalunya).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.catalunya.color = Raphael.getColor();
	autos.aragon = container.path(paths.aragon).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.aragon.color = Raphael.getColor();
	/*
	 autos.valencia=container.path(paths.valencia).attr(attr).scale(scaleX,scaleY,centerX,centerY);
	 autos.valencia.color=Raphael.getColor();
	 autos.murcia=container.path(paths.murcia).attr(attr).scale(scaleX,scaleY,centerX,centerY);
	 autos.murcia.color=Raphael.getColor();
	 */
	autos.comunidad_valenciana = container.path(paths.valencia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.comunidad_valenciana.color = Raphael.getColor();
	autos.region_de_murcia = container.path(paths.murcia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.region_de_murcia.color = Raphael.getColor();

	autos.navarra = container.path(paths.navarra).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.navarra.color = Raphael.getColor();
	autos.madrid = container.path(paths.madrid).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.madrid.color = Raphael.getColor();
	autos.castilla_leon = container.path(paths.castilla_leon).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.castilla_leon.color = Raphael.getColor();
	autos.asturias = container.path(paths.asturias).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.asturias.color = Raphael.getColor();
	autos.extremadura = container.path(paths.extremadura).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.extremadura.color = Raphael.getColor();
	autos.castilla_mancha = container.path(paths.castilla_mancha).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.castilla_mancha.color = Raphael.getColor();
	autos.andalucia = container.path(paths.andalucia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.andalucia.color = Raphael.getColor();

	autos.ceuta = container.path(paths.ceuta).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.ceuta.color = Raphael.getColor();
	autos.melilla = container.path(paths.melilla).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	autos.melilla.color = Raphael.getColor();

	return container;
};

var wgi_populate_mun = function(data, R, municipios, callback, events, tipo_eleccion, resultados_alcadias)
{
	var current = null, color, siglas;
	callback = callback ||
	function()
	{
	};
	if (data == null || data.length == 0 || data[0].partidos.length == 0)
	{
		//R.loading('no_data_mapa_mun');
		//return false;
	}

	if (resultados_alcadias == null)
	{
		resultados_alcadias = false;
	}

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	if ($.isEmptyObject(wgi_Municipios))
	{
		getMunicipios();
	}

	var wgi_municipios_flat = [];
	for (var mun_provincia in wgi_Municipios)
	{
		for (var mun_key in wgi_Municipios[mun_provincia])
		{
			wgi_municipios_flat[mun_key] = wgi_Municipios[mun_provincia][mun_key];
		}
	}

	for (var nombre in municipios)
	{
		var tmp = nombre.split("_");

		//if (tmp[0]=='terreno') continue;
		(function(objeto, mun)
		{
			objeto[0].style.cursor = "pointer";

			// Para los municipios que están partidos en 2 paths
			// Al que viene con "_1" por detrás le ponemos los mismos
			var tmp = nombre.split("_");
			if (tmp[tmp.length - 1] == "1")
			{
				tmp.pop();
				nombre = tmp.join('_');
			}

			objeto.data = wgi_getDataOf(nombre, data);

			if (objeto.data == null && typeof wgi_municipios_flat[mun] != 'undefined')
			{
				var nombre_municipio = wgi_Utf8.encode(wgi_municipios_flat[mun]);
				objeto.data = {
					NOMBRE : mun,
					NOMBRE_C : nombre_municipio,
					NOMBRE_E : nombre_municipio
				};
			}

			var strokeColor = "#fff";

			if (resultados_alcadias)
			{

				if (objeto.data == null || objeto.data.partido_alcaldia == null || objeto.data.partido_alcaldia == '' || objeto.data.ESCRUTADO == '0,00')
				{
					color = "#fff";
					strokeColor = "#000";
					//} else if (typeof (data_partidos[siglas=objeto.data.partido_alcaldia.toLowerCase().replace(/\./g, "")]) != 'undefined' && data_partidos[siglas=objeto.data.partido_alcaldia.toLowerCase().replace(/\./g, "")]['color'] != null) {
				}
				else if ( typeof (data_partidos[ siglas = objeto.data.partido_alcaldia.toLowerCase()]) != 'undefined' && data_partidos[siglas=objeto.data.partido_alcaldia.toLowerCase()]['color'] != null)
				{
					color = data_partidos[siglas]['color'];
				}
				else
				{
					color = data_partidos['default']['color'];
				}
			}
			else
			{
				if (objeto.data == null || objeto.data.PARTIDO_GANADOR == null || objeto.data.ESCRUTADO == '0,00')
				{
					color = "#fff";
					strokeColor = "#000";
					//} else if (typeof (data_partidos[siglas=objeto.data.PARTIDO_GANADOR.toLowerCase().replace(/\./g, "")]) != 'undefined' && data_partidos[siglas=objeto.data.PARTIDO_GANADOR.toLowerCase().replace(/\./g, "")]['color'] != null) {
				}
				else if ( typeof (data_partidos[ siglas = objeto.data.PARTIDO_GANADOR.toLowerCase()]) != 'undefined' && data_partidos[siglas=objeto.data.PARTIDO_GANADOR.toLowerCase()]['color'] != null)
				{
					color = data_partidos[siglas]['color'];
				}
				else
				{
					color = data_partidos['default']['color'];
				}
			}

			if (tmp[0] == 'terreno')
			{
				strokeColor = "#ccc";
				color = "#fff";
			}

			objeto.animate(
			{
				fill : color,
				stroke : strokeColor
			}, 500);
			objeto.originalColor = color;
			R.safari();

			objeto.hover(function()
			{
				var tmp = mun.split("_");

				var clr = Raphael.rgb2hsb(objeto.originalColor);

				if (tmp[0] == "terreno")
				{
					if (tmp[1] == "trevino")
					{
						wgi_addTipMun(
						{
							NOMBRE : elec_lang('wgi_trevino'),
							NOMBRE_C : elec_lang('wgi_trevino'),
							NOMBRE_E : elec_lang('wgi_trevino')
						});
					}
					else if (tmp[1] == "vvtrucios")
					{
						wgi_addTipMun(
						{
							NOMBRE : elec_lang('wgi_vvtrucios'),
							NOMBRE_C : elec_lang('wgi_vvtrucios'),
							NOMBRE_E : elec_lang('wgi_vvtrucios')
						});
					}
					else
					{
						wgi_addTipMun(
						{
							NOMBRE : elec_lang('wgi_zona_sin_datos'),
							NOMBRE_C : elec_lang('wgi_zona_sin_datos'),
							NOMBRE_E : elec_lang('wgi_zona_sin_datos')
						});
					}
				}
				else
				{
					if (resultados_alcadias)
					{
						if (objeto.data != null && objeto.data.partido_alcaldia != null && objeto.data.ESCRUTADO != '0,00')
						{
							clr.b = .5;
						}
						wgi_addTipMunAlcaldia(objeto.data);
					}
					else
					{
						if (objeto.data != null && objeto.data.PARTIDO_GANADOR != null && objeto.data.ESCRUTADO != '0,00')
						{
							clr.b = .5;
						}
						wgi_addTipMun(objeto.data);
					}
				}

				//current && regions[current].animate({fill: "#333", stroke: "#666"}, 500);
				objeto.animate(
				{
					fill : Raphael.hsb2rgb(clr).hex,
					stroke : "#666"
				}, 500);

				R.safari();
				current = nombre;
			}, function()
			{

				var tmp = mun.split("_");

				wgi_hideTip();

				var strokeColor = "#fff";

				if (resultados_alcadias)
				{
					if (objeto.data == null || objeto.data.partido_alcaldia == null || objeto.data.partido_alcaldia == '' || objeto.data.ESCRUTADO == '0,00')
					{
						strokeColor = "#000";
					}
				}
				else
				{
					if (objeto.data == null || objeto.data.PARTIDO_GANADOR == null || objeto.data.ESCRUTADO == '0,00')
					{
						strokeColor = "#000";
					}
				}

				if (tmp[0] == 'terreno')
				{
					strokeColor = "#ccc";
				}

				objeto.animate(
				{
					fill : objeto.originalColor,
					stroke : strokeColor
				}, 500);
				R.safari();
			});

			for (var ev in events)
			{
				switch (ev)
				{
					case 'click':
						objeto.click(events[ev]);
						break;
					case 'mouseover':
						objeto.mouseover(events[ev]);
						break;
					case 'mouseout':
						objeto.mouseout(events[ev]);
						break;
				}
			}

			objeto.move(wgi_updateTipPosition);
		})(municipios[nombre], nombre);
	}
	callback.call();
};

var wgi_populate_prov = function(data, R, regions, callback, events, tipo_escano, tipo_eleccion)
{
	callback = callback ||
	function()
	{
	};
	events = events ||
	{
	};
	var current = null, color, siglas;

	if ( typeof data[0] == 'undefined' || data[0].partidos.length == 0 || data[0].ESCRUTADO == '0,00')
	{
		R.loading('no_data_map_small');
		return false;
	}

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	for (var provincia in regions)
	{
		(function(pr, provincia)
		{
			if (provincia == 'canarias_borde')
				return;
			pr[0].style.cursor = "pointer";

			var prov_data = wgi_getDataOf(provincia, data);
			//if (prov_data!=null && prov_data.PARTIDO_GANADOR!=null && typeof data_partidos[siglas=prov_data.PARTIDO_GANADOR.toLowerCase().replace(/\./g, "")] != 'undefined'){
			if (prov_data != null && prov_data.PARTIDO_GANADOR != null && typeof data_partidos[ siglas = prov_data.PARTIDO_GANADOR.toLowerCase()] != 'undefined')
			{
				color = data_partidos[siglas]['color'];
			}
			else
			{
				color = data_partidos['default']['color'];
			}
			pr.data = prov_data;
			pr.animate(
			{
				fill : color,
				stroke : "#fff"
			}, 500);
			// R.safari();
			pr.hover(function()
			{
				if (data != null && prov_data != null)
				{
					//wgi_addTipTabla(provincia,data,prov_data.PARTIDO_GANADOR.toLowerCase());
					wgi_addTipTabla(provincia, data, tipo_escano, tipo_eleccion);
				}
				pr.originalColor = pr.attr('fill');
				var clr = Raphael.rgb2hsb(pr.attr('fill'));
				clr.b = .5;
				//current && regions[current].animate({fill: "#333", stroke: "#666"}, 500);
				pr.animate(
				{
					fill : Raphael.hsb2rgb(clr).hex,
					stroke : "#666"
				}, 500);

				// R.safari();
				current = provincia;
			}, function()
			{
				wgi_hideTip();
				pr.animate(
				{
					fill : pr.originalColor,
					stroke : "#fff"
				}, 500);
				// R.safari();
			});

			for (var ev in events)
			{
				switch (ev)
				{
					case 'click':
						pr.click(events[ev]);
						break;
					case 'mouseover':
						pr.mouseover(events[ev]);
						break;
					case 'mouseout':
						pr.mouseout(events[ev]);
						break;
				}
			}
			pr.move(wgi_updateTipPosition);
		})(regions[provincia], provincia);
	}
	callback.call();
};

var wgi_addTipTabla = function(region, data, tipo_escano, tipo_eleccion)
{
	wgi_tipHtml = wgi_htmlTabla(wgi_getDataOf(region, data), region, tipo_escano, tipo_eleccion);

	wgi_tip.stop();
	wgi_tip.html(wgi_tipHtml);
	wgi_tip.css(
	{
		'display' : 'block'
	});
	wgi_tip.animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_htmlTabla = function(partido_a, region, tipo_escano, tipo_eleccion)
{
	var image, siglas, color;

	var partidos = partido_a.partidos, partidos_ant = partido_a.partidos_ant;

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	var html = '<div class="wgi_cont_tabla_mapa">';
	html += '<h2>' + elec_lang('region_' + region) + '</h2>';
	html += '<table>';
	html += '<tr class="fila_th">';
	html += '<th></th>';

	if (tipo_escano == 'CONCEJALES')
	{
		html += '<th>' + elec_lang('wgi_concejales') + '</th>';
	}
	else if (tipo_escano == 'JUNTEROS')
	{
		if (region == 'navarra' || region == 'nafarroa')
		{
			html += '<th>' + elec_lang('wgi_parlamentarios') + '</th>';
		}
		else
		{
			html += '<th>' + elec_lang('wgi_junteros') + '</th>';
		}
	}
	else if (tipo_escano == 'ESCANOS')
	{
		html += '<th>' + elec_lang('wgi_parlamentarios') + '</th>';
	}

	html += '<th>' + elec_lang('pvotos') + '</th>';
	html += '<th>' + elec_lang('nvotos') + '</th>';
	html += '</tr>';

	for (var partido in partido_a.partidos)
	{
		if (partido != "indexOf")
		{
			//if ((siglas=partido_a.partidos[partido].SIGLAS.toLowerCase().replace(/\./g, ""))==null) siglas='default';
			if (( siglas = partido_a.partidos[partido].SIGLAS.toLowerCase()) == null)
				siglas = 'default';

			if ( typeof data_partidos[siglas] == 'undefined')
			{
				image = data_partidos['default']['imagen'];
				color = data_partidos['default']['color'];
				nombre = partido_a.partidos[partido].SIGLAS;
			}
			else
			{
				image = data_partidos[siglas]['imagen'];
				color = data_partidos[siglas]['color'];
				nombre = data_partidos[siglas]['nombre'].toUpperCase();
			}

			if (image == null)
			{
				image = data_partidos['default']['imagen'];
			}

			partido_a.partidos[partido].PVOTOS = Math.floor(parseFloat(partido_a.partidos[partido].PVOTOS));
			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			separador_miles = ".";
			resulta = partido_a.partidos[partido].VOTOS.toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partido_a.partidos[partido].VOTOS = resulta;

			var diferencia = wgi_diferenciaPartidoAnt(partido, partidos, partidos_ant, tipo_escano, region);

			if (partido_a.partidos[partido].JUNTEROS > 0)
			{

				html += '<td class="a_left nombre_partido"><img src="' + image + '" alt="' + siglas + '" />' + nombre + '</td>';
				html += '<td class="a_left">' + partido_a.partidos[partido].JUNTEROS + ' <span class="diferencia ' + diferencia.clase + '">' + diferencia.cantidad + '</span></td>';
				html += '<td>' + partido_a.partidos[partido].PVOTOS + '</td>';
				html += '<td>' + partido_a.partidos[partido].VOTOS + '</td>';
				html += '</tr>';
			}
		}
	}

	html += '</table></div>';

	if (region == "eae")
	{
		html = "";
	}

	return html;
};

var wgi_addTipMun = function(data)
{
	wgi_tipHtml = wgi_htmlMun(data);
	$(wgi_tip).stop();
	$(wgi_tip).html(wgi_tipHtml);
	$(wgi_tip).css(
	{
		'display' : 'block'
	});
	$(wgi_tip).animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_addTipMunAlcaldia = function(data)
{
	wgi_tipHtml = wgi_htmlMunAlcaldia(data);
	$(wgi_tip).stop();
	$(wgi_tip).html(wgi_tipHtml);
	$(wgi_tip).css(
	{
		'display' : 'block'
	});
	$(wgi_tip).animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_htmlMun = function(municipio)
{

	var nombre_municipio = municipio.NOMBRE_C;
	if (get_idioma() == 'eu')
	{
		nombre_municipio = municipio.NOMBRE_E;
	}

	var html = '<span class="wgi_municipio_tip">' + wgi_Utf8.decode(nombre_municipio) + '</span>';

	return html;
};

var wgi_htmlMunAlcaldia = function(municipio)
{
	getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
	var data_partidos = data_partidos_m;

	var nombre_municipio = municipio.NOMBRE_C;
	if (get_idioma() == 'eu')
	{
		nombre_municipio = municipio.NOMBRE_E;
	}

	var nombre_alcalde = municipio.alcalde;

	var siglas = 'default';

	if (municipio.partido_alcaldia != null && municipio.partido_alcaldia != '')
	{
		//siglas = municipio.partido_alcaldia.toLowerCase().replace(/\./g, "");
		siglas = municipio.partido_alcaldia.toLowerCase();
	}

	var color = data_partidos['default']['color'];
	var imagen = data_partidos['default']['imagen'];
	var clase = data_partidos['default']['clase'];
	var nombre = siglas.toUpperCase();

	if ( typeof data_partidos[siglas] == 'undefined')
	{
		siglas = 'default';
		color = data_partidos['default']['color'];
		imagen = data_partidos['default']['imagen'];
		clase = data_partidos['default']['clase'];
		nombre = siglas.toUpperCase();
	}
	else
	{
		color = data_partidos[siglas]['color'];
		imagen = data_partidos[siglas]['imagen'];
		clase = data_partidos[siglas]['clase'];
		nombre = data_partidos[siglas]['nombre'].toUpperCase();
	}
	if (imagen == null)
	{
		imagen = data_partidos['default']['imagen'];
	}

	// Tooltip-ean: herriaren izena, alkatearen izena, alderdiaren logoa + alderdiaren izena

	var html = '<div class="wgi_municipio_tip">';

	html += '<span class="wgi_alcaldia_tip wgi_alcaldia_tip_municipio">';
	html += wgi_Utf8.decode(nombre_municipio);
	html += '</span>';

	if (nombre_alcalde)
	{
		html += '<span class="wgi_alcaldia_tip wgi_alcaldia_tip_alcalde">';
		html += nombre_alcalde;
		html += '</span>';
	}

	if (siglas != 'default')
	{
		if (nombre)
		{
			html += '<span class="wgi_alcaldia_tip wgi_alcaldia_tip_partido">';

			if (imagen)
			{
				html += '<img src="' + imagen + '" alt="' + nombre + '" class="wgi_alcaldia_tip_imagen"> ';
			}

			html += nombre;
			html += '</span>';
		}
	}

	html += '</div>';

	return html;
};

var wgi_addTipPartido = function(region, data, label, tipo_eleccion, anterior)
{
	if ( typeof (label) != 'string')
		label = wgi_getSiglasFromLabel(label);

	var wgi_tipHtml = '';
	if (anterior)
	{
		wgi_tipHtml = wgi_htmlPartido(wgi_getDataOfPartyAnterior(label, wgi_getDataOf(region, data)), tipo_eleccion);
	}
	else
	{
		wgi_tipHtml = wgi_htmlPartido(wgi_getDataOfParty(label, wgi_getDataOf(region, data)), tipo_eleccion);
	}

	wgi_tip.stop();
	wgi_tip.html(wgi_tipHtml);
	wgi_tip.css(
	{
		'display' : 'block'
	});
	wgi_tip.animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_htmlPartido = function(partido, tipo_eleccion)
{

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}
	else if (tipo_eleccion == "autonomicas_cav")
	{
		getDataPartidos("ac", wgi_anio_autonomicas_cav_ant, wgi_anio_autonomicas_cav_ant);
		var data_partidos = data_partidos_a_cav_ant;
	}

	var image, siglas;
	//if ((siglas=partido.SIGLAS.toLowerCase().replace(/\./g, ""))==null) siglas='default';
	if (( siglas = partido.SIGLAS.toLowerCase()) == null)
		siglas = 'default';
	if ( typeof data_partidos[siglas] == 'undefined')
	{
		image = data_partidos['default']['logo'];
		nombre = partido.SIGLAS;
	}
	else
	{
		image = data_partidos[siglas]['logo'];
		nombre = data_partidos[siglas]['nombre'];
	}

	var html = '<div class="wgi_partido_tip">';
	html += '<p class="nombre_partido">' + nombre.toUpperCase() + '</p>';
	if (partido.ESCANOS >= 0)
		html += "<p>" + partido.ESCANOS + " " + elec_lang('escanos_tarta') + "</p>";
	if ( typeof partido.PVOTOS != 'undefined')
	{

		//html+="<p>"+separarDecimales(partido.VOTOS)+" "+elec_lang('votos')+"</p>";
		html += "<p>" + partido.VOTOS + " " + elec_lang('wgi_votos_tooltip_tarta') + "</p>";
		// var pvotos=partido.PVOTOS.split(".")[0];
		var pvotos = partido.PVOTOS;
		if (pvotos == 0)
			pvotos = partido.PVOTOS;
		if (wgi_lang_pg == 'eu')
		{
			html += "<p>%" + pvotos + "</p>";
		}
		else
		{
			html += "<p>" + pvotos + "%</p>";
		}
	}
	html += "</div>";

	return html;
};

var wgi_diferenciaPartidoAnt = function(partido, partidos, partidos_ant, tipo_escano, lugar)
{
	function esCAV()
	{
		if (lugar == 'araba' || lugar == 'alava' || lugar == 'bizkaia' || lugar == 'gipuzkoa' || lugar == 'eae' || lugar == 'cav')
		{
			return true;
		}
		return false;
	}

	var diferencia =
	{
		"cantidad" : "",
		"clase" : ""
	};
	var diferencia_calc = 0, class_diferencia = "", encontrado = false;

	if (partidos[partido].COD_PARTIDO != -1)
	{
		for (var partido_ant in partidos_ant)
		{

			if (partidos_ant[partido_ant].COD_PARTIDO == -1)
			{
				continue;
			}

			// EH Bildu en 2015 (cod_partido: 120) / Bildu+Aralar (cod_partido: 130) en 2011
			// En 2011 hay que contar Bildu+Aralar para la comparación con EH Bildu 2015 en CAV (municipales y forales).
			// Me crean un partido "fantasma" (visible: 0) para hacer la comparación.
			// Este partido fantasma no tienen que salir en las tartas.
			/*
			 if (esCAV() && partidos[partido].COD_PARTIDO == 120) { // EH Bildu en 2015 en CAV
			 if (partidos_ant[partido_ant].COD_PARTIDO == 130) { // Bildu + Aralar en 2011 en CAV
			 diferencia_calc = parseInt(partidos[partido][tipo_escano]) - parseInt(partidos_ant[partido_ant][tipo_escano]);
			 encontrado = true;
			 break;
			 }

			 } else {

			 */

			if (partidos[partido].COD_PARTIDO == partidos_ant[partido_ant].COD_PARTIDO)
			{
				diferencia_calc = parseInt(partidos[partido][tipo_escano]) - parseInt(partidos_ant[partido_ant][tipo_escano]);
				encontrado = true;
				break;
			}

			/*}*/
		}
	}

	if (encontrado)
	{
		diferencia.cantidad = Math.abs(diferencia_calc);
		if (diferencia_calc < 0)
		{
			diferencia.clase = "diferencia_down";
		}
		else if (diferencia_calc > 0)
		{
			diferencia.clase = "diferencia_up";
		}
		else
		{
			diferencia.cantidad = "=";
			diferencia.clase = "diferencia_igual";
		}
	}

	return diferencia;
};

var resumen_tabla = function(provincia, data, tipo_escano, container, mostrar_nombres_partidos, tipo_eleccion)
{
	wgi_pintar_tabla(provincia, data, container, false, tipo_escano, true, mostrar_nombres_partidos, tipo_eleccion);
};

var detalle_provincia_tabla = function(provincia, data, tipo_escano, container, tipo_eleccion)
{
	wgi_pintar_tabla(provincia, data, container, true, tipo_escano, true, true, tipo_eleccion);
};

var detalle_provincia_jjgg_parlamento_tabla = function(provincia, data, tipo_escano, container, tipo_eleccion)
{
	wgi_pintar_tabla(provincia, data, container, false, tipo_escano, true, true, tipo_eleccion);
};

var wgi_detalle_autonomicas_estado_tabla = function(comunidad, data, tipo_escano, container)
{
	wgi_pintar_tabla(comunidad, data, container, true, tipo_escano, true, true, "autonomicas");
};

var wgi_proyeccion_tabla = function(provincia, data, tipo_escano, container, tipo_eleccion)
{
	wgi_pintar_tabla(provincia, data, container, false, tipo_escano, true, true, tipo_eleccion);
};

var wgi_pintar_tabla = function(lugar, data, container, ceros, tipo_escano, mostrar_col_escanos, mostrar_nombres_partidos, tipo_eleccion)
{
	if (mostrar_col_escanos == null)
		mostrar_col_escanos = true;
	if (mostrar_nombres_partidos == null)
		mostrar_nombres_partidos = true;

	if ( typeof tipo_eleccion != null)
	{
		var prov_data = wgi_getDataOfAutonomicas(lugar, data);
	}
	else
	{
		var prov_data = wgi_getDataOf(lugar, data);
	}

	if (prov_data)
	{
		var partidos = prov_data.partidos, partidos_ant = prov_data.partidos_ant;
	}

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}
	else if (tipo_eleccion == "autonomicas_cav")
	{
		getDataPartidos("ac", wgi_anio_autonomicas_cav_ant, wgi_anio_autonomicas_cav_ant);
		var data_partidos = data_partidos_a_cav_ant;
	}

	var serie_pie = new Array();
	var legend_pie = new Array();
	var color_pie = new Array();

	var tbl_html = '<table cellpadding="3" cellspacing="0" id="r_mun_2015" class="wgi_tabla_resultados_municipales_2015 wgi_tabla_detalle_jjgg_parlamento">';
	tbl_html += '<tr><th scope="col">&nbsp;</th>';

	if (mostrar_col_escanos)
	{
		if (tipo_escano == 'CONCEJALES')
		{
			tbl_html += '<th scope="col">' + elec_lang('wgi_concejales') + '</th>';
		}
		else if (tipo_escano == 'JUNTEROS')
		{
			if (lugar == 'navarra' || lugar == 'nafarroa')
			{
				tbl_html += '<th scope="col">' + elec_lang('wgi_parlamentarios') + '</th>';
			}
			else
			{
				tbl_html += '<th scope="col">' + elec_lang('wgi_junteros') + '</th>';
			}
		}
		else if (tipo_escano == 'ESCANOS')
		{
			tbl_html += '<th scope="col">' + elec_lang('wgi_parlamentarios') + '</th>';
		}
	}

	tbl_html += '<th scope="col" class="porcentaje">%</th>';
	tbl_html += '<th scope="col">' + elec_lang('voto_tabla') + '</th>';
	tbl_html += '</tr>';

	var tbl_tmp;
	var color;
	var imagen;
	var siglas;
	var clase;
	var pvotos;

	for (var partido in partidos)
	{

		if (partidos[partido][tipo_escano] >= 0)
		{
			serie_pie.push(parseInt(partidos[partido][tipo_escano]));
			legend_pie.push("### " + partidos[partido]['SIGLAS'].replace(/\./g, ""));
			if (partidos[partido]['SIGLAS'] != null)
				siglas = partidos[partido]['SIGLAS'].toLowerCase().replace(/\./g, "");
			else
				siglas = 'default';

			if ( typeof data_partidos[siglas] == 'undefined')
			{
				siglas = 'default';
				color = data_partidos['default']['color'];
				imagen = data_partidos['default']['imagen'];
				clase = data_partidos['default']['clase'];
				nombre = partidos[partido]['SIGLAS'];
			}
			else
			{
				color = data_partidos[siglas]['color'];
				imagen = data_partidos[siglas]['imagen'];
				clase = data_partidos[siglas]['clase'];
				nombre = data_partidos[siglas]['nombre'].toUpperCase();
			}

			if (imagen == null)
			{
				imagen = data_partidos['default']['imagen'];
			}

			color_pie.push(data_partidos[siglas]['color']);

			partidos[partido]['PVOTOS'] = Math.floor(parseFloat(partidos[partido]['PVOTOS']));

			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			separador_miles = ".";
			resulta = partidos[partido]['VOTOS'].toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partidos[partido]['VOTOS'] = resulta;

			if (partidos[partido][tipo_escano] > 0 || (partidos[partido][tipo_escano] >= 0 && ceros == true))
			{

				var diferencia = wgi_diferenciaPartidoAnt(partido, partidos, partidos_ant, tipo_escano, lugar);

				tbl_html += '<tr>';

				if (mostrar_nombres_partidos)
				{
					tbl_html += '<td class="nombre_partido"><img src="' + imagen + '" alt="' + siglas + '" />' + nombre + '</td>';
				}
				else
				{
					tbl_html += '<td class="nombre_partido"><img src="' + imagen + '" alt="' + siglas + '" /></td>';
				}
				tbl_html += '<td class="' + siglas + '">' + partidos[partido][tipo_escano] + ' <span class="diferencia ' + diferencia.clase + '">' + diferencia.cantidad + '</span></td>';
				tbl_html += '<td class="' + siglas + ' a_right">' + partidos[partido]['PVOTOS'] + '</td>';
				tbl_html += '<td class="' + siglas + ' a_right">' + partidos[partido]['VOTOS'] + '</td>';
				tbl_html += '</tr>';

			}
		}
	}
	tbl_html += '</table>';

	$(container).html(tbl_html);
};

var wgi_pintar_tabla_peque = function(lugar, data, container, tipo_escano, tipo_eleccion)
{
	if ( typeof tipo_eleccion != null)
	{
		var prov_data = wgi_getDataOfAutonomicas(lugar, data);
	}
	else
	{
		var prov_data = wgi_getDataOf(lugar, data);
	}

	if (prov_data)
	{
		var partidos = prov_data.partidos, partidos_ant = prov_data.partidos_ant;
	}

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	var tbl_html = '<table cellpadding="3" cellspacing="0" class="wgi_tabla_resultados_municipales_2015">';
	tbl_html += '<tr>';

	if (tipo_escano == 'CONCEJALES')
	{
		tbl_html += '<th scope="col">' + elec_lang('wgi_concejales') + '</th>';
	}
	else if (tipo_escano == 'JUNTEROS')
	{
		if (lugar == 'navarra' || lugar == 'nafarroa')
		{
			tbl_html += '<th scope="col">' + elec_lang('wgi_parlamentarios') + '</th>';
		}
		else
		{
			tbl_html += '<th scope="col">' + elec_lang('wgi_junteros') + '</th>';
		}
	}
	else if (tipo_escano == 'ESCANOS')
	{
		tbl_html += '<th scope="col">' + elec_lang('wgi_parlamentarios') + '</th>';
	}

	tbl_html += '</tr>';

	var imagen;
	var siglas;

	for (var partido in partidos)
	{

		if (partidos[partido][tipo_escano] >= 0)
		{
			if (partidos[partido]['SIGLAS'] != null)
				siglas = partidos[partido]['SIGLAS'].toLowerCase().replace(/\./g, "");
			else
				siglas = 'default';

			if ( typeof data_partidos[siglas] == 'undefined')
			{
				siglas = 'default';
				imagen = data_partidos['default']['imagen'];
			}
			else
			{
				imagen = data_partidos[siglas]['imagen'];
			}

			if (imagen == null)
			{
				imagen = data_partidos['default']['imagen'];
			}

			if (partidos[partido][tipo_escano] > 0)
			{

				var diferencia = wgi_diferenciaPartidoAnt(partido, partidos, partidos_ant, tipo_escano, lugar);

				tbl_html += '<tr>';
				tbl_html += '<td class="nombre_partido"><img src="' + imagen + '" alt="' + siglas + '" class="wgi_logo_tabla_small" />' + partidos[partido][tipo_escano] + ' <span class="diferencia ' + diferencia.clase + '">' + diferencia.cantidad + '</span></td>';
				tbl_html += '</tr>';
			}

		}

	}
	tbl_html += '</table>';

	$(container).html(tbl_html);
};

var wgi_populate_pie = function(d, region, pie, width, height, radius, innerRadius, callback, legend, tipo, mayoria, tipo_escano)
{

	if (width == null)
		width = 320;
	if (height == null)
		height = 240;
	if (radius == null)
		radius = 200;
	if (innerRadius == null)
		innerRadius = radius / 3;
	callback = callback ||
	function()
	{
	};
	if (legend == null || legend == undefined)
	{
		legend = true;
	}

	tipo = tipo || 'forales';
	tipo_escano = tipo_escano || "JUNTEROS";
	tipo_elecciones = tipo;

	var params, pie_data;

	if (d && d.length == 0 || !d)
	{
		pie.loading("no_data_pie");
		return false;
	}

	var prov_data = wgi_getDataOf(region, d);

	if (prov_data == null || prov_data.partidos.length == 0 || prov_data.ESCRUTADO == '0,00')
	{
		pie.loading("no_data_pie");
		return false;
	}

	if ( typeof prov_data.partidos_ant != 'undefined')
	{
		pie_data = wgi_getPieData(prov_data.partidos, prov_data.partidos_ant, tipo_escano, tipo);
	}
	else
	{
		pie_data = wgi_getPieData(prov_data.partidos, null, tipo_escano, tipo);
	}

	if (!legend)
	{
		params =
		{
			colors : pie_data.color,
			callback : callback,
			legendheader : ucfirst(elec_lang('escanosw'))
		};
	}
	else
	{
		params =
		{
			legend : pie_data.legend,
			colors : pie_data.color,
			callback : callback,
			legendheader : ""
		};
	}

	var p = pie.semipiechart(width, height, radius, innerRadius, pie_data.serie, params);

	p.hover(function()
	{
		this[0].style.cursor = "pointer";

		if (this.label != undefined)
		{
			wgi_addTipPartido(region, d, this.label[1], tipo);
			this.stop().animate(
			{
				transform : "s0.9 0.9 " + (this.cx) + " " + (this.cy)
			}, 500, "bounce");

			if (this.label)
			{
				if (this.label[0] != undefined)
				{
					this.label[0].stop();
					this.label[0].animate(
					{
						transform : "t0,0,s1.5 1.5," + this.label[0].attrs.cx + "," + this.label[0].attrs.cy
					}, 500, "bounce");
					this.label[1].attr(
					{
						"font-weight" : 800
					});
				}
			}

		}

	}, function()
	{
		wgi_hideTip();
		this.stop().animate(
		{
			transform : ""
		}, 500, "bounce");

		if (this.label)
		{
			if (this.label[0] != undefined)
			{
				this.label[0].stop();
				this.label[0].animate(
				{
					transform : ""
				}, 500, "bounce");
				this.label[1].attr(
				{
					"font-weight" : 400
				});
			}
		}

	});

	p.move(wgi_updateTipPosition);

	var line_height_mayoria = radius - innerRadius;
	pie.path("M" + width + ",0 L" + width + "," + line_height_mayoria).attr(
	{
		"stroke-dasharray" : "-.",
		"stroke-width" : "2",
		"stroke" : "#000",
		"stroke-linecap" : "round",
		"stroke-linejoin" : "round",
		"stroke-miterlimit" : "2",
		"stroke-opacity" : "1"
	}).toFront();

	return p;
};

var wgi_populate_pie_ant = function(d, region, pie, width, height, radius, innerRadius, callback, legend, tipo, mayoria)
{

	if (width == null)
		width = 320;
	if (height == null)
		height = 240;
	if (radius == null)
		radius = 200;
	if (innerRadius == null)
		innerRadius = radius / 3;
	callback = callback ||
	function()
	{
	};
	if (legend == null || legend == undefined)
	{
		legend = true;
	}

	tipo = tipo || 'forales';
	tipo_elecciones = tipo;
	var params, pie_data;

	if (d && d.length == 0 || !d)
	{
		pie.loading("no_data_pie");
		return false;
	}

	var prov_data = wgi_getDataOf(region, d);

	if (prov_data == null || prov_data.partidos_ant.length == 0 || prov_data.ESCRUTADO == '0,00')
	{
		pie.loading("no_data_pie");
		return false;
	}

	pie_data = '';
	if ( typeof prov_data.partidos_ant != 'undefined')
	{
		pie_data = wgi_getPieData(prov_data.partidos_ant, null, null, tipo, true);
	}

	if (!legend)
	{
		params =
		{
			colors : pie_data.color,
			callback : callback,
			legendheader : ucfirst(elec_lang('escanosw'))
		};
	}
	else
	{
		params =
		{
			legend : pie_data.legend,
			colors : pie_data.color,
			callback : callback,
			legendheader : ""
		};
	}

	var p = pie.semipiechart(width, height, radius, innerRadius, pie_data.serie, params);

	p.hover(function()
	{
		this[0].style.cursor = "pointer";

		if (this.label != undefined)
		{
			wgi_addTipPartido(region, d, this.label[1], tipo, true);
			this.stop().animate(
			{
				transform : "s0.9 0.9 " + (this.cx) + " " + (this.cy)
			}, 500, "bounce");

			if (this.label)
			{
				if (this.label[0] != undefined)
				{
					this.label[0].stop();
					this.label[0].animate(
					{
						transform : "t0,0,s1.5 1.5," + this.label[0].attrs.cx + "," + this.label[0].attrs.cy
					}, 500, "bounce");
					this.label[1].attr(
					{
						"font-weight" : 800
					});
				}
			}

		}

	}, function()
	{
		wgi_hideTip();
		this.stop().animate(
		{
			transform : ""
		}, 500, "bounce");

		if (this.label)
		{
			if (this.label[0] != undefined)
			{
				this.label[0].stop();
				this.label[0].animate(
				{
					transform : ""
				}, 500, "bounce");
				this.label[1].attr(
				{
					"font-weight" : 400
				});
			}
		}

	});

	p.move(wgi_updateTipPosition);

	var line_height_mayoria = radius - innerRadius;
	pie.path("M" + width + ",0 L" + width + "," + line_height_mayoria).attr(
	{
		"stroke-dasharray" : "-.",
		"stroke-width" : "2",
		"stroke" : "#000",
		"stroke-linecap" : "round",
		"stroke-linejoin" : "round",
		"stroke-miterlimit" : "2",
		"stroke-opacity" : "1"
	}).toFront();

	return p;
};

var wgi_getPieData = function(partidos, partidos_ant, tipo_escano, tipo_eleccion, es_ant)
{

	tipo_escano = tipo_escano || "JUNTEROS";

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;

		if (es_ant)
		{
			var data_partidos = data_partidos_j_ant;
		}

	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;

		if (es_ant)
		{
			var data_partidos = data_partidos_m_ant;
		}
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;

		if (es_ant)
		{
			var data_partidos = data_partidos_a_ant;
		}
	}
	else if (tipo_eleccion == "autonomicas_cav")
	{
		getDataPartidos("ac", wgi_anio_autonomicas_cav_ant, wgi_anio_autonomicas_cav_ant);
		var data_partidos = data_partidos_a_cav_ant;
	}

	var serie_pie = new Array();
	var legend_pie = new Array();
	var color_pie = new Array();

	var color;
	var imagen;
	var siglas;
	var clase;
	var pvotos;

	for (var partido in partidos)
	{

		if (es_ant && partidos[partido].VISIBLE == 0)
		{
			continue;
		}

		if (partidos[partido][tipo_escano] >= 0)
		{

			if (partidos[partido]['SIGLAS'] != null)
			{
				//siglas=partidos[partido]['SIGLAS'].toLowerCase().replace(/\./g, "");
				siglas = partidos[partido]['SIGLAS'].toLowerCase();
			}
			else
				siglas = 'default';
			if ( typeof data_partidos[siglas] == 'undefined')
			{
				siglas = 'default';
				color = data_partidos['default']['color'];
				imagen = data_partidos['default']['imagen'];
				clase = data_partidos['default']['clase'];
				nombre = partidos[partido]['SIGLAS'];
			}
			else
			{
				color = data_partidos[siglas]['color'];
				imagen = data_partidos[siglas]['imagen'];
				clase = data_partidos[siglas]['clase'];
				nombre = data_partidos[siglas]['nombre'];
			}

			if (color == null)
			{
				color = data_partidos['default']['color'];
			}

			if (partidos[partido][tipo_escano] > 0)
			{
				serie_pie.push(parseInt(partidos[partido][tipo_escano]));
				legend_pie.push("### " + partidos[partido]['SIGLAS'].replace(/\./g, ""));
				color_pie.push(color);
			}

			partidos[partido]['PVOTOS'] = Math.floor(parseFloat(partidos[partido]['PVOTOS']));
			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			separador_miles = ".";
			resulta = partidos[partido]['VOTOS'].toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partidos[partido]['VOTOS'] = resulta;
		}
	}

	for (var partido in partidos_ant)
	{
		if (partidos_ant[partido][tipo_escano] >= 0)
		{
			// serie_pie.push(parseInt(partidos_ant[partido]['JUNTEROS']));
			legend_pie.push("### " + partidos_ant[partido]['SIGLAS'].replace(/\./g, ""));
			if (partidos_ant[partido]['SIGLAS'] != null)
			{
				//siglas=partidos_ant[partido]['SIGLAS'].toLowerCase().replace(/\./g, "");
				siglas = partidos_ant[partido]['SIGLAS'].toLowerCase();
			}
			else
				siglas = 'default';
			siglas2 = siglas;
			if ( typeof data_partidos[siglas] == 'undefined')
			{
				siglas2 = siglas;
				siglas = 'default';

				color = data_partidos['default']['color'];
				imagen = data_partidos['default']['imagen'];
				clase = data_partidos['default']['clase'];
				nombre = partidos_ant[partido]['SIGLAS'];
			}
			else
			{
				color = data_partidos[siglas]['color'];
				imagen = data_partidos[siglas]['imagen'];
				clase = data_partidos[siglas]['clase'];
				nombre = data_partidos[siglas]['nombre'];
			}
			color_pie.push(data_partidos[siglas]['color']);
			partidos_ant[partido]['PVOTOS'] = Math.floor(parseFloat(partidos_ant[partido]['PVOTOS']));
			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			separador_miles = ".";
			resulta = partidos_ant[partido]['VOTOS'].toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partidos_ant[partido]['VOTOS'] = resulta;
		}
	}

	return {
		serie : serie_pie,
		legend : legend_pie,
		color : color_pie
	};
};

var wgi_populate_bar = function(data, region, bar, callback, tipo_escano, mostrar_col_escanos, container, tipo_eleccion)
{

	if (data && data.length == 0 || !data)
	{
		bar.loading('no_data');
		return false;
	}

	tipo_eleccion = tipo_eleccion || "forales";

	var bar_data = wgi_getBarData(data, tipo_escano, mostrar_col_escanos, tipo_eleccion);
	if (bar_data.serie.length == 0)
	{
		bar.loading('no_data');
		return false;
	}

	if ($(container))
	{
		$(container).html(bar_data.tbl);
	}

	var txtattr =
	{
		font : '10px Arial, sans-serif',
		fill : '#000',
		color : '#fff'
	};
	var c = bar.barchart(0, 0, 200, 220, [bar_data.serie],
	{
		region : region,
		data : data,
		colors : bar_data.colors,
		type : 'square',
		callback : callback,
		gutter : '100%'
	});

	c.hover(wgi_addTipPartidoBar, wgi_hideTip).label(bar_data.legend, txtattr, true);
	c.move(wgi_updateTipPosition);

	return c;
};

var wgi_getBarData = function(data, tipo_escano, mostrar_col_escanos, tipo_eleccion)
{
	var serie_bar = new Array();
	var legend_bar = new Array();
	var colors = new Array();

	var serie_bar_ant = new Array();
	var legend_bar_ant = new Array();
	var colors_ant = new Array();

	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	var tbl = '<table cellpadding="3" cellspacing="0" id="r_mun_2015" class="wgi_tabla_resultados_municipales_2015">';
	tbl += '<tr>';
	tbl += '<th scope="col">&nbsp;</th>';
	if (mostrar_col_escanos)
	{
		if (tipo_escano == 'CONCEJALES')
		{
			tbl += '<th scope="col">' + elec_lang('wgi_concejales') + '</th>';
		}
		else
		{
			tbl += '<th scope="col">' + elec_lang('wgi_junteros') + '</th>';
		}
	}
	tbl += '<th scope="col" class="porcentaje">%</th><th scope="col">' + elec_lang('voto_tabla') + '</th>';
	tbl += '</tr>';
	tbl += '%CONT%</table>';
	var tbl_html = '';
	var color;
	var imagen;
	var siglas;
	var clase;
	var pvotos;

	for (var partido in data.partidos)
	{
		if (serie_bar.length >= 10)
		{
			continue;
		}

		pvotos = parseInt(data.partidos[partido]['VOTOS']);

		if (pvotos > 0)
		{
			serie_bar.push(pvotos);
		}

		legend_bar.push(data.partidos[partido]['SIGLAS']);
		//siglas=data.partidos[partido]['SIGLAS'].toLowerCase().replace(/\./g, "");
		siglas = data.partidos[partido]['SIGLAS'].toLowerCase();
		if ( typeof data_partidos[siglas] == 'undefined')
		{
			siglas = 'default';
			color = data_partidos['default']['color'];
			imagen = data_partidos['default']['imagen'];
			nombre = data.partidos[partido]['SIGLAS'];
			clase = data_partidos['default']['clase'];
		}
		else
		{
			color = data_partidos[siglas]['color'];
			imagen = data_partidos[siglas]['imagen'];
			nombre = data_partidos[siglas]['nombre'];
			clase = data_partidos[siglas]['clase'];
		}

		if (color == null)
		{
			color = data_partidos['default']['color'];
		}
		if (imagen == null)
		{
			imagen = data_partidos['default']['imagen'];
		}

		colors.push(color);

		//data.partidos[partido]['PVOTOS']=Math.floor(parseFloat(data.partidos[partido]['PVOTOS']));
		var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
		separador_miles = ".";
		resulta = data.partidos[partido]['VOTOS'].toString();
		while (miles.test(resulta))
		{
			resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
		}
		data.partidos[partido]['VOTOS'] = resulta;

		tbl_html += '<tr>';
		tbl_html += '<td class="nombre_partido"><img src="' + imagen + '" alt="' + siglas + '" /> ' + nombre + '</td>';
		if (mostrar_col_escanos)
		{
			tbl_html += '<td class="' + siglas + '">' + data.partidos[partido][tipo_escano] + '</td>';
		}
		tbl_html += '<td class="' + siglas + '">' + data.partidos[partido]['PVOTOS'] + '</td>';
		tbl_html += '<td class="linea_tabla ' + siglas + '">' + data.partidos[partido]['VOTOS'] + '</td>';
		tbl_html += '</tr>';
	}

	return {
		serie : serie_bar,
		legend : legend_bar,
		colors : colors,
		tbl : tbl.replace('%CONT%', tbl_html),
		total : Math.max.apply(Math, serie_bar),
		serie_ant : serie_bar_ant,
		legend_ant : legend_bar_ant,
		colors_ant : colors_ant,
		total_ant : Math.max.apply(Math, serie_bar_ant)
	};
};

var wgi_addTipPartidoBar = function(region, data, label)
{
	region = this.paper.getRegion(), data = this.paper.getData(), label = this.prev;

	if ( typeof (label) != 'string')
		label = wgi_getSiglasFromLabel(label);

	wgi_tipHtml = wgi_htmlPartidoBar(wgi_getDataOfParty(label, wgi_getDataOf(region, data)));

	wgi_tip.stop();
	wgi_tip.html(wgi_tipHtml);
	wgi_tip.css(
	{
		'display' : 'block'
	});
	wgi_tip.animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_htmlPartidoBar = function(partido)
{

	var html = '';
	if ( typeof partido.PVOTOS != 'undefined')
	{
		var html = '<div class="wgi_partido_tip">';
		var pvotos = partido.PVOTOS;
		if (pvotos == 0)
			pvotos = partido.PVOTOS;
		if (wgi_lang_pg == 'eu')
		{
			html += "<p>%" + pvotos + "</p>";
		}
		else
		{
			html += "<p>" + pvotos + "%</p>";
		}
		html += "</div>";
	}

	return html;
};

var hay_elecciones_autonomicas = function(comunidad)
{
	var wgi_comunidades_sin_autonomicas = ['eae', 'catalunya', 'galicia', 'andalucia'];

	if ($.inArray(comunidad, wgi_comunidades_sin_autonomicas) !== -1)
	{
		return false;
	}
	return true;
};

var wgi_populate_mun_autonomicas = function(data, R, municipios, callback, events)
{
	var current = null, color, siglas;
	callback = callback ||
	function()
	{
	};
	if (data == null || data.length == 0 || data[0].partidos.length == 0)
	{
		//R.loading('no_data');
		//return false;
	}

	getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
	var data_partidos = data_partidos_a;

	for (var nombre in municipios)
	{
		var tmp = nombre.split("_");

		if (tmp[0] == 'terreno')
			continue;
		if (nombre == 'canarias_borde')
			continue;

		(function(objeto, mun)
		{
			objeto[0].style.cursor = "pointer";

			objeto.data = wgi_getDataOfAutonomicas(nombre, data);
			//console.log(nombre);
			//console.log(objeto.data);

			var strokeColor = "#fff";

			if (!hay_elecciones_autonomicas(nombre))
			{
				color = "#f0f0f0";
				strokeColor = "#000";
			}
			else
			{
				if (objeto.data == null || objeto.data.PARTIDO_GANADOR == null || objeto.data.ESCRUTADO == '0,00')
				{
					color = "#fff";
					strokeColor = "#000";
					//} else if (typeof (data_partidos[siglas=objeto.data.PARTIDO_GANADOR.toLowerCase().replace(/\./g, "")]) != 'undefined') {
				}
				else if ( typeof (data_partidos[ siglas = objeto.data.PARTIDO_GANADOR.toLowerCase()]) != 'undefined')
				{
					color = data_partidos[siglas]['color'];
				}
				else
				{
					color = data_partidos['default']['color'];
				}

				/*
				 if (objeto.data!=null &&
				 objeto.data.PARTIDO_GANADOR!=null &&
				 typeof (data_partidos[siglas=objeto.data.PARTIDO_GANADOR.toLowerCase().replace(/\./g, "")]) != 'undefined')
				 {
				 color=data_partidos[siglas]['color'];
				 }else{
				 //  console.log(nombre+" "+objeto.data);
				 color=data_partidos['default']['color'];
				 }
				 */

				objeto.animate(
				{
					fill : color,
					stroke : strokeColor
				}, 500);
				objeto.originalColor = color;
			}

			//objeto.animate({fill: color, stroke: "#fff"}, 500);
			objeto.attr(
			{
				fill : color,
				stroke : strokeColor
			});
			objeto.originalColor = color;
			R.safari();

			objeto.hover(function()
			{

				if (!hay_elecciones_autonomicas(mun))
				{

					wgi_addTipMun(
					{
						NOMBRE : elec_lang("wgi_sin_elecciones"),
						NOMBRE_C : elec_lang("wgi_sin_elecciones"),
						NOMBRE_E : elec_lang("wgi_sin_elecciones")
					});

				}
				else
				{

					var clr = Raphael.rgb2hsb(objeto.originalColor);
					var strokeColor = "#666";

					if (!hay_elecciones_autonomicas(mun))
					{
						strokeColor = "#000";
					}

					if (objeto.data != null)
					{
						wgi_addTipMun(objeto.data);
						clr.b = .5;
					}

					//current && regions[current].animate({fill: "#333", stroke: "#666"}, 500);
					objeto.animate(
					{
						fill : Raphael.hsb2rgb(clr).hex,
						stroke : strokeColor
					}, 500);
				}

				R.safari();
				current = nombre;
			}, function()
			{
				wgi_hideTip();

				var strokeColor = "#fff";
				if (!hay_elecciones_autonomicas(mun))
				{
					strokeColor = "#000";
				}

				if (objeto.data != null)
				{
					objeto.animate(
					{
						fill : objeto.originalColor,
						stroke : strokeColor
					}, 500);
				}

				R.safari();
			});

			for (var ev in events)
			{
				switch (ev)
				{
					case 'click':
						objeto.click(events[ev]);
						break;
					case 'mouseover':
						objeto.mouseover(events[ev]);
						break;
					case 'mouseout':
						objeto.mouseout(events[ev]);
						break;
				}
			}

			objeto.move(wgi_updateTipPosition);
		})(municipios[nombre], nombre);
	}

	callback.call();
};

var wgi_pintar_leyenda_provincia = function(provincia, data, container, tipo_eleccion)
{
	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	var partidos = [];
	var partido;

	if (provincia == "navarra")
	{
		provincia = "nafarroa";
	}

	for (var index in data)
	{

		var nombreMunicipio = wgi_Utf8.decode(data[index].NOMBRE);
		nombreMunicipio = nombreMunicipio.replace(/\//g, "_");
		nombreMunicipio = wgi_limpiarMunicipio(nombreMunicipio);
		var provinciaMunicipio = wgi_getHerrialde(nombreMunicipio);

		if (provinciaMunicipio != provincia)
		{
			continue;
		}

		if (data[index].PARTIDO_GANADOR == null)
		{
			continue;
		}

		var partido_siglas = data[index].PARTIDO_GANADOR;
		var partido_color = data_partidos['default']['color'];

		if (partido_siglas && data_partidos[partido_siglas.toLowerCase()] && data_partidos[partido_siglas.toLowerCase()]['color'] != null)
		{
			partido_color = data_partidos[partido_siglas.toLowerCase()]['color'];
		}

		partido = partido_siglas;

		if ($.inArray(partido, partidos) == -1)
		{
			partidos.push(partido);
		}
	}

	wgi_pintar_leyenda(partidos, container, tipo_eleccion);

	if (partidos.length)
	{
		if (provincia == 'araba' || provincia == 'alava')
		{
			$("#" + container).css("margin-top", "-150px").css("margin-bottom", "45px");
		}
		else if (provincia == 'bizkaia')
		{
			$("#" + container).css("margin-top", "-250px").css("margin-bottom", "45px");
		}
		else if (provincia == 'gipuzkoa')
		{
			$("#" + container).css("margin-top", "-40px").css("margin-bottom", "40px");
		}
		else if (provincia == 'navarra' || provincia == 'nafarroa')
		{
			$("#" + container).css("margin-top", "-200px").css("margin-bottom", "100px");
		}
	}
};

var wgi_pintar_leyenda_cav_navarra = function(data, container)
{
	getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
	var data_partidos = data_partidos_m;

	var partidos = [];
	var partido;

	var partidos_nombres = [];
	var partido_nombre;

	for (var index in data)
	{

		if (data[index].PARTIDO_GANADOR == null)
		{
			continue;
		}

		var partido_siglas = data[index].PARTIDO_GANADOR;

		if (data_partidos[partido_siglas.toLowerCase()] == null)
		{
			continue;
		}

		var partido_color = data_partidos['default']['color'].toLowerCase();

		if (partido_siglas)
		{
			if (data_partidos[partido_siglas.toLowerCase()] && data_partidos[partido_siglas.toLowerCase()]['color'] != null)
			{
				partido_color = data_partidos[partido_siglas.toLowerCase()]['color'].toLowerCase();
			}
		}

		if (partido_color.toLowerCase() != data_partidos['default']['color'].toLowerCase())
		{
			partido = partido_siglas;
			partido_nombre = data_partidos[partido_siglas.toLowerCase()]['nombre'];
		}
		else
		{
			partido = "OTROS";
			partido_nombre = "OTROS";
		}

		if ($.inArray(partido_nombre, partidos_nombres) == -1)
		{
			partidos_nombres.push(partido_nombre);
			partidos.push(partido);
		}
	}

	wgi_pintar_leyenda(partidos, container, "municipales");

	if (partidos.length)
	{
		$("#" + container).css("margin-top", "-150px").css("margin-bottom", "75px");
	}
};

var wgi_pintar_leyenda_autonomicas = function(data, comunidades, container)
{
	getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
	var data_partidos = data_partidos_a;

	var partidos = [];
	var partido;

	for (var nombre in comunidades)
	{

		var comunidad = wgi_getDataOfAutonomicas(nombre, data);
		if ( typeof comunidad != undefined && comunidad != null)
		{

			if (comunidad.PARTIDO_GANADOR == null)
			{
				continue;
			}

			var partido_siglas = comunidad.PARTIDO_GANADOR;
			partido_siglas = partido_siglas.replace(/\./g, '');
			var partido_color = data_partidos['default']['color'];

			if (partido_siglas && data_partidos[partido_siglas.toLowerCase()] && data_partidos[partido_siglas.toLowerCase()]['color'] != null)
			{
				partido_color = data_partidos[partido_siglas.toLowerCase()]['color'];
			}

			partido = partido_siglas;

			if ($.inArray(partido, partidos) == -1)
			{
				partidos.push(partido);
			}

		}
	}

	wgi_pintar_leyenda(partidos, container, "autonomicas");
};

var wgi_pintar_leyenda = function(partidos, container, tipo_eleccion)
{
	tipo_eleccion = tipo_eleccion || "forales";

	if (tipo_eleccion == "forales")
	{
		getDataPartidos("j", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_j;
	}
	else if (tipo_eleccion == "municipales")
	{
		getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_m;
	}
	else if (tipo_eleccion == "autonomicas")
	{
		getDataPartidos("a", wgi_anio_eleccion, wgi_anio_eleccion_ant);
		var data_partidos = data_partidos_a;
	}

	partidos.sort();

	var htmlLeyenda = "<ul>";
	for (index in partidos)
	{

		var partido = partidos[index];

		if ( typeof partido == 'undefined' || typeof partido === 'function')
		{
			continue;
		}

		var color = data_partidos['default']['color'];
		var nombre = partido;

		if (partido)
		{
			if (data_partidos[partido.toLowerCase()] && data_partidos[partido.toLowerCase()]['color'] != null)
			{
				color = data_partidos[partido.toLowerCase()]['color'];
				nombre = data_partidos[partido.toLowerCase()]['nombre'].toUpperCase();
			}
		}

		htmlLeyenda += '<li><span class="wgi_color_partido" style="background-color: ' + color + ';">&nbsp;</span> ' + nombre + '</li>';
	}
	htmlLeyenda += "</ul>";

	$('#' + container).html(htmlLeyenda);
};

var wgi_pintar_leyenda_tabla_municipales = function(lugar, data, container)
{
	var data_lugar = wgi_getDataOf(lugar, data);
	if (!data_lugar)
	{
		return;
	}

	var nombre_lugar = elec_lang(lugar);
	if (lugar == 'eae')
	{
		nombre_lugar = elec_lang('cav');
	}

	getDataPartidos("m", wgi_anio_eleccion, wgi_anio_eleccion_ant);
	var data_partidos = data_partidos_m;

	var tbl_html = '<table cellpadding="3" cellspacing="0">';

	tbl_html += '<thead>';
	tbl_html += '<tr>';
	tbl_html += '<th colspan="2" class="a_left wig_leyenda_cabecera">' + nombre_lugar + '</th>';
	tbl_html += '</tr>';
	tbl_html += '<tr>';
	tbl_html += '<th class="a_left wig_leyenda_cabecera_sub">' + elec_lang('wig_partido') + '</th>';
	tbl_html += '<th class="a_right wig_leyenda_cabecera_sub">' + elec_lang('wgi_concejales') + '</th>';
	tbl_html += '</tr>';
	tbl_html += '</thead>';

	tbl_html += '<tbody>';

	for (index in data_lugar.partidos)
	{

		var partido = data_lugar.partidos[index];
		if (partido.CONCEJALES == null || partido.CONCEJALES < 20)
		{
			continue;
		}

		var color = data_partidos['default']['color'];
		var siglas = partido['SIGLAS'];
		var nombre = siglas;

		if (partido)
		{
			if (data_partidos[siglas.toLowerCase()] && data_partidos[siglas.toLowerCase()]['color'] != null)
			{
				color = data_partidos[siglas.toLowerCase()]['color'];
				nombre = data_partidos[siglas.toLowerCase()]['nombre'].toUpperCase();
			}
		}

		tbl_html += '<tr>';
		tbl_html += '<td><span class="wgi_color_partido" style="background-color: ' + color + ';">&nbsp;</span> ' + nombre + '</td>';
		tbl_html += '<td class="a_right">' + partido.CONCEJALES + '</td>';
		tbl_html += '</tr>';
	}

	tbl_html += '</tbody>';
	tbl_html += '</table>';

	$('#' + container).append(tbl_html);
};

var wgi_getUrlVer = function(params)
{
	if (params[1] == "nafarroa" || params[1] == "navarra")
	{
		var url_ver = EITB.constants.server + "/{0}/" + elec_lang('url_elecciones') + "/{1}/{3}/";
	}
	else
	{
		var url_ver = EITB.constants.server + "/{0}/" + elec_lang('url_elecciones') + "/{1}/{2}/{3}/";
	}

	elidiomabuscador = get_idioma();
	if (elidiomabuscador == "en" || elidiomabuscador == "fr")
		elidiomabuscador = "es";

	return url_ver.format(elidiomabuscador, params[0], params[1], params[2]);
};

var wgi_getDataOf = function(region, data)
{
	switch (region)
	{
		case 'guipuzkoa':
			region = 'gipuzkoa';
			break;
		case 'alava':
			region = 'araba';
			break;
	}

	//para lo que viene codificado

	if (data['NOMBRE'] != undefined && data['NOMBRE'] != "")
	{
		el_municipio = wgi_Utf8.decode(data['NOMBRE']);
		el_municipio2 = wgi_limpiarMunicipio(el_municipio);
		//el_municipio2=el_municipio2.replace(/\_/g, '/');
		//el_municipio2=el_municipio2.replace(/\-/g, '/');
		el_municipio2 = el_municipio2.replace(/\-/g, '_');
	}
	//   alert(el_municipio2+"-"+region);

	// if (data!= null && typeof data['NOMBRE'] != 'undefined' && (data['NOMBRE'].toLowerCase() == region || wgi_limpiarMunicipio(data['NOMBRE']) == region || wgi_limpiarMunicipio(data['NOMBRE']) == region ))
	if (data != null && typeof data['NOMBRE'] != 'undefined' && (data['NOMBRE'].toLowerCase() == region || wgi_limpiarMunicipio(data['NOMBRE']) == region || wgi_limpiarMunicipio(data['NOMBRE']) == region || wgi_limpiarMunicipio(el_municipio) == region || el_municipio2.toLowerCase() == region.toLowerCase() ))
		return data;

	for (var regdata in data )
	{
		if (data[regdata]['NOMBRE'] == null)
			continue;
		var nombre = wgi_limpiarMunicipio(wgi_Utf8.decode(data[regdata]['NOMBRE']));
		nombre = nombre.replace(/\-/g, '_');
		if (nombre == region)
		{

			return data[regdata];
		}
	}
	return null;
};

String.prototype.format = function()
{
	var formatted = this;
	for (var i = 0; i < arguments.length; i++)
	{
		var regexp = new RegExp('\\{' + i + '\\}', 'gi');
		formatted = formatted.replace(regexp, arguments[i]);
	}
	return formatted;
};

var ucfirst = function(string)
{
	return string.charAt(0).toUpperCase() + string.slice(1);
};

var wgi_limpiarMunicipio = function(mun)
{
	var nombre = mun.toLowerCase();

	//nombre = nombre.replace(/ /g, "_");
	nombre = nombre.replace(/ /g, "-");
	//nombre = nombre.replace(/-/g, "_");
	nombre = nombre.replace(/\//g, "-");
	//nombre = nombre.replace(/\//g, "_");
	nombre = nombre.replace(/ñ/g, "n");
	nombre = nombre.replace(/á/g, "a");
	nombre = nombre.replace(/é/g, "e");
	nombre = nombre.replace(/í/g, "i");
	nombre = nombre.replace(/ó/g, "o");
	nombre = nombre.replace(/ú/g, "u");
	nombre = nombre.replace(/ü/g, "u");
	//nombre = nombre.replace(/\(/g, "_");
	nombre = nombre.replace(/\(/g, "-");
	//nombre = nombre.replace(/\)/g, "_");
	nombre = nombre.replace(/\)/g, "-");

	return nombre;
};

var wgi_Utf8 =
{
	// public method for url encoding
	encode : function(string)
	{
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++)
		{

			var c = string.charCodeAt(n);

			if (c < 128)
			{
				utftext += String.fromCharCode(c);
			}
			else if ((c > 127) && (c < 2048))
			{
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else
			{
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// public method for url decoding
	decode : function(utftext)
	{
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		if (utftext == null)
		{
			utftext = '';
		}

		while (i < utftext.length)
		{

			c = utftext.charCodeAt(i);

			if (c < 128)
			{
				string += String.fromCharCode(c);
				i++;
			}
			else if ((c > 191) && (c < 224))
			{
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else
			{
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
};

var reverseProv = function(prov)
{
	switch (prov)
	{
		case 'guipuzkoa':
			return 'gipuzkoa';
			break;
		case 'alava':
			return 'araba';
			break;
		case 'navarra':
			return 'nafarroa';
			break;
		default:
			return prov;
	}
};

var wgi_getHerrialde = function(municipio)
{
	municipio = municipio.replace(/-/g, "_");

	if ($.isEmptyObject(wgi_Municipios))
	{
		getMunicipios();
	}

	if ( municipio in wgi_Municipios['araba'])
	{
		return 'araba';
	}
	if ( municipio in wgi_Municipios['bizkaia'])
	{
		return 'bizkaia';
	}
	if ( municipio in wgi_Municipios['gipuzkoa'])
	{
		return 'gipuzkoa';
	}
	if ( municipio in wgi_Municipios['nafarroa'])
	{
		return 'nafarroa';
	}
	return 'araba';
};

var wgi_reverseProv = function(prov)
{
	switch (prov)
	{
		case 'guipuzkoa':
			return 'gipuzkoa';
			break;
		case 'alava':
			return 'araba';
			break;
		case 'navarra':
			return 'nafarroa';
			break;
		default:
			return prov;
	}
};

var getMunicipios = function()
{
	var idioma = get_idioma();

	if (EITB.constants.server == "http://eitb.local")
	{
		var wgi_lista_municipios = "/resources/js/elecciones/wgi_datos_lista_municipios_" + idioma + ".json";
	}
	else
	{
		var wgi_lista_municipios = "/es/get/elecciones/json_municipios/idioma/" + idioma + "/";
	}

	if ($.isEmptyObject(wgi_Municipios))
	{

		$.ajax(
		{
			async : false,
			url : wgi_lista_municipios,
			dataType : "json",
			success : function(data)
			{
				/*
				 var tmp = {};
				 for (var provincia in data) {
				 tmp[provincia] = {};
				 for (var municipio in data[provincia]) {
				 var new_municipio = wgi_limpiarMunicipio(municipio);
				 tmp[provincia][new_municipio] = data[provincia][municipio];
				 }
				 }
				 wgi_Municipios = tmp;
				 */

				wgi_Municipios = data;
			}
		});
	}

};

function encode_utf8(s)
{
	return unescape(encodeURIComponent(s));
}

function decode_utf8(s)
{
	return decodeURIComponent(escape(s));
}

// Yeah...
var getDataPartidos = function(t, anio, anio_ant)
{

	t = t || "j";
	// Forales
	anio = anio || wgi_anio_eleccion;
	anio_ant = anio_ant || wgi_anio_eleccion_ant;

	var tipo = t;
	if (t == "ac")
	{
		tipo = "a";
	}

	if (EITB.constants.server == "http://eitb.local")
	{
		var wgi_lista_partidos = "/resources/js/elecciones/wgi_datos_lista_partidos_" + tipo + "_" + anio + ".json";
	}
	else
	{
		var wgi_lista_partidos = "/es/get/elecciones/json_partidos/tipo/" + tipo + "/urte/" + anio + "/";
	}

	if (EITB.constants.server == "http://eitb.local")
	{
		var wgi_lista_partidos_ant = "/resources/js/elecciones/wgi_datos_lista_partidos_" + tipo + "_" + anio_ant + ".json";
	}
	else
	{
		var wgi_lista_partidos_ant = "/es/get/elecciones/json_partidos/tipo/" + tipo + "/urte/" + anio_ant + "/";
	}

	switch (t)
	{
		case "j":
			getDataPartidosForales(wgi_lista_partidos, wgi_lista_partidos_ant);
			break;
		case "m":
			getDataPartidosMunicipales(wgi_lista_partidos, wgi_lista_partidos_ant);
			break;
		case "a":
			getDataPartidosAutonomicas(wgi_lista_partidos, wgi_lista_partidos_ant);
			break;
		case "ac":
			getDataPartidosAutonomicasCAVAnt(wgi_lista_partidos);
			break;
	}
};

var getDataPartidosForales = function(wgi_lista_partidos, wgi_lista_partidos_ant)
{

	if ($.isEmptyObject(data_partidos_j))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_j[sigla] = partido;
				}
			}
		});
	}

	if ($.isEmptyObject(data_partidos_j_ant))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos_ant,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_j_ant[sigla] = partido;
				}
			}
		});
	}
};

var getDataPartidosMunicipales = function(wgi_lista_partidos, wgi_lista_partidos_ant)
{

	if ($.isEmptyObject(data_partidos_m))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_m[sigla] = partido;
				}
			}
		});
	}

	if ($.isEmptyObject(data_partidos_m_ant))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos_ant,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_m_ant[sigla] = partido;
				}
			}
		});
	}
};

var getDataPartidosAutonomicas = function(wgi_lista_partidos, wgi_lista_partidos_ant)
{

	if ($.isEmptyObject(data_partidos_a))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_a[sigla] = partido;
				}
			}
		});
	}

	if ($.isEmptyObject(data_partidos_a_ant))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos_ant,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_a_ant[sigla] = partido;
				}
			}
		});
	}
};

var getDataPartidosAutonomicasCAVAnt = function(wgi_lista_partidos)
{

	if ($.isEmptyObject(data_partidos_a_cav_ant))
	{
		$.ajax(
		{
			async : false,
			url : wgi_lista_partidos,
			dataType : "json",
			success : function(data)
			{

				for (var index in data)
				{

					var partido = new Array();
					partido['color'] = data[index]['COLOR'];
					partido['nombre'] = data[index]['NOMBRE'];
					partido['clase'] = data[index]['CLASE'];
					partido['logo'] = null;
					partido['imagen'] = null;
					if (data[index]['LOGO'] != null)
					{
						partido['logo'] = EITB.constants.multimedia + data[index]['LOGO'];
					}
					if (data[index]['IMAGEN'])
					{
						partido['imagen'] = EITB.constants.multimedia + data[index]['IMAGEN'];
					}
					var sigla = data[index]['SIGLA'].toLowerCase();

					data_partidos_a_cav_ant[sigla] = partido;
				}
			}
		});
	}
};

var wgi_setEscrutadoPeque = function(region, data, id)
{
	var data_t = wgi_getDataOf(region, data);
	if (data_t != null)
	{
		if (data_t.ESCRUTADO == "100,0")
		{
			data_t.ESCRUTADO = "100";
		}
		data_t.ESCRUTADO = Math.floor(parseFloat(data_t.ESCRUTADO));

		if (wgi_lang_pg == 'eu')
		{
			$("#" + id + "_percent").text("% " + data_t.ESCRUTADO);
		}
		else
		{
			$("#" + id + "_percent").text(data_t.ESCRUTADO + " %");
		}

		/*
		 var counter = 0;
		 var factor = 1;
		 var timer = setInterval(function () {
		 if (wgi_lang_pg=='eu'){
		 $("#"+id+"_percent").text("% "+counter);
		 }else{
		 $("#"+id+"_percent").text(counter+" %");
		 }
		 counter = counter + factor;
		 if (counter > data_t.ESCRUTADO) {
		 clearInterval(timer);
		 }
		 }, 20);
		 */
	}
};

var wgi_setEscrutado = function(region, data, id)
{
	var data_t = wgi_getDataOf(region, data);
	if (data_t != null)
	{
		if (data_t.ESCRUTADO == "100,0")
		{
			data_t.ESCRUTADO = "100";
		}
		data_t.ESCRUTADO = Math.floor(parseFloat(data_t.ESCRUTADO));

		$("#" + id).css('width', '0');
		$("#" + id).animate(
		{
			width : data_t.ESCRUTADO + "%"
		}, 3000, 'swing');

		/*
		 var counter = 0;
		 var factor = 1;
		 var timer = setInterval(function () {
		 if (wgi_lang_pg=='eu'){
		 $("#"+id+"_percent").text("% "+counter);
		 }else{
		 $("#"+id+"_percent").text(counter+" %");
		 }
		 counter = counter + factor;
		 if (counter > data_t.ESCRUTADO) {
		 clearInterval(timer);
		 }
		 }, 20);
		 */

		if (wgi_lang_pg == 'eu')
		{
			$("#" + id + "_percent").text("% " + data_t.ESCRUTADO);
		}
		else
		{
			$("#" + id + "_percent").text(data_t.ESCRUTADO + " %");
		}

		/*
		 if (wgi_lang_pg=='eu'){
		 $("#"+id).text("% "+data_t.ESCRUTADO);
		 }else{
		 $("#"+id).text(data_t.ESCRUTADO+" %");
		 }
		 */
	}
	else if (region == 'eae')
	{
		if (data != null)
		{
			if (wgi_getDataOf('araba', data).ESCRUTADO != null)
			{
				var data_a = parseFloat(wgi_getDataOf('araba', data).ESCRUTADO.replace(/,/g, "."));
			}
			if (wgi_getDataOf('bizkaia', data).ESCRUTADO != null)
			{
				var data_b = parseFloat(wgi_getDataOf('bizkaia', data).ESCRUTADO.replace(/,/g, "."));
			}
			if (wgi_getDataOf('gipuzkoa', data).ESCRUTADO != null)
			{
				var data_g = parseFloat(wgi_getDataOf('gipuzkoa', data).ESCRUTADO.replace(/,/g, "."));
			}
			if (data_a != null && data_b != null && data_g != null)
			{
				var escrutado_cav = (data_a + data_b + data_g) / 3;
				if (wgi_lang_pg == 'eu')
				{
					$("#" + id).text("%" + escrutado_cav);
				}
				else
				{
					$("#" + id).text(escrutado_cav + "%");
				}
			}
		}

	}
};

var wgi_setParticipacionPeque = function(region, data, id)
{
	var data_t = wgi_getDataOf(region, data);

	if (data_t != null)
	{

		if (!isNaN(parseFloat(data_t.ABSTENCION)))
		{
			var participacion = 100 - parseInt(data_t.ABSTENCION);
			participacion = Math.floor(participacion);

			if (wgi_lang_pg == 'eu')
			{
				$("#" + id + "_percent").text("% " + participacion);
			}
			else
			{
				$("#" + id + "_percent").text(participacion + " %");
			}

			/*
			 var counter = 0;
			 var factor = 1;
			 var timer = setInterval(function () {
			 if (wgi_lang_pg=='eu'){
			 $("#"+id+"_percent").text("% "+counter);
			 }else{
			 $("#"+id+"_percent").text(counter+" %");
			 }
			 counter = counter + factor;
			 if (counter > participacion) {
			 clearInterval(timer);
			 }
			 }, 20);
			 */

		}
		else
		{
			var participacion = '--';
			$("#" + id + "_percent").text(participacion);
		}
	}
};

var wgi_setParticipacion = function(region, data, id)
{
	var data_t = wgi_getDataOf(region, data);

	if (data_t != null)
	{

		if (!isNaN(parseFloat(data_t.ABSTENCION)))
		{
			var participacion = 100 - parseInt(data_t.ABSTENCION);
			participacion = Math.floor(participacion);

			/*
			 $("#"+id).css('width', '0');
			 $("#"+id).animate({
			 width:participacion+"%"
			 },3000,'swing');
			 */

			/*
			 var counter = 0;
			 var factor = 1;
			 var timer = setInterval(function () {
			 if (wgi_lang_pg=='eu'){
			 $("#"+id+"_percent").text("% "+counter);
			 }else{
			 $("#"+id+"_percent").text(counter+" %");
			 }
			 counter = counter + factor;
			 if (counter > participacion) {
			 clearInterval(timer);
			 }
			 }, 20);
			 */

			if (wgi_lang_pg == 'eu')
			{
				$("#" + id).text("% " + participacion);
			}
			else
			{
				$("#" + id).text(participacion + " %");
			}

		}
		else if (data_t.ABSTENCION)
		{
			var participacion = '--';

			/*
			 $("#"+id).animate({
			 width:"0%"
			 },3000,'swing');

			 $("#"+id+"_percent").text(participacion);
			 */

			$("#" + id).text(participacion);

		}

	} /*else if (region=='eae'){
	 var data_a=100-parseFloat(wgi_getDataOf('araba',data).ABSTENCION.replace(/,/g, "."));
	 var data_b=100-parseFloat(wgi_getDataOf('bizkaia',data).ABSTENCION.replace(/,/g, "."));
	 var data_g=100-parseFloat(wgi_getDataOf('gipuzkoa',data).ABSTENCION.replace(/,/g, "."));
	 if (data_a!=null && data_b!=null && data_g!=null){
	 var participacion_cav=(data_a+data_b+data_g)/3;
	 $("#"+id).animate({
	 width:participacion_cav+"%"
	 },3000,'swing');

	 participacion_cav=Math.floor(participacion_cav);
	 if (wgi_lang_pg=='eu'){
	 $("#"+id+"_percent").text("%"+participacion_cav);
	 }else{
	 $("#"+id+"_percent").text(participacion_cav+"%");
	 }
	 }
	 }*/
};

var wgi_setBlancosNulos = function(region, data, id, tipo)
{
	var data_t = wgi_getDataOf(region, data);

	if (data_t != null)
	{

		$("#wgi_nulos_votos_" + id).text(data_t.NULOS);
		$("#wgi_blancos_votos_" + id).text(data_t.BLANCOS);

		var pnulos = data_t.PNULOS;
		var pblancos = data_t.PBLANCOS;

		if (wgi_lang_pg == 'eu')
		{
			$("#wgi_nulos_percent_" + id).text("% " + pnulos);
			$("#wgi_blancos_percent_" + id).text("% " + pblancos);
		}
		else
		{
			$("#wgi_nulos_percent_" + id).text(pnulos + " %");
			$("#wgi_blancos_percent_" + id).text(pblancos + " %");
		}
	}
};

var wgi_updateTipPosition = function(e)
{
	if ( typeof e == 'undefined')
		e = window.event;
	e = jQuery.event.fix(e);
	// si no en IE8 no tenemos pageX y pageY y no se ve el tooltip
	$(wgi_tip).css(
	{
		'left' : e.pageX + 20,
		'top' : e.pageY
	});
};

var wgi_showTip = function(html)
{
	$(wgi_tip).stop();
	$(wgi_tip).html(html);
	$(wgi_tip).css("left", cX + 20).css("top", cY + 20);
	$(wgi_tip).css('display', 'block');
	$(wgi_tip).animate(
	{
		opacity : 1
	});
};

var wgi_hideTip = function()
{
	$(wgi_tip).stop();
	$(wgi_tip).fadeOut(200);
};

var wgi_getSiglasFromLabel = function(label)
{
	if (label != undefined)
	{
		var txt = label.attrs.text;
		var tmp = txt.split(/\d\s/);
		var cab = tmp.shift();

		if (tmp.length == 0)
			tmp.push(cab);
		return tmp.join(" ").toLowerCase().replace(/\./g, "");
	}

};

var wgi_getDataOfParty = function(siglas, data)
{
	for (var partido in data.partidos)
	{
		if (data.partidos[partido].SIGLAS == null)
			continue;
		if (data.partidos[partido].SIGLAS.toLowerCase().replace(/\./g, "") == siglas.toLowerCase().replace(/\./g, ""))
		{
			return data.partidos[partido];
		}
	}
	return null;
};

var wgi_getDataOfPartyAnterior = function(siglas, data)
{
	for (var partido in data.partidos_ant)
	{
		if (data.partidos_ant[partido].SIGLAS == null)
			continue;
		if (data.partidos_ant[partido].SIGLAS.toLowerCase().replace(/\./g, "") == siglas.toLowerCase().replace(/\./g, ""))
		{
			return data.partidos_ant[partido];
		}
	}
	return null;
};

var wgi_getDataOfAutonomicas = function(region, data)
{

	switch (region)
	{
		case 'guipuzkoa':
			region = 'gipuzkoa';
			break;
		case 'alava':
			region = 'araba';
			break;
		case 'castilla_mancha':
			region = 'castilla_la_mancha';
			break;
		case 'castilla_leon':
			region = 'castilla_y_leon';
			break;
	}

	region = region.replace(/_/g, " ");
	region = region.replace(/-/g, " ");

	//para lo que viene codificado

	if (data['NOMBRE'] != undefined && data['NOMBRE'] != "")
	{
		el_municipio = wgi_Utf8.decode(data['NOMBRE']);
		el_municipio2 = wgi_limpiarMunicipio(el_municipio);
		el_municipio2 = el_municipio2.replace(/\_/g, '/');
		el_municipio2 = el_municipio2.replace(/\-/g, '/');
	}

	// if (data!= null && typeof data['NOMBRE'] != 'undefined' && (data['NOMBRE'].toLowerCase() == region || wgi_limpiarMunicipio(data['NOMBRE']) == region || wgi_limpiarMunicipio(data['NOMBRE']) == region ))
	if (data != null && typeof data['NOMBRE'] != 'undefined' && (data['NOMBRE'].toLowerCase() == region || wgi_limpiarMunicipio(data['NOMBRE']) == region || wgi_limpiarMunicipio(data['NOMBRE']) == region || wgi_limpiarMunicipio(el_municipio) == region || el_municipio2.toLowerCase() == region.toLowerCase() ))
	{
		return data;
	}

	for (var regdata in data )
	{
		if (data[regdata]['NOMBRE'] == null)
			continue;
		var nombre = wgi_limpiarMunicipio(wgi_Utf8.decode(data[regdata]['NOMBRE']));
		nombre = nombre.replace(/\-/g, '_');
		nombre = nombre.replace(/_/g, ' ');
		if (nombre == region)
		{
			return data[regdata];
		}
	}
	return null;
};

// Meto las customizaciones aqui porque si no no carga bien.
$(document).ready(function()
{
	if ( typeof Raphael != 'undefined')
	{
		Raphael.fn.loading = function(loading, spinner_color)
		{

			if (loading == 'no_data')
			{
				var ld = this.set();
				ld.push(
				//this.rect(0,0,this.width,this.height).attr({opacity:.8,fill:'none'}).toFront(),
				//this.text(this.width/2,this.height/2,elec_lang('sin_empezar')).attr({'font-size':'18',fill:'#000'})
				this.rect(this.width / 4, this.height / 3, this.width / 2, 50).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(this.width / 2, this.height / 3 + 25, elec_lang('sin_empezar')).attr(
				{
					'font-size' : '18',
					fill : '#fff'
				}).toFront());
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'no_data_mapa_mun')
			{
				var ld = this.set();
				ld.push(this.rect(this.width / 4, this.height / 3, this.width / 2, 50).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(this.width / 2, this.height / 3 + 25, elec_lang('sin_empezar')).attr(
				{
					'font-size' : '18',
					fill : '#fff'
				}).toFront());
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'no_data_map_small')
			{
				var ld = this.set();
				ld.push(
				//this.rect(0,0,this.width,this.height).attr({opacity:.8,fill:'none'}).toFront(),
				//this.text(this.width/2,this.height/2,elec_lang('sin_empezar')).attr({'font-size':'10',fill:'#000'})
				);
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;

			}
			else if (loading == 'no_data_pie')
			{
				var ld = this.set();

				if (!spinner_color)
				{
					spinner_color = "#fff";
				}

				ld.push(
				//new Spinner(this,30,10,10,5,spinner_color),
				this.text(this.width / 2, this.height / 2, elec_lang('sin_empezar')).attr(
				{
					'font-size' : '11',
					fill : '#000'
				}));
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'no_data_pie_small')
			{
				var ld = this.set();

				if (!spinner_color)
				{
					spinner_color = "#fff";
				}

				ld.push(
				//new Spinner(this,20,10,10,3,spinner_color),
				this.text(this.width / 2, this.height / 2, elec_lang('wgi_sin_empezar')).attr(
				{
					'font-size' : '10',
					fill : '#000',
					width : this.width
				}));
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;

			}
			else if (loading == 'sin_datos_map')
			{
				var ld = this.set();
				ld.push(this.rect(this.width / 4, this.height / 3, this.width / 2, 50).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(this.width / 2, this.height / 3 + 25, elec_lang('wgi_no_hay_datos')).attr(
				{
					'font-size' : '18',
					fill : '#fff'
				}).toFront());
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'sin_datos_pie')
			{
				var ld = this.set();

				ld.push(this.text(this.width / 2, this.height / 2, elec_lang('wgi_no_hay_datos')).attr(
				{
					'font-size' : '11',
					fill : '#000'
				}));

				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;

			}
			else if (loading == 'recargando_tarta')
			{
				var ld = this.set();

				if (!spinner_color)
				{
					spinner_color = "#fff";
				}

				ld.push(new Spinner(this, 30, 10, 10, 5, spinner_color));
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'recargando_mapa')
			{
				var ld = this.set();
				ld.push(this.rect(this.width / 4, this.height / 3, this.width / 2, 50).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(this.width / 2, this.height / 3 + 25, elec_lang("wgi_cargando_datos") + "...").attr(
				{
					'font-size' : '18',
					fill : '#fff'
				}).toFront());
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'recargando_mapa_small')
			{
				var ld = this.set();

				ld.push(this.rect(0, this.height / 3, this.width, 35).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(60, this.height / 2, elec_lang("wgi_cargando_datos") + "...").attr(
				{
					'font-size' : '10',
					fill : '#fff'
				}).toFront());
				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;
			}
			else if (loading == 'no_data_map_resumen')
			{
				var ld = this.set();

				ld.push(this.rect(0, this.height / 3, this.width, 35).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(60, this.height / 2, elec_lang("wgi_sin_empezar") + "...").attr(
				{
					'font-size' : '10',
					fill : '#fff'
				}).toFront());

				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;

			}
			else if (loading == 'sin_datos_map_resumen')
			{
				var ld = this.set();

				ld.push(this.rect(0, this.height / 3, this.width, 35).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(60, this.height / 2, elec_lang("wgi_no_hay_datos_small") + "...").attr(
				{
					'font-size' : '10',
					fill : '#fff'
				}).toFront());

				if (this.ld)
				{
					this.ld.remove();
				}
				this.ld = ld;

			}
			else if (loading == 'error')
			{
				var ld = this.set();
				ld.push(this.rect(0, 0, this.width, this.height).attr(
				{
					opacity : .8,
					fill : 'none'
				}).toFront(), this.text(this.width / 2, this.height / 2, "Error al cargar los datos. Intentelo de nuevo").attr(
				{
					'font-size' : '18',
					fill : '#000'
				}));
				this.ld.remove();
				this.ld = ld;
			}
			else if (loading)
			{
				var ld = this.set();
				ld.push(new Spinner(this, 30, 10, 10, 5, '#fff'), this.rect(this.width / 4, this.height / 3, this.width / 2, 50).attr(
				{
					opacity : .5,
					fill : '#000'
				}), this.text(this.width / 2, this.height / 3 + 25, elec_lang("cargando_resultados") + "...").attr(
				{
					'font-size' : '18',
					fill : '#fff'
				}).toFront());
				this.ld = ld;
			}
			else
			{
				var p = this;
				if (this.ld)
				{
					this.ld.animate(
					{
						opacity : 0
					}, 200, 'linear', function()
					{
						p.ld.remove();
					});
				}
			}

			return this;
		};

		var Spinner = function(holder, R1, R2, count, stroke_width, colour)
		{
			var color = colour || "#fff", width = stroke_width || 15, r1 = Math.min(R1, R2) || 35, r2 = Math.max(R1, R2) || 60, cx = holder.width / 2, cy = holder.height / 2, r = holder;

			this.sectorsCount = count || 12;
			this.sectors = holder.set();
			this.opacity = [];
			this.beta = 2 * Math.PI / this.sectorsCount, pathParams =
			{
				stroke : color,
				"stroke-width" : width,
				"stroke-linecap" : "round"
			};
			Raphael.getColor.reset();
			for (var i = 0; i < this.sectorsCount; i++)
			{
				var alpha = this.beta * i - Math.PI / 2, cos = Math.cos(alpha), sin = Math.sin(alpha);
				this.opacity[i] = 1 / this.sectorsCount * i;
				this.sectors.push(r.path([["M", cx + r1 * cos, cy + r1 * sin], ["L", cx + r2 * cos, cy + r2 * sin]]).attr(pathParams));
				if (color == "rainbow")
				{
					this.sectors[i].attr("stroke", Raphael.getColor());
				}
			}

			this.tick = function()
			{
				this.opacity.unshift(this.opacity.pop());
				for (var i = 0; i < this.sectorsCount; i++)
				{
					this.sectors[i].attr("opacity", this.opacity[i]);
				}
				r.safari();

				var p = this;
				setTimeout(function()
				{
					p.tick();

				}, 1000 / this.sectorsCount);
				return this;
			};

			this.remove = function()
			{
				this.sectors.remove();
				r.safari();

				return this;
			};
			/*this.clear = function(){
			 clearTimeout(this.tick);
			 return this;
			 };*/

			this.tick();

			return this.sectors;
		};

		// Piechart

		function SemiPieChart(ow, cx, cy, r, innerRadius, values, opts)
		{
			ow.customAttributes.segmento = function(x, y, r, innerRadius, a1, a2, color)
			{
				var ir = innerRadius || r / 3, flag = (a2 - a1) > 180, clr = (a2 - a1) / 360;

				color = color || "hsb(" + clr + ", .75, .8)";
				a1 = (a1 % 360) * Math.PI / 180;
				a2 = (a2 % 360) * Math.PI / 180;

				var cosStart = Math.cos(a1), sinStart = Math.sin(a1), cosEnd = Math.cos(a2), sinEnd = Math.sin(a2);

				return {
					'path' : [["M", x + r * cosStart, y + r * sinStart], ["A", r, r, 0, +flag, 1, x + r * cosEnd, y + r * sinEnd], ["L", x + ir * cosEnd, y + ir * sinEnd], ["A", ir, ir, 0, +flag, 0, x + ir * cosStart, y + ir * sinStart], ["z"]],
					'fill' : color
				};
			};

			function animate(ms, callback)
			{
				callback = callback ||
				function()
				{
				};
				callback.call(this);
				var start = 180, val;
				for ( i = 0; i < ii; i++)
				{
					val = 180 / total * data[i];
					paths[i].animate(
					{
						segmento : [cx, cy, r, innerRadius, start, start += val, opts.colors[i]]
					}, ms || 1500, "bounce");
					paths[i].angle = start - val / 2;
				}
			}

			opts = opts ||
			{
			};
			var data = values, paths = ow.set(), chart = ow.set(), total, start, covers = ow.set();
			//bg = ow.circle(200, 200, 0).attr({stroke: "#fff", "stroke-width": 4});
			chart.covers = covers;
			data = data.sort(function(a, b)
			{
				return b - a;
			});

			total = 0;
			for (var i = 0, ii = data.length; i < ii; i++)
			{
				total += data[i];
			}
			start = 180;
			for ( i = 0; i < ii; i++)
			{
				var val = 180 / total * data[i];
				(function(i, val)
				{
					var p = ow.path().attr(
					{
						segmento : [cx, cy, 1, 0, start, start + val, opts.colors[i]],
						stroke : "#fff"
					});
					paths.push(p);
					covers.push(p);
				})(i, val);
				start += val;
			}
			//bg.animate({r: r}, 1000, "bounce");

			animate(1000, opts.callback);

			this.animate = function(d, ms, callback)
			{
				data = d;
				data = data.sort(function(a, b)
				{
					return b - a;
				});
				total = 0;
				for (var i = 0, ii = data.length; i < ii; i++)
				{
					total += data[i];
				}
				animate(ms, callback);
			};

			this.hover = function(fin, fout)
			{
				fout = fout ||
				function()
				{
				};
				var that = this;
				for (var i = 0; i < ii; i++)
				{
					(function(sector)
					{
						sector.cx = cx;
						sector.cy = cy;
						sector.mouseout(function()
						{
							fout.call(this, cx, cy);
						});
						sector.mouseover(function()
						{
							fin.call(this, cx, cy);
						});
					})(paths[i]);
				}
				return this;
			};

			this.mouseover = function(fin)
			{
				var that = this;
				for (var i = 0; i < ii; i++)
				{
					(function(sector)
					{
						sector.cx = cx;
						sector.cy = cy;
						sector.mouseover(function()
						{
							fin.call(this, cx, cy);
						});
					})(paths[i]);
				}
				return this;
			};

			this.mouseout = function(fin)
			{
				var that = this;
				for (var i = 0; i < ii; i++)
				{
					(function(sector)
					{
						sector.cx = cx;
						sector.cy = cy;
						sector.mouseout(function()
						{
							fin.call(this, cx, cy);
						});
					})(paths[i]);
				}
				return this;
			};

			this.move = function(fin)
			{
				var that = this;
				for (var i = 0; i < ii; i++)
				{
					(function(sector)
					{
						sector.cx = cx;
						sector.cy = cy;
						sector.mousemove(function(e)
						{
							fin.apply(sector, [e]);
						});
					})(paths[i]);
				}
				return this;
			};

			// x: where label could be put
			// y: where label could be put
			// value: value to show
			// total: total number to count %
			this.each = function(f)
			{
				var that = this;
				for (var i = 0; i < ii; i++)
				{
					(function(sector)
					{
						sector.cx = cx;
						sector.cy = cy;
						f.call(sector);
					})(paths[i]);
				}
				return this;
			};
			this.click = function(f)
			{
				var that = this;
				for (var i = 0; i < ii; i++)
				{
					(function(sector)
					{
						sector.cx = cx;
						sector.cy = cy;
						sector.click(function()
						{
							f.call(this);
						});
					})(paths[i]);
				}
				return this;
			};
			this.inject = function(element)
			{
				element.insertBefore(covers[0]);
			};
			this.drawHalf = function()
			{
				var y = cy - r - 15;
				var x = cx;
				var h = r + y + 20;
				ow.path('M' + x + ',' + y + 'V' + h);

				var t = ow.text(x, y + h + 20, elec_lang("mayoria_absoluta") + " \n176 " + elec_lang("escanos"));

				return this;
			};

			var legend = function(labels, otherslabel, mark, dir)
			{
				var x = cx + r + r / 5, y = 30, h = y + 10;
				labels = labels || [];
				dir = (dir && dir.toLowerCase && dir.toLowerCase()) || "east";
				mark = ow[mark && mark.toLowerCase()] || "disc";
				chart.labels = ow.set();

				for (var i = 0; i < data.length; i++)
				{
					var clr = paths[i].attr("fill"), j = values[i].order, txt;
					values[i].others && (labels[j] = otherslabel || "Others");
					labels[j] = Raphael.g.labelise(labels[i], values[i], total);

					if (values[i] > 0)
					{
						chart.labels.push(ow.set());
						chart.labels[i].push(ow[mark](x + 5, h, 5).attr(
						{
							fill : clr,
							stroke : "none"
						}));
						chart.labels[i].push( txt = ow.text(x + 20, h, labels[j] || values[i]).attr(Raphael.g.txtattr).attr(
						{
							fill : opts.legendcolor || "#000",
							"text-anchor" : "start"
						}));
						covers[i].label = chart.labels[i];
					}
					h += txt.getBBox().height * 1.2;
				}
				var bb = chart.labels.getBBox(), tr = {
				east: [0, 0],
				west: [-bb.width - 2 * r - 20, -bb.height / 2],
				north: [-r - bb.width / 2, -r - bb.height - 10],
				south: [-r - bb.width / 2, r + 10]
				}[dir];
				chart.labels.translate.apply(chart.labels, tr);
				chart.push(chart.labels);

				if (opts.legendheader)
				{
					txt = ow.text(x + 20, 10, opts.legendheader).attr(Raphael.g.txtattr).attr(
					{
						fill : opts.legendcolor || "#000",
						"text-anchor" : "start"
					});
					ow.path('M' + x + ',' + 25 + 'H' + (x + 140));

				}
			};
			if (opts.legend)
			{
				legend(opts.legend, opts.legendothers, opts.legendmark, opts.legendpos);
			}
			//this.push(paths, covers);
			this.covers = covers;
			return this;
		};

		//inheritance
		var F = function()
		{
		};
		F.prototype = Raphael.g;
		SemiPieChart.prototype = SemiPieChart.prototype = new F;

		Raphael.fn.semipiechart = function(cx, cy, r, innerRadius, values, opts)
		{
			return new SemiPieChart(this, cx, cy, r, innerRadius, values, opts);
		};

		// Barchart

		var mmin = Math.min, mmax = Math.max;

		function finger(x, y, width, height, dir, ending, isPath, paper)
		{
			var path, ends =
			{
				round : 'round',
				sharp : 'sharp',
				soft : 'soft',
				square : 'square'
			};

			// dir 0 for horizontal and 1 for vertical
			if ((dir && !height) || (!dir && !width))
			{
				return isPath ? "" : paper.path();
			}

			ending = ends[ending] || "square";
			height = Math.round(height);
			width = Math.round(width);
			x = Math.round(x);
			y = Math.round(y);

			switch (ending)
			{
				case "round":
					if (!dir)
					{
						var r = ~~(height / 2);

						if (width < r)
						{
							r = width;
							path = ["M", x + .5, y + .5 - ~~(height / 2), "l", 0, 0, "a", r, ~~(height / 2), 0, 0, 1, 0, height, "l", 0, 0, "z"];
						}
						else
						{
							path = ["M", x + .5, y + .5 - r, "l", width - r, 0, "a", r, r, 0, 1, 1, 0, height, "l", r - width, 0, "z"];
						}
					}
					else
					{
						r = ~~(width / 2);

						if (height < r)
						{
							r = height;
							path = ["M", x - ~~(width / 2), y, "l", 0, 0, "a", ~~(width / 2), r, 0, 0, 1, width, 0, "l", 0, 0, "z"];
						}
						else
						{
							path = ["M", x - r, y, "l", 0, r - height, "a", r, r, 0, 1, 1, width, 0, "l", 0, height - r, "z"];
						}
					}
					break;
				case "sharp":
					if (!dir)
					{
						var half = ~~(height / 2);

						path = ["M", x, y + half, "l", 0, -height, mmax(width - half, 0), 0, mmin(half, width), half, -mmin(half, width), half + (half * 2 < height), "z"];
					}
					else
					{
						half = ~~(width / 2);
						path = ["M", x + half, y, "l", -width, 0, 0, -mmax(height - half, 0), half, -mmin(half, height), half, mmin(half, height), half, "z"];
					}
					break;
				case "square":
					if (!dir)
					{
						path = ["M", x, y + ~~(height / 2), "l", 0, -height, width, 0, 0, height, "z"];
					}
					else
					{
						path = ["M", x + ~~(width / 2), y, "l", 1 - width, 0, 0, -height, width - 1, 0, "z"];
					}
					break;
				case "soft":
					if (!dir)
					{
						r = mmin(width, Math.round(height / 5));
						path = ["M", x + .5, y + .5 - ~~(height / 2), "l", width - r, 0, "a", r, r, 0, 0, 1, r, r, "l", 0, height - r * 2, "a", r, r, 0, 0, 1, -r, r, "l", r - width, 0, "z"];
					}
					else
					{
						r = mmin(Math.round(width / 5), height);
						path = ["M", x - ~~(width / 2), y, "l", 0, r - height, "a", r, r, 0, 0, 1, r, -r, "l", width - 2 * r, 0, "a", r, r, 0, 0, 1, r, r, "l", 0, height - r, "z"];
					}
			}

			if (isPath)
			{
				return path.join(",");
			}
			else
			{
				return paper.path(path);
			}
		}

		/*
		 * Vertical Barchart
		 */
		function VBarchart(paper, x, y, width, height, values, opts)
		{
			opts = opts ||
			{
			};
			paper.opts = opts;

			var chartinst = this, type = opts.type || "square", gutter = parseFloat(opts.gutter || "20%"), chart = paper.set(), bars = paper.set(), covers = paper.set(), covers2 = paper.set(), total = Math.max.apply(Math, values), stacktotal = [], multi = 0, colors = opts.colors || chartinst.colors, len = values.length;

			if (Raphael.is(values[0], "array"))
			{
				total = [];
				multi = len;
				len = 0;

				for (var i = values.length; i--; )
				{
					bars.push(paper.set());
					total.push(Math.max.apply(Math, values[i]));
					len = Math.max(len, values[i].length);
				}

				if (opts.stacked)
				{
					for (var i = len; i--; )
					{
						var tot = 0;

						for (var j = values.length; j--; )
						{
							tot += +values[j][i] || 0;
						}

						stacktotal.push(tot);
					}
				}

				for (var i = values.length; i--; )
				{
					if (values[i].length < len)
					{
						for (var j = len; j--; )
						{
							values[i].push(0);
						}
					}
				}

				total = Math.max.apply(Math, opts.stacked ? stacktotal : total);
			}

			total = (opts.to) || total;

			var barwidth = width / (len * (100 + gutter) + gutter) * 100, barhgutter = barwidth * gutter / 100, barvgutter = opts.vgutter == null ? 20 : opts.vgutter, stack = [], X = x + barhgutter, Y = (height - 2 * barvgutter) / total;
			barwidth = 50;
			if (!opts.stretch)
			{
				barhgutter = Math.round(barhgutter);
				barwidth = Math.floor(barwidth);
			}

			!opts.stacked && (barwidth /= multi || 1);

			for (var i = 0; i < len; i++)
			{
				stack = [];

				opts.callback.call(this);
				for (var j = 0; j < (multi || 1); j++)
				{
					var h = Math.round(( multi ? values[j][i] : values[i]) * Y), top = y + height - barvgutter - h, bar = paper.rect(Math.round(X), height - barvgutter, barwidth, 0).attr(
					{
						stroke : "none",
						fill : colors[i]
					});
					bar.animate(
					{
						height : h,
						y : height - h - barvgutter
					}, 1500, 'bounce');
					covers.push(bar);
					//bar = finger(Math.round(X + barwidth / 2), top + h, barwidth, h, true, type, null, paper).attr({ stroke: "none", fill: colors[i] });

					if (multi)
					{
						bars[j].push(bar);
					}
					else
					{
						bars.push(bar);
					}

					bar.y = top;
					bar.x = Math.round(X + barwidth / 2);
					bar.w = barwidth;
					bar.h = h;
					bar.value = multi ? values[j][i] : values[i];

					if (!opts.stacked)
					{
						X += barwidth;
					}
					else
					{
						stack.push(bar);
					}
				}

				if (opts.stacked)
				{
					var cvr;

					covers2.push( cvr = paper.rect(stack[0].x - stack[0].w / 2, y, barwidth, height).attr(chartinst.shim));
					cvr.bars = paper.set();

					var size = 0;

					for (var s = stack.length; s--; )
					{
						stack[s].toFront();
					}

					for (var s = 0, ss = stack.length; s < ss; s++)
					{
						var bar = stack[s], cover, h = (size + bar.value) * Y, path = finger(bar.x, y + height - barvgutter - !!size * .5, barwidth, h, true, type, 1, paper);

						cvr.bars.push(bar);
						size && bar.attr(
						{
							path : path
						});
						bar.h = h;
						bar.y = y + height - barvgutter - !!size * .5 - h;
						covers.push( cover = paper.rect(bar.x - bar.w / 2, bar.y, barwidth, bar.value * Y).attr(chartinst.shim));
						cover.bar = bar;
						cover.value = bar.value;
						size += bar.value;
					}

					X += barwidth;
				}

				X += barhgutter;
			}

			covers2.toFront();
			X = x + barhgutter;

			/*if (!opts.stacked) {
			 for (var i = 0; i < len; i++) {
			 for (var j = 0; j < (multi || 1); j++) {
			 var cover;

			 covers.push(cover = paper.rect(Math.round(X), y + barvgutter, barwidth, height - barvgutter).attr(chartinst.shim));
			 cover.bar = multi ? bars[j][i] : bars[i];
			 cover.value = cover.bar.value;
			 X += barwidth;
			 }

			 X += barhgutter;
			 }
			 }*/

			chart.label = function(labels, txtattr, isBottom)
			{
				this.labels_raws = labels;
				labels = labels || [];
				txtattr = txtattr || Raphael.g.txtattr;
				this.labels = paper.set();

				var L, l = -Infinity;

				if (opts.stacked)
				{
					for (var i = 0; i < len; i++)
					{
						var tot = 0;

						for (var j = 0; j < (multi || 1); j++)
						{
							tot += multi ? values[j][i] : values[i];

							if (j == multi - 1)
							{
								var label = paper.labelise(labels[i], tot, total);

								L = paper.text(bars[i * (multi || 1) + j].x, y + height - barvgutter / 2, label).attr(txtattr).insertBefore(covers[i * (multi || 1) + j]);

								var bb = L.getBBox();

								if (bb.x - 7 < l)
								{
									L.remove();
								}
								else
								{
									this.labels.push(L);
									l = bb.x + bb.width;
								}
							}
						}
					}
				}
				else
				{
					var bajado = false;
					for (var i = 0; i < len; i++)
					{
						for (var j = 0; j < (multi || 1); j++)
						{
							var label = Raphael.g.labelise(labels[i], multi ? values[j][i] : values[i], total);

							L = paper.text(bars[0][i * (multi || 1) + j].x, isBottom ? y + height - barvgutter / 2 : bars[i * (multi || 1) + j].y - 10, label).attr(txtattr).insertBefore(covers[i * (multi || 1) + j]);

							var bb = L.getBBox();

							if (bb.x - 7 < l && bajado == false)
							{
								this.labels.push(L);
								L.attr('y', L.attr('y') + 15);
								bajado = true;
							}
							else
							{
								this.labels.push(L);
								l = bb.x + bb.width;
								bajado = false;
							}
						}
					}
				}
				return this;
			};

			chart.hover = function(fin, fout)
			{
				covers2.hide();
				covers.show();
				covers.mouseover(fin).mouseout(fout);
				return this;
			};

			chart.hoverColumn = function(fin, fout)
			{
				covers.hide();
				covers2.show();
				fout = fout ||
				function()
				{
				};
				covers2.mouseover(fin).mouseout(fout);
				return this;
			};

			chart.click = function(f)
			{
				covers2.hide();
				covers.show();
				covers.click(f);
				return this;
			};

			chart.each = function(f)
			{
				if (!Raphael.is(f, "function"))
				{
					return this;
				}
				for (var i = covers.length; i--; )
				{
					f.call(covers[i]);
				}
				return this;
			};

			chart.eachColumn = function(f)
			{
				if (!Raphael.is(f, "function"))
				{
					return this;
				}
				for (var i = covers2.length; i--; )
				{
					f.call(covers2[i]);
				}
				return this;
			};

			chart.clickColumn = function(f)
			{
				covers.hide();
				covers2.show();
				covers2.click(f);
				return this;
			};

			chart.refresh = function(data, bar_data)
			{
				var bar;
				Y = (height - 2 * barvgutter) / bar_data.total;

				for (var i = this.labels.length; i--; )
				{
					if (bar_data.legend.indexOf(this.labels[i].attrs.text) != -1)
					{
						var h = Math.round(bar_data.serie[i]) * Y;
						covers[i].animate(
						{
							height : h,
							y : height - h - barvgutter
						}, 1500, 'bounce');
					}
					else
					{
						covers[i].remove();
						this.labels[i].remove();
						covers.splice(i, 1);
						this.labels.splice(i, 1);
					}
				}

				X = x + barhgutter;
				for ( i = bar_data.legend.length; i--; )
				{
					if (this.labels_raws.indexOf(bar_data.legend[i]) == -1)
					{
						var top = y + height - barvgutter - h;
						var h = Math.round(bar_data.serie[i]) * Y;
						X = (barwidth + barhgutter) * covers.length + barhgutter;
						bar = paper.rect(Math.round(X), height - barvgutter, barwidth, 0).attr(
						{
							stroke : "none",
							fill : bar_data.colors[i]
						});
						bar.animate(
						{
							height : h,
							y : height - h - barvgutter
						}, 1500, 'bounce');
						covers.push(bar);

						bar.y = top;
						bar.x = Math.round(X + barwidth / 2);
						bar.w = barwidth;
						bar.h = h;
						bar.value = bar_data.serie[i];

						if (!opts.stacked)
						{
							X += barwidth;
						}
						else
						{
							stack.push(bar);
						}

						var label = Raphael.g.labelise(bar_data.legend[i], values[i], total);
						var txtattr =
						{
							font : '12px Arial, sans-serif',
							fill : '#000',
							color : '#fff'
						};
						L = paper.text(bar.x, y + height - barvgutter / 2, label).attr(txtattr).insertBefore(covers[i]);

						var bb = L.getBBox();
						var l = -Infinity;
						if (bb.x - 7 < l)
						{
							L.remove();
						}
						else
						{
							this.labels.push(L);
							l = bb.x + bb.width;
						}
						this.labels_raws.push(bar_data.legend[i]);
					}
				}

				paper.opts.data = data;

				this.hover(addTipPartidoBar, hideTip);
				this.move(function()
				{
					updateTipPosition();
				});

				return this;
			};

			chart.push(bars, covers, covers2);
			chart.bars = bars;
			chart.covers = covers;
			return chart;
		};

		/**
		 * Horizontal Barchart
		 */
		function HBarchart(paper, x, y, width, height, values, opts)
		{
			opts = opts ||
			{
			};

			var chartinst = this, type = opts.type || "square", gutter = parseFloat(opts.gutter || "20%"), chart = paper.set(), bars = paper.set(), covers = paper.set(), covers2 = paper.set(), total = Math.max.apply(Math, values), stacktotal = [], multi = 0, colors = opts.colors || chartinst.colors, len = values.length;

			if (Raphael.is(values[0], "array"))
			{
				total = [];
				multi = len;
				len = 0;

				for (var i = values.length; i--; )
				{
					bars.push(paper.set());
					total.push(Math.max.apply(Math, values[i]));
					len = Math.max(len, values[i].length);
				}

				if (opts.stacked)
				{
					for (var i = len; i--; )
					{
						var tot = 0;
						for (var j = values.length; j--; )
						{
							tot += +values[j][i] || 0;
						}
						stacktotal.push(tot);
					}
				}

				for (var i = values.length; i--; )
				{
					if (values[i].length < len)
					{
						for (var j = len; j--; )
						{
							values[i].push(0);
						}
					}
				}

				total = Math.max.apply(Math, opts.stacked ? stacktotal : total);
			}

			total = (opts.to) || total;

			var barheight = Math.floor(height / (len * (100 + gutter) + gutter) * 100), bargutter = Math.floor(barheight * gutter / 100), stack = [], Y = y + bargutter, X = (width - 1) / total;

			!opts.stacked && (barheight /= multi || 1);

			for (var i = 0; i < len; i++)
			{
				stack = [];

				for (var j = 0; j < (multi || 1); j++)
				{
					var val = multi ? values[j][i] : values[i], bar = finger(x, Y + barheight / 2, Math.round(val * X), barheight - 1, false, type, null, paper).attr(
					{
						stroke : "none",
						fill : colors[i]
					});

					if (multi)
					{
						bars[j].push(bar);
					}
					else
					{
						bars.push(bar);
					}

					bar.x = x + Math.round(val * X);
					bar.y = Y + barheight / 2;
					bar.w = Math.round(val * X);
					bar.h = barheight;
					bar.value = +val;

					if (!opts.stacked)
					{
						Y += barheight;
					}
					else
					{
						stack.push(bar);
					}
				}

				if (opts.stacked)
				{
					var cvr = paper.rect(x, stack[0].y - stack[0].h / 2, width, barheight).attr(chartinst.shim);

					covers2.push(cvr);
					cvr.bars = paper.set();

					var size = 0;

					for (var s = stack.length; s--; )
					{
						stack[s].toFront();
					}

					for (var s = 0, ss = stack.length; s < ss; s++)
					{
						var bar = stack[s], cover, val = Math.round((size + bar.value) * X), path = finger(x, bar.y, val, barheight - 1, false, type, 1, paper);

						cvr.bars.push(bar);
						size && bar.attr(
						{
							path : path
						});
						bar.w = val;
						bar.x = x + val;
						covers.push( cover = paper.rect(x + size * X, bar.y - bar.h / 2, bar.value * X, barheight).attr(chartinst.shim));
						cover.bar = bar;
						size += bar.value;
					}

					Y += barheight;
				}

				Y += bargutter;
			}

			covers2.toFront();
			Y = y + bargutter;

			if (!opts.stacked)
			{
				for (var i = 0; i < len; i++)
				{
					for (var j = 0; j < (multi || 1); j++)
					{
						var cover = paper.rect(x, Y, width, barheight).attr(chartinst.shim);

						covers.push(cover);
						cover.bar = multi ? bars[j][i] : bars[i];
						cover.value = cover.bar.value;
						Y += barheight;
					}

					Y += bargutter;
				}
			}

			chart.label = function(labels, isRight)
			{
				labels = labels || [];
				this.labels = paper.set();

				for (var i = 0; i < len; i++)
				{
					for (var j = 0; j < multi; j++)
					{
						var label = paper.labelise( multi ? labels[j] && labels[j][i] : labels[i], multi ? values[j][i] : values[i], total), X = isRight ? bars[i * (multi || 1) + j].x - barheight / 2 + 3 : x + 5, A = isRight ? "end" : "start", L;

						this.labels.push( L = paper.text(X, bars[i * (multi || 1) + j].y, label).attr(txtattr).attr(
						{
							"text-anchor" : A
						}).insertBefore(covers[0]));

						if (L.getBBox().x < x + 5)
						{
							L.attr(
							{
								x : x + 5,
								"text-anchor" : "start"
							});
						}
						else
						{
							bars[i * (multi || 1) + j].label = L;
						}
					}
				}

				return this;
			};

			chart.hover = function(fin, fout)
			{
				covers2.hide();
				covers.show();
				fout = fout ||
				function()
				{
				};
				covers.mouseover(fin).mouseout(fout);
				return this;
			};

			chart.hoverColumn = function(fin, fout)
			{
				covers.hide();
				covers2.show();
				fout = fout ||
				function()
				{
				};
				covers2.mouseover(fin).mouseout(fout);
				return this;
			};

			chart.each = function(f)
			{
				if (!Raphael.is(f, "function"))
				{
					return this;
				}
				for (var i = covers.length; i--; )
				{
					f.call(covers[i]);
				}
				return this;
			};

			chart.eachColumn = function(f)
			{
				if (!Raphael.is(f, "function"))
				{
					return this;
				}
				for (var i = covers2.length; i--; )
				{
					f.call(covers2[i]);
				}
				return this;
			};

			chart.click = function(f)
			{
				covers2.hide();
				covers.show();
				covers.click(f);
				return this;
			};

			chart.clickColumn = function(f)
			{
				covers.hide();
				covers2.show();
				covers2.click(f);
				return this;
			};

			chart.refresh = function(data)
			{
				return this;
			};

			chart.push(bars, covers, covers2);
			chart.bars = bars;
			chart.covers = covers;
			return chart;
		};

		//inheritance
		var F = function()
		{
		};
		F.prototype = Raphael.g;
		HBarchart.prototype = VBarchart.prototype = new F;

		Raphael.fn.hbarchart = function(x, y, width, height, values, opts)
		{
			return new HBarchart(this, x, y, width, height, values, opts);
		};

		Raphael.fn.barchart = function(x, y, width, height, values, opts)
		{
			return new VBarchart(this, x, y, width, height, values, opts);
		};

	}

});

/*******************
 *  Generales
 *******************/

var wgi_generales_params =
{
	update_time : 30 * 1000,
	update_time_municipio : 60 * 1000
};

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys)
{
	Object.keys = ( function()
		{
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !(
				{
					toString : null
				}).propertyIsEnumerable('toString'), dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'], dontEnumsLength = dontEnums.length;

			return function(obj) {
				if ( typeof obj !== 'object' && ( typeof obj !== 'function' || obj === null))
				{
					throw new TypeError('Object.keys called on non-object');
				}

				var result = [], prop, i;

				for (prop in obj)
				{
					if (hasOwnProperty.call(obj, prop))
					{
						result.push(prop);
					}
				}

				if (hasDontEnumBug)
				{
					for ( i = 0; i < dontEnumsLength; i++)
					{
						if (hasOwnProperty.call(obj, dontEnums[i]))
						{
							result.push(dontEnums[i]);
						}
					}
				}
				return result;
			};
		}());
}

if (!String.prototype.templateFormat)
{
	String.prototype.templateFormat = function(args)
	{
		var newStr = this;
		for (var key in args)
		{
			var expr = new RegExp('{' + key + '}', 'g');
			newStr = newStr.replace(expr, args[key]);
		}
		return newStr;
	};
}

function wgi_getVarNombreIdiomaApi(idioma)
{
	var idioma_nombre;

	switch (idioma)
	{
		case 'es':
			idioma_nombre = 'C';
			break;
		case 'eu':
			idioma_nombre = 'E';
			break;
		default:
			idioma_nombre = 'C';
	}

	return 'N' + idioma_nombre;
}

var wgi_generales_name2cod = function(name)
{
	var valores = [];
	valores["araba"] = 1;
	valores["alava"] = 1;

	valores["bizkaia"] = 2;
	valores["vizcaya"] = 2;

	valores["gipuzkoa"] = 3;
	valores["guipuzcoa"] = 3;

	valores["navarra"] = 4;
	valores["nafarroa"] = 4;

	valores["cav"] = 5;
	valores["eae"] = 5;

	valores["estado"] = 6;

	return valores[name] || null;
};

var wgi_findElement = function(collection, value, attrName)
{
	for (var i = 0, len = collection.length; i < len; i++)
	{
		var collection_value = collection[i][attrName];
		if (collection_value == value)
		{
			return collection[i];
		}
	}
	return null;
};

var wgi_findElements = function(collection, value, attrName)
{
	var new_colecction = [];
	for (var i = 0, len = collection.length; i < len; i++)
	{
		var collection_value = collection[i][attrName];
		if (collection_value == value)
		{
			new_colecction.push(collection[i]);
		}
	}
	return new_colecction;
};

var wgi_findOtherElements = function(collection, value, attrName)
{
	var new_colecction = [];
	for (var i = 0, len = collection.length; i < len; i++)
	{
		var collection_value = collection[i][attrName];
		if (collection_value != value)
		{
			new_colecction.push(collection[i]);
		}
	}
	return new_colecction;
};

var wgi_sortElements = function(collection, attrName1, attrName2)
{
    collection.sort(function(a, b)
	{
        if (attrName2 != null) {

            return parseFloat(b[attrName1]) - parseFloat(a[attrName1]) || parseFloat(b[attrName2]) - parseFloat(a[attrName2]);

        } else {
            return parseFloat(b[attrName1]) - parseFloat(a[attrName1]);
        }
	});
};

var wgi_generales_getDataPartidoDefault = function(data_partidos)
{
	var data_partido_default = wgi_findElement(data_partidos, "default", "S");

	if (data_partido_default == null)
	{

		data_partido_default =
		{
			"ID" : 1,
			"C" : "#C3C3C2",
			"L" : "",
			"I" : "",
			"N" : "default",
			"NR" : "Default",
			"S" : "default"
		};
	}

	return data_partido_default;
};

var wgi_getUrlVer_generales = function(params)
{
	var url_ver = EITB.constants.server + "/{0}/" + elec_lang('url_elecciones') + "/" + elec_lang('wgi_url_generales_resultados');

	for (var i = 1; i < params.length + 1; i++)
	{
		url_ver += "/{" + i + "}";
	}

	elidiomabuscador = get_idioma();
	if (elidiomabuscador == "en" || elidiomabuscador == "fr")
		elidiomabuscador = "es";

	return url_ver.format(elidiomabuscador, params[0], params[1], params[2]);
};

var wgi_generales_enHerrialde = function(municipio, herrialde, en_idioma)
{
	if (en_idioma == null)
		en_idioma = true;

	if (en_idioma)
	{
		var idioma = get_idioma(), nombre_var = wgi_getVarNombreIdiomaApi(idioma);
	}
	else
	{
		var nombre_var = "N";
	}

	for (var i in herrialde)
	{
		if ( typeof herrialde[i] == "undefined" || typeof herrialde[i] == "function")
		{
			continue;
		}

		var municipio_nombre = herrialde[i][nombre_var], municipio_limpio = wgi_limpiarMunicipio(municipio_nombre), municipio_limpio_guiones = municipio_limpio.replace(/-/g, "_");

		if (municipio == municipio_limpio || municipio == municipio_limpio_guiones)
		{

			return true;
		}
	}
	return false;
};

var wgi_generales_diferenciaPartidoAnt = function(diferencia_calc)
{
	var diferencia =
	{
		"cantidad" : "",
		"clase" : ""
	};

	diferencia.cantidad = Math.abs(diferencia_calc);
	if (diferencia_calc < 0)
	{
		diferencia.clase = "diferencia_down";
	}
	else if (diferencia_calc > 0)
	{
		diferencia.clase = "diferencia_up";
	}
	else
	{
		diferencia.cantidad = "=";
		diferencia.clase = "diferencia_igual";
	}
	return diferencia;
};

var wgi_generales_prov_map = function(lugar, muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var provincia = container.set();

	var nombre_path = lugar;

	if (lugar != "navarra")
	{
		if (lugar == "alava")
		{
			nombre_path = "araba";
		}
		if (lugar == "vizcaya")
		{
			nombre_path = "bizkaia";
		}
		if (lugar == "guipuzcoa")
		{
			nombre_path = "gipuzkoa";
		}

		muns[lugar] = container.path(paths.provincia.cav[nombre_path]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY);

	}
	else
	{
		muns[lugar] = container.path(paths.navarra).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY);
	}

	provincia.push(muns[lugar]);

	container.provincia = provincia;

	return container;
};

var wgi_generales_populate_prov = function(lugar, data, R, regions, callback, events, tipo_eleccion, data_partidos)
{
	callback = callback ||
	function()
	{
	};
	events = events ||
	{
	};
	var current = null, color, siglas;
	var terminar = false;

	tipo_eleccion = tipo_eleccion || null;

	for (var provincia in regions)
	{

		if (provincia != lugar)
		{
			continue;
		}

		(function(pr, provincia)
		{

			pr[0].style.cursor = "pointer";

			var cod_provincia = wgi_generales_name2cod(provincia), prov_data = wgi_findElement(data, cod_provincia, "Z");

			if (prov_data == null || Object.keys(prov_data).length == 0)
			{

				terminar = true;
				R.loading('sin_datos_map_resumen');
				return false;
			}

			if (Math.floor(parseFloat(prov_data.E)) == 0)
			{

				terminar = true;
				R.loading('no_data_map_resumen');
				return false;
			}

			if ( typeof prov_data.PARTIDO_GANADOR == "undefined" || prov_data.PARTIDO_GANADOR == null)
			{

				terminar = true;
				R.loading('sin_datos_map_resumen');
				return false;
			}

			//var data_partido_default = wgi_findElement(data_partidos, "default", "S");
			var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos);

			if (prov_data != null && prov_data.PARTIDO_GANADOR != null)
			{

				siglas = prov_data.PARTIDO_GANADOR;

				var data_partido = wgi_findElement(data_partidos, siglas, "S");

				if ( typeof data_partido == 'undefined' || data_partido == null)
				{
					color = data_partido_default['C'];
				}
				else
				{
					color = data_partido['C'];
				}

			}
			else
			{
				color = data_partido_default['C'];
			}

			if (color == null)
			{
				color = data_partido_default['C'];
			}

			pr.data = prov_data;
			pr.animate(
			{
				fill : color,
				stroke : "#fff"
			}, 500);

			pr.hover(function()
			{
				if (data != null && prov_data != null)
				{
					wgi_generales_addTipTabla(provincia, cod_provincia, prov_data, tipo_eleccion, data_partidos);
				}
				pr.originalColor = pr.attr('fill');
				var clr = Raphael.rgb2hsb(pr.attr('fill'));
				clr.b = .5;
				//current && regions[current].animate({fill: "#333", stroke: "#666"}, 500);
				pr.animate(
				{
					fill : Raphael.hsb2rgb(clr).hex,
					stroke : "#666"
				}, 500);

				// R.safari();
				current = provincia;
			}, function()
			{
				wgi_hideTip();
				pr.animate(
				{
					fill : pr.originalColor,
					stroke : "#fff"
				}, 500);
				// R.safari();
			});

			for (var ev in events)
			{
				switch (ev)
				{
					case 'click':
						pr.click(events[ev]);
						break;
					case 'mouseover':
						pr.mouseover(events[ev]);
						break;
					case 'mouseout':
						pr.mouseout(events[ev]);
						break;
				}
			}
			pr.move(wgi_updateTipPosition);

		})(regions[provincia], provincia);

		if (terminar)
		{
			return false;
		}

		callback.call();
	}
};

var wgi_generales_addTipTabla = function(value, cod, data, tipo_eleccion, data_partidos)
{
	wgi_tipHtml = wgi_generales_htmlTabla(data, value, cod, tipo_eleccion, data_partidos);

	wgi_tip.stop();
	wgi_tip.html(wgi_tipHtml);
	wgi_tip.css(
	{
		'display' : 'block'
	});
	wgi_tip.animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_generales_htmlTabla = function(data, value, cod, tipo_eleccion, data_partidos)
{
	var image, siglas, color, nombre;

	var partidos = data.partidos;

	tipo_eleccion = tipo_eleccion || null;

	var html = '<div class="wgi_generales_cont_tabla_mapa">';
	html += '<h2>' + elec_lang('region_' + value) + '</h2>';
	html += '<table>';
	html += '<tr class="fila_th">';
	html += '<th></th>';

	if (tipo_eleccion == "S")
	{
		html += '<th>' + elec_lang('senadores') + '</th>';
	}
	else
	{
		html += '<th>' + elec_lang('diputados') + '</th>';
	}

	html += '<th>' + elec_lang('pvotos') + '</th>';
	html += '<th>' + elec_lang('nvotos') + '</th>';
	html += '</tr>';

	for (var partido in partidos)
	{
		if (partido != "indexOf")
		{

			if (( siglas = partidos[partido].S) == null)
				siglas = 'default';

			//var //data_partido_default = wgi_findElement(data_partidos, "default", "S"),
			var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

			if ( typeof data_partido == 'undefined' || data_partido == null)
			{
				image = data_partido_default['I'];
				color = data_partido_default['C'];
				nombre = partidos[partido].S;
			}
			else
			{
				image = data_partido['I'];
				color = data_partido['C'];
				nombre = data_partido['N'];
			}

			if (image == null)
			{
				image = data_partido_default['I'];
			}

			partidos[partido].PVOTOS = Math.floor(parseFloat(partidos[partido].PV));
			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			var separador_miles = ".";
			var resulta = partidos[partido].NV.toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partidos[partido].NV = resulta;

			var diferencia_calculada = partidos[partido].DESC;
			var diferencia = wgi_generales_diferenciaPartidoAnt(diferencia_calculada);

			if (partidos[partido].ESC > 0)
			{

				html += '<td class="a_left nombre_partido"><img src="' + image + '" alt="' + siglas + '" />' + nombre + '</td>';
				html += '<td class="a_left">' + partidos[partido].ESC + ' <span class="diferencia ' + diferencia.clase + '">' + diferencia.cantidad + '</span></td>';
				html += '<td>' + partidos[partido].PV + '</td>';
				html += '<td>' + partidos[partido].NV + '</td>';
				html += '</tr>';
			}
		}
	}

	html += '</table></div>';

	if (value == "eae")
	{
		html = "";
	}

	return html;
};

var wgi_generales_setEscrutado = function(region, data, id)
{
	var idioma = get_idioma();
	var cod_provincia = wgi_generales_name2cod(region);
	var data_t = wgi_findElement(data, cod_provincia, "Z");

	if (data_t == null)
	{
		data_t = data.totales[0];
	}

	if (data_t != null)
	{
        //data_t.E = Math.floor(parseFloat(data_t.E));
        data_t.E = parseFloat(data_t.E.replace(/,/, "."));

		$("#" + id).css('width', '0');
		$("#" + id).animate(
		{
			width : data_t.E + "%"
		}, 3000, 'swing');

		if (idioma == 'eu')
		{
			$("#" + id + "_percent").text("% " + data_t.E);
		}
		else
		{
			$("#" + id + "_percent").text(data_t.E + " %");
		}
	}
};

var wgi_generales_setEscrutadoPeque = function(region, data, id)
{
	var idioma = get_idioma();
	var cod_provincia = wgi_generales_name2cod(region);
	var data_t = wgi_findElement(data, cod_provincia, "Z");

	if (data_t != null)
	{
		if (data_t.E == "100,0")
		{
			data_t.E = "100";
		}

        data_t.E = parseFloat(data_t.E.replace(/,/, "."));
		//data_t.E = Math.floor(parseFloat(data_t.E));

		if (idioma == 'eu')
		{
			$("#" + id).text("% " + data_t.E);
		}
		else
		{
			$("#" + id).text(data_t.E + " %");
		}
	}
};

var wgi_generales_setParticipacion = function(data, id)
{
	var idioma = get_idioma();

	if (data != null && typeof data.participacion != 'undefined')
	{

		if (data.participacion != null && !isNaN(data.participacion))
		{
			var participacion = parseInt(data.participacion);
			participacion = Math.floor(participacion);

			if (idioma == 'eu')
			{
				$("#" + id).text("% " + participacion);
			}
			else
			{
				$("#" + id).text(participacion + " %");
			}

		}
		else
		{
			var participacion = '--';
			$("#" + id).text(participacion);
		}
	}
};

var wgi_generales_pintar_tabla_peque = function(lugar, data, container, tipo_eleccion, data_partidos)
{
	if (data == null || data.length == 0)
	{
		return false;
	}

	var cod_lugar = wgi_generales_name2cod(lugar), prov_data = wgi_findElement(data, cod_lugar, "Z");

	if (prov_data == null)
	{
		prov_data = data;
	}

	if (prov_data == null)
	{
		return false;
	}

	if (prov_data.partidos.length == 0)
	{
		return false;
	}

	var partidos = prov_data.partidos;

	tipo_eleccion = tipo_eleccion || null;

	var tbl_html = '<table cellpadding="3" cellspacing="0" class="wgi_generales_tabla wgi_generales_tabla_resumen">';
	tbl_html += '<tr>';

	if (tipo_eleccion == 'S')
	{
		tbl_html += '<th scope="col">' + elec_lang('senadores') + '</th>';
	}
	else
	{
		tbl_html += '<th scope="col">' + elec_lang('diputados') + '</th>';
	}

	tbl_html += '</tr>';

	var image;
	var siglas;

	var contador = 0;
	for (var partido in partidos)
	{

		if (contador < 10 && partidos[partido].ESC >= 0)
		{

			if (( siglas = partidos[partido].S) == null)
				siglas = 'default';

			//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
			var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

			if ( typeof data_partido == 'undefined' || data_partido == null)
			{
				image = data_partido_default['I'];
			}
			else
			{
				image = data_partido['I'];
			}

			if (image == null)
			{
				image = data_partido_default['I'];
			}

			if (partidos[partido].ESC > 0)
			{

				var diferencia_calculada = partidos[partido].DESC;
				var diferencia = wgi_generales_diferenciaPartidoAnt(diferencia_calculada);

				tbl_html += '<tr>';
				tbl_html += '<td class="nombre_partido"><img src="' + image + '" alt="' + siglas + '" class="wgi_logo_tabla_small" />' + partidos[partido].ESC + ' <span class="diferencia ' + diferencia.clase + '">' + diferencia.cantidad + '</span></td>';
				tbl_html += '</tr>';
			}

		}

		contador++;
	}
	tbl_html += '</table>';

	$("#" + container).html(tbl_html);
};

var wgi_generales_pintar_tabla = function(lugar, data, container, ceros, tipo_eleccion, data_partidos, anio, anioAnterior, mostrar_votos_anteriores, tipo_escano)
{
	if (data == null || data.length == 0 || data.partidos.length == 0 || ( typeof data.totales != "undefined" && (data.totales.length == 0 || parseFloat(data.totales[0].E) == 0)))
	{
		return false;
	}

	if (anio == null)
	{
		anio = '';
	}
	if (anioAnterior == null)
	{
		anioAnterior = '';
	}

	if (mostrar_votos_anteriores == null)
	{
		mostrar_votos_anteriores = true;
	}

	var cod_lugar = wgi_generales_name2cod(lugar), prov_data = wgi_findElement(data, cod_lugar, "Z");

	if (prov_data == null)
	{
		prov_data = data;
	}

	if (prov_data)
	{
		var partidos = prov_data.partidos;
	}

	tipo_eleccion = tipo_eleccion || null;
	tipo_escano = tipo_escano || null;

	var image;
	var siglas, color, nombre;

	var tbl_html = '<table cellpadding="3" cellspacing="0" class="wgi_generales_tabla">';
	tbl_html += '<tr>';
	tbl_html += '<tr><th scope="col">&nbsp;</th>';

	var palabra_escano = "";
	if (tipo_escano != null)
	{
		palabra_escano = tipo_escano;
	}
	else
	{

		if (tipo_eleccion == "S")
		{
			palabra_escano = elec_lang("senadores");
		}
		else if (tipo_eleccion == "C")
		{
			palabra_escano = elec_lang("diputados");
		}
		else if (tipo_eleccion == "A")
		{
			palabra_escano = elec_lang("wgi_parlamentarios");
		}
	}

	tbl_html += '<th scope="col">' + palabra_escano + '</th>';

	tbl_html += '<th scope="col" class="porcentaje">%</th>';
	tbl_html += '<th scope="col">' + elec_lang('voto_tabla') + " " + anio + '</th>';
	if (mostrar_votos_anteriores)
	{
		tbl_html += '<th scope="col">' + elec_lang('voto_tabla') + " " + anioAnterior + '</th>';

	}
	tbl_html += '</tr>';

	var contador = 0;
	for (var partido in partidos)
	{

		if (partidos[partido].ESC >= 0)
		{

			if (( siglas = partidos[partido].S) == null)
				siglas = 'default';

			//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
			var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

			if ( typeof data_partido == 'undefined' || data_partido == null)
			{

				siglas = 'default';
				color = data_partido_default['C'];
				image = data_partido_default['I'];
				nombre = partidos[partido]['S'];

			}
			else
			{

				siglas = partidos[partido]['S'];
				color = data_partido['C'];
				image = data_partido['I'];
				nombre = data_partido['N'];
			}

			if (image == null)
			{
				image = data_partido_default['I'];
			}

			if (color == null)
			{
				color = data_partido_default['C'];
			}

			partidos[partido].PVOTOS = Math.floor(parseFloat(partidos[partido].PV));

			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			var separador_miles = ".";
			var resulta = partidos[partido].NV.toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partidos[partido].NV = resulta;

			if ( typeof partidos[partido].NVOTOS_ANTERIOR != "undefined")
			{

				if (partidos[partido].NVOTOS_ANTERIOR == null)
				{
					partidos[partido].NVOTOS_ANTERIOR = "-";
				}
				else
				{
					var resulta_anterior = partidos[partido].NVOTOS_ANTERIOR.toString();
					while (miles.test(resulta_anterior))
					{
						resulta_anterior = resulta_anterior.replace(miles, "$1" + separador_miles + "$2");
					}
					partidos[partido].NVOTOS_ANTERIOR = resulta_anterior;
				}
			}

			if (partidos[partido].ESC > 0 || (partidos[partido].ESC >= 0 && ceros == true))
			{

				var diferencia_calculada = partidos[partido].DESC;
				var diferencia = wgi_generales_diferenciaPartidoAnt(diferencia_calculada);

				tbl_html += '<tr>';
				tbl_html += '<td class="nombre_partido"><img src="' + image + '" alt="' + siglas + '" />' + nombre + '</td>';
				tbl_html += '<td class="' + siglas + '">' + partidos[partido].ESC + ' <span class="diferencia ' + diferencia.clase + '">' + diferencia.cantidad + '</span></td>';
				tbl_html += '<td class="' + siglas + ' a_right">' + partidos[partido].PV + '</td>';
				tbl_html += '<td class="' + siglas + ' a_right">' + partidos[partido].NV + '</td>';

				if (mostrar_votos_anteriores)
				{
					tbl_html += '<td class="' + siglas + ' a_right">' + partidos[partido].NVOTOS_ANTERIOR + '</td>';
				}
				tbl_html += '</tr>';
			}
		}

		contador++;
	}
	tbl_html += '</table>';

	$("#" + container).html(tbl_html);
};

var wgi_generales_getSiglasFromLabel = function(label)
{
	if (label != undefined)
	{
		var txt = label.attrs.text;
		var tmp = txt.split(/\d\s/);
		var cab = tmp.shift();

		if (tmp.length == 0)
			tmp.push(cab);
		return tmp.join(" ");
	}
};

var wgi_generales_addTipPartido = function(lugar, data, label, tipo_eleccion, anterior, data_partidos)
{
	if ( typeof (label) != 'string')
		label = wgi_generales_getSiglasFromLabel(label);

	var cod_zona = wgi_generales_name2cod(lugar), zona = wgi_findElement(data, cod_zona, "Z");

	if (zona == null)
	{
		zona = data;
	}

	if (anterior)
	{
		var data_partido = wgi_findElement(zona.anteriores, label, "S");
	}
	else
	{
		var data_partido = wgi_findElement(zona.partidos, label, "S");
	}

	if (data_partido == null)
	{
		return;
	}

	var wgi_tipHtml = wgi_generales_htmlPartido(data_partido, tipo_eleccion, data_partidos);

	wgi_tip.stop();
	wgi_tip.html(wgi_tipHtml);
	wgi_tip.css(
	{
		'display' : 'block'
	});
	wgi_tip.animate(
	{
		opacity : 1
	});
	wgi_over = true;
};

var wgi_generales_htmlPartido = function(partido, tipo_eleccion, data_partidos)
{
	tipo_eleccion = tipo_eleccion || null;

	var image, siglas, nombre;

	if (( siglas = partido.S) == null)
		siglas = 'default';

	//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
	var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

	if ( typeof data_partido == 'undefined' || data_partido == null)
	{
		image = data_partido_default['L'];
		nombre = partido.S;
	}
	else
	{
		image = data_partido['L'];
		nombre = data_partido['N'];
	}

	if (image == null)
	{
		image = data_partido_default['L'];
	}

	var html = '<div class="wgi_partido_tip">';
	html += '<p class="nombre_partido">' + nombre.toUpperCase() + '</p>';
	if (partido.ESC >= 0)
	{
		html += "<p>" + partido.ESC + " " + elec_lang('escanos_tarta') + "</p>";
	}
	if ( typeof partido.PV != 'undefined')
	{

		html += "<p>" + partido.NV + " " + elec_lang('wgi_votos_tooltip_tarta') + "</p>";

		var pvotos = partido.PV;
		if (pvotos == 0)
			pvotos = partido.PV;
		if (wgi_lang_pg == 'eu')
		{
			html += "<p>%" + pvotos + "</p>";
		}
		else
		{
			html += "<p>" + pvotos + "%</p>";
		}
	}
	html += "</div>";

	return html;
};

var wgi_generales_populate_pie = function(data, lugar, pie, width, height, radius, innerRadius, callback, legend, tipo_eleccion, mayoria, data_partidos, es_anterior, mostrar_mayoria)
{
	if (data == null || data.length == 0)
	{
		pie.loading("sin_datos_pie");
		return false;
	}

	if (width == null)
		width = 320;
	if (height == null)
		height = 240;
	if (radius == null)
		radius = 200;
	if (innerRadius == null)
		innerRadius = radius / 3;
	callback = callback ||
	function()
	{
	};
	if (legend == null || legend == undefined)
	{
		legend = true;
	}

	if (mostrar_mayoria == null)
	{
		mostrar_mayoria = true;
	}

	tipo_eleccion = tipo_eleccion || null;

	var params, pie_data, partidos_list;

	var cod_lugar = wgi_generales_name2cod(lugar);
	var prov_data = wgi_findElement(data, cod_lugar, "Z");

	if (prov_data == null)
	{
		prov_data = data;
	}

	if (prov_data == null)
	{
		pie.loading("sin_datos_pie");
		return false;
	}

	if ( typeof prov_data.E != "undefined" && parseFloat(prov_data.E) == 0)
	{
		pie.loading("no_data_pie");
		return false;
	}

	if (es_anterior)
	{
		partidos_list = prov_data.anteriores;
	}
	else
	{
		partidos_list = prov_data.partidos;
	}

	if ( typeof partidos_list == "undefined" || partidos_list.length == 0)
	{
		pie.loading("sin_datos_pie");
		return false;
	}

	pie_data = wgi_generales_getPieData(partidos_list, tipo_eleccion, data_partidos);

	if (!legend)
	{
		params =
		{
			legend : pie_data.legend,
			colors : pie_data.color,
			callback : callback,
			legendheader : ucfirst(elec_lang('escanosw'))
		};
	}
	else
	{
		params =
		{
			legend : pie_data.legend,
			colors : pie_data.color,
			callback : callback,
			legendheader : ""
		};
	}

	var p = pie.semipiechart(width, height, radius, innerRadius, pie_data.serie, params);

	p.hover(function()
	{
		this[0].style.cursor = "pointer";

		if (this.label != undefined)
		{

			wgi_generales_addTipPartido(lugar, data, this.label[1], tipo_eleccion, es_anterior, data_partidos);
			this.stop().animate(
			{
				transform : "s0.9 0.9 " + (this.cx) + " " + (this.cy)
			}, 500, "bounce");

			if (this.label)
			{
				if (this.label[0] != undefined)
				{
					this.label[0].stop();
					this.label[0].animate(
					{
						transform : "t0,0,s1.5 1.5," + this.label[0].attrs.cx + "," + this.label[0].attrs.cy
					}, 500, "bounce");
					this.label[1].attr(
					{
						"font-weight" : 800
					});
				}
			}

		}

	}, function()
	{
		wgi_hideTip();
		this.stop().animate(
		{
			transform : ""
		}, 500, "bounce");

		if (this.label)
		{
			if (this.label[0] != undefined)
			{
				this.label[0].stop();
				this.label[0].animate(
				{
					transform : ""
				}, 500, "bounce");
				this.label[1].attr(
				{
					"font-weight" : 400
				});
			}
		}

	});

	p.move(wgi_updateTipPosition);

	if (mostrar_mayoria)
	{

		var line_height_mayoria = radius - innerRadius;
		pie.path("M" + width + ",0 L" + width + "," + line_height_mayoria).attr(
		{
			"stroke-dasharray" : "-.",
			"stroke-width" : "2",
			"stroke" : "#000",
			"stroke-linecap" : "round",
			"stroke-linejoin" : "round",
			"stroke-miterlimit" : "2",
			"stroke-opacity" : "1"
		}).toFront();

	}

	return p;
};

var wgi_generales_getPieData = function(partidos, tipo_eleccion, data_partidos)
{
	tipo_eleccion = tipo_eleccion || null;

	var serie_pie = new Array(), legend_pie = new Array(), color_pie = new Array();

	var color, image, siglas, nombre;

	for (var partido in partidos)
	{

		if (partidos[partido].ESC >= 0)
		{

			if (( siglas = partidos[partido].S) == null)
				siglas = 'default';

			//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
			var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

			if ( typeof data_partido == 'undefined' || data_partido == null)
			{

				siglas = 'default';
				color = data_partido_default['C'];
				image = data_partido_default['I'];
				nombre = partidos[partido]['S'];

			}
			else
			{

				siglas = partidos[partido]['S'];
				color = data_partido['C'];
				image = data_partido['I'];
				nombre = data_partido['N'];

			}

			if (image == null)
			{
				image = data_partido_default['I'];
			}

			if (color == null)
			{
				color = data_partido_default['C'];
			}

			if (partidos[partido].ESC > 0)
			{
				serie_pie.push(parseInt(partidos[partido].ESC));
				legend_pie.push("### " + partidos[partido].S.replace(/\./g, ""));
				color_pie.push(color);
			}

			partidos[partido]['PV'] = Math.floor(parseFloat(partidos[partido].PV));
			var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
			var separador_miles = ".";
			var resulta = partidos[partido].NV.toString();
			while (miles.test(resulta))
			{
				resulta = resulta.replace(miles, "$1" + separador_miles + "$2");
			}
			partidos[partido].NV = resulta;
		}
	}

	return {
		serie : serie_pie,
		legend : legend_pie,
		color : color_pie
	};
};

var wgi_generales_mun_map = function(lugar, zonas, muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var provincia = container.set();

	var paths_municipios = paths.municipios.cav;
	if (lugar == 'navarra')
	{
		paths_municipios = paths.municipios.nafarroa;
	}

	for (var municipio in paths_municipios)
	{

		var en_idioma = false;
		if (wgi_generales_enHerrialde(municipio, zonas, en_idioma) || lugar == 'navarra')
		{

			provincia.push(muns[municipio] = container.path(paths_municipios[municipio]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

			provincia.push(muns[municipio]);
		}
	}

	// Terrenos
	// No vienen en el GET, los metemos manualmente

	if (lugar == 'alava' || lugar == 'cav')
	{
		provincia.push(muns["terreno_badaia"] = container.path(paths_municipios["terreno_badaia"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
		provincia.push(muns["terreno_entzia"] = container.path(paths_municipios["terreno_entzia"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
		provincia.push(muns["terreno_comunidad"] = container.path(paths_municipios["terreno_comunidad"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
		provincia.push(muns["terreno_trevino"] = container.path(paths_municipios["terreno_trevino"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	}

	if (lugar == 'vizcaya' || lugar == 'cav')
	{
		provincia.push(muns["terreno_vvtrucios"] = container.path(paths_municipios["terreno_vvtrucios"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	}

	if (lugar == 'guipuzcoa' || lugar == 'cav')
	{
		provincia.push(muns["terreno_enirio_aralar"] = container.path(paths_municipios["terreno_enirio_aralar"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
		provincia.push(muns["terreno_parzoneria"] = container.path(paths_municipios["terreno_parzoneria"]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));
	}

	container[lugar] = lugar;

	return container;
};

var wgi_name2municipio = function(value, collection, attrName)
{

	for (var i = 0, len = collection.length; i < len; i++)
	{

		var collection_value = collection[i][attrName], collection_value_limpio = wgi_limpiarMunicipio(collection_value), collection_value_limpio_guiones = collection_value_limpio.replace(/-/g, "_");

		if (value == collection_value_limpio || value == collection_value_limpio_guiones)
		{
			return collection[i];
			break;
		}
	}
	return null;
};

var wgi_generales_addTipMun = function(data)
{
	wgi_tipHtml = wgi_generales_htmlMun(data);

	$(wgi_tip).stop();
	$(wgi_tip).html(wgi_tipHtml);
	$(wgi_tip).css(
	{
		'display' : 'block'
	});
	$(wgi_tip).animate(
	{
		opacity : 1
	});

	wgi_over = true;
};

var wgi_generales_htmlMun = function(municipio)
{
	var idioma = get_idioma(), nombre_var = wgi_getVarNombreIdiomaApi(idioma), nombre_municipio = municipio[nombre_var];

	var html = '<span class="wgi_municipio_tip">' + nombre_municipio + '</span>';

	return html;
};

var wgi_generales_populate_mun = function(data, R, municipios, data_municipios, data_partidos, callback, events, tipo_eleccion)
{
	if (data == null || data.length == 0 || typeof data.totales == "undefined" || data.totales.length == 0)
	{
		R.loading('sin_datos_map');
		return false;
	}

	if (parseFloat(data.totales[0].E) == 0)
	{
		R.loading('no_data_mapa_mun');
		return false;
	}

	if (data.ganadores.length == 0)
	{
		R.loading('sin_datos_map');
		return false;
	}

	var current = null, color, siglas;

	callback = callback ||
	function()
	{
	};
	tipo_eleccion = tipo_eleccion || null;

	var cod_zona = data.totales[0].Z;

	for (var nombre in municipios)
	{

		(function(objeto, mun)
		{
			objeto[0].style.cursor = "pointer";

			// Para los municipios que están partidos en 2 paths
			// Al que viene con "_1" por detrás le ponemos los mismos
			var tmp = nombre.split("_");
			if (tmp[tmp.length - 1] == "1")
			{
				tmp.pop();
				nombre = tmp.join('_');
			}

			var municipio_data = wgi_name2municipio(nombre, data_municipios, "N");
			objeto.data = municipio_data;

			if (municipio_data != null)
			{
				var cod_zona = municipio_data.Z;
				objeto.data.PARTIDO_GANADOR = wgi_findElement(data.ganadores, cod_zona, "Z");
			}

			var strokeColor = "#fff";

			if (objeto.data == null || objeto.data.PARTIDO_GANADOR == null)
			{
				color = "#fff";
				strokeColor = "#000";
			}
			else
			{
				if (objeto.data.PARTIDO_GANADOR != null)
				{
					siglas = objeto.data.PARTIDO_GANADOR.S;

					//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
					var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

					if ( typeof data_partido == 'undefined' || data_partido == null)
					{
						siglas = 'default';
						color = data_partido_default['C'];
					}
					else
					{
						color = data_partido['C'];
					}

					if (color == null)
					{
						color = data_partido_default['C'];
					}
				}
			}

			if (tmp[0] == 'terreno')
			{
				strokeColor = "#ccc";
				color = "#fff";
			}

			objeto.animate(
			{
				fill : color,
				stroke : strokeColor
			}, 500);
			objeto.originalColor = color;
			R.safari();

			objeto.hover(function()
			{
				var tmp = mun.split("_");

				var clr = Raphael.rgb2hsb(objeto.originalColor);

				if (tmp[0] == "terreno")
				{
					if (tmp[1] == "trevino")
					{
						wgi_generales_addTipMun(
						{
							N : elec_lang('wgi_trevino'),
							NC : elec_lang('wgi_trevino'),
							NE : elec_lang('wgi_trevino')
						});
					}
					else if (tmp[1] == "vvtrucios")
					{
						wgi_generales_addTipMun(
						{
							N : elec_lang('wgi_vvtrucios'),
							NC : elec_lang('wgi_vvtrucios'),
							NE : elec_lang('wgi_vvtrucios')
						});
					}
					else
					{
						wgi_generales_addTipMun(
						{
							N : elec_lang('wgi_zona_sin_datos'),
							NC : elec_lang('wgi_zona_sin_datos'),
							NE : elec_lang('wgi_zona_sin_datos')
						});
					}

				}
				else
				{

					if (objeto.data != null)
					{
						clr.b = .5;

						wgi_generales_addTipMun(objeto.data);
					}
				}

				objeto.animate(
				{
					fill : Raphael.hsb2rgb(clr).hex,
					stroke : "#666"
				}, 500);

				R.safari();
				current = nombre;

			}, function()
			{
				var tmp = mun.split("_");

				wgi_hideTip();

				var strokeColor = "#fff";
				if (objeto.data == null || objeto.data.PARTIDO_GANADOR == null)
				{
					strokeColor = "#000";
				}

				if (tmp[0] == 'terreno')
				{
					strokeColor = "#ccc";
				}

				objeto.animate(
				{
					fill : objeto.originalColor,
					stroke : strokeColor
				}, 500);
				R.safari();
			});

			for (var ev in events)
			{
				switch (ev)
				{
					case 'click':
						objeto.click(events[ev]);
						break;
					case 'mouseover':
						objeto.mouseover(events[ev]);
						break;
					case 'mouseout':
						objeto.mouseout(events[ev]);
						break;
				}
			}

			objeto.move(wgi_updateTipPosition);

		})(municipios[nombre], nombre);
	}

	callback.call();
};

var wgi_generales_pintar_leyenda = function(lugar, data, container, tipo_eleccion, data_partidos)
{
	if ( typeof data.totales != "undefined" && (data.totales.length == 0 || parseFloat(data.totales[0].E) == 0))
	{
		return false;
	}

	tipo_eleccion = tipo_eleccion || null;

	var siglas, color, nombre;
	var partidos = [];

	for (var index in data.ganadores)
	{
		siglas = data.ganadores[index].S;

		if ($.inArray(siglas, partidos) == -1)
		{
			partidos.push(siglas);
		}
	}

	partidos.sort();

	var htmlLeyenda = "<ul>";
	for (var partido in partidos)
	{
		if ( typeof partidos[partido] == 'undefined' || typeof partidos[partido] === 'function')
		{
			continue;
		}

		if (( siglas = partidos[partido]) == null)
			siglas = 'default';

		//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
		var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

		if ( typeof data_partido == 'undefined' || data_partido == null)
		{
			siglas = 'default';
			color = data_partido_default['C'];
			nombre = partidos[partido];
		}
		else
		{
			siglas = partidos[partido];
			color = data_partido['C'];
			nombre = data_partido['N'];
		}

		if (color == null)
		{
			color = data_partido_default['C'];
		}

		htmlLeyenda += '<li><span class="wgi_color_partido" style="background-color: ' + color + ';">&nbsp;</span> ' + nombre + '</li>';
	}
	htmlLeyenda += "</ul>";

	$('#' + container).html(htmlLeyenda);

	if (partidos.length)
	{
		if (lugar == 'alava')
		{
			$("#" + container).css("margin-top", "-150px").css("margin-bottom", "45px");
		}
		else if (lugar == 'vizcaya')
		{
			$("#" + container).css("margin-top", "-150px").css("margin-bottom", "75px");
		}
		else if (lugar == 'guipuzcoa')
		{
			$("#" + container).css("margin-top", "-40px").css("margin-bottom", "40px");
		}
		else if (lugar == 'navarra')
		{
			$("#" + container).css("margin-top", "-200px").css("margin-bottom", "100px");
		}
		else if (lugar == 'cav')
		{
			$("#" + container).css("margin-top", "-150px").css("margin-bottom", "75px");
		}
	}
};

var wgi_generales_cav_map = function(muns, container, attr, scaleX, scaleY, centerX, centerY, translateX, translateY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	if (translateX == null)
		translateX = 0;
	if (translateY == null)
		translateY = 0;

	var translateString = "t" + translateX + "," + translateY;

	var cav = container.set();

	var provincias_cav = ["araba", "bizkaia", "gipuzkoa"];
	for (var i in provincias_cav)
	{

		var provincia = provincias_cav[i];

		cav.push(muns[provincia] = container.path(paths[provincia]).attr(attr).transform(translateString).scale(scaleX, scaleY, centerX, centerY));

		cav.push(muns[provincia]);
	}

	container.cav = cav;

	return container;
};

var wgi_generales_pintar_leyenda_tabla_mapa_municipios = function(lugar, data, container, tipo_eleccion, data_partidos)
{
	if (data == null || data.length == 0 || data.partidos.length == 0)
	{
		return false;
	}

	var nombre_lugar = elec_lang(lugar);

	tipo_eleccion = tipo_eleccion || null;

	var siglas, color;

	var cod_zona = wgi_generales_name2cod(lugar);
	var partidos = wgi_findElements(data.partidos, cod_zona, "Z");

	wgi_sortElements(partidos, "ESC");

	var tbl_html = '<table cellpadding="3" cellspacing="0">';

	tbl_html += '<thead>';
	tbl_html += '<tr>';
	tbl_html += '<th colspan="2" class="a_left wig_leyenda_cabecera">' + nombre_lugar + '</th>';
	tbl_html += '</tr>';
	tbl_html += '<tr>';
	tbl_html += '<th class="a_left wig_leyenda_cabecera_sub">' + elec_lang('wig_partido') + '</th>';
	tbl_html += '<th class="a_right wig_leyenda_cabecera_sub">' + elec_lang('escanos') + '</th>';
	tbl_html += '</tr>';
	tbl_html += '</thead>';

	tbl_html += '<tbody>';

	for (var partido in partidos)
	{
		if ( typeof partidos[partido] == 'undefined' || typeof partidos[partido] === 'function')
		{
			continue;
		}

		if (( siglas = partidos[partido].S) == null)
			siglas = 'default';

		if (partidos[partido].ESC == null || partidos[partido].ESC < 1)
		{
			continue;
		}

		//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
		var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

		if ( typeof data_partido == 'undefined' || data_partido == null)
		{
			color = data_partido_default['C'];
		}
		else
		{
			color = data_partido['C'];
		}

		if (color == null)
		{
			color = data_partido_default['C'];
		}

		tbl_html += '<tr>';
		tbl_html += '<td><span class="wgi_color_partido" style="background-color: ' + color + ';">&nbsp;</span> ' + siglas + '</td>';
		tbl_html += '<td class="a_right">' + partidos[partido].ESC + '</td>';
		tbl_html += '</tr>';
	}

	tbl_html += '</tbody>';
	tbl_html += '</table>';

	$('#' + container).append(tbl_html);
};

var wgi_generales_formarUrlMapa = function(data, territorio, tipoEleccion)
{
	var nombre = "";
	if ( typeof data == "object")
	{
		var idioma = get_idioma();
		var nombre_var = wgi_getVarNombreIdiomaApi(idioma);

		nombre = data[nombre_var];
		nombre = nombre.replace(/\//g, "-");
		nombre = nombre.replace(/_/g, "-");
		nombre = wgi_limpiarMunicipio(nombre);

	}
	else if ( typeof data == "string")
	{
		nombre = data;
	}

	// del api viene el nombre oficial (Álava - Araba), pero en el caso de Araba
	// en la url no tiene que ir el nombre oficial. ES: alava / EU: araba
	if (nombre == "alava-araba")
	{
		nombre = elec_lang("alava");
	}

	var ambito = "congreso";
	if (tipoEleccion == "S")
	{
		ambito = "senado";
	}

	var url = "";
	if (territorio == null)
	{
		url = wgi_getUrlVer_generales([elec_lang(ambito), nombre]);
	}
	else
	{
		url = wgi_getUrlVer_generales([elec_lang(ambito), elec_lang(territorio), nombre]);
	}

	return url;
};

var wgi_generales_getHerrialde = function(data, zonas)
{
	var cod_nombre = wgi_Utf8.decode(data.N);
	cod_nombre = cod_nombre.replace(/\//g, "-");
	cod_nombre = cod_nombre.replace(/_/g, "-");
	cod_nombre = wgi_limpiarMunicipio(cod_nombre);

	var en_idioma = false;
	for (var zona in zonas)
	{
		if (wgi_generales_enHerrialde(cod_nombre, zonas[zona], en_idioma))
		{
			return zona;
			break;
		}
	}

	return null;
};

var wgi_generales_spain_prov_map = function(prov, container, attr, scaleX, scaleY, centerX, centerY)
{
	if (scaleX == null)
		scaleX = 1;
	if (scaleY == null)
		scaleY = 1;
	if (centerX == null)
		centerX = 0;
	if (centerY == null)
		centerY = 0;

	var attr_borde =
	{
		fill : "none",
		stroke : "#666",
		"stroke-width" : 1,
		"stroke-linejoin" : "round"
	};

	prov.a_coruna = container.path(paths.a_coruna).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.a_coruna.color = Raphael.getColor();
	prov.pontevedra = container.path(paths.pontevedra).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.pontevedra.color = Raphael.getColor();
	prov.lugo = container.path(paths.lugo).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.lugo.color = Raphael.getColor();
	prov.ourense = container.path(paths.ourense).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.ourense.color = Raphael.getColor();
	prov.asturias = container.path(paths.p_asturias).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.asturias.color = Raphael.getColor();
	prov.cantabria = container.path(paths.p_cantabria).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.cantabria.color = Raphael.getColor();
	prov.zamora = container.path(paths.zamora).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.zamora.color = Raphael.getColor();
	prov.salamanca = container.path(paths.salamanca).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.salamanca.color = Raphael.getColor();
	prov.avila = container.path(paths.avila).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.avila.color = Raphael.getColor();
	prov.valladolid = container.path(paths.valladolid).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.valladolid.color = Raphael.getColor();
	prov.palencia = container.path(paths.palencia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.palencia.color = Raphael.getColor();
	prov.madrid = container.path(paths.p_madrid).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.madrid.color = Raphael.getColor();
	prov.segovia = container.path(paths.segovia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.segovia.color = Raphael.getColor();
	prov.soria = container.path(paths.soria).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.soria.color = Raphael.getColor();
	prov.la_rioja = container.path(paths.p_rioja).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.la_rioja.color = Raphael.getColor();
	prov.huesca = container.path(paths.huesca).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.huesca.color = Raphael.getColor();
	prov.navarra = container.path(paths.p_navarra).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.navarra.color = Raphael.getColor();
	prov.lleida = container.path(paths.lleida).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.lleida.color = Raphael.getColor();
	prov.barcelona = container.path(paths.barcelona).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.barcelona.color = Raphael.getColor();
	prov.leon = container.path(paths.leon).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.leon.color = Raphael.getColor();
	prov.tarragona = container.path(paths.tarragona).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.tarragona.color = Raphael.getColor();
	prov.girona = container.path(paths.girona).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.girona.color = Raphael.getColor();
	prov.gipuzkoa = container.path(paths.p_gipuzkoa).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.gipuzkoa.color = Raphael.getColor();
	prov.bizkaia = container.path(paths.p_bizkaia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.bizkaia.color = Raphael.getColor();
	prov.araba = container.path(paths.p_araba).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.araba.color = Raphael.getColor();
	prov.guadalajara = container.path(paths.guadalajara).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.guadalajara.color = Raphael.getColor();
	prov.castellon = container.path(paths.castellon).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.castellon.color = Raphael.getColor();
	prov.teruel = container.path(paths.teruel).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.teruel.color = Raphael.getColor();
	prov.cuenca = container.path(paths.cuenca).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.cuenca.color = Raphael.getColor();
	prov.valencia = container.path(paths.p_valencia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.valencia.color = Raphael.getColor();
	prov.alicante = container.path(paths.alicante).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.alicante.color = Raphael.getColor();
	prov.murcia = container.path(paths.p_murcia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.murcia.color = Raphael.getColor();
	prov.albacete = container.path(paths.albacete).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.albacete.color = Raphael.getColor();
	prov.ciudad_real = container.path(paths.ciudadreal).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.ciudad_real.color = Raphael.getColor();
	prov.almeria = container.path(paths.almeria).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.almeria.color = Raphael.getColor();
	prov.granada = container.path(paths.granada).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.granada.color = Raphael.getColor();
	prov.jaen = container.path(paths.jaen).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.jaen.color = Raphael.getColor();
	prov.cadiz = container.path(paths.cadiz).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.cadiz.color = Raphael.getColor();
	prov.huelva = container.path(paths.huelva).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.huelva.color = Raphael.getColor();
	prov.sevilla = container.path(paths.sevilla).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.sevilla.color = Raphael.getColor();
	prov.badajoz = container.path(paths.badajoz).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.badajoz.color = Raphael.getColor();
	prov.cordoba = container.path(paths.cordoba).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.cordoba.color = Raphael.getColor();
	prov.malaga = container.path(paths.malaga).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.malaga.color = Raphael.getColor();
	prov.toledo = container.path(paths.toledo).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.toledo.color = Raphael.getColor();
	prov.zaragoza = container.path(paths.zaragoza).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.zaragoza.color = Raphael.getColor();
	prov.burgos = container.path(paths.burgos).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.burgos.color = Raphael.getColor();
	prov.palencia = container.path(paths.palencia).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.palencia.color = Raphael.getColor();
	prov.caceres = container.path(paths.caceres).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.caceres.color = Raphael.getColor();
	prov.baleares = container.path(paths.p_baleares).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.baleares.color = Raphael.getColor();
	prov.canarias_borde = container.path(paths.p_canarias_borde).attr(attr_borde).scale(scaleX, scaleY, centerX, centerY);
	prov.canarias_borde.color = Raphael.getColor();
	prov.las_palmas = container.path(paths.palmas).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.las_palmas.color = Raphael.getColor();
	prov.santa_cruz_de_tenerife = container.path(paths.tenerife).attr(attr).scale(scaleX, scaleY, centerX, centerY);
	prov.santa_cruz_de_tenerife.color = Raphael.getColor();

	return container;
};

var wgi_generales_populate_barchart = function(data, bar, callback, data_partidos)
{
	if (data == null || data.length == 0 || ( typeof data.totales != "undefined" && (data.totales.length == 0 || parseFloat(data.totales[0].E) == 0)))
	{
		bar.loading('no_data');
		return false;
	}

	var bar_data = wgi_generales_getBarData(data, data_partidos);
	if (bar_data.serie.length == 0)
	{
		bar.loading('sin_datos_map');
		return false;
	}

	var txtattr =
	{
		font : '10px Arial, sans-serif',
		fill : '#000',
		color : '#fff'
	};
	var c = bar.barchart(0, 0, 200, 220, [bar_data.serie],
	{
		data : data,
		colors : bar_data.colors,
		type : 'square',
		callback : callback,
		gutter : '100%'
	});

	c.hover(wgi_generales_addTipPartidoBar, wgi_hideTip).label(bar_data.legend, txtattr, true);
	c.move(wgi_updateTipPosition);

	return c;
};

var wgi_generales_getBarData = function(data, data_partidos)
{
	var serie_bar = new Array(), legend_bar = new Array(), colors_bar = new Array();

	var color, siglas, pvotos;
	var partidos = data.partidos;

	for (var partido in partidos)
	{

		if ( typeof partidos[partido] == "undefined" || typeof partidos[partido] == "function")
		{
			continue;
		}

		if (serie_bar.length >= 10)
		{
			continue;
		}

		pvotos = parseInt(partidos[partido].PV);
		if (pvotos <= 0)
		{
			continue;
		}

		if (( siglas = partidos[partido].S) == null)
			siglas = 'default';

		//var data_partido_default = wgi_findElement(data_partidos, "default", "S"),
		var data_partido_default = wgi_generales_getDataPartidoDefault(data_partidos), data_partido = wgi_findElement(data_partidos, siglas, "S");

		if ( typeof data_partido == 'undefined' || data_partido == null)
		{
			color = data_partido_default['C'];
		}
		else
		{
			siglas = partidos[partido]['S'];
			color = data_partido['C'];
		}

		if (color == null)
		{
			color = data_partido_default['C'];
		}

		serie_bar.push(pvotos);
		legend_bar.push(siglas);
		colors_bar.push(color);

	}

	return {
		serie : serie_bar,
		legend : legend_bar,
		colors : colors_bar,
		total : Math.max.apply(Math, serie_bar)
	};
};

var wgi_generales_addTipPartidoBar = function(data, label)
{
	data = this.paper.getData(), label = this.prev;

	if ( typeof (label) != 'string')
		label = wgi_generales_getSiglasFromLabel(label);

	var partido = wgi_findElement(data.partidos, label, "S");

	wgi_tipHtml = wgi_generales_htmlPartidoBar(partido);

	wgi_tip.stop();
	wgi_tip.html(wgi_tipHtml);
	wgi_tip.css(
	{
		'display' : 'block'
	});
	wgi_tip.animate(
	{
		opacity : 1
	});
	wgi_over = true;

};

var wgi_generales_htmlPartidoBar = function(partido)
{
	var html = '';
	if ( typeof partido.PV != 'undefined')
	{
		var html = '<div class="wgi_partido_tip">';
		var pvotos = partido.PV;
		if (pvotos == 0)
			pvotos = partido.PV;
		if (wgi_lang_pg == 'eu')
		{
			html += "<p>%" + pvotos + "</p>";
		}
		else
		{
			html += "<p>" + pvotos + "%</p>";
		}
		html += "</div>";
	}

	return html;
};
