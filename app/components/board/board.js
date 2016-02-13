'use strict';

angular.module('lifeByScu.board', []).

directive('lifeBoard',[function(){
	return {
		templateUrl: 'components/board/board.html',
		restrict: 'AE'
	};

}])

