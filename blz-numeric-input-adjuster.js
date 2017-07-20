(function(angular){
	'use strict';
	var nia = angular.module('blz.numinad',[]);
	nia.component('blzNumericInput', {
		template:
			'<head><style>.input-group .numinad:first-child{border-top-right-radius:0!important;border-bottom-right-radius:0!important}.input-group blz-numeric-input:not(:first-child) .numinad-group .numinad{border-top-left-radius:0!important;border-bottom-left-radius:0!important}.numinad-group{position:relative}.numinad{border-radius:4px!important;line-height:.8}.numinad::-ms-clear{display:none}.input-group-addon.numinad-addon,.input-group-addon.numinad-addon:hover{background-color:transparent;line-height:.8;display:inline-block;visibility:hidden;position:absolute;margin-top:2px;margin-bottom:4px;padding:0 4px;border:0;z-index:999}.numinad:hover+.numinad-addon{visibility:visible}.numinad-addon:hover{visibility:visible}.numinad:focus+.numinad-addon{visibility:visible}.input-group-addon.numinad-addon{right:10px}.input-group-addon.numinad-addon:hover{box-shadow:none;right:10px}.numinad-hr{margin:0;border:0}.input-group-addon.numinad-addon .numinad-up{font-size:7.5px;color:#505050;background-color:#eee;cursor:pointer;z-index:999;top:4.5px;padding:1px 4px 0}.input-group-addon.numinad-addon .numinad-down{font-size:7.5px;color:#505050;background-color:#eee;cursor:pointer;top:.5px;padding:0 4px 1px}.input-group-addon.numinad-addon .numinad-down:hover,.input-group-addon.numinad-addon .numinad-up:hover{background-color:#d2d2d2}.input-group-addon.numinad-addon .numinad-down:active,.input-group-addon.numinad-addon .numinad-up:active{background-color:#787878;color:#fff}.numinad.input-lg+.input-group-addon.numinad-addon{line-height:1;margin-top:5px}.numinad.input-sm+.input-group-addon.numinad-addon{line-height:.6;margin-top:0}.numinad.input-sm+.input-group-addon.numinad-addon .numinad-down{top:2.5px}.numinad.input-lg+.input-group-addon.numinad-addon .numinad-down{padding-top:0}.numinad.input-lg+.input-group-addon.numinad-addon .numinad-up{padding-bottom:0}input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}</style></head><body><div class="input-group col-xs-12 numinad-group" ng-init="setNuminadAttributes()" ng-cloak><input id="numinad" type="number" class="numinad {{$ctrl.blzClass}}" ng-model="$ctrl.ngModel" ng-required="$ctrl.ngRequired" name="{{$ctrl.name}}" ng-maxlength="$ctrl.ngmaxlength" ng-minlength="$ctrl.ngminlength"ng-pattern="$ctrl.ngPattern"ng-disabled="$ctrl.ngDisabled" ng-change="parser(); $ctrl.ngChange({par: $ctrl.changeParameter})"min="{{$ctrl.min}}" max="{{$ctrl.max}}" step="{{$ctrl.step}}" placeholder="{{$ctrl.placeholder}}"><div class="input-group-addon numinad-addon"><span ng-show="!$ctrl.ngDisabled" class="glyphicon glyphicon-triangle-top numinad-up" ng-mousedown="pressedUp()" ng-mouseup="stopPressing()" ng-mouseleave="stopPressing()"></span><hr class="numinad-hr"><span ng-show="!$ctrl.ngDisabled" class="glyphicon glyphicon-triangle-bottom numinad-down" ng-mousedown="pressedDown()" ng-mouseup="stopPressing()" ng-mouseleave="stopPressing()"></span></div></div></body>',
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
			blzClass: "@?",
			placeholder: "@?"
		}
	});
	nia.controller('numinadCtrl', function($scope, $timeout){
		$scope.time=false;
		$scope.setNuminadAttributes = function(){
			var setStep = function() {
				if($scope.$ctrl.step){
					$scope.step=parseInt($scope.$ctrl.step);
				}else{
					$scope.step=1
				}
			};
			setStep();
		};
		$scope.checkNum = function(){
			var num = isFinite($scope.$ctrl.ngModel);
			if(!num){
				$scope.$ctrl.ngModel = 0
			};
		};
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
		};
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
		};
		$scope.stopPressing = function() {
			$scope.time=false;
		};
		$scope.parser = function(){
			var a = $scope.$ctrl.ngModel;
			$scope.$ctrl.ngModel = parseInt(a);
		}
		
	});
})(window.angular);
