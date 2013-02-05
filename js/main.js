var bckg;
	bckg = new Image();
	bckg.src = 'images/cambackgrounds/background1.jpg';
	function getImage(url){
		bckg= new Image();
		bckg.src = url;
	};

var processes = {
	timerCallback: function() {
		if (this.myVideo.paused || this.myVideo.ended) {
			return;
		}
		this.ctxInput.drawImage(this.myVideo, 0, 0, this.width, this.height);
		this.pixelScan();
		var self = this;
		setTimeout(function () {
			self.timerCallback();
		}, 0);
	},


	doLoad: function() {
		var video = document.querySelector('video');
		var canvas = document.querySelector('canvas');
		var ctx = canvas.getContext('2d');
		this.myVideo = document.getElementById("myVideo");
		this.cInput = document.getElementById("cInput");
		this.ctxInput = this.cInput.getContext("2d");
		this.cOutput = document.getElementById("cOutput");
		this.ctxOutput = this.cOutput.getContext("2d");
		var self = this;
		this.ctxOutput.drawImage(bckg,0,0);
		this.myVideo.addEventListener("playing", function() {
			self.width = self.myVideo.videoWidth;
			self.height = self.myVideo.videoHeight;
			self.timerCallback();
		}, false);
	},
	pixelScan: function() {
		var frame = this.ctxInput.getImageData(0, 0, this.width, this.height);
		for (var i = 0; i < frame.data.length; i++) {
			var r = frame.data[i];
			var g = frame.data[i+1];
			var b = frame.data[i+2];
			if (g > 0 && r > 50   && r < 165 && b < 60)
			frame.data[i + 3] = 0;
		}
		this.ctxOutput.putImageData(frame, 0, 0);

		//var img= new Image();
		//img.src = "images/cambackgrounds/background1.jpg";
		//this.ctxOutput.putImageData(img, 0, 0);
		return;
	}

}	


