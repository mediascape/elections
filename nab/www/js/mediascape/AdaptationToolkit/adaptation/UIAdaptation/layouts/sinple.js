/**
* This layout organizes N components dividing the screen into equal size areas, one
* for each component. The components will be ordered taking into account
* the priority from the left to the right and from top to the bottom. If it is not
* possible to divide the screen into equal cells, it will be divided into a higher
* number of cells and there will be empty cells.

* @module mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/divided
* @requires mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor
*/



define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var sinple = new LayoutConstructor('sinple');
    sinple.onComponentsChange = function (cmps){
        console.log("test");
        this.cmps = cmps;

    }
    sinple.render = function (cmps){



    mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();


    }
    sinple.onOrientationChange = function (cmps){

      console.log("orientationChange");
    }
    sinple.onLayoutChangeEvent = function (cmps){
      console.log("layout changed");



    }

    sinple.onResizeEvent=function(cmps){
      //console.log("layout changed");
      this.render(cmps);

    }
    sinple.unload = function(cpms){

    }
    sinple.__moduleName = "sinpleLayout";
    return sinple;

  });
