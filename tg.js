/*Tetris class is for initialising the game
 *properties:
 *initObject : object, where game will be placed
 *width : width of the game field (blocks)
 *height : height of the game field (blocks)
 *blockWidth: width of the single block (px)
 *blockHeight: height of the single block (px)
 *methods:
 *draw : draws the game field and game info panel
 */
function Tetris(initObj, tWidth, tHeight, bSize) {
	this.width = tWidth;
	this.height = tHeight;
	this.blockSize = bSize;
	this.initObject = initObj;
	this.gameField = new Array();
}

Tetris.prototype.draw = function() {
	$(this.initObject).append('<div class=tg_gamefield></div>');
	var gameField = $('.tg_gamefield', this.initObject);
	$(gameField).css('width', this.width*this.blockSize +'px').css('height', this.height*this.blockSize +'px');
	for (i=0; i<this.width; i++) {
		var hLine = new Array();
		for (j=0; j<this.height; j++) {
			$(gameField).append('<div class=tg_gamefield_block_blank></div>');
			hLine.push(0);
		}
		this.gameField.push(hLine);
	}
	$('.tg_gamefield_block_blank', gameField).css('width', this.blockSize+'px').css('height', this.blockSize+'px');
	$(this.initObject).append('<div class=tg_gameinfo></div>');
}
Tetris.prototype.start = function() {}
Tetris.prototype.pause = function() {}
Tetris.prototype.resume = function() {}

/*
 * Figure class is for basic tetris figure presentation
 */

function Figure() {

}
