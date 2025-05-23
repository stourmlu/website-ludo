// Function that computes the sum of the squared differences
function sumOfSquaredDifferences(point1, point2){
	if(point1.length != point2.length){throw "Incompatible lengths!";}
	var res = 0;
	for(var ii = 0; ii < point1.length; ii++){
		res += (point1[ii] - point2[ii])**2;
	}
	return res;
}

// Function that computes the centroids as averages of the clusters
function computeCentroids(points, assignments, centroids){
	if(points.length != assignments.length){throw "Incompatible lengths!";}
	var NumGroups = centroids.length;
	var pointDim = points[0].length;
	var groupSizes = Array.from({length: NumGroups}, () => 0);
	var myk;
	
	// Initialize the sums to zero
	for(var kk=0; kk < NumGroups; kk++){		
		for(var dd=0; dd<pointDim; dd++){
			centroids[kk][dd] = 0;
		}
	}
	// Compute the sum of the points for each cluster
	for(var ii = 0; ii < points.length; ii++){
		myk= assignments[ii];
		groupSizes[myk] += 1;
		for(var dd=0; dd<pointDim; dd++){
			centroids[myk][dd] += points[ii][dd];
		}
	}
	// Divide by the sum by the size of each cluster (to get mean)
	for(var kk=0; kk < NumGroups; kk++){		
		for(var dd=0; dd<pointDim; dd++){
			if(groupSizes[kk] > 0){
				centroids[kk][dd] = centroids[kk][dd] / groupSizes[kk];
			}
		}
	}
	return [centroids, groupSizes];
}

// Function that assigns each point to the closest centroid
function assignPoints2Centroids(points, centroids){
	var NumPoints = points.length;
	var NumCentroids = centroids.length;
	var pointDim = centroids[0].length;
	var assignments = new Array(NumPoints);
	var minSS, mySS, myAssignment;
	for(var ii = 0; ii < NumPoints; ii++){
		minSS = Infinity;
		myAssignment = -1;
		for(var kk=0; kk < NumCentroids; kk++){
			mySS = sumOfSquaredDifferences(points[ii], centroids[kk]);
			if(mySS < minSS){
				minSS = mySS;
				myAssignment = kk;
			}
		}
		assignments[ii] = myAssignment;
	}
	return assignments;
}

// Function to check whether two arrays are equal
function arraysAreEqual(arr1, arr2){
	if(arr1.length != arr2.length){return false;}
	for(var ii=0; ii < arr1.length; ii++){
		if(arr1[ii] != arr2[ii]){return false;}
	}
	return true;
}

// Function to compute the diagnostic
function SS_within(points, centroids, assignments){
	var res = 0;
	var my_k;
	for(var ii=0; ii<points.length; ii++){
		my_k = assignments[ii];
		res += sumOfSquaredDifferences(points[ii], centroids[my_k]);
	}
	return res;
}

// Function to run k-means (conditional on starting point)
function run_kmeans(points, startingCentroids){
	var centroids = startingCentroids;
	var pointDim = points[0].length;
	var criterion;
	var oldAssignments = Array.from({length: pointDim}, () => -1);
	var assignments = Array.from({length: pointDim}, () => 0);
	var NumTries = 0;
	var groupSizes;
	while(NumTries < 100 && !arraysAreEqual(oldAssignments, assignments)){
		NumTries += 1;
		oldAssignments = assignments;
		assignments = assignPoints2Centroids(points, centroids);
		[centroids, groupSizes] = computeCentroids(points, assignments, centroids);
		criterion = SS_within(points, centroids, assignments);
		//console.log(criterion);
	}
	return [centroids, assignments, groupSizes, criterion, NumTries];
}






// Function that computes the number of items that are different between two arrays
function countArrayDifferences(arr1, arr2){
	if(arr1.length != arr2.length){throw 'Incompatible lengths';}
	res = 0;
	for(var ii=0; ii < arr1.length; ii++){
		if(arr1[ii] != arr2[ii]){res+=1;}
	}
	return res;
}

function drawRandomCentroids(points, NumCentroids){
	var pointDim = points[0].length;
	var centroids = new Array(NumCentroids);
	for(var kk=0; kk < NumCentroids; kk++){
		centroids[kk] = Array.from({length: pointDim}, () => Math.random()) // TO DO: use bounds instead of unif(0,1)
	}
	return centroids;
}

function drawRandomPoints(pointDim, NumPoints){
	var points = new Array(NumPoints);
	for(var ii=0; ii < NumPoints; ii++){
		points[ii] = Array.from({length: pointDim}, () => Math.random()) // TO DO: this is unif(0,1)...
	}
	return points;
}



// Define dimensions
/*const pointDim = 8;
const NumPoints = 2000;
const NumGroups = 2;

// Draw points
var points = drawRandomPoints(pointDim, NumPoints);


// Run k-means many times
const NumIters = 500;
var finalCriterion = Infinity;
var finalCentroids = [];
var finalAssignments = [];
var NumTries;
var finalGroupSizes, groupSizes;
for(var aa=0;aa<NumIters;aa++){
	// Draw random starting centroids
	var startingCentroids = drawRandomCentroids(points, NumGroups);
	var centroids, assignments, groupSizes, criterion, NumTries;

	// Run k-means
	[centroids, assignments, groupSizes, criterion, NumTries] = run_kmeans(points, startingCentroids);

	// Flag convergence issues (should never happen).
	if(NumTries == 100){
		console.log('Could not converge!');
	}
	
	// If criterion improves current best results, store new results.
	if(criterion < finalCriterion){
		finalCriterion = criterion;
		finalCentroids = centroids;
		finalAssignments = assignments;
		finalGroupSizes = groupSizes;
	}
}
console.log('Done computing k-means.');
console.log('Group sizes:');
console.log(finalGroupSizes);
console.log('Within-cluster sum of squares:');
console.log(finalCriterion);
*/