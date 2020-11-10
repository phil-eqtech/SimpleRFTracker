// Global
let timeReference = 0;
let device = "rtl";
let ip = location.host.split(":");
ip = ip[0];

//let frequency, bandwith, gain, samp_rate, averageTime = undefined;
let freqRange, bandwidthRange, gainRange, samp_rateRange, averageDelayRange = [undefined, undefined];
let confLoaded = false;

// Chart
let histoCtx = document.getElementById('chart').getContext('2d');
let gaugeCtx = document.getElementById('gauge').getContext('2d');

let gauge = new Chart(gaugeCtx, {
	type: 'gauge',
	data: {
		datasets: [{
			data:[60,90,120,150],
			backgroundColor: [
			'rgba(168, 53, 53, 255)',
			'rgba(235, 156, 53, 255)',
			'rgba(236,216,37,255)',
			'rgba(13, 145, 39, 255)'],
			value:0,
			borderWidth:1
		}]
	},
	options: {
		needle: {
		  radiusPercentage: 2,
		  widthPercentage: 3.2,
		  lengthPercentage: 80,
		  color: 'rgba(0, 0, 0, 1)'
		},
		valueLabel: {
			display: true,
			formatter: (value) => {
				return value - 150;
			}
		}
	}
});

let chart = new Chart(histoCtx, {
	type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Power (in dB)',
            data: [],
            backgroundColor: 'rgba(20,200,20,255)',
            borderColor: 'rgba(20,200,20,255)',
			fill: false,
            borderWidth: 1
        }]
    },
    options: {
		responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    min: -120
                }
            }]
        }
    }
});

// Websocket
let socket = new WebSocket("ws://" + ip + ":1880/ws/");

socket.onopen = function(e) {
  console.log("[WS] Connection established");
};

socket.onmessage = function(event) {
  //console.log(`[message] Data received from server: ${event.data}`);
  let item = JSON.parse(event.data);
  if (timeReference == 0) {
	timeReference = item.timestamp;
  }
  chart.data.datasets[0].data.push(Math.round(item.rss));
  chart.data.labels.push(Math.round(item.timestamp - timeReference)/1000);
  if (chart.data.datasets[0].data.length > 20) {
	  chart.data.datasets[0].data.shift();
	  chart.data.labels.shift();
  }
  chart.update();
  
  gauge.data.datasets[0].value = 150 + Math.round(item.rss);
  gauge.update();
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[WS] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    console.log('[WS] Connection died');
  }
};

socket.onerror = function(error) {
  alert(`[WS] Error : ${error.message}`);
};

let updateGainValue = function() {
	$("#gain_help").html($("#gain").val().toString() + " db");
}

$("#gain").on('mousedonw', function() {
  updateGainValue();
  
});

$("#gain").on('mouseup',function() {
  clearInterval(updateGainValInterval);
});

$("#config").click(function() {
  let confIsValid = true;
  let g = parseInt($("#gain").val());
  let f = parseFloat($("#freq").val());
  let b = parseInt($("#bandwidth").val());
  let s = parseFloat($("#sampRate").val());
  let a = parseFloat($("#averageDelay").val());
  
  if (g < gainRange[0] || g > gainRange[1]) {
	  confIsValid = false;
	  $("#gain_help").removeClass("d-none");
  } else $("#gain_help").addClass("d-none");
  
  if (f < freqRange[0] || f > freqRange[1]) {
	  confIsValid = false;
	  $("#freq_help").removeClass("d-none");
  } else $("#freq_help").addClass("d-none");
  
  if (b < bandwidthRange[0] || b > bandwidthRange[1]) {
	  confIsValid = false;
	  $("#bandwidth_help").removeClass("d-none");
  } else $("#bandwidth_help").addClass("d-none");
  
  if (s < sampRateRange[0] || s > sampRateRange[1]) {
	  confIsValid = false;
	  $("#sampRate_help").removeClass("d-none");
  } else $("#sampRate_help").addClass("d-none");
  
  if (a < averageDelayRange[0] || a > averageDelayRange[1]) {
	  confIsValid = false;
	  $("#averageDelay_help").removeClass("d-none");
  } else $("#averageDelay_help").addClass("d-none");
  
  if (confIsValid == true) {  
	  $.ajax('http://' + ip +':1880/write_config', {
		  type: 'GET',
		  data: {'gain': g,
				 'freq': f,
				 'bandwidth': b,
				 'sampRate': s,
				 'averageDelay': a},
		  success: function(data, status, xhr) {
			  console.log("config written");
			  console.log(data);
			  $('#modalConfig').modal('hide');
		 },
		 error: function(jqXhr, textStatus, errorMessage) {
			console.log(errorMessage);
		 }
	  });
  }
});



$(document).ready(function() {
	$.ajax('http://' + ip + ':1880/read_config', {
	  type: 'GET',
	  success: function(data, status, xhr) {
		 console.log(data);
		 $("#freq").val(data.freq);
		 $("#bandwidth").val(data.bandwidth);
		 $("#gain").val(data.gain);
		 $("#gain").attr({
			"min":data.gainRange[0],
			"max":data.gainRange[1],
			});
		 $("#sampRate").val(data.sampRate);
		 $("#averageDelay").val(data.averageDelay);
		 updateGainValue();
		 
		 gainRange = data.gainRange;
		 freqRange = data.freqRange;
		 bandwidthRange = data.bandwidthRange;
		 sampRateRange = data.sampRateRange;
		 averageDelayRange = data.averageDelayRange;
	 },
	 error: function(jqXhr, textStatus, errorMessage) {
		console.log(errorMessage);
	 }
  });
  updateGainValInterval = setInterval(updateGainValue, 300);
});
