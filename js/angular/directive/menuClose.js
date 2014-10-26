/**
 * @ngdoc directive
 * @name menuClose
 * @module ionic
 * @restrict AC
 *
 * @description
 * Closes a side menu which is currently opened.
 *
 * @usage
 * Below is an example of a link within a side menu. Tapping this link would
 * automatically close the currently opened menu.
 *
 * ```html
 * <a menu-close href="#/home" class="item">Home</a>
 * ```
 */
IonicModule
.directive('menuClose', ['$ionicViewService', '$rootScope', function($rootScope, $ionicViewService) {
  return {
    restrict: 'AC',
    require: '^ionSideMenus',
    link: function($scope, $element, $attr, sideMenuCtrl) {
      $element.bind('click', function(){
         var unityCamViewAttr = angular.isDefined($attr.unityCamView) ?
              $attr.unityCamView :
              'false';
          var arCameraAttr = angular.isDefined($attr.arCamera) ?
              $attr.arCamera :
              'false';
          if (arCameraAttr == "true") {
              arCameraAttr = true;
          } else {
              arCameraAttr = false;
          }
          var unityScreenAttr = angular.isDefined($attr.unityScreen) ?
              $attr.unityScreen :
              'no-unity';

          engine.trigger("ActivateUnityScreen", unityScreenAttr);
//          engine.trigger("ActivateARCamera", arCameraAttr);

          if (unityCamViewAttr == "true") {
              unityCamViewAttr = true;
          } else {
              unityCamViewAttr = false;
          }
          $rootScope.unityView = unityCamViewAttr;
          sideMenuCtrl.closeToUnity(unityCamViewAttr);
      });
    }
  };
}]);
