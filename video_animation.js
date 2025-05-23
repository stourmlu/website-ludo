/* Functions to play video */
function move2FirstPeriod() {
	timeId = timeMinId;
	updateDisplay4Period()
}
function move2NextPeriod() {
	timeId = timeId + 1;
	if (timeId > timeMaxId){
		stopTimer();
	} else{
		updateDisplay4Period()
	}
}
function move2PreviousPeriod() {
	timeId = timeId - 1;
	if (timeId < timeMinId){
		stopTimer();
	} else{
		updateDisplay4Period()
	}
}

function stopTimer() {
	if (intervalID != undefined){clearInterval(intervalID);}
}

function pauseVideo() {
	stopTimer()
	d3.select('#img_play').classed('hiddenImg', false)
	d3.select('#img_pause').classed('hiddenImg', true)
}
function stopVideo() {
	stopTimer()
	move2FirstPeriod()
	d3.select('#img_stop').classed('greyedImg', true)
	d3.select('#img_play').classed('hiddenImg', false)
	d3.select('#img_pause').classed('hiddenImg', true)
}
function resumeVideo() {
	stopTimer();
	intervalID = setInterval(function(){move2NextPeriod();}, videoInterval);
	d3.select('#img_play').classed('hiddenImg', true)
	d3.select('#img_pause').classed('hiddenImg', false)
	d3.select('#img_stop').classed('greyedImg', false)
}