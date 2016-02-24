/// <reference path="../customtypes/ionic-filter-bar.d.ts" />

interface AppControllerScope extends angular.IScope {
  loginData: any;
  modal: ionic.modal.IonicModalController;
  closeLogin: () => void;
  login: () => void;
  doLogin: () => void;
}

interface PlaylistsControllerScope extends angular.IScope {
  playlists: any[]
}

class AppCtrl {
  public $inject = [ '$scope', '$ionicModal', '$timeout', '$ionicFilterBar' ];

  private loginData = {};
  private modal: ionic.modal.IonicModalController

  constructor(
    $scope: AppControllerScope,
    $ionicModal: ionic.modal.IonicModalService,
    public $timeout: angular.ITimeoutService
  ) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal

    _.assign($scope, {
      closeLogin: () => {
        this.modal.hide();
      },
      login: () => {
        console.log("Attempting to log in");
        this.modal.show();
      },
      doLogin: () => {
        console.log('Doing login', this.loginData);
        this.$timeout(() => { $scope.closeLogin(); }, 1000);
      }
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then((modal) => {
      this.modal = modal;
    });
  }
}

////////////////////////////////////////////////////////////////////////////////

interface PostingsCtrlScope extends angular.IScope {

}


class PostingsCtrl {
  static $inject = [ '$scope', '$ionicFilterBar', 'dataService' ];

  constructor(
    $scope: PostingsCtrlScope,
    // TODO: give $ionicFilterBar a type.
    $ionicFilterBar: IonicFilterBar,
    dataService: DataService
  ) {
    let filterBarInstance: () => void;
    _.assign($scope, {
      showFilterBar() {
        filterBarInstance = $ionicFilterBar.show({
          update(filteredItems, filterText) {
            console.log(filterText);
          }
        });
      }
    });
  }
}

////////////////////////////////////////////////////////////////////////////////

class PostingCtrl {
  static $inject = [ '$scope', '$stateParams' ];

  constructor(
    $scope: angular.IScope,
    $stateParams: ng.ui.IStateParamsService
  ) {

  }
}

////////////////////////////////////////////////////////////////////////////////

angular.module('starter.controllers', [])
  .controller('AppCtrl', AppCtrl)
  .controller('PostingsCtrl', PostingsCtrl)
  .controller('PostingCtrl', PostingCtrl);
