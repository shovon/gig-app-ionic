/// <reference path="../customtypes/ionic-filter-bar.d.ts" />
var AppCtrl = (function () {
    function AppCtrl($scope, $ionicModal, $timeout) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        var _this = this;
        this.$timeout = $timeout;
        this.$inject = ['$scope', '$ionicModal', '$timeout', '$ionicFilterBar'];
        this.loginData = {};
        // Form data for the login modal
        _.assign($scope, {
            closeLogin: function () {
                _this.modal.hide();
            },
            login: function () {
                console.log("Attempting to log in");
                _this.modal.show();
            },
            doLogin: function () {
                console.log('Doing login', _this.loginData);
                _this.$timeout(function () { $scope.closeLogin(); }, 1000);
            }
        });
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            _this.modal = modal;
        });
    }
    return AppCtrl;
}());
var PostingsCtrl = (function () {
    function PostingsCtrl($scope, $ionicFilterBar, dataService) {
        dataService.getPostings().then(function (postings) {
            $scope.postings = postings;
            $scope.$apply();
        });
        var filterBarInstance;
        _.assign($scope, {
            showFilterBar: function () {
                filterBarInstance = $ionicFilterBar.show({
                    update: function (filteredItems, filterText) {
                        if (filterText) {
                            // $scope.postings = dataService.searchPostings(filterText);
                            dataService.searchPostings(filterText).then(function (postings) {
                                $scope.postings = postings;
                                $scope.$apply();
                            });
                        }
                        else {
                            dataService.searchPostings(filterText).then(function (postings) {
                                $scope.postings = postings;
                                $scope.$apply();
                            });
                        }
                    }
                });
            }
        });
    }
    PostingsCtrl.$inject = ['$scope', '$ionicFilterBar', 'dataService'];
    return PostingsCtrl;
}());
var PostingCtrl = (function () {
    function PostingCtrl($scope, $stateParams, dataService) {
        dataService.getPosting($stateParams.postingId).then(function (posting) {
            $scope.posting = posting;
        });
    }
    PostingCtrl.$inject = ['$scope', '$stateParams', 'dataService'];
    return PostingCtrl;
}());
////////////////////////////////////////////////////////////////////////////////
angular.module('starter.controllers', [])
    .controller('AppCtrl', AppCtrl)
    .controller('PostingsCtrl', PostingsCtrl)
    .controller('PostingCtrl', PostingCtrl);
