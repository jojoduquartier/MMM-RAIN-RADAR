/* Magic Mirror
 * Module: MMM-RAIN-RADAR
 *
 * By jojoDuQuartier
 * Inspired By Mykle1 @ https://github.com/mykle1/MMM-ISS-Live
 * MIT Licensed
 *
 */

Module.register("MMM-RAIN-RADAR",{

	defaults: {
			height:"270px",
			width:"400px",
            animationSpeed: "0",
            updateInterval: 60 * 60 * 1000,
	},

    start: function () {
		self = this;
	},

	getStyles: function() {
        return ["MMM-RAIN-RADAR.css"];
    },
	
	getDom: function() {

		let iframe = document.createElement("IFRAME");
		iframe.id = "mmrainviewerframe";
		iframe.classList.add("iframe");
		iframe.style = "border:0;height:50vh";
		iframe.width = this.config.width;
		iframe.height = this.config.height;
		type="text/javascript";
		
		let lat = this.config.lat;
		let lon = this.config.lon;
		let legend = this.config.legend;
		
		// tail for src
		let tail = (legend === undefined || legend) ? "6&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=1&rmt=3&c=3&o=88&lm=0&th=1&sm=1&sn=1" : "6&oFa=0&oC=0&oU=0&oCS=0&oF=0&oAP=1&rmt=3&c=3&o=88&lm=0&th=1&sm=1&sn=1";
		iframe.src=`https://www.rainviewer.com/map.html?loc=${lat},${lon},${tail}`;

		return iframe;
	},

	// Override getHeader method.
	getHeader: function() {
		if (this.config.useHeader) {
			return "Rain Viewer";
		}
	},

	 /////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_RADAR') {
            this.hide(1000);
        }  else if (notification === 'SHOW_RADAR') {
            this.show(1000);
        }

    },

});
