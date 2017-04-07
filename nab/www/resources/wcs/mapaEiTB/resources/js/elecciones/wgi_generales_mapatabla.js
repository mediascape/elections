(function($) {

    $.generalesMapatabla = function(element, options) {

        var defaults = {
            apiBaseUrl   : "",
            lugar        : "",            // alava, vizcaya, guipuzcoa, navarra
            tipoEleccion : "",            // C: congreso, S: senado
            anio         : "",
            anioAnterior : "",
            template     : "",
            oculto       : "",             // mapa, tabla
            onReload     : function() {}
        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            element = element,
            $template_container = $element.find(".wgi_template_container");

        var mun = {},
            wgi_grafico;
        var attr_grafico = {
            fill: "#FFF",
            stroke: "#000",
            "stroke-width": .5,
            "stroke-linejoin": "round"
        };
        var maxWindowWidth = 736;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            make();
        };

        /***********************
         * Funciones públicas
         ***********************/

        plugin.resize = function() {

            var oculto = plugin.settings.oculto;
            if (oculto == "mapa") {
                return false;
            }

            var lugar = plugin.settings.lugar,
                sizes = getGraficoSizes(lugar);
            resizeGrafico(sizes);

        };

        plugin.reload = function() {

            var pintar = false;
            make(pintar);


            plugin.settings.onReload.call();
        };

        /***********************
         * Funciones privadas
         ***********************/

        var make = function(pintar) {

            if (pintar == null) {pintar = true;}

            var idioma = get_idioma();
            var markup = plugin.settings.template,
                lugar  = plugin.settings.lugar,
                oculto = plugin.settings.oculto,
                tipoEleccion = plugin.settings.tipoEleccion,
                anio = plugin.settings.anio,
                anioAnterior = plugin.settings.anioAnterior,
                apiBaseUrl = plugin.settings.apiBaseUrl;

            if (pintar) {
                $template_container.html(markup);
            }

            var $cambiadorMunicpios = $element.find('.wgi_generales_select_cambiador');
            $cambiadorMunicpios.change(function() {
                changeMunicipio($(this), lugar, tipoEleccion);
            });

            var $titleContainer = $element.find('.wgi_title'),
                $subTitleContainer = $element.find('.wgi_subtitle'),
                mapContainerId = $element.find('.wgi_generales_mapatabla_mapa').attr('id'),
                tableContainerId = $element.find('.wgi_generales_mapatabla_tabla').attr('id'),
                leyendaContainerId = $element.find('.wgi_leyenda_map').attr('id'),
                escrutadoContainerId = $element.find('.wgi_escrutado_container').attr('id'),
                participacionContainerId = $element.find('.wgi_participacion_container').attr('id');

            var wgi_url_mapatabla = apiBaseUrl + "mapatabla_" + lugar + "_" + tipoEleccion + "_" + anioAnterior + ".json";

            var wgi_url_partidos = apiBaseUrl + "partidos_" + tipoEleccion + "_" + anio + ".json";

            var wgi_lista_municipios = apiBaseUrl + "zonas_" + idioma + "_";
            if (lugar) {
                if (lugar == 'cav') {
                    wgi_lista_municipios += "todas";
                } else if (lugar == 'estado') {
                    wgi_lista_municipios += lugar + "_provincias";
                } else {
                    wgi_lista_municipios += lugar;
                }
            }
            wgi_lista_municipios += ".json";


            var get_mapatabla          = $.getJSON(wgi_url_mapatabla);
            var get_data_partidos      = $.getJSON(wgi_url_partidos);
            var get_municipios         = $.getJSON(wgi_lista_municipios);
            $.when(get_mapatabla, get_data_partidos, get_municipios).then(function (result_mapatabla, result_data_partidos, result_municipios) {

                var mapatabla     = result_mapatabla[0],
                    data_partidos = result_data_partidos[0].partido,
                    municipios    = result_municipios[0].zonas;

                var cod_zona = wgi_generales_name2cod(lugar);

                if (mapatabla == null || Object.keys(mapatabla).length == 0) {
                    mapatabla = {
                        totales: [],
                        partidos : [],
                        ganadores: []
                    };
                }

                if (typeof mapatabla.totales == "undefined" || mapatabla.totales.length == 0) {
                    /*
                    mapatabla.totales = [
                        {
                            "Z" : cod_zona,
                            "PP": "0",
                            "E": "0"
                        }
                    ];
                    */

                    mapatabla.totales = [];
                }
                if (typeof mapatabla.partidos == "undefined") {
                    mapatabla.partidos = [];
                }
                if (typeof mapatabla.ganadores == "undefined") {
                    mapatabla.ganadores = [];
                }

                var totales = wgi_findElement(mapatabla.totales, cod_zona, "Z");
                var totales_otros = wgi_findOtherElements(mapatabla.totales, cod_zona, "Z");
                if (totales == null) {
                    totales = [];
                } else {
                    totales = [totales];
                }
                mapatabla.totales = totales;
                mapatabla.totales_otros = totales_otros;

                var partidos_list = wgi_findElements(mapatabla.partidos, cod_zona, "Z");
                wgi_sortElements(partidos_list, "ESC", "NV");
                mapatabla.partidos = partidos_list;
                for (var i = 0; i < mapatabla.partidos.length; i++) {
                    if (mapatabla.partidos[i].DNV == null) {
                        mapatabla.partidos[i].NVOTOS_ANTERIOR = null;
                    } else {
                        var dif_num_votos = mapatabla.partidos[i].DNV;
                        mapatabla.partidos[i].NVOTOS_ANTERIOR = mapatabla.partidos[i].NV - dif_num_votos;
                    }
                }

                var titulo     = mapatabla["l"+ idioma + "1"] || "",
                    subtitulo  = mapatabla["l"+ idioma + "2"] || "",
                    tipoEscano = mapatabla["l"+ idioma + "3"] || "";

                $titleContainer.html(titulo);
                $subTitleContainer.html(subtitulo);

                // Movemos las acciones (botones embed y rrss)
                var leyenda = $element.find('.wgi_leyenda_map');
                $element.find(".wgi_detalle_actions").insertAfter(leyenda);

                if (oculto != "mapa") {

                    pintaGrafico(lugar, municipios, mapContainerId);

                    wgi_generales_populate_mun(mapatabla, wgi_grafico, mun, municipios, data_partidos, function() {
                        wgi_grafico.loading(false);

                    },{
                        'click': function() {

                            var url = "";
                            if (this.data != null) {
                                var territorio = lugar;

                                if (lugar == "estado" || lugar == "cav") {
                                    url = wgi_generales_formarUrlMapa(this.data, null, tipoEleccion);
                                } else {
                                    url = wgi_generales_formarUrlMapa(this.data, territorio, tipoEleccion);
                                }

                                window.location = url;
                            }
                        }
                    }, tipoEleccion);


                    // Escrutado y participación

                    if (lugar != "estado") {

                        if (mapatabla.totales.length == 0
                            || typeof mapatabla.totales[0].E == "undefined"
                            || parseFloat(mapatabla.totales[0].E) == 0) {
                            mapatabla.totales = [{E: 0}];
                        }

                        if (parseFloat(mapatabla.totales[0].E) == 0) {

                            mapatabla.totales[0].PP = null;
                        }

                        wgi_generales_setEscrutado(lugar, mapatabla, escrutadoContainerId);

                        var data_participacion = {participacion: mapatabla.totales[0].PP};
                        wgi_generales_setParticipacion(data_participacion, participacionContainerId);
                    }

                    // Leyenda

                    $("#" + leyendaContainerId).empty();

                    wgi_generales_pintar_leyenda(lugar, mapatabla, leyendaContainerId, tipoEleccion, data_partidos);

                }

                if (oculto != "tabla") {

                    $("#" + tableContainerId).empty();

                    var ceros = true,
                        mostrar_votos_anteriores = true;
                    wgi_generales_pintar_tabla(lugar, mapatabla, tableContainerId, ceros, tipoEleccion, data_partidos, anio, anioAnterior, mostrar_votos_anteriores, tipoEscano);

                }
            }).fail(function() {

                showSinDatos(mapContainerId);

                $titleContainer.html(elec_lang(lugar) + ": " + elec_lang("wgi_no_hay_datos"));
                $subTitleContainer.html("");

            });

        };

        function showSinDatos(containerId) {

            var htmlSinDatos = '<div class="wgi_sin_datos">';
            htmlSinDatos += "<p>" + elec_lang("wgi_no_hay_datos") + "</p>";
            htmlSinDatos += "</div>";

            $("#" + containerId).html(htmlSinDatos);
        };

        function changeMunicipio(elem, lugar, tipoEleccion) {

            var nombre_limpio = elem.val(),
                territorio = lugar;
            var url = wgi_generales_formarUrlMapa(nombre_limpio, territorio, tipoEleccion);

            if (isInIframe) {
                window.open(url, '_blank');
            } else {
                window.location = url;
            }
        };


        function pintaGrafico(lugar, municipios, containerId) {

            $("#" + containerId).empty();

            var sizes = getGraficoSizes(lugar);

            wgi_grafico = Raphael(containerId, sizes.width, sizes.height);

            if (lugar == 'cav') {

                wgi_generales_cav_map(mun, wgi_grafico, attr_grafico, sizes.escala, sizes.escala, sizes.centerX, sizes.centerY, sizes.translateX, sizes.translateY);

            } else if (lugar == 'estado') {

                wgi_generales_spain_prov_map(mun, wgi_grafico, attr_grafico, sizes.escala, sizes.escala, sizes.centerX, sizes.centerY);

            } else {

                wgi_generales_mun_map(lugar, municipios, mun, wgi_grafico, attr_grafico, sizes.escala, sizes.escala, sizes.centerX, sizes.centerY, sizes.translateX, sizes.translateY);

            }

            resizeGrafico(sizes);

            wgi_grafico.loading(false).loading('recargando_mapa');
        };

        function resizeGrafico(sizes) {

            if (!isInIframe && $(window).width() < maxWindowWidth
                || (isInIframe && $element.parents(".wgi_iframe").width() < maxWindowWidth)) {

                wgi_grafico.setViewBox(0, 0, sizes.width, sizes.height, false);
                wgi_grafico.canvas.setAttribute('preserveAspectRatio', 'none');

                var calcWidth   = Math.round(($(window).width()) * sizes.widthProportion);
                var calcHeight  = Math.round(($(window).width()) * sizes.heightProportion);

                wgi_grafico.setSize(calcWidth, calcHeight);
            }

        };

        function getGraficoSizes(lugar) {

            var sizes = {
                escala: "",
                width : "",
                height : "",
                centerX: "",
                centerY: "",
                translateX: "",
                translateY: "",
                widthProportion: "",
                heightProportion: ""
            };


            if (lugar == 'alava') {

                sizes.width = 600;
                sizes.height = 600;
                sizes.escala = 1.1;

                sizes.centerX = 0;
                sizes.centerY = 0;
                sizes.translateX = -50;
                sizes.translateY = -125;

                sizes.widthProportion = .9;
                sizes.heightProportion = .85;

            } else if (lugar == 'vizcaya') {

                sizes.width = 600;
                sizes.height = 400;
                sizes.escala = 1.2;

                sizes.centerX = 0;
                sizes.centerY = 0;
                sizes.translateX = null;
                sizes.translateY = null;

                sizes.widthProportion = .9;
                sizes.heightProportion = .75;

            } else if (lugar == 'guipuzcoa') {

                sizes.width = 600;
                sizes.height = 425;
                sizes.escala = 1.3;

                sizes.centerX = 0;
                sizes.centerY = 0;
                sizes.translateX = -450;
                sizes.translateY = -35;

                sizes.widthProportion = 1;
                sizes.heightProportion = .85;

            } else if (lugar == 'navarra') {

                sizes.width = 600;
                sizes.height = 620;
                sizes.escala = .7;

                sizes.centerX = 0;
                sizes.centerY = 0;
                sizes.translateX = 50;
                sizes.translateY = 20;

                sizes.widthProportion = .9;
                sizes.heightProportion = .9;

            } else if (lugar == 'cav') {

                sizes.width = 600;
                sizes.height = 515;
                sizes.escala = .6;

                sizes.centerX = 0;
                sizes.centerY = 0;
                sizes.translateX = 0;
                sizes.translateY = 0;

                sizes.widthProportion = .9;
                sizes.heightProportion = .9;

            } else if (lugar == 'estado') {

                sizes.width = 680;
                sizes.height = 660;
                sizes.escala = 1.2;

                sizes.centerX = 0;
                sizes.centerY = 0;
                sizes.translateX = 0;
                sizes.translateY = 0;
                sizes.widthProportion = .9;
                sizes.heightProportion = .85;

                if (isInIframe && $element.parents(".wgi_iframe").width() >= 610) {

                    sizes.widthProportion = .65;
                    sizes.heightProportion = .65;

                }
            }

            return sizes;
        };


        plugin.init();


        setInterval(function() {

            plugin.reload();

        }, wgi_generales_params.update_time);

    };

    $.fn.generalesMapatabla = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('generalesMapatabla')) {
                var plugin = new $.generalesMapatabla(this, options);
                $(this).data('generalesMapatabla', plugin);
            }
        });

    };

})(jQuery);


$(document).ready(function() {
    if ($(".wgi_generales_mapatabla_container").length > 0) {
        $(".wgi_generales_mapatabla_container").each(function (index, element) {

            var $element     = $(element),
                lugar        = $element.data("lugar"),
                tipoEleccion = $element.data("tipoEleccion"),
                anio         = $element.data("anio"),
                anioAnterior = $element.data("anioAnterior"),
                template     = $element.data("template"),
                oculto       = $element.data("oculto"),
                api_base_url = $element.data("apiBaseUrl");

            $element.generalesMapatabla({
                apiBaseUrl       : api_base_url,
                lugar            : lugar,
                tipoEleccion     : tipoEleccion,
                anio             : anio,
                anioAnterior     : anioAnterior,
                template         : template,
                oculto           : oculto,
                onReload         : function() {
                    // poner aquí código analytics
                }
            });

        });
    }
});

$(window).resize(function() {

    if(!isBadIE()) {
        if ($(".wgi_generales_mapatabla_container").length > 0) {
            $(".wgi_generales_mapatabla_container").each(function (index, element) {
                var $element = $(element);
                $element.data('generalesMapatabla').resize();
            });
        }
    }
});