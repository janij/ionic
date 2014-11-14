/**
 * @ngdoc directive
 * @name ionView
 * @module ionic
 * @restrict E
 * @parent ionNavView
 *
 * @description
 * A container for view content and any navigational and header bar information.
 * When a view enters and exists its parent {@link ionic.directive:ionNavView}, the view
 * also emits view information, such as its title, if the back button should show or not, if
 * the corresponding {@link ionic.directive:ionNavBar} should show or not, which transition the view
 * should use to animate, and what direction to animate.
 *
 * Views are cached to improve performance. When a view is navigated away from, its
 * element is left in the DOM, and its scope is disconnected from the cycle. When navigating
 * to a view which is already cached, its scope is reconnected, and the existing element which
 * was left in the DOM becomes the active view. Config variables can be used to disable this
 * feature, or change the maximum number of views which can be cached.
 *
 * @usage
 * Below is an example where our page will load with a {@link ionic.directive:ionNavBar} containing
 * "My Page" as the title.
 *
 * ```html
 * <ion-nav-bar></ion-nav-bar>
 * <ion-nav-view>
 *   <ion-view view-title="My Page">
 *     <ion-content>
 *       Hello!
 *     </ion-content>
 *   </ion-view>
 * </ion-nav-view>
 * ```
 *
 * ## Events
 *
 * Views can be cached which means controllers may only load once, which could change how you'd
 * expected data to load. To know when a view has entered or left, events have been added that
 * get emitted from the view's scope. These events also contain data about the view,
 * such as the title and if the back button should show, along with transition data, such as the
 * transition type and direction that will be or was used.
 *
 * * `$ionicView.beforeEnter`
 * * `$ionicView.beforeLeave`
 * * `$ionicView.afterEnter`
 * * `$ionicView.afterLeave`
 *
 *## Caching
 *
 *Caching can disabled/enabled by multiple ways. By default, Ionic will cache a maximum of 10 views. You can optionally choose to disable caching a view through the `cache-view` attribute directive.
 *
 *```html
 *<ion-view cache-view="false" view-title="My Title"></ion-view>
 *```
 *
 *Alternatively, you could choose to disable caching through `$stateProvider.state`.
 *
 *```
 *$stateProvider.state('myState', {
 *  cache: false,
 *  url : '/myUrl',
 *  views: {
 *    'nav-view': {
 *      templateUrl : 'my-template.html'
 *    }
 *  }
 *})
 *```
 *
 *If you wish to disable caching globally in an app, you can edit the `$ionicConfigProvider.views.maxCache`
 *
 *```
 *$ionicConfigProvider.views.maxCache(0);
 *```
 *
 *In this instance we’re setting the number of cached views to 0, essentially disabling the caching functionality.
 *
 *Note that because we are caching these views, we aren’t destroying scopes. Instead, scopes are being disconnected.
 *Then when you travel back to that cached view, the scopes get reconnected.
 *
 *
 * @param {string=} view-title The title to display on the parent {@link ionic.directive:ionNavBar}.
 * @param {boolean=} cache-view If this view should be allowed to be cached or not. Default `true`
 * @param {boolean=} hide-back-button Whether to hide the back button on the parent
 * {@link ionic.directive:ionNavBar} by default.
 * @param {boolean=} hide-nav-bar Whether to hide the parent
 * {@link ionic.directive:ionNavBar} by default.
 */
IonicModule
.directive('ionView', function() {
  return {
    restrict: 'EA',
    priority: 1000,
    controller: '$ionicView',
    compile: function(tElement) {
      tElement.addClass('pane');
      tElement[0].removeAttribute('title');
      return function link($scope, $element, $attrs, viewCtrl) {
        viewCtrl.init();
        var translucentNavAttr = angular.isDefined($attr.translucentNavBar) ?
          $attr.translucentNavBar :
          'false';
        $scope.$watch(translucentNavAttr, function(value) {
          // Should the nav bar be translucent for this view or not?
          navBarCtrl.translucentBar(!value);
          //console.log("TRANSLu:"+value);
          //$rootScope.unityView = value;
        });
      };
    }
  };
});
