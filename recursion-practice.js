// Recursion practice

/*
Question 1: Sum all numbers
Write a function called sumRange. 
It will take a number and return the sum of all numbers from 1 up to the number passed in.

Sample: sumRange(3) returns 6, since 1 + 2 + 3 = 6.
*/

function sumRange(num){
    
    if (num == 1){ return 1; } 
    else { 
        return num + sumRange(num-1)
    }

}

// Test:

sumRange(3); // 6


/*

Question 2: Power function
Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1.

Sample:

console.log(power(2, 4)); // 16
console.log(power(2, 3)); // 8
console.log(power(2, 2)); // 4 
console.log(power(2, 1)); // 2
console.log(power(2, 0)); // 1

*/

function power(base, exponent) {
    if (exponent == 0) { return 1; }
    if (exponent == 1) { return base;  }
    else { return base * power(base, exponent - 1); }
}


console.log(power(2, 4)); // 16
console.log(power(2, 3)); // 8
console.log(power(2, 2)); // 4 
console.log(power(2, 1)); // 2
console.log(power(2, 0)); // 1


/*

Question 3: Calculate factorial
Write a function that returns the factorial of a number. As a quick refresher, a factorial of a number is the result of that number multiplied by the number before it, and the number before that number, and so on, until you reach 1. The factorial of 1 is just 1.

Sample:

factorial(5); // 5 * 4 * 3 * 2 * 1 === 120

*/


function factorial(num) {

    if (num == 1){
        return 1;
    } else {
        return num * factorial(num-1);
    }

}


factorial(5); // 5 * 4 * 3 * 2 * 1 === 120



/*

Question 4: Check all values in an array
Write a function called all which accepts an array and a callback and returns true if every value in the array returns true when passed as parameter to the callback function

Sample:

var allAreLessThanSeven = all([1,2,9], function(num){
	return num < 7;
});

console.log(allAreLessThanSeven); // false


*/


function all(array, callback) {

    if (array.length == 0){
        return true;
    }

    if (array.length == 1){
        if (callback(array)){
            return true;
        } else {
            return false;
        }
    }

    else {
        array.shift() // muttates the array
        if (all(array, callback)){
            return true;
        } else return false;
    }

}

var allAreLessThanSeven = all([1,2,9], function(num){
	return num < 7;
});

console.log(allAreLessThanSeven); // false

var allAreLessThanSeven = all([1,2,3], function(num){
	return num < 7;
});

console.log(allAreLessThanSeven); // true