define( ["jquery"], function($) {
	var profile=null;
	var DeviceProfile = function() {
	 this.checkDevice= function (uagent){
			var get = $.ajax({
				method: "GET",
				crossDomain: true,
				url: "http://"+window.location.hostname+":6675/checkDevice",
				data: { agent: uagent}
				});
				return get;

		}
		this.learn = function (agent1,device1){
			var get = $.ajax({
				method: "GET",
				url: "http://"+window.location.hostname+":6675/learn",
				data: { agent: agent1, device: device1 },
				crossDomain: true
			});
			return get;
		}

	};
	DeviceProfile.__moduleName = "DeviceProfile";

	return DeviceProfile;
});
