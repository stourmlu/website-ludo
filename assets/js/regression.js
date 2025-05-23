//math.inv([[1, 2], [3, 4]])
//var Y = [2,3,4,5,6,7,1,2,3,4];
//var X = [[1,2], [1,4], [1,4], [1,5], [1,3], [1,2], [1,2], [1,3], [1,4], [1,2]];


// Function that runs OLS estimation
function runOLS(Y, X){
	var dims = math.size(X);
	var NumObs = dims[0];
	var NumBetas = dims[1];

	// Compute beta_hat
	var Xt = math.transpose(X);
	var Xt_X_inv = math.inv(math.multiply(Xt, X));
	var Z = math.multiply(Xt_X_inv, Xt);
	var beta_hat = math.multiply(Z, Y);
	
	// Compute sigmasq_hat
	var Yhat = math.multiply(X, beta_hat);
	var residuals = math.subtract(Y, Yhat);
	var SSE = math.multiply(residuals, math.transpose(residuals));
	var sigmasq_hat = math.divide(SSE, NumObs - NumBetas);
	
	// Compute R2
	var SST = math.sum(math.dotPow(math.subtract(Y, math.mean(Y)),2));
	var SSR = SST - SSE;
	var R2 = 1 - SSE/SST;
	
	// Standard errors
	var std_errors = math.dotPow(math.diag(math.multiply(Xt_X_inv, sigmasq_hat)), 0.5);
	
	// t-values
	var t_values = math.dotDivide(beta_hat, std_errors);
	
	// p-values
	// TO DO!
	// https://en.wikipedia.org/wiki/Student%27s_t-distribution
	// view-source:https://www.math.ucla.edu/~tom/distributions/tDist.html
	//2*(1 - tcdf(abs(t_values), NumObservations-NumBetas));
	
	// F-statistic
	var F_stat = (SSR/(NumBetas-1))/(SSE/(NumObs - 1));
	
	return [beta_hat, sigmasq_hat, std_errors, t_values, R2, Yhat, residuals];
}



// Function that runs multivariate linear regression
function runMultivariateOLS(Y,X){
	var dimsY = math.size(Y);
	var dimsX = math.size(X);
	const NumY = dimsY[1];
	const NumX = dimsX[1];
	const NumObs = dimsY[0];
	if(NumObs != dimsX[0]){
		alert('X and Y do not have the same number of observations!');
	}
	
	// Compute beta_hat
	var Xt = math.transpose(X);
	var Xt_X_inv = math.inv(math.multiply(Xt, X));
	var Z = math.multiply(Xt_X_inv, Xt);
	var beta_hat = math.multiply(Z, Y); // NumX x NumY
	
	return [beta_hat];
}
