function Bass_forecast(pValue, qValue, mValue, NumPeriods, cumY0){
  	var newY_values	= new Array(NumPeriods);
  	var cumY_values	= new Array(NumPeriods);
	
	laggedCumY = cumY0;
	for(var ii=0; ii<NumPeriods; ii++){
		newY_values[ii] = (pValue+qValue/mValue*laggedCumY)*(mValue-laggedCumY);
		laggedCumY = laggedCumY + newY_values[ii];
		cumY_values[ii] = laggedCumY;
	}
	return [newY_values, cumY_values];
}
