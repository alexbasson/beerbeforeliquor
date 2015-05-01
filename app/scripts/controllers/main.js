'use strict';

/**
 * @ngdoc function
 * @name beerBeforeLiquorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the beerBeforeLiquorApp
 */
angular.module('beerBeforeLiquorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.timeValues = [];
    for (var i = 0; i < 3.1; i += 0.1) {
      $scope.timeValues.push(i);
    }

    var bloodAlcoholFunction = function bloodAlcoholFunction(peakTime) {
      return function(time) {
        if (time < 0) {
          return 0.0;
        } else if (0 <= time && time < peakTime) {
          return 1.0/peakTime * time;
        } else if (peakTime <= time && time < 1.0) {
          return -(1.0 / (1.0 - peakTime)) * (time - 1.0);
        } else {
          return 0.0;
        }
      };
    };

    $scope.beer = bloodAlcoholFunction(0.5);
    $scope.liquor = bloodAlcoholFunction(0.1);

    var beerBeforeLiquor = [$scope.beer, $scope.beer, $scope.beer, $scope.beer, $scope.liquor];
    var liquorBeforeBeer = [$scope.liquor, $scope.beer, $scope.beer, $scope.beer, $scope.beer];

    var drinkingFunction = function drinkingFunction(strategy) {
      return function(time) {
        var returnValue = 0;
        for (var i = 0; i < strategy.length; i++) {
          var f = strategy[i];
          returnValue += f(time - 0.4*i);
        }
        return returnValue;
      };
    };

    $scope.data = [];
    for (var i = 0; i < $scope.timeValues.length; i++) {
      var time = $scope.timeValues[i];
      $scope.data.push({
        x: time,
        beer: drinkingFunction(beerBeforeLiquor)(time),
        liquor: drinkingFunction(liquorBeforeBeer)(time),
        ideal: time < 3.0 ? 1.5 : 0.0
      });
    }

    $scope.options = {
      axes: {
        x: {
          key: 'x',
          labelFunction: function(value) {return value;},
          type: 'linear',
          min: $scope.timeValues[0],
          max: $scope.timeValues[$scope.timeValues.length-1],
          ticks: $scope.timeValues.length / 5.0
        },
        y: {
          type: 'linear',
          min: 0,
          max: 3,
          ticks: 6
        }
      },
      series: [
        {
          y: 'beer',
          color: 'steelblue',
          thickness: '2px',
          striped: true,
          label: 'Beer'
        },
        {
          y: 'liquor',
          color: 'red',
          thickness: '2px',
          striped: true,
          label: 'Liquor'
        },
        {
          y: 'ideal',
          color: 'black',
          thickness: '1px',
          striped: true,
          label: 'Ideal'
        }
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltip: {
        mode: 'scrubber',
        formatter: function(x, y, series) {return series.label;}
      },
      drawLegend: true,
      drawDots: true,
      columnsHGap: 5
    }
  });
