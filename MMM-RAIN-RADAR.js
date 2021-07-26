/* Magic Mirror
 * Module: MMM-RAIN-RADAR
 *
 * By jojoDuQuartier
 * Inspired By Mykle1 @ https://github.com/mykle1/MMM-ISS-Live
 * MIT Licensed
 *
 */

Module.register("MMM-RAIN-RADAR", {

	defaults: {
		height: "270px",
		width: "400px",
		zoomLevel: 6,
		mapType: 3, //0-Road Map 1-Satellite 2-Dark Map 3-OpenStreetMaps 4-Light Map
		color: 3, //0-Original 1-Universal Blue 2-TITAN 3-The Weather Channel 5-NEXRAD Level-III 6-RAINBOW @ SELEX-SI
		snow: 1,
		smoothing: 1,
		opacity: 88,
		fastAnimation: 0,
		coverage: 0,
		darkTheme: 1,
		UTCtime: 0,
		legend: 1,
		legendMin: 0, //set legend to 1 if you want legendMin to show
		animate: 1,
		area: "IL",
		updateOnWarning: 1,
		updateInterval: 5 * 60 * 1000, // every five minutes check for alerts
	},

	start: function () {
		self = this;
		this.scheduleUpdate(this.updateInterval);
	},

	getStyles: function () {
		return ["MMM-RAIN-RADAR.css"];
	},

	getDom: function () {

		let iframe = document.createElement("IFRAME");
		iframe.id = "mmrainviewerframe";
		iframe.classList.add("iframe");
		iframe.style = "border:0";
		iframe.width = this.config.width;
		iframe.height = this.config.height;

		let lat = this.config.lat;
		let lon = this.config.lon;

		// tail for src
		let tail = `${this.config.zoomLevel}&oFa=${this.config.fastAnimation}&oC=${this.config.coverage}&oU=${this.config.UTCtime}&oCS=${this.config.legend}&oF=0&oAP=${this.config.animate}&rmt=${this.config.mapType}&c=${this.config.color}&o=${this.config.opacity}&lm=${this.config.legendMin}&th=${this.config.darkTheme}&sm=${this.config.smoothing}&sn=${this.config.snow}`;
		iframe.src = `https://www.rainviewer.com/map.html?loc=${lat},${lon},${tail}`;

		return iframe;
	},

	// Override getHeader method.
	getHeader: function () {
		if (this.config.useHeader) {
			return "Rain Viewer";
		}
	},

	/* show or hide module (compliments)
	 * Requests new data from openweather.org.
	 * Calls processWeather on succesfull response.
	 */
	updateWarnings: function () {

		var url = `https://api.weather.gov/alerts/active/area/${this.config.area}`;
		var self = this;

		fetch(url).then(
			function (response) {
				if (response.ok) {
					return response.json();
				}
			}
		).then(function (myJson) {
			// console.log(JSON.stringify(myJson));
			self.processWarning(myJson);
		}
		);
	},

	/* processWarning(data)
	 * Uses the received data to set the various values.
	 *
	 * argument data object - Weather information received form openweather.org.
	 */
	processWarning: function (data) {

		console.log(this.name + ": Inside Process");
		if (!data) {
			// Did not receive usable new data.
			// Maybe this needs a better check?
			return;
		}

		var self = this;

		// features
		var features = data.features;

		// severity to pick and urgency not to pick
		var severity_array = ['moderate', 'severe', 'extreme']
		var urgency_array = ['unknown', 'past']

		// any of them severe and current?
		for (let index = 0; index < features.length; index++) {
			const element = features[index];
			if (severity_array.includes(element.properties.severity.toLowerCase()) &
				urgency_array.indexOf(element.properties.urgency.toLowerCase() === -1)) {
				// TODO - we techincally want flood related events only?
				// if user checks snow then we also check for snow alerts
				console.log(element.properties.event);
				self.show();
				return;
			};
		};
		console.log(this.name + ": No Active Warnings! Suspending Self");
		self.hide();
	},

	scheduleUpdate: function (delay) {
		if (this.config.updateOnWarning) {
			var nextLoad = this.config.updateInterval;
			if (typeof delay !== "undefined" && delay >= 0) {
				nextLoad = delay;
			}

			var self = this;
			setInterval(function () {
				self.updateWarnings();
			}, nextLoad);
		};
	},


	/////  Add this function to the modules you want to control with voice //////

	notificationReceived: function (notification, payload) {
		if (notification === 'HIDE_RADAR') {
			this.hide(1000);
		} else if (notification === 'SHOW_RADAR') {
			this.show(1000);
		}

	},

});
