## MMM-RAIN-RADAR

* Inspired by and Replica of the MMM-ISS-Live module by Mykle1

* Displays the Rain Viewer map of [RainRadar](https://www.rainradar.net/) instead of ISS live

A real time animated map showing real time movement of precipitations. 

## Example

![](images/img1.png)

## Installation

* `git clone https://github.com/mykle1/MMM-ISS-Live` into the `~/MagicMirror/modules` directory.

## Config.js entry and options

    {
	    disabled: false,
	    module: 'MMM-RAIN-RADAR',
	    position: 'bottom_right',
		config: {
			useHeader: true,    // true if you want a header
			lat: "40.796850",   // Latitude
			lon: "-89.675960",  // Longitude
			legend: true        // true if color legend should be displayed
		}
    },

