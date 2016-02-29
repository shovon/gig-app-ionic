describe('PostingsCtrl', function () {
  var ionicFilterBarMock;
  var dataServiceMock;

  beforeEach(module('starter'));

  beforeEach(inject(function ($rootScope, $controller, $q) {
    dataServiceMock = {
      getPostings: jasmine
        .createSpy('get postings spy')
        .and.returnValue(Promise.resolve(null))
    };
    ionicFilterBarMock = {
      show: jasmine.createSpy('filter bar show spy')

    };
    $controller('PostingsCtrl', {
      $scope: $rootScope.$new(),
      $ionicFilterBar: ionicFilterBarMock,
      dataService: dataServiceMock
    });
  }));
  describe('#getPostings', function () {
    it('should have asked to retrieve the postings', function () {
      expect(dataServiceMock.getPostings).toHaveBeenCalled();
    });
  });
});
