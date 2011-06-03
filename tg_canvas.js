function Tetris(container, options) {
	this.container = window.document.getElementById(container);
	this.width = options && options.tWidth ? options.tWidth : 10;
	this.height = options && options.tHeight ? options.tHeight : 20;
	this.blockSize = options && options.bSize ? options.bSize : 20;
	this.previewBlockSize = options && options.pbSize ? options.pbSize : 10;

	//private methods

		//generate unique ID
	unicID = (function() {
		var id = 0;
		return function() { return id++; };
	})();

		//creates new canvas
	function createContext(where, width, height) {
		var canvasID = "canvas" + unicID();
		var canvasEl = document.createElement('canvas');
		canvasEl.id = canvasID;
		canvasEl.width = width;
		canvasEl.height = height;
		where.appendChild(canvasEl);
		return document.getElementById(canvasID).getContext('2d');
	}

	//public methods

	this.draw = function() {

		var fieldContext = createContext(this.container, 400, 600);
		var pxWidth = this.width * this.blockSize;
		var pxHeight = this.height * this.blockSize;
		var startPos = this.blockSize;

		//field
		fieldContext.strokeStyle = '#000';
		fieldContext.strokeRect(startPos, startPos, pxWidth, pxHeight);

		//field grid
		fieldContext.strokeStyle = '#ccc';

		for (var i=0; i<(this.width-1); i++) {
			fieldContext.moveTo(startPos + this.blockSize + this.blockSize*i, startPos);
			fieldContext.lineTo(startPos + this.blockSize + this.blockSize*i, startPos + pxHeight);
		}

		for (var j=0; j<(this.height-1); j++) {
			fieldContext.moveTo(startPos, startPos + this.blockSize + this.blockSize*j);
			fieldContext.lineTo(startPos + pxWidth, startPos + this.blockSize + this.blockSize*j);
		}

		fieldContext.stroke();
	}
}
