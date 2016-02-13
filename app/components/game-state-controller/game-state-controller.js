'use strict';

// Declare app level module which depends on views, and components
angular.module('lifeByScu.gameStateController',[]).

controller('gameStateController',['$scope','$window',function($scope,$window){

	$scope.create_board = function(x,y,density){
		var new_board = [];
		for(var i=0; i<y; i++){
			new_board[i]=[];
			for(var j=0; j<x; j++){
				new_board[i][j] = {is_alive: Math.random()<density}
			}
		}
		$scope.board=new_board;
		$scope.max_x=x;
		$scope.max_y=y;
	}

	$scope.create_board(50,50,.15);

	$scope.iterateState = function(){
		console.log($scope.msec, $scope.steps)
		while($scope.steps>0){ 
			var next_board = [];
			$scope.board.forEach(function(element, index, array){
				next_board[index] = [];
				element.forEach(function(inner_element, inner_index, inner_array){
					next_board[index][inner_index] = {is_alive:live_next_round(index,inner_index)};
				});
			});
			$scope.board = next_board;
			$scope.steps -= 1;

		}
	}

	function count_live_neighbors(x,y) {
		var i, j, live_neighbors=0;
		for(i=max(x-1,0);i<min(x+2,$scope.max_y);i=i+1) {
			for(j=max(y-1,0);j<min(y+2,$scope.max_x);j=j+1) {
				if($scope.board[i][j].is_alive && (i!=x || j!=y)){
					live_neighbors += 1;
				}
			}
		}
		return live_neighbors;
	}

	function live_next_round(x,y){
		var live_neighbors = count_live_neighbors(x,y);

		if($scope.board[x][y].is_alive){
			return (live_neighbors>1 && live_neighbors< 4);
		} else {
			return live_neighbors == 3;
		}
	}

	function max (a,b) { return a>b?a:b;}
	function min (a,b) { return a>b?b:a;}


}]);