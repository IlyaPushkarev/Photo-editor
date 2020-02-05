//задачи с https://gist.github.com/codedokode/ce30e7a036f18f416ae0
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

"use strict";

/* Task 1*/
{
	function sequence(start=0, step=1){
		let c=0,temp=0;
		return function(){
			if(c==0){
				temp=start;
				c++;
			} else{
				temp+=step;
			}
			return temp;
		}
	}

	var generator = sequence(10, 3);
	var generator2 = sequence(7, 1);

	console.group("Task 1")
		console.log(generator()); // 10
		console.log(generator()); // 13
		console.log(generator2()); // 7
		console.log(generator()); // 16
		console.log(generator2()); // 8
	console.groupEnd();
}

/* Task 2*/
{
	function sequence(start=0, step=1){
		let c=0,temp=0;
		return function(){
			if(c==0){
				temp=start;
				c++;
			} else{
				temp+=step;
			}
			return temp;
		}
	}

	function take(gen,x){
		let rez_arr=[];
		for(let i=0;i<x;i++){
			rez_arr.push(gen());
		}
		return rez_arr;
	}

	var gen2 = sequence(0, 2);
	console.group("Task 2");
    console.log(take(gen2, 5)); // [0, 2, 4, 6, 8 ]
    console.groupEnd();
}

/* Task 3*/
{
	function map(fnc,arr){
		let rez_arr=[];
		for (var i = 0; i < arr.length; i++) {
			rez_arr[i]=fnc(arr[i]);
		}

		return rez_arr;
	}

	function square(x) { return x * x; } // возведение в квадрат
	console.group("Task 3")
	console.log(map(square, [1, 2, 3, 4])); // [1, 4, 9, 16]
	console.log(map(square, [])); // []
	console.groupEnd()
}

/* Task 4*/
{
	function sequence(start=0, step=1){
		let c=0,temp=0;
		return function(){
			if(c==0){
				temp=start;
				c++;
			} else{
				temp+=step;
			}
			return temp;
		}
	}

	function fmap(a,gen){
		return function(){

			return a(gen(...arguments));
		}
	}

	function add(a, b,c=0) { 
		return a + b+c; 
	}

	function square(x) { return x * x; }
	
	var gen = sequence(1, 3);
	var squareGen = fmap(square, gen);

	console.group("Task 4");
	console.log(squareGen()); // 1
	console.log(squareGen()); // 4
	console.log(squareGen()); // 9
	console.log(squareGen()); // 16

	var squareAdd = fmap(square, add);
	console.log(squareAdd(2, 3,1)); // 25 = (2 + 3) ^ 2
	console.log(squareAdd(5, 7)); // 144 = (5 + 7) ^ 2
	console.groupEnd();
}

/* Task 5*/
{
	function partial(fnc,...arr){

		return function(..._arr){

			return fnc(...arr,..._arr);
		}
	}

	function add(a, b) { return a + b; }
	function mult(a, b, c, d) { return a * b * c * d; }

	var add5 = partial(add, 5); // Мы получили функцию с 1 аргументом, которая прибавляет к любому числу 5

	console.group("Task 5");
	console.log(add5(2)); // 7
	console.log(add5(10)); // 15
	console.log(add5(8)); // 13

	var mult23 = partial(mult, 2, 3); // мы зафиксировали первые 2 аргумента mult() как 2 и 3

	console.log(mult23(4, 5)); // 2*3*4*5 = 120
	console.log(mult23(1, 1)); // 2*3*1*1 = 6
	console.groupEnd();
}

/* Task 6*/
{
	function partialAny(fnc,...arr){

		return function(...arr2){
					for (var i = 0; i < arr.length; i++) {
						if(arr[i]===undefined){arr[i]=arr2.shift()}
					}

					return fnc(...arr,...arr2);
				}
   	}

	console.group("Task 6");
	function test(a, b, c,d,e) { return 'a=' + a + ',b=' + b + ',c=' + c + ',d=' + d +',e=' + e }
	var test1_3 = partialAny(test, 1, undefined, 3,undefined,7);
	console.log(test1_3(5,6)); // a=1,b=5,c=3
	console.groupEnd("Task 6");	
}

/* Task 8*/
{
	function pluck(arr,name_field){

		/*let rez=arr.map(function(item){return item[name_field]} )*/
		let rez=[];

		for (var i = 0; i < arr.length; i++) {
			rez[i]=arr[i][name_field];
		}

		return rez;
	}
	
	var characters = [
	  { 'name': 'barney', 'age': 36 },
	  { 'name': 'fred', 'age': 40 }
	];
	console.group("Task 8");
	console.log(pluck(characters, 'name')); // ['barney', 'fred']
	console.groupEnd();
}

/* Task 9*/
{
	function filter(arr,condition){
		let rez=[];
		for (var i = 0; i < arr.length; i++) {
			if(condition(arr[i])==true){rez.push(arr[i])}
		}

		return rez;
	}
		
		var input = [1, 2, 3, 4, 5, 6];
		function isEven(x) { return x % 2 == 0; } // проверяет на четность
		console.group("Task 9")
		console.log(filter(input, isEven)); // [2, 4, 6]
		console.groupEnd()
		
}

/* Task 10*/
{
		function count(obj){
			let counter=0;
			for(let key in obj){
				counter++;
			}

			return counter;
		}

		var a = { a: 1, b: 2 };
		console.group("Task 10")
		console.log(count(a)); // 2
		var b = function some(){};

		console.log(count(b)); // 0
		var c = [1, 2, 3];
		console.log(count(c)); // 3
		var d = [];
		d[100] = 1;
		console.log(count(d)); // 1
		console.groupEnd();
		/*
		for(let key of map1.entries()){
			alert(key)
		}*/
}


/* Decorator*/
{
	let fac = function f(n){
		return (n !==1) ? f(n-1)*n : n;
	};

	let fib = function fibonacchi(n){
		return (n>2) ? fibonacchi(n-1)+fibonacchi(n-2) : 1;
	}

	function logResultDecorator(func, funcName){
		return function(){
			let rezult = func.apply(this,arguments);
			console.log(`Rezult function ${funcName}: ${rezult}`);

			return rezult;
		}
	}

	function callCountDecorator(func, funcName){
		let count=0;
		return function(){
			count++;
			console.log(`Function ${funcName} was called ${count} times`);
			return func.apply(this, arguments);
		}
	}

	function timeDecorator(func, funcName){
		return function(){
			let startTime=performance.now();
			let rezult=func.apply(this,arguments);
			let endTime=performance.now()-startTime;

			console.log(`Function ${funcName} performed ${endTime}`)
		}
	}

	function cacheDecorator(func){
		let cache={};
		return function(n){
			if(typeof cache[n] === 'undefined'){
				cache[n]=func.apply(this,arguments)
			}
			return cache[n];
		}
	}

	function argumentsCountDecorator(func, requiredNumber){
		return function(){
			let argsCount=arguments.length;

			if(requiredNumber !== argsCount){
				console.warn("Quantity of arguments does not match");
				return;
			}

			return func.apply(this, arguments);
		}
	}

	fac=logResultDecorator(fac,'factorial');
	fac=cacheDecorator(fac,'factorial');
	fac=callCountDecorator(fac,'factorial');
	fac=timeDecorator(fac,'factorial');
	fac=argumentsCountDecorator(fac,1);

	fib=logResultDecorator(fib,'fibonacchi');
	fib=cacheDecorator(fib,'fibonacchi');
	fib=callCountDecorator(fib,'fibonacchi');
	fib=timeDecorator(fib,'fibonacchi');
	fib=argumentsCountDecorator(fib,1);

	/*
	fib(36);
	fib(36);*/
}
