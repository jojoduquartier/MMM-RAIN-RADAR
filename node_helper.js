/* Magic Mirror
 * Node Helper: Calendar
 *
 * By jojoDuQuartier
 * Inspired By Mykle1 @ https://github.com/mykle1/MMM-ISS-Live
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
	// Override start method.
	start: function() {
		console.log("Starting node helper for: " + this.name);
	}
});
