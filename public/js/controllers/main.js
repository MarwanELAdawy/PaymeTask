angular.module('todoController', []).controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
	$scope.formData = {};
	$scope.loading = true;
	Todos.get().success((data)=>{
		$scope.todos = data;
		$scope.loading = false;
	});
	$scope.createTodo = ()=>{
		if ($scope.formData.text != undefined) {
			$scope.loading = true;
			Todos.create($scope.formData).success((data)=>{
					$scope.loading = false;
					$scope.formData = {}; 
					$scope.todos = data; 
			});
		}
	};
	$scope.deleteTodo = (id)=>{
		$scope.loading = true;
		Todos.delete(id).success((data)=>{
			$scope.loading = false;
			$scope.todos = data; 
		});
	};
}]);