// app.js
angular.module('webcamApp', [])
    .controller('WebcamController', ['$scope', function($scope) {
        Webcam.set({
            width: 320,
            height: 240,
            dest_width: 320,
            dest_height: 240,
            image_format: 'jpeg',
            jpeg_quality: 90
        });

        Webcam.attach('#my-webcam');

        $scope.captureImage = function() {
            Webcam.snap(function(data_uri) {
                $scope.imageData = data_uri;
                $scope.$apply(); // Update the AngularJS model
            });
        };
    }])
    .directive('webcam', ['$compile', function($compile) {
        return {
            restrict: 'E',
            template: '<div id="my-webcam"></div><button ng-click="captureImage()">Capture Image</button><br><img ng-src="{{ imageData }}" ng-show="imageData">',
            link: function(scope, element, attrs) {
                var compiledHtml = $compile(scope.template)(scope);
                element.append(compiledHtml);
            }
        };
    }]);
