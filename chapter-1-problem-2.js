/*

CSX0003 - You are given as input an unsorted array of n distinct numbers, 
where n is a power of 2. Give an algorithm that identifies the second-largest number in the array, 
and that uses at most 𝑛+log2𝑛−2 comparisons.

ie: if array is size of 8 (2 ^ 3), we are allowed at most:
8 + log2(8) - 2
Which is 6 + 3 = 9 comparisons

Key takeaways from this problem:
- n is power of 2. We're guranteed an even split
- We're limited in amounts of comparisons.

Assumptions:
n ^ 0 is invalid given there would be no second largest number (return -1 in that case)
n ^ 1 would return the smaller number right away
the set of numbers is positive
the set of numbers is distinct (no repeats)

*/


function returnSecondLargest(array) {

    // Basic case - return null
    if (array.length <= 1) {
        return null; // invalid
    }

    // Only 2 elements - return the smaller
    if (array.length == 2) {
        return Math.min(array[0], array[1]);
    }

    let numComparisons = 1;                         // Use this to track the # of comparisons done     
    let largestSum = array[0] + array[1];           // Initialize to the sum of first 2 elements        
    let currentSum;                                 // Compare this to largestSum
    let largestNum = Math.max(array[0], array[1])   // First comparison was done already for 'largestNum

    for (var i = 2; i < array.length; ++i){

        currentSum = largestNum + array[i];        
        numComparisons++;

        if (currentSum > largestSum){
            largestSum = currentSum;

            console.log(`sum is now: ${largestSum}`)
            
            numComparisons++;

            if (array[i] > largestNum) {

                largestNum = array[i];
                console.log(`largestNum is now: ${largestNum}`)
            }
            

            

        }
       

    }


    console.log(`Number of comparisons: ${numComparisons}`);
    return largestSum - largestNum;                 // Subtracting largest num from sum gets 2nd largest

}


/*

https://stackoverflow.com/questions/9889679/find-second-largest-number-in-array-at-most-nlog%E2%82%82n%E2%88%922-comparisons

*/ 



function findSecondLargest(array) {

    return recurFor2ndLargest(array)


}

function recurFor2ndLargest(array, high, low) {

    if (low >= high) {
        return Math.max(array[0], array[1]);
    }
    else if (array.length > 2){

        midPoint = Math.floor(array.length / 2);
        leftArr = array.slice(0, midPoint)
        rightArr = array.slice(midPoint)

        console.log(leftArr)
        console.log(rightArr)

        

    }



}

function getLargerNumber(a,b){
    return Math.max(a,b);
}