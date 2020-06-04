/* 

CSX0003 - You are given a sorted (from smallest to largest) array A of n distinct integers which can be positive, negative, or zero. You want to decide whether or not there is an index i such that A[i] = i. Design the fastest algorithm that you can for solving this problem.

*/

// Note: This assumes the algorithm is actually correct!
function runComparisonTest(){

    let caseA = [-1, 1, 2, 3, 4]; // Find 1
    let caseB = [-1, 0, 1, 2, 4]; // Find 4
    
    let caseC = [-40, -30, -20, -10, 0, 1, 2, 3, 4, 5, 10, 50, 100, 1000, 2000]; // Find 10
    let caseD = [-1, 1, 2, 3]; // Find 1


    let testCases = [caseA, caseB, caseC, caseD];

    // Add some randomness for some fun!

    for (var j = 0; j < 10; ++j) {
        testCases.push(generateRandomTestCaseArrayOfSizeAndLimit(1000000));
    }

    // Do our bruteforce test followed by the 'sexy' case in this loop    

    for (var i = 0; i < testCases.length; ++i){

        let bruteLabel = `[brute]testCase-${i}`;
        let sexyLabel = `[sexy]testCase-${i}`;


        try {
            console.time(bruteLabel)
            bruteForceApproach(testCases[i]);
            console.timeEnd(bruteLabel)
        } catch {
            console.error(`error with ${bruteLabel}`)
            console.timeEnd(bruteLabel)
        }

        try {
            console.time(sexyLabel)
            betterApproach(testCases[i]); // TODO
            console.timeEnd(sexyLabel)
        } catch (e){
            console.error(`error with ${sexyLabel}: ${e}`)
            console.error(`test case: ${JSON.stringify(testCases[i])}`)
            console.timeEnd(sexyLabel)
        }
        

    }



}


function generateRandomTestCaseArrayOfSizeAndLimit(x){

    let arr = new Set();
    let counter = 0;
    let maxCounter = Math.floor(Math.sqrt(x))
    let limit = x*2;

    for (var i = 0; i < x; ++i){
        let t = util_genRandomNumber(limit)
        
        while (arr.has(t)){
            t = util_genRandomNumber(limit);
            counter++;
            if (counter > maxCounter){
                // short terminate, there's some bad input
                console.error("potential infinite case found")
                return;
            } 
        }

        counter = 0;
        arr.add(t);
    }
    return Array.from(arr).sort((a,b) => {return a-b});
}


function util_genRandomNumber(limit){

    return Math.floor(Math.random()*(limit*2)) - limit;
}

/*
Brute force approach iterates through the whole array, short terminating if there is a match.
Worst case O(n)
Best case O(1) if the first index matches
*/


function bruteForceApproach(sortedArr){

    for (var i = 0; i < sortedArr.length; ++i) {
        if (sortedArr[i] == i) {
            
            return true;
        } 
    }

    return false;

}


/*

Initial try. This failed to achieve a better time.
Reason - I'm still iterating through the entire array in a sense.
The point of divide and conquer is to solve a problem faster.

*/

function betterApproach(sortedArr){

    // Short terminate

    return recurBest(sortedArr, 0, sortedArr.length-1);

}

function recurBetter(array, startIndex){

    // console.log(`recur called on ${JSON.stringify(array)} with starting index of ${startIndex}`);

    if (array.length == 0){
        // console.log('length of array is empty, end recur');
        return false;
    }

    if (array.length == 1 && array[0] == startIndex){
        // console.log('match found, bubble true back up');
        return true;
    }

    if (array.length == 2 && (array[0] == startIndex || array[1] == startIndex + 1)){
        // console.log('match found, bubble true back up');
        return true;
    }



    // If none of these hold true, recur deeper. 

    if (array.length > 2) {

            // Case #1 - if the value at the index 0 is already greater, no point. just return
    if (array[0] > startIndex) {
        // console.log(`value: ${array[0]} at start index is bigger than start index itself: ${startIndex}`);
        return false;
    }
    
    // Case #2 - if the value at the last index 0 is smaller, we can just return here as well
    // ex: last index value is 49, we are at index 100
    if (array[array.length-1] < array.length-1) {
        // console.log(`value: ${array[array.length-1]} at last index is smaller than last index itself: ${array.length-1}`);
        return false;
    }

        // console.log(`now calling recur on ${JSON.stringify(array)}`);


        let middlePoint = Math.floor((array.length/2));
        let arrLeft = array.slice(0, middlePoint);
        let arrRight = array.slice(middlePoint)
    
        // console.log(`startindex: ${startIndex}, middlepoint: ${middlePoint} , arrleft = ${JSON.stringify(arrLeft)}, arrright = ${JSON.stringify(arrRight)}`)
    
    
        return recurBetter(arrLeft, startIndex) || 
                recurBetter(arrRight, startIndex+middlePoint)
        
    }

    return false
   


}


/*
https://www.geeksforgeeks.org/find-a-fixed-point-in-a-given-array/

Looking up this approach - this makes sense. I'll have to tweak my code above.
I need to eliminate the half that doesn't make sense and only recur on the half that does.
This is essentially binary sort.
The problem name is "fixed point" 

*/

function recurBest(array, start, end){

    let midPoint = Math.floor((start+end)/2)

    // console.log(`recur called on ${JSON.stringify(array)} for index ${start} to ${end}, checking midPoint ${midPoint}`);

    if (start == midPoint && array[midPoint] != midPoint){
        return false;
    }

    if (array[start] == start) {
        // console.log("found match")
        return true;
    }

    if (array[end] == end) {
        // console.log("found match")
        return true;
    }

    if (array[midPoint] == midPoint){
        // console.log("found match")
        return true;
    } else if (array[midPoint] > midPoint){
        return recurBest(array, start, midPoint)
    } else {
        return recurBest(array, midPoint, end)
    }





}




// let caseD = [-2, -1, 0, 1, 2, 3, 6]; // Find 1
// let caseC = [-40, -30, -20, -10, 0, 1, 2, 3, 4, 5, 10, 50, 100, 1000, 2000]; // Find 10
let caseE = [-193,-190,-183,-182,-171,-160,-155,-152,-148,-146,-145,-128,-127,-117,-116,-115,-114,-103,-101,-94,-93,-91,-81,-80,-78,-76,-75,-74,-72,-71,-67,-66,-64,-60,-55,-53,-52,-49,-48,-47,-41,-40,-36,-33,-25,-21,-18,-17,-14,-13,-12,-10,-9,-3,14,15,18,21,24,27,28,33,40,43,45,48,50,51,56,57,67,72,83,89,93,96,97,101,105,108,112,118,123,125,126,128,132,133,144,159,160,161,165,172,173,184,185,187,193,199];
betterApproach(caseE);