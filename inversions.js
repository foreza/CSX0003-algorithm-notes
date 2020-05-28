
function countInversionsForArray(array) {

    let result = countInversionsRecursive({arr: array, count: 0});
    console.log("result of recursion:", result.count);
    return result.count;
}


function countInversionsRecursive(arrayObject) {

    if (arrayObject.arr.length <= 1) {
        let baseCaseObj = {
            arr: arrayObject.arr,
            count: 0
        }
        // console.log(`countInversionsRecursive - arr len <= 1 case has count: ${baseCaseObj.count} with ${baseCaseObj.arr}`)
        return baseCaseObj;
    }

    else if (arrayObject.arr.length === 2) {

        let baseCaseObj = {
            arr: arrayObject.arr,
            count: 0
        }

        if (arrayObject.arr[0] > arrayObject.arr[1]) {
            baseCaseObj.count = 1;
            baseCaseObj.arr.push(arrayObject.arr[1]);
            baseCaseObj.arr.push(arrayObject.arr[0]);
        }

        // console.log(`countInversionsRecursive - arr len  == 2 case has count: ${baseCaseObj.count} with ${baseCaseObj.arr}`)

        return baseCaseObj;
    }

    else {
        let subArr1Obj = {
            arr: arrayObject.arr.slice(0, Math.floor(arrayObject.arr.length / 2)),
            count: 0
        }
        let subArr2Obj = {
            arr: arrayObject.arr.slice(Math.floor(arrayObject.arr.length / 2)),  
            count: 0
        } 

        let obj = mergeAndReturnSortedArrayWithCount(countInversionsRecursive(subArr1Obj), countInversionsRecursive(subArr2Obj))

        // console.log(`returned merged array: ${obj.sortedArr}, current count: ${obj.count}`);

        return obj;

    }

}


// Assumption - array 1 and array 2 need to be merged and that arr 1 is the "smaller"
function mergeAndReturnSortedArrayWithCount(arr1Obj, arr2Obj) {

    let arr1 = arr1Obj.arr;
    let arr2 = arr2Obj.arr;

    let mergedObj = {
        count: 0,          // Initialize a count variable
        arr: []     // Initialize an array to return
    }

    // While either array has content, continue the merge & count procedure
    while (arr1.length + arr2.length != 0) {

        // Case 0a: Array 2 has content, array 1 has no content
        if (arr1.length == 0 && arr2.length != 0) {
             // Count an inversion for this step
            // mergedObj.count++;
            mergedObj.arr.push(arr2.shift());
        }

        // Case 0b: Array 1 has content, array 2 has no content
        else if (arr2.length == 0 && arr1.length != 0) {
            mergedObj.arr.push(arr1.shift());
        }

        // Case 1: current value of first element of Array 1 SMALLER than (<) current value of first element of array 2
        else if (arr1[0] <= arr2[0]) {
            // No inversion here
            mergedObj.arr.push(arr1.shift());
        } 

        // Case 2: current value of first element of Array 1 GREATER than (>) current value of first element of array 2
        else if (arr1[0] > arr2[0]) { 
            // Count an inversion for this step
            mergedObj.count++;
            mergedObj.arr.push(arr2.shift());
        }

        else {
            // We should not be here
            alert("we shoujldn't be here")
        }

    }


    // console.log(`sorted and merged sub arr is ${mergedObj.arr} and the count of 'split' inversions is ${mergedObj.count}`)

    // Update the count with the aggregated counts from the 2 subproblems
    mergedObj.count += (arr1Obj.count + arr2Obj.count);

    // console.log(`count of total inversions is now ${mergedObj.count}`)

    return mergedObj;

}


function generateRandomNumberSetOfSizeAndMax(size, max) {

    let arr = [];

    for (var i = 0; i < size; ++i) {
        arr.push(Math.ceil(Math.random() * max))
    }

    return arr;

}

function calculateInversionsBruteForce(arr) {

    let numInversions = 0;

    console.log(`input arr: ${arr}`);

    for (var i = 0; i < arr.length; ++i) {

        for (var j = 0; j < arr.length; ++j) {

            if (arr[j] > arr[j + 1]) {
                let t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
                numInversions++;

            }

        }

    }

    console.log(`result arr: ${arr} with num of inversions: ${numInversions}`)

}


let arr1 = [6, 5, 4, 3, 2, 1];
// let arr1 = [2, 1];


console.time("brute");
calculateInversionsBruteForce(generateRandomNumberSetOfSizeAndMax(10000, 100));
// calculateInversionsBruteForce(arr1);
console.timeEnd("brute");

console.time("recur");
countInversionsForArray((generateRandomNumberSetOfSizeAndMax(10000, 100)));
console.timeEnd("recur");