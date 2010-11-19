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
	this.preview = $(gameInfoNext);
	this.field = $(gameField);
	$(gameInfoNext).css('width', this.PREVIEW_BLOCK_SIZE*(this.FIGURE_MAX_SIZE+2)+'px').css('height', this.PREVIEW_BLOCK_SIZE*(this.FIGURE_MAX_SIZE+2)+'px');
	for (i=0; i<this.FIGURE_MAX_SIZE+2; i++)
		for (j=0; j<this.FIGURE_MAX_SIZE+2; j++)
			$(gameInfoNext).append('<div class=tg_gamefield_block_blank></div>');
	$('.tg_gamefield_block_blank', gameInfoNext).css('width', this.PREVIEW_BLOCK_SIZE+'px').css('height', this.PREVIEW_BLOCK_SIZE+'px');
	$(this.initObject).append('<p class=tg_credits>by Alexey Gaev</p>');
	
	this.figures = [];
	var presentaions = [];
	presentaions[0] = [[0,1,0],[1,1,1],[0,0,0]]; //t
	presentaions[1] = [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]; //I
	presentaions[2] = [[0,1,1],[0,1,0],[0,1,0]]; //r
	presentaions[3] = [[1,1,0],[0,1,0],[0,1,0]]; //L
	presentaions[4] = [[1,1],[1,1]]; //cube
	presentaions[5] = [[1,1,0],[0,1,1],[0,0,0]]; //z
	presentaions[6] = [[0,1,1],[1,1,0],[0,0,0]]; //s

	this.figures[0] = new Figure(presentaions[0], 'green');
	this.figures[1] = new Figure(presentaions[1], 'red');
	this.figures[2] = new Figure(presentaions[2], 'yellow');
	this.figures[3] = new Figure(presentaions[3], 'blue');
	this.figures[4] = new Figure(presentaions[4], 'magenta');
	this.figures[5] = new Figure(presentaions[5], 'grey');
	this.figures[6] = new Figure(presentaions[6], 'brown');
}
Tetris.prototype.start = function() {
	var score = 0; //Starting score
	var scoreRate = 2; //Single row score
	var scoreBonus = 1.5; //Bonus for every additional row
	var scoreForLevel = 20; //Score needed for level
	var scoreForLevelNext = 1.5; //Score append for every next level
	var level = 1; //Starting level
	var levelSpeed = 800; //Speed for level 1 (timeout in ms)
	var levelSpeedNext = 0.8; //Speed boost for every level;

	var gameOver = false; //game over indicator

	var currentPreviewFigure; //figure, that is displaying in next field

	var bsize = this.blockSize; //size of the single block in the game field
	var gameFieldWidth = this.width;
	var gameFieldHeight = this.height;
	var figures = this.figures;
	var preview = this.preview;
	var previewSize = this.PREVIEW_BLOCK_SIZE;

	makePreview(figures, preview, previewSize); //creating first preview

	$(this.field).append('<div class=tg_figure_fall></div>'); //creating container for falling figures
	var gameFieldArr = this.gameField; //get the start state of the game field array
	var gameField = $(this.field); //get the game field container
	var figureFallDiv = $('.tg_figure_fall', this.field); //remember the falling figures's container
	var figureFall = this.figures[Math.floor(Math.random()*this.figures.length)]; //pick first falling figure
	placeOnStart();
	
	var timeout = setTimeout(fall, 0, this.blockSize, timeout);

	$(document).keydown(function(event){
		switch (event.keyCode){
			case 37:
				move('left', bsize);
				break;
			case 39:
				move('right', bsize);
				break;
			case 40:
				move('down', bsize);
				break;
			case 38:
				rotate();
				break;
			default:
				break;
		}
	})
	function iterate() {
		clearTimeout(timeout);
		var Bi = 0;
		var Bj = 0;
		for (Fi = 0; Fi<gameFieldWidth; Fi++)
			for (Fj = 0; Fj<gameFieldHeight; Fj++) {

			}

		figureFall = currentPreviewFigure;
		figureFall.draw(figureFallDiv);
		placeOnStart();
		makePreview(figures, preview, previewSize);
		fall(bsize);
	}
	function placeOnStart() {
		figureFall.draw(figureFallDiv);
		$('.tg_figure_block', figureFallDiv).css('width', bsize + 'px').css('height', bsize + 'px');
		$('.tg_figure_block.colored', figureFallDiv).css('backgroundColor', figureFall.color);
		figureFall.x = Math.floor((gameFieldWidth-figureFall.presentation.length+1)/2);
		figureFall.y = -1;
		$(figureFallDiv).css('left', figureFall.x*bsize+'px').css('top','-'+bsize+'px').css('width', bsize*figureFall.presentation.length+'px');
	}
	function fall(offset) {
		if (checkCollision('fall')) {
			$(figureFallDiv).css('top', (parseInt($(figureFallDiv).css('top'))+offset)+'px');
			figureFall.y++;
			timeout=setTimeout(fall, levelSpeed, offset);
		} else {
			
		}
	}
	function move(direction, offset) {
		if (checkCollision(direction)) {
			switch(direction) {
				case 'left':
					$(figureFallDiv).css('left', (parseInt($(figureFallDiv).css('left'))-offset)+'px');
					figureFall.x--;
					break;
				case 'right':
					$(figureFallDiv).css('left', (parseInt($(figureFallDiv).css('left'))+offset)+'px');
					figureFall.x++;
					break;
				case 'down':
					$(figureFallDiv).css('top', (parseInt($(figureFallDiv).css('top'))+offset)+'px');
					figureFall.y++;
					break;
				default:
					break;
			}
		}
	}
	function rotate() {
		
	}

	var fieldOffset = $(gameField).offset();
	var leftBorder = fieldOffset.left;
	var rightBorder = fieldOffset.left+$(gameField).width();
	var bottomBorder = fieldOffset.top+$(gameField).height();
	function checkCollision(direction) {
		var willNotMakeCollision = true;
		//$('.tg_figure_block.colored',figureFallDiv).each(function(index){
		for (i=0; i<$('.tg_figure_block.colored',figureFallDiv).length; i++) {
			var blockOffset = $($('.tg_figure_block.colored',figureFallDiv)[i]).offset();
			switch(direction){
				case 'left':
					willNotMakeCollision = (blockOffset.left-bsize<leftBorder) ? false : true;
					break;
				case 'right':
					willNotMakeCollision = (blockOffset.left+bsize>rightBorder) ? false : true;
					break;
				default:
					willNotMakeCollision = (blockOffset.top+bsize>bottomBorder) ? false : true;
					if (!willNotMakeCollision) iterate();
					break;
			}
			if (!willNotMakeCollision) break;
		}
		return willNotMakeCollision;
	}

	function makePreview(figures, previewObj, previeBlockSize) {
		if ($('.tg_figure_preview', previewObj).length) $('.tg_figure_preview', previewObj).remove();
		$(previewObj).append('<div class=tg_figure_preview></div>');
		var previewDiv = $('.tg_figure_preview', previewObj);
		currentPreviewFigure = figures[Math.floor(Math.random()*figures.length)];
		var previewFSize = currentPreviewFigure.presentation.length;
		$(previewDiv).css('width', previewFSize*previeBlockSize + 'px').css('height', previewFSize*previeBlockSize + 'px').css('left', previeBlockSize+'px').css('top',previeBlockSize+'px');
		currentPreviewFigure.draw(previewDiv);
		$('.tg_figure_block', previewDiv).css('width', previeBlockSize + 'px').css('height', previeBlockSize + 'px');
		$('.tg_figure_block.colored', previewDiv).css('backgroundColor', currentPreviewFigure.color);
	}
}
Tetris.prototype.pause = function() {}
Tetris.prototype.resume = function() {}
Tetris.prototype.clear = function() {}

/*
 * Figure class is for basic tetris figure presentation
 * properties:
 * size: size of the figure in blocks;
 * methods:
 */

function Figure(presentation, color) {
	this.presentation = presentation;
	this.color = color;
}

Figure.prototype.draw = function(container) {
	$(container).html('');
	var previewFSize = this.presentation.length;
	for (i=0;i<previewFSize;i++)
		for (j=0;j<previewFSize;j++) {
			var blockClass = this.presentation[i][j]==0 ? '' : 'colored';
			$(container).append('<div class="tg_figure_block '+blockClass+'"></div>');
		}
}


Figure.prototype.rotate = function() {}