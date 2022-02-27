// OMARO GRANT 1700250770


const fs = require('fs')
const prompt = require('prompt-sync')()

const { JSDOM } = require("jsdom")
const { window } = new JSDOM()

// O(n(log(n)))
// Quicksort (Divide and Conquer) using the tail recursion
// uses somethhing called pivating were it breaks the array in smaller list

const swap = (arr, leftIndex, rightIndex) => {
    let temp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = temp;
}

const partitionMiddle = (arr, low, high) => {
  //Get the mid index
  const mid = Math.floor((low + high) / 2);
  //Swap the mid element with first element
  swap(arr, mid, low);
  
  //Now use the first element as pivot
  let pivot = arr[low];
  let lo = low + 1;
  let hi = high;
  
  //Partition the array based on the pivot
  while(lo <= hi){
    //Move towards each other
    while(arr[hi] > pivot){
      hi = hi - 1
    }
    
    while(lo <= hi && arr[lo] <= pivot){
      lo = lo + 1;
    }
    
    //When inversion found swap the elements
    if(lo <= hi){
      swap(arr, lo, hi);
      lo = lo + 1;
      hi = hi - 1;
    }
  }
  
  swap(arr, low, hi);
  
  //Return the pivot index
  return hi;
}

const quickSort = (arr, low, high) => {
    // base condition
    if (low >= high) {
      return;
    }

    // rearrange the elements across pivot
    const pivot = partitionMiddle(arr, low, high);

    // recur on sub-array containing elements less than pivot
    quickSort(arr, low, pivot - 1);

    // recur on sub-array containing elements more than pivot
    quickSort(arr, pivot + 1, high);
}

// O(N^2)
// The Bubble Sort will recieve a integer array as input
const bubbleSort=(arr)=>{
	// declare i and j variable
	let i,j
	// the length variable is assigned to the length of the array
	let length = arr.length

	// Initialized the isSwapped variable to be initialy false
	let isSwapped = false

	// This loop will run as long as i is lesser than the array length
	for(i=0; i < length; i++){
		isSwapped=false

		// Last i elements are already in place  
		for (j=0; j < length; j++) {
			// Check if item at j is greater than its next iteration
			if (arr[j] > arr[j+1]) {
				// If its true then swap the values
				let temp = arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
				isSwapped = true
			}
		}
	}
	// fs.writeFile('result.txt', time, 'utf8', callback)
}
// End of Bubble Sort Algoritm

// time complexity-O(N(log(n))) because it looks for the numbers recursively
// space complexity- O(n) because we are breaking up the arrays in sub arrays
// MergeSort is just breaking array into sub arrays then merging them back together
// Merge sort is a divide ad concquer algorithm

const mergeSort = (arr,left,right)=>{
	// Base case if the left is greater than or equal to right
	if(left>=right){
		return
	}

	let middle = left + parseInt((right-left)/2)

	// Call mergeSort for first half
	mergeSort(arr,left,middle);

	// Call mergeSort for second half
    mergeSort(arr,middle+1,right);

    // Merge the two halves sorted in first halff and second half
    mergeArray(arr,left,middle,right);

	
}

const mergeArray = (arr, left, middle, right) =>{
	let firstArray = middle - left + 1
	let secondArray = right - middle

	// create temporary arrays
	let leftArray = new Array(firstArray)
    let rightArray = new Array(secondArray)

    // copy data to both left and right tempoirary arrays
    for (let i = 0; i < firstArray; i++)
        leftArray[i] = arr[left + i];
    for (let j = 0; j < secondArray; j++)
        rightArray[j] = arr[middle + 1 + j]

    // Merge the temp arrays back into arr[l..r]
    let i = 0
    let j = 0

    // Initial index of merged subarray
    let k = left;

    while (i < firstArray && j < secondArray) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i]
            i++;
        }
        else {
            arr[k] = rightArray[j]
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < firstArray) {
        arr[k] = leftArray[i]
        i++
        k++
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < secondArray) {
        arr[k] = rightArray[j]
        j++
        k++
    }

}
// End of MergeSort

// O(n^2)
const insertionSort = arr=>{
	// Loops over all elements of the array starting with first element of the array
	for (let i=1; i < arr.length; i++) {
		let comparingNumberToInsert = arr[i]
		let j
		// h
		for(j=i-1; arr[j] > comparingNumberToInsert && j >= 0; j--){
			// If not move that number to the side
			arr[j+1]=arr[j] // moves the numbers backward
		}
		// Insert that number
		arr[j + 1]= comparingNumberToInsert
	}
	return arr
}

// Starting of Heap Sort
const heapSort = arr=>{
	// create maxheap
	arr=createMaxHeap(arr)
	for(let i = arr.length - 1; i>0; i--){
		swapPlace(0,i,arr)
		heapify(arr,0,i)
	}
	return arr
}

// Fuction to loop over array and call heapify in reverse order
const createMaxHeap = arr =>{
	for(let i = Math.floor(arr.length/2)-1; i >= 0; i--){
		heapify(arr, i , arr.length)
	}
	return arr
}

// Fuction to swap two items in the arra
const swapPlace = (indexOne, indexTwo, arr)=>{
	let temp = arr[indexOne]
	arr[indexOne] = arr[indexTwo]
	arr[indexTwo] = temp
	return arr
}

// Check if current element is in the right place or if its larger than its children
const heapify = (arr,index,heapSize)=>{
	const left = 2 * index  + 1 // Left child
	const right = 2 * index + 2 // Right child

	// Stores the lategest value index
	let largetValueIndex = index

	if(heapSize > left && arr[largetValueIndex] < arr[left]){
		largetValueIndex = left
	}

	if(heapSize > right && arr[largetValueIndex] < arr[right]){
		largetValueIndex = right
	}

	if(largetValueIndex !== index){
		// does the swapping
		swapPlace(index,largetValueIndex, arr)

		heapify(arr,largetValueIndex, heapSize)
	}
}

// End of Heap Sort


// Starting of Section Sort
// O(N^2)
const swapping = (arr, arrayX, arrayY)=>{
	let temp = arr[arrayX];
    arr[arrayX] = arr[arrayY];
    arr[arrayY] = temp;
}
const selectionSort = (arr, length) =>{
	let i, j, minIndex

	// this loop will move the boundary for unsorted sub array
	for (i = 0; i < length-1; i++)
    {
        // Find the minimum element in unsorted array
        minIndex = i;
        for (j = i + 1; j < length; j++)
        if (arr[j] < arr[minIndex])
            min_idx = j;
  
        // Swap the found minimum element with the first element
        swap(arr,minIndex, i);
    }
}
// End of Selection Sort

const displayTime = (startTime, finishedTime)=>{
	// the finishedTime hold the time for when the sorting operation finishes
  	// this console.log will print the time taken to the console in milliseconds
  	console.log(`This algorithm took: ${finishedTime-startTime} milliseconds`)
}

// This function is a arrow function which takes two arguments; the response from user of which sort operation they want to perform as well as the file containg all elements to sort
const recieveFileAndSort = (res,file) => {
	// the readFile is a function from the File System Module, it will read the data from as well as a callback function that as two arguments the data and any errors found
	fs.readFile(file, 'utf8' , (err, data) => {
		// this if statement will check to see if their was any error with the file and throw an error if any errors were found
		 if (err) throw err
		 
		 // this variable will be a assigned to the data that was recieved from the inputed file
		 let arrayElements = data

		 // the items is being initializeto a new empty Array
		 let items = new Array()
		 // Then set items to arrayElemnts which all commas have being striped from the data
		 items=arrayElements.split(",")

		 // Loop through all the elements in items and returns them as integer
		  for(let i in items){
		  	// by default the elemnts stored in items are all strings, so the parseInt function will parse all the strings and return them as all integers 
		  	items[i]=parseInt(items[i],10)
		  }


		  // this will use the response from the sortResponse Variable and choose either bubble sort or quick sort
		  if(Number(res)===1){
		  	// this variable stores the start time for the function
		  	let startTime = window.performance.now()
		  	// if the response was 1 the run the bubbleSort function and pass all the elements in items as the argument
		  	bubbleSort(items)
		  	let finishedTime = window.performance.now()
		  	displayTime(startTime, finishedTime)
		  }else if(Number(res)===2){
		  	let startTime = window.performance.now()
		  	// if the response was 2 the run the QuickSort function and pass all the elements in items as the argument, 0 as the start and items.length-1 as end of the array
		  	quickSort(items, 0, items.length - 1)
		  	//QuickSort(temp, 0, temp.length-1)
		  	let finishedTime = window.performance.now()
		  	displayTime(startTime, finishedTime)
		  }else if(Number(res)===3){
		  	let startTime = window.performance.now()
		  	// if the response was 3, then run the Selection sort function and pass all the elements in items as the argument
		  	selectionSort(items,items.length)
		  	let finishedTime = window.performance.now()
		  	displayTime(startTime, finishedTime)
		  }else if(Number(res)===4){
		  	let startTime = window.performance.now()
		  	// if the response was 4, then run the HeapSort function and pass all the elements in items as the argument
		  	heapSort(items)
		  	let finishedTime = window.performance.now()
		  	displayTime(startTime, finishedTime)
		  }else if(Number(res)===5){
		  	let startTime = window.performance.now()
		  	// if the response was 5 then run the insertionSort function and pass all the elements in items as the argument
		  	insertionSort(items)
		  	let finishedTime = window.performance.now()
		  	displayTime(startTime, finishedTime)
		  }else if(Number(res)===6){
		  	let startTime = window.performance.now()
		  	// if the response was 6 then run the mergeSort function and pass all the elements in items as the argument
		  	mergeSort(items, 0, items.length-1)
		  	let finishedTime = window.performance.now()
		  	displayTime(startTime, finishedTime)
		  }else{
		  	console.log("Wrong response")
		  }

  		console.log(items)
	})
}

// this variable will store the path for the given input fiile, at start it is set to an empty string
let inputFile = ""

// Menu to be displayed to user to choose sort function to perform
console.log("1. Bubble Sort \n2. Quick Sort \n3. Selection Sort \n4. Heap Sort \n5. Inserion Sort \n6. Merge Sort")
const sortResponse = prompt('\nChoose your designated sort function?\n');


// Menu to be displayed to user to choose the file size they want to sort, at the moment these are unsorted elements
console.log("\n1. 15k elements \n2. 65k elements \n3. 150k elements")
// The fileSize variable recieves the response from user of the file size chosen
const fileSize = prompt('\nChoose your file size you want to sort?\n');


// Function that recieves will recieve the path file of given file size and set the inputFile variable to that path based on the user response
const reciveFileSize = input => {
	if(Number(input)===1){
		return inputFile = "./test_input_15k.txt"
	}else if(Number(input)===2){
		return inputFile = "./test_input_65k.txt"
	}else if(Number(input)===3){
		return inputFile = "./test_input_150k.txt"
	}else{
		console.log("Response was incorrect!!!")
	}
}

// This variable will be set to the return path of the given from the recieveFileSize function
const fileSizeResponse = reciveFileSize(fileSize)

// After the path of the chosen file have been set the recieveFileAndSort function will run, it also takes two arguments; the sort response either bubble sort or quick sort, and also the file path from the fileSizeResponse variable
recieveFileAndSort(sortResponse,fileSizeResponse)