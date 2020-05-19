function mergeSort(arr){
    if (arr.length === 1) {return arr; }
    if (arr.length === 2) { 
        if (arr[0] > arr[1]) { return [arr[1],arr[0]];}
        else return arr;
    }
    if (arr.length > 2){

        var subArr1 = arr.slice(0,Math.floor(arr.length/2));
        var subArr2 = arr.slice(Math.floor(arr.length/2));
        return mergeSortedArray(mergeSort(subArr1), mergeSort(subArr2));        
    }
}

function mergeSortedArray(arr1, arr2){
    let returnArr = [];

    while (arr1.length + arr2.length != 0){

        if (arr1.length == 0 && arr2.length != 0){
            returnArr.push(arr2.shift());
        }

        if (arr2.length == 0 && arr1.length != 0){
            returnArr.push(arr1.shift());
        }

        if (arr1[0] < arr2[0]) { 
            returnArr.push(arr1.shift());
        } else if (arr1[0] > arr2[0]) {
            returnArr.push(arr2.shift());
        }
    }


    return returnArr;
}

mergeSort([1,3,5,2,4,6]);