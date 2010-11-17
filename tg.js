/*Tetris class is for initialising the game
 *properties:
 *initObject : object, where game will be placed
 *width : width of the game field (blocks)
 *height : height of the game field (blocks)
 *blockSize: width and height of the single block (px)
 *methods:
 *draw : draws the game field and game info panel
 *start/resume/pause/clear : controls the game
 */
function Tetris(initObj, tWidth, tHeight, bSize) {
	this.width = tWidth;
	this.height = tHeight;
	this.blockSize = bSize;
	this.initObject = initObj;
	this.gameField = new Array();
}
Tetris.prototype.FIGURE_MAX_SIZE = 4; //this is default for classical tetris, as other constant properties here
Tetris.prototype.PREVIEW_BLOCK_SIZE = 20; //

Tetris.prototype.draw = function() {
	$(this.initObject).css('position','relative');
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
	var gameInfo = $('.tg_gameinfo', this.initObject);
	$(gameInfo).append('<p class=tg_info_p>Next:</p>');
	$(gameInfo).append('<div class=tg_info_next></div>');
	$(gameInfo).append('<p class=tg_info_p>Score:</p>');
	$(gameInfo).append('<p class=tg_info_p id=tg_score_text>0</p>');
	$(gameInfo).append('<p class=tg_info_p>Level:</p>');
	$(gameInfo).append('<p class=tg_info_p id=tg_level_text>1</p>');
	var gameInfoNext = $('.tg_info_next', gameInfo);
	$(gameInfoNext).css('width', this.PREVIEW_BLOCK_SIZE*(this.FIGURE_MAX_SIZE+2)+'px').css('height', this.PREVIEW_BLOCK_SIZE*(this.FIGURE_MAX_SIZE+2)+'px');
	for (i=0; i<this.FIGURE_MAX_SIZE+2; i++)
		for (j=0; j<this.FIGURE_MAX_SIZE+2; j++)
			$(gameInfoNext).append('<div class=tg_gamefield_block_blank></div>');
	$('.tg_gamefield_block_blank', gameInfoNext).css('width', this.PREVIEW_BLOCK_SIZE+'px').css('height', this.PREVIEW_BLOCK_SIZE+'px');
	$(this.initObject).append('<p class=tg_credits>by Alexey Gaev</p>');
}
Tetris.prototype.start = function() {}
Tetris.prototype.pause = function() {}
Tetris.prototype.resume = function() {}
Tetris.prototype.clear = function() {}

/*
 * Figure class is for basic tetris figure presentation
 */

function Figure() {

}
