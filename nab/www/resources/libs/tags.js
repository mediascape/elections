var arabaData = {
	cont : 0,
	ehbildu : 0,
	pnv : 0,
	pse : 0,
	pp : 0,
	podemos : 0,
	ikune : 0,
	upyd : 0,
	ciudadanos : 0,
	irabazi : 0,
	vox : 0
};

var gasteizData = {
	cont : 0, 
	ehbildu : 0,
	pnv : 0,
	pse : 0,
	pp : 0,
	ongiEtorri : 0,
	escanosBlancos : 0,
	ciudadanos : 0,
	upyd : 0,
	vox : 0,
	irabazi : 0,
	gastoria : 0,
	sumando : 0,
	recortesCero : 0
};
var bizkaiaData = {
	cont:0,
	ehbildu: 0,
	pnv: 0,
	pse: 0,
	pp: 0,
	podemos: 0,
	irabazi: 0,
	upyd: 0,
	ciudadanos: 0,
	vox: 0,
	udalberri: 0,
	ph: 0,
	pacma: 0,
	ikune: 0,
	pcpe: 0
};
var bilboData = {
	cont:0,
	ehbildu: 0,
	pnv: 0,
	pse: 0,
	pp: 0,
	podemos: 0,
	pacma: 0,
	ciudadnos: 0,
	upyd: 0,
	udalberri: 0,
	partidoHumanista: 0,
	vox: 0
};
var gipuzkoaData = {
	cont:0,
	ehbildu: 0,
	pnv: 0,
	pse: 0,
	pp: 0,
	podemos: 0,
	irabazi: 0,
	ciudadanos: 0
};
var donostiData = {
	cont:0,
	ehbildu: 0,
	pnv: 0,
	pse: 0,
	pp: 0,
	podemos: 0,
	plaz: 0,
	upyd: 0,
	ciudadanos: 0,
	pacma: 0
};
var nafarroaData = {
	cont: 0,
	gbai: 0,
	upn: 0,
	pp: 0,
	psn: 0,
	ehbildu: 0,
	podemos: 0,
	ciudadanos: 0,
	upyd: 0,
	ei: 0,
	libertadNavarra: 0,
	equo: 0,
	pacma: 0,
	sain: 0,
	rcnNok: 0
};
var irunaData = {
	cont:0,
	gbai: 0,
	upn:0,
	psn: 0,
	ehbildu: 0,
	ei: 0,
	upyd: 0,
	pp: 0,
	sain: 0,
	podemos: 0,
	ciudadanos: 0,
	pacma: 0
};

var euskadiData = {
	cont: 0,
	ehbildu: 0,
	pnv: 0,
	pse: 0,
	pp: 0,
	podemos: 0,
	ikune: 0,
	upyd: 0,
	ciudadanos: 0,
	irabazi: 0,
	vox: 0,
	ongiEtorri: 0,
	ei: 0,
	gastoria: 0,
	sumando: 0,
	recortesCero: 0,
	plaz: 0,
	pacma: 0,
	udalberri: 0,
	partidoHumanista: 0,
	pcpe: 0
};

//Provinces:

var gipuzkoa = ['gipuzkoa', 'guipuzcoa', '@eajpnvgipuzkoa', '@PPGipuzkoa', '@PSEGIPUZKOA', '@EA_Gipuzkoa', '@ehbildugipuzkoa', '@Pacma_Gipuzkoa', '@PacmaGipuzkoa', '@IUDonostia', '@vox_guipuzcoa', '@eQuoGipuzkoa'];
var bizkaia = ['bizkaia', 'vizkaya', '@PPBizkaia', '@PSEBizkaia', '@EA_Bizkaia', '@ehbildubizkaia', '@PodemosBizkaia', '@vox_vizcaya', '@EquoBizkaia'];
var araba = ['araba', 'alaba', '@eajpnvaraba', '@PP_Juntas_Alava', '@psealava', '@EA_Araba', '@arabaehbildu', '@ehbilduaraba @iu_araba', '@vox_alava', '@EquoAraba'];
var nafarroa = ['nafarroa', 'navarra', '@EAJPNVNafarroa', '@PPNavarra', '@PSNPSOE', '@EAnafarroa', '@EHbilduNafarroa', '@PacmaNavarra', '@IzdaNavarra', '@EzkerraN', '@Podemosnavarra', '@VOX_Navarra', '@EquoNavarra', '@Cs_Navarra_', '@UPyD_Navarra'];


//Capitals:
var donostia = ['San Sebastian', 'Donostia', '@HiriBizia', '@PPdonostiarras', '@PodemosDonostia', '@Irabazidonostia', '@DonostiaPNV', '@SortuDonostia', '@EA_Donostia', '@IUDonostia'];
var bilbo = ['Bilbao', 'Bildo', '@ehbildubilbo', '@PPdeBilbao', '@PSEBilbao', '@GroupPES_Bilbao', '@PodemosBilbao', '@vox_bilbao', '@BilboIrabaziz @IUBilbao', '@PodemosBilbaoE', '@eajpnvbilbao', '@SortuBilbo'];
var iruna = ['Iruña', 'Pamplona', '@ehbilduirunea', '@PamplonaPSN', '@PodemosPamplona', '@VOX_Pamplona', '@UPN_PNA', '@PamplonaIrabazi', '@GrupoPES_Pamplo', '@IUPamplona'];
var gasteiz = ['Gasteiz', 'Vitoria', '@ehbildugasteiz', '@EQUO_VG', '@PodemosVitoria', '@EBgasteiz', '@IrabaziGasteiz', '@porvitoria', '@pnvgasteiz'];

//Basque Political parties:

//Euskadi:
var bilduEuskadi = ['Kike Fernández', '@KikeFdzdePinedo', '@arabaehbildu', '@ehbilduaraba', 'Miren Larrion', '@miren_larrion', '@ehbildugasteiz', '@EA_Araba', 'Xabier Olano', '@Xabier_Olano_', '@ehbildugipuzkoa', '@alternatiba', '@EA_Gipuzkoa', '#gipuzkoarrokgaraile', 'Juankar Izagirre', '@AlkateSS', '@HiriBizia', '@SortuDonostia', '@EA_Donostia', '#BILDU', '@ehbildu', 'Josu Unanue', '@unanuejosu', '@ehbildubizkaia', '#bizkaitarrokgaraile', 'Aitziber Ibarbarriaga', '@AitziIbaiba', '@ehbildubilbo', '@SortuBilbo', '#BILDU', '@EA_Bizkaia', '@ealkartasuna'];
var pnvEuskadi = ['Ramiro González', '@ramirogonza', '@eajpnvaraba', '@pnvjuntasaraba', 'Gorka Urtaran', '@pnvgasteiz', '@gorka__urtaran', 'Markel Olano', '@eajpnvgipuzkoa', '@markelolano', '@markelolano2015', 'Eneko Goia', '@enekogoia2015', '@DonostiaPNV', '@pnvdonostia', '@eajpnv', 'Unai Rementeria', '@urementeria', 'Juan María Aburto', '@juanmariaburto', '@AzalgorriBilbao', '@eajpnvbilbao', '@eajpnv'];
var pseEuskadi = ['Cristina González', '@CristinaGnlz', '@psealava', '@PSEporAlava', 'Peio López De Munain', '@porvitoria', '@peiomunain_xvg', 'Denis Itxaso', '@DenisItxaso', '@PSEGIPUZKOA', 'Ernesto Gasco', '@gasco63', '@PES_PSE', 'Carlos Totorica', '@PSEBizkaia', '#CarlosTotorica', 'Alfonso Gil', '@AlfonsoGil', '@PSEBilbao', '@GroupPES_Bilbao'];
var ppEuskadi = ['@PPopular','Javier De Andrés', '@JavierdAndres', '@PP_Juntas_Alava Javier Maroto', '@JavierMaroto', 'Juan Carlos Cano', '@PPGipuzkoa', '@CanoAristoy', 'Miren Albistur', '@MirenAlbistur', '@PPdonostiarras', '@PPvasco', '@PPopular', 'Javier Ruiz', '@JavierRuiz_PP', '@PPBizkaia', 'Luis Eguiluz', '@LuisEguiluz_pp', '@PPdeBilbao', '@PPvasco'];
var podemosEuskadi = ['#Podemos','Koldo Martin', '@KoldoPodemos', '@PodemosVitoria', 'Juantxo Iturria', '@juantxo_iturria', '#BadaGaraia', '#GipuzkoaAldatu', '@podemosDonostia', 'Amaia Martín', '@sybillacumas', '@Irabazidonostia', '#HagamosHistoria24M', 'Asun Merino', '@AsunPodemos', '@PodemosBizkaia', 'Francisco Samir Lahdou', '@PodemosBilbao', '@PodemosBilbaoE', '@PodemosEuskadi_'];
var ikuneEuskadi = ['Ana Unibaso', '@IkuneICP', 'Joseba Arroita'];
var upydEuskadi = ['@UPyD','Niko Gutiérrez', '@Nik0Gutierrez Ignacio Oñate', '@Ignacionate', 'Manuel Aguirre', '@Mccguirre', 'Arantza Aranzabal', '@aranaranzabal', '#donostiaUPyD', '@votaUPyD', 'Roque Adrada', '@RoqueAdrada', 'Javier Gabilondo', '@JavierGabilondo', '@UPyDEuskadi'];
var ciudadanosEuskadi = ['@CiudadanosCs','Miguel Angel Carrera', '@MikelK10 Rodrigo', 'Zamora', '@Rodri_Zamora_Al', 'Jonathan Calvo', '@joncalrue', 'Nicolás de Miguel', '@NicodeMig', 'Santiago Sáinz', '@Sainz_Robles', '@Cs_Euskadi', '@Ciudadanos', 'David Pasarín', '@davidpasarin'];
var irabaziEuskadi = ['José Damían Garcia-Moreno', '@josedamian1980', '#IrabaziAlaba', '@iu_araba', '@EquoAraba', 'Óscar Fernández', '@oskar_fm', '@IrabaziGasteiz', '@EQUO_VG', '@EBgasteiz', 'Arantza González', '@arantzagg', '@IRABAZIGipuzkoa', '@Irabazidonostia', '@IUDonostia', '@eQuoGipuzkoa', 'Xabier Jiménez', '@Eljoventopo', '#IrabaziBizkaia', '@BilboIrabaziz', '@IUBilbao', '@EquoBizkaia', '@IrabaziEuskadi', '@EzkerBatua', '@IUEzker'];
var voxEuskadi = ['Esaú Martín', '@esaumartin', '@vox_alava', '#AhoraVOX', 'Adolfo Gago', '@toohope', 'Patricia Gómez', '@vox_vizcaya', 'Urko de Azumendi', '@urkobilbao2015', '@vox_bilbao'];
var ongiEtorriEuskadi = ['Vanesa Costa'];
var eiEuskadi = ['Nerea Icuza', '@icuza'];
var gastoriaEuskadi = ['Esther Saez de Argandoña', '@unicaire', '@GastoriaVG'];
var sumandoEuskadi = ['Jorge Hinojal', '@JorgeHiSo', '@shgjorge', '@hegasum'];
var recortesCeroEuskadi = ['@RecortesCero','Diana Plaza'];
var plazEuskadi = [ '@plaZFeminista','Josebe Iturrioz', '@JosebeIturrioz', '#AldaketaGorpuzteko'];
var pacmaEuskadi = ['@PartidoPACMA','Saioa Escolar', '@Pacma_Gipuzkoa', '@PacmaGipuzkoa', '@PacmaEuskadi', 'Kepa Lozano', '@KEPALOZANO', 'Goizane Rodríguez', '@JusticiaPAT'];
var udalberriEuskadi = ['@UdalBerri','Carmen Muñoz', '@CarmenMunozL', '#BilbaoEnComun',  '@iunida', '@ALTER_info'];
var partidoHumanistaEuskadi = ['@phumanista_esp','Jose Manuel Vázquez Rios'];
var pcpeEuskadi = ['Sergio Saenz', '@webpcpe', '#24mvotapcpe'];


'@Pacma'
//Political parties for each provinces:

//Araba:
var bilduAraba = ['Kike Fernández', '@KikeFdzdePinedo', '@arabaehbildu', '@ehbilduaraba', 'Miren Larrion', '@miren_larrion', '@ehbildugasteiz', '@EA_Araba'];
var pnvAraba = ['Ramiro González', '@ramirogonza', '@eajpnvaraba', '@pnvjuntasaraba', 'Gorka Urtaran', '@pnvgasteiz', '@gorka__urtaran'];
var pseAraba = ['Cristina González', '@CristinaGnlz', '@psealava', '@PSEporAlava', 'Peio López De Munain', '@porvitoria', '@peiomunain_xvg'];
var ppAraba = ['Javier De Andrés', '@JavierdAndres', '@PP_Juntas_Alava', 'Javier Maroto', '@JavierMaroto'];
var podemosAraba = ['Koldo Martin', '@KoldoPodemos', '@PodemosVitoria'];
var ikuneAraba = ['Ana Unibaso', '@IkuneICP'];
var upydAraba = ['Niko Gutiérrez', '@Nik0Gutierrez', 'Ignacio Oñate', '@Ignacionate'];
var ciudadanosAraba = ['Miguel Angel Carrera', '@MikelK10', 'Rodrigo Zamora', '@Rodri_Zamora_Al'];
var irabaziAraba = ['José Damían Garcia-Moreno', '@josedamian1980', '#IrabaziAlaba', '@iu_araba', '@EquoAraba', 'Óscar Fernández', '@oskar_fm', '@IrabaziGasteiz', '@EQUO_VG', '@EBgasteiz'];
var voxAraba = ['Esaú Martín', '@esaumartin', '@vox_alava', '#AhoraVOX', 'Adolfo Gago', '@toohope'];
var ongiEtorriAraba = ['Vanesa Costa'];
var escanosBlancosAraba = ['Nerea Icuza', '@icuza'];	
var gastoriaAraba = ['Esther Saez de Argandoña', '@unicaire', '@GastoriaVG'];
var sumandoAraba = ['Jorge Hinojal', '@JorgeHiSo', '@shgjorge', '@hegasum'];
var recortesCeroraba = ['Diana Plaza', '@RecortesCero'];

//Gipuzkoan:
var bilduGipuzkoa = ['Xabier Olano', '@Xabier_Olano_', '@ehbildugipuzkoa', '@alternatiba', '@EA_Gipuzkoa', '#gipuzkoarrokgaraile', 'Juankar Izagirre', '@AlkateSS', '@HiriBizia', '@SortuDonostia', '@EA_Donostia', '#BILDU @ehbildu'];
var pnvGipuzkoa = ['Markel Olano', '@eajpnvgipuzkoa', '@markelolano', '@markelolano2015', 'Eneko Goia', '@enekogoia2015', '@DonostiaPNV', '@pnvdonostia', '@eajpnv'];
var pseGipuzkoa = ['Denis Itxaso', '@DenisItxaso', '@PSEGIPUZKOA', 'Ernesto Gasco', '@gasco63'];
var ppGipuzkoa = ['Juan Carlos Cano', '@PPGipuzkoa', '@CanoAristoy', 'Miren Albistur', '@MirenAlbistur', '@PPdonostiarras'];
var podemosGipuzkoa = ['Juantxo Iturria', '@juantxo_iturria', '#BadaGaraia', '#GipuzkoaAldatu', '@podemosDonostia', 'Amaia Martín', '@sybillacumas', '@Irabazidonostia', '#HagamosHistoria24M'];
var irabaziGipuzkoa = ['Arantza González', '@arantzagg', '@IRABAZIGipuzkoa', '@Irabazidonostia', '@IUDonostia', '@eQuoGipuzkoa'];
var upydGipuzkoa = ['Manuel Aguirre', '@Mccguirre', 'Arantza Aranzabal', '@aranaranzabal', '#donostiaUPyD', '@votaUPyD'];
var ciudadanosGipuzkoa = ['Jonathan Calvo', '@joncalrue', 'Nicolás de Miguel', '@NicodeMig'];
var plazGipuzkoa = ['Josebe Iturrioz', '@JosebeIturrioz', '#AldaketaGorpuzteko', '@plaZFeminista'];
var pacmaGipuzkoa = ['Saioa Escolar', '@Pacma_Gipuzkoa', '@PacmaGipuzkoa', '@PacmaEuskadi'];

//Bizkaia:
var bilduBizkaia = ['Josu Unanue', '@unanuejosu', '@ehbildubizkaia', '#bizkaitarrokgaraile', 'Aitziber Ibarbarriaga', '@AitziIbaiba', '@ehbildubilbo', '@SortuBilbo', '#BILDU', '@EA_Bizkaia'];
var pnvBizkaia = ['Unai Rementeria', '@urementeria', 'Juan María Aburto', '@juanmariaburto', '@AzalgorriBilbao', '@eajpnvbilbao', '@eajpnv'];
var pseBizkaia = ['Carlos Totorica', '@PSEBizkaia', '#CarlosTotorica', 'Alfonso Gil', '@AlfonsoGil', '@PSEBilbao', '@GroupPES_Bilbao'];
var ppBizkaia = ['Javier Ruiz', '@JavierRuiz_PP', '@PPBizkaia', 'Luis Eguiluz', '@LuisEguiluz_pp', '@PPdeBilbao'];
var podemosBizkaia = ['Asun Merino', '@AsunPodemos', '@PodemosBizkaia', 'Francisco Samir Lahdou', '@PodemosBilbao', '@PodemosBilbaoE'];
var irabaziBizkaia = ['Xabier Jiménez', '@Eljoventopo', '#IrabaziBizkaia', '@BilboIrabaziz', '@IUBilbao', '@EquoBizkaia'];
var upydBizkaia = ['Roque Adrada', '@RoqueAdrada', 'Javier Gabilondo', '@JavierGabilondo'];
var ciudadanosBizkaia = ['Santiago Sáinz', '@Sainz_Robles', 'David Pasarín', '@davidpasarin'];
var voxBizkaia = ['Patricia Gómez', '@vox_vizcaya', 'Urko de Azumendi', '@urkobilbao2015', '@vox_bilbao'];
var udalberriBizkaia = ['Carmen Muñoz', '@CarmenMunozL', '#BilbaoEnComun', '@UdalBerri', '@Equo', '@iunida', '@ALTER_info'];
var partidohumanistaBizkaia = ['Jose Manuel Vázquez Rios', '@phumanista_esp'];
var pacmaBizkaia = ['Kepa Lozano', '@KEPALOZANO', 'Goizane Rodríguez', '@JusticiaPAT'];
var ikuneBizkaia = ['Joseba Arroita', '@IkuneICP'];
var pcpeBizkaia = ['Sergio Saenz', '@webpcpe', '#24mvotapcpe'];

//Nafarroa:
var gbaiNafarroa = ['Uxue Barkos', '@uxuebarkos', 'Itziar Gomez', '@itziargomez', '@GeroaBaiIrunea', '@geroabai', '#orainbai', '@EAJPNVNafarroa'];
var upnNafarroa = ['Javier Esparza', '@JavierJesparza', '@_navarrisimo', '#Navarrisimo', '#adelantenavarros', 'Enrique Maya', '#Navarrisimo', '#UPN', '@upn_navarra '];
var ppNafarroa = ['Ana Beltran', '@abeltran_ana', '@PPNavarra', 'Pablo Zalba', '@PabloZalba', '#Pamplona', '#Navarra', '@PPNavarra', '#DespiertaPamplona'];
var psnNafarroa = ['María Chivite', '@mavichina', '@PSNPSOE', 'Maite Esporrin', '@maiteesporrin', '@PamplonaPSN', '@psnpsoe', '#VotaPSOE', '#VotaPSNPSOE', '#EsporrinAlcaldesa', '#ActivemosPamplona'];
var bilduNafarroa = ['Adolfo Araiz', '@AdolfoAraiz', '@EHbilduNafarroa', '#Nafarrokgaraile', '#nafarrokgaraile', 'Joseba Asiron', '@josebaasiron', '@EAnafarroa'];
var podemosNafarroa = ['Laura Pérez Ruano', '@laperua', '@Podemosnavarra', '#EsAhora', '#CambiaNavarra'];
var ciudadanosNafarroa = ['Diego Paños', '@diegopanos', '#CambiaNavarra', '@Cs_Navarra_', 'Iñaki Arana', '#NavarraPideCambio'];
var upydNafarroa = ['Miguel Zarranz', '@miguelzarranz', '@UPyD_Navarra', 'Damaso Crespo', '@upyd_navarra', '#LIBRES'];
var eiNafarroa = ['Jose Miguel Nuin', '@josemiguelnuin', '@IzdaNavarra', '@EzkerraN', 'Edurne Eguino', '@SoyEdurneNaiz', '@EdurneEguino', '@IUPamplona'];
var libertadNavarraNafarroa = ['Mikel Iriarte', '@libertadnavarra'];
var equoNafarroa = ['David Marzo', '@davidMarzo @EquoNavarfarroa', '#LaAlternativaVerde', '#AukeraVerdea', '@EquoNavarra'];
var pacmaNafarroa = ['Maria Yazmina Larumbe', '@PacmaNavarra', 'Daniel Fernández', '#SuVozTuVoto'];
var sainNafarroa = ['Luis Miguel Latasa', '@SainNavarra', '@PartidoSAIn', 'Samuel Valderrey', '@SamuelValderrey', '#VOTASAIn'];
var rcnNokNafarroa = ['Ramon Morcillo', '@RCN_NOK', '#marihuana'];

//Political parties for each capitals:

//Donostia:
var biduDonostia = ['Juankar Izagirre', '@AlkateSS', '@HiriBizia'];
var pnvDonostia = ['Eneko Goia', '@enekogoia2015', '@DonostiaPNV', '@pnvdonostia'];
var pseDonostia = ['Ernesto Gasco', '@gasco63'];
var ppDonostia = ['Miren Albistur', '@MirenAlbistur'];
var podemosDonostia = ['Amaia Martín', '@sybillacumas', '@Irabazidonostia'];
var plazDonostia = ['Josebe Iturrioz', '@JosebeIturrioz', '#AldaketaGorpuzteko'];
var upydDonostia = ['Arantza Aranzabal', '@aranaranzabal', '#donostiaUPyD', '@votaUPyD'];
var ciudadanosDonostia = ['Nicolás de Miguel', '@NicodeMig'];
var pacmaDonostia = ['Saioa Escolar', '@Pacma_Gipuzkoa', '@PacmaGipuzkoa'];

//Bilbo
var bilduBilbo = ['Aitziber Ibarbarriaga', '@AitziIbaiba', '@ehbildubilbo'];
var pnvBilbo = ['Juan María Aburto', '@juanmariaburto @AzalgorriBilbao', '@eajpnvbilbao'];
var pseBilbo = ['Alfonso Gil', '@AlfonsoGil', '@PSEBilbao', '@GroupPES_Bilbao'];
var ppBilbo = ['Luis Eguiluz', '@LuisEguiluz_pp',  '@PPdeBilbao'];
var podemosBilbo = ['Francisco Samir Lahdou', '@PodemosBilbao', '@PodemosBilbaoE'];
var pacmaBilbo = ['Goizane Rodríguez', '@JusticiaPAT'];
var ciudadanosBilbo = ['David Pasarín', '@davidpasarin'];
var upydBilbo = ['Javier Gabilondo', '@JavierGabilondo'];
var udalberriBilbo = ['Carmen Muñoz', '@UdalBerri', '@Equo @iunida', '@ALTER_info'];
var partidoHumanistaBilbo = ['Jose Manuel Vazquez Rios', '@phumanista_esp'];
var voxBilbo = ['Urko de Azumendi', '@urkobilbao2015', '@vox_bilbao'];

//Gasteiz
var bilduGasteiz = ['Miren Larrion', '@miren_larrion', '@ehbildugasteiz'];
var pnvGasteiz = ['Gorka Urtaran', '@pnvgasteiz', '@gorka__urtaran'];
var pseGasteiz = ['Peio López De Munain', '@porvitoria', '@peiomunain_xvg'];
var ppGasteiz = ['Javier Maroto', '@JavierMaroto'];
var ongiEtorriGasteiz = ['Vanesa Costa'];
var escanosBlancosGasteiz = ['Nerea Icuza', '@icuza'];
var ciudadanosGasteiz = ['Rodrigo Zamora', '@Rodri_Zamora_Al'];
var upydGasteiz = ['Ignacio Oñate', '@Ignacionate'];
var voxGasteiz = ['Adolfo Gago', '@toohope'];
var irabaziGasteiz = ['Óscar Fernández', '@oskar_fm', '@IrabaziGasteiz', '#EleccionesVG'];
var gastoriaGasteiz = ['Esther Saez de Argandoña', '@unicaire', '@GastoriaVG'];
var sumandoGasteiz = ['Jorge Hinoja', 'l @JorgeHiSo', '@shgjorge', '@hegasum'];
var recortesCeroGasteiz = ['Diana Plaza', '@RecortesCero'];

//Iruña:
var gbaiIruna = ['Itziar Gomez', '@itziargomez', '@GeroaBaiIrunea', '@geroabai', '#orainbai'];
var upnIruna = ['Enrique Maya', '#Navarrisimo', '#UPN', '@upn_navarra'];
var psnIruna = ['Maite Esporrin', '@maiteesporrin', '@PamplonaPSN', '@psnpsoe', '#VotaPSOE', '#VotaPSNPSOE', '#EsporrinAlcaldesa', '#ActivemosPamplona'];
var bilduIruna = ['Joseba Asiron', '@josebaasiron', '@EHbilduNafarroa'];
var izquierdaEzkerraIruna = ['Edurne Eguino', '@SoyEdurneNaiz', '@EdurneEguino'];
var upydIruna = ['Damaso Crespo', '@upyd_navarra', '#LIBRES '];
var ppIruna = ['Pablo Zalba', '@PabloZalba', '#Pamplona', '#Navarra', '@PPNavarra', '#DespiertaPamplona'];
var sainIruna = ['Samuel Valderrey', '@SamuelValderrey', '@SainNavarra', '#VOTASAIn'];
var aranzadiIruna = ['Ana Lizoain', '@aranzadi2015', '@PodemosPamplona', '@Podemosnavarra', '@EquoNavarfarroa', '#RupturaDemocrática'];
var ciudadanosIruna = ['Iñaki Arana', '#NavarraPideCambio', '@Cs_Navarra_'];
var pacmaIruna = ['Daniel Fernández', '#SuVozTuVoto'];
		
