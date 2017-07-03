(function(angular){
	'use strict';
	var nia = angular.module('blz.numinad',[]);
	nia.component('blzNumericInput', {
		template:
			'<head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"><style>.numinad-group{position:relative}.numinad{border-radius:4px!important;line-height:0.8;}.numinad::-ms-clear{display:none;}.numinad-addon{border:0;background-color:transparent;line-height:0.8;display:inline-block;padding-top:0;padding-bottom:0;padding-left:4px;padding-right:4px;visibility:hidden;position:absolute;right:25px;z-index:999;margin-top:2px;margin-bottom:4px;}.numinad.input-lg+.numinad-addon{line-height:1;margin-top:5px}.numinad.input-lg+.numinad-addon .numinad-down{padding-top:1.5px}.numinad.input-lg+.numinad-addon .numinad-up{padding-bottom:2px}.numinad.input-sm+.numinad-addon{line-height:0.6;margin-top:0px}.numinad.input-lg+.numinad-addon .numinad-down{padding-top:0px}.numinad.input-lg+.numinad-addon .numinad-up{padding-bottom:0px}.numinad-hr{margin:0;border:0}.numinad-addon .numinad-up{font-size:7.5px;color:#505050;padding-bottom:0px;padding-left:4px;padding-right:4px;background-color:#eee;cursor:pointer;z-index:999}.numinad-addon .numinad-down{font-size:7.5px;color:#505050;padding-bottom:1px;padding-left:4px;padding-right:4px;background-color:#eee;cursor:pointer;}.numinad-addon .numinad-up{top:4.5px;padding-top:1px}.numinad-addon .numinad-down{padding-top:0px;top:0.5px}.numinad-addon .numinad-up:hover{background-color:#d2d2d2;}.numinad-addon .numinad-down:hover{background-color:#d2d2d2;}.numinad-addon .numinad-up:active{background-color:#787878;color:white;}.numinad-addon .numinad-down:active{background-color:#787878;color:white;}</style></head><div class="input-group col-xs-12 numinad-group" ng-init="setNuminadAttributes()" ng-cloak><input id="numinad" type="text" class="form-control numinad {{$ctrl.blzClass}}" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired"name="{{$ctrl.name}}" ng-maxlength="$ctrl.ngmaxlength" ng-minlength="$ctrl.ngminlength" ng-pattern="$ctrl.ngPattern"ng-disabled="$ctrl.ngDisabled" ng-change="parser(); $ctrl.ngChange({par: $ctrl.changeParameter})" ng-keydown="kp($event)" ng-keyup="stopPressing()"><div class="input-group-addon numinad-addon"><span ng-show="!$ctrl.ngDisabled" class="glyphicon glyphicon-triangle-top numinad-up" ng-mousedown="pressedUp()" ng-mouseup="stopPressing()" ng-mouseleave="stopPressing()"></span><hr class="numinad-hr"><span ng-show="!$ctrl.ngDisabled" class="glyphicon glyphicon-triangle-bottom numinad-down" ng-mousedown="pressedDown()" ng-mouseup="stopPressing()" ng-mouseleave="stopPressing()"></span></div></div>',		
		controller:'numinadCtrl',
		bindings:{
			min: '<?',
			max: '<?',
			step: '<?',
			ngModel: "=?",
			name: "<?",
			ngRequired: "<?",
			ngminlength: "<?",
			ngmaxlength: "<?",
			ngPattern: "@?",
			ngDisabled: "<?",
			ngChange: "&?",
			changeParameter: "=?",
			blzClass: "@?"
		}
	})
	nia.controller('numinadCtrl', function($scope, $timeout){
		angular.element(".numinad").hover(function() {
			angular.element(".numinad-addon").css("visibility","visible")
			}, function(){
			angular.element(".numinad-addon").css("visibility","hidden")
		});
		angular.element(".numinad-addon").hover(function() {
			angular.element(".numinad-addon").css("visibility","visible")
			}, function(){
			angular.element(".numinad-addon").css("visibility","hidden")
		});
		angular.element(".numinad").focus(function(){
			angular.element(".numinad-addon").css("visibility","visible")
		});
		$scope.time=false;
		$scope.kp = function(e){
			if(e.which==38){
				$scope.pressedUp()
			}else if(e.which==40){
				$scope.pressedDown()
			}
		};
		$scope.setNuminadAttributes = function(){
			var setStep = function() {
				if($scope.$ctrl.step){
					$scope.step=parseInt($scope.$ctrl.step);
				}else{
					$scope.step=1
				}
			}
			setStep();
		}
		$scope.checkNum = function(){
			var num = isFinite($scope.$ctrl.ngModel);
			if(!num){
				$scope.$ctrl.ngModel = 0
			};
		}
		$scope.pressedUp = function(){
			if($scope.time==false){
				$scope.checkNum();
				if($scope.$ctrl.max!=undefined){
					if($scope.$ctrl.ngModel<$scope.$ctrl.max){
					$scope.time=true;
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition+$scope.step;
					$timeout($scope.increment, 500)
					}
				} else {
					$scope.time=true;
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition+$scope.step;
					$timeout($scope.increment, 500)
				}
				if($scope.$ctrl.ngChange){
					$scope.$ctrl.ngChange({par:$scope.$ctrl.changeParameter})
				}
			}
		};
		$scope.pressedDown = function(){
			$scope.checkNum();
			if($scope.$ctrl.min!=undefined){
				if($scope.$ctrl.ngModel>$scope.$ctrl.min){
					$scope.time=true;
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition-$scope.step;
					$timeout($scope.decrement, 500)
				}
			} else {
				$scope.time=true;
				var addition = parseInt($scope.$ctrl.ngModel);
				$scope.$ctrl.ngModel=addition-$scope.step;
				$timeout($scope.decrement, 500)
			}
			if($scope.$ctrl.ngChange){
				$scope.$ctrl.ngChange({par:$scope.$ctrl.changeParameter})
			}
		};
		$scope.decrement = function(){
			if($scope.$ctrl.min!=undefined){
				if($scope.time&&$scope.$ctrl.ngModel>$scope.$ctrl.min){
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition-$scope.step;
					$timeout($scope.decrement, 50)
				}
			} else {
				if($scope.time){
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition-$scope.step;
					$timeout($scope.decrement, 50)
				}
			}
			if($scope.$ctrl.ngChange){
				$scope.$ctrl.ngChange({par:$scope.$ctrl.changeParameter})
			}
		}
		$scope.increment = function(){
			if($scope.$ctrl.max!=undefined){
				if($scope.time&&$scope.$ctrl.ngModel<$scope.$ctrl.max){
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition+$scope.step;
					$timeout($scope.increment, 40)
				}
			} else {
				if($scope.time){
					var addition = parseInt($scope.$ctrl.ngModel);
					$scope.$ctrl.ngModel=addition+$scope.step;
					$timeout($scope.increment, 40)
				}
			}
			if($scope.$ctrl.ngChange){
				$scope.$ctrl.ngChange({par:$scope.$ctrl.changeParameter})
			}
		}
		$scope.stopPressing = function() {
			$scope.time=false;
		}
		$scope.parser = function(){
			var a = $scope.$ctrl.ngModel;
			$scope.$ctrl.ngModel = parseInt(a);
		}
		
	});
})(window.angular);