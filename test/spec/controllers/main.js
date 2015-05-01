'use strict';

describe('Controller: MainCtrl', function () {
  var context = describe;

  // load the controller's module
  beforeEach(module('beerBeforeLiquorApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  describe('beer function', function() {
    context('when time < 0.5', function() {
      it('goes from 0 to 1 linearly', function() {
        expect(scope.beer(0)).toEqual(0);
        expect(scope.beer(0.25)).toEqual(0.5);
        expect(scope.beer(0.5)).toEqual(1);
      });
    });

    context('when 0.5 < time < 1.0', function() {
      it('goes from 1 to 0 linearly', function() {
        expect(scope.beer(0.5)).toEqual(1);
        expect(scope.beer(0.75)).toEqual(0.5);
        expect(scope.beer(1.0)).toEqual(0.0);
      });
    });

    context('when time > 1.0', function() {
      it('is constantly 0', function() {
        expect(scope.beer(1.1)).toEqual(0);
      });
    });
  });

  describe('liquor function', function() {
    context('when time < 0.1', function() {
      it('goes from 0 to 1 linearly', function() {
        expect(scope.liquor(0)).toEqual(0);
        expect(scope.liquor(0.05)).toEqual(0.5);
        expect(scope.liquor(0.1)).toEqual(1);
      });
    });

    context('when 0.1 < time < 1.0', function() {
      it('goes from 1 to 0 linearly', function() {
        expect(scope.liquor(0.1)).toEqual(1);
        expect(scope.liquor(0.55)).toEqual(0.5);
        expect(scope.liquor(1.0)).toEqual(0.0);
      });
    });

    context('when time > 1.0', function() {
      it('is constantly 0', function() {
        expect(scope.liquor(1.1)).toEqual(0);
      });
    });
  });
});
