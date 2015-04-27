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
    for (var i = 0; i <= 3.0; i += 0.5) {
      $scope.timeValues.push(i);
    }

    $scope.beer = function(time) {
      if (time < 0) {
        return 0.0;
      } else if (0 <= time && time < 0.5) {
        return 2 * time;
      } else if (0.5 <= time && time < 1.0) {
        return -2 * time + 2;
      } else {
        return 0.0;
      }
    };

    $scope.data = [];
    for (var i = 0; i < $scope.timeValues.length; i++) {
      var time = $scope.timeValues[i];
      $scope.data.push({
        x: time,
        y: $scope.beer(time) + $scope.beer(time - 0.5) + $scope.beer(time - 1.0)
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
          ticks: $scope.timeValues.length
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
          y: 'y',
          color: 'steelblue',
          thickness: '2px',
          striped: true,
          label: 'Beer'
        }
      ],
      lineMode: 'linear',
      tension: 0.7,
      tooltip: {
        mode: 'scrubber',
        formatter: function(x, y, series) {return 'beer';}
      },
      drawLegend: true,
      drawDots: true,
      columnsHGap: 5
    }
  });
