interface AppControllerScope extends ng.IScope {
  loginData: any;
  modal: ionic.modal.IonicModalController;
  closeLogin: () => void;
  login: () => void;
  doLogin: () => void;
}

interface PlaylistsControllerScope extends ng.IScope {
  playlists: any[]
}

class AppCtrl {
  public $inject = [ '$scope', '$ionicModal', '$timeout' ];

  public loginData = {};
  public modal: ionic.modal.IonicModalController

  constructor(
    $scope: AppControllerScope,
    $ionicModal: ionic.modal.IonicModalService,
    $timeout: ng.ITimeoutService
  ) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then((modal) => {
      this.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  }

  closeLogin() {
    this.modal.hide();
  }

  login() {
    
  }
}

angular.module('starter.controllers', [])

.controller('AppCtrl', AppCtrl)

.controller('PlaylistsCtrl', function($scope: PlaylistsControllerScope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope: ng.IScope, $stateParams: ng.ui.IStateParamsService) {
});
