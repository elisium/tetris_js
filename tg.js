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
	presentaions[4] = [[1,1],[1,1]]; //′
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
	var levelSpeed = 500; //Speed for level 1 (timeout in ms)
	var levelSpeedNext = 0.8; //Speed boost for every level;

	var gameOver = false; //game over indicator

	var currentPreviewFigure; //figure, that is displaying in next field

	makePreview(this.figures, this.preview, this.PREVIEW_BLOCK_SIZE);

	$(this.field).append('<div class=tg_figure_fall></div>');
	var figureFallDiv = $('.tg_figure_fall', this.field);

	var figureFall = this.figures[Math.floor(Math.random()*this.figures.length)];

	figureFall.draw(figureFallDiv);
	$('.tg_figure_block', figureFallDiv).css('width', this.blockSize + 'px').css('height', this.blockSize + 'px');
	$('.tg_figure_block.colored', figureFallDiv).css('backgroundColor', figureFall.color);
	$(figureFallDiv).css('left', Math.floor((this.width-figureFall.presentation.length+1)/2)*this.blockSize+'px').css('top','0').css('width', this.blockSize*figureFall.presentation.length+'px');
	
	this.timeout = setTimeout(fall, levelSpeed, this.blockSize, false);

	function fall(offset, stop) {
		if (checkCollision('fall')) {
			$(figureFallDiv).css('top', (parseInt($(figureFallDiv).css('top'))+offset)+'px');
		} else {
			
		}
		if (!stop) t=setTimeout(fall, levelSpeed, offset);
	}

	function checkCollision(direction) {
		return true;
	}

	function makePreview(figures, previewObj, previeBlockSize) {
		if (!$('.tg_figure_preview', previewObj).length) $(previewObj).append('<div class=tg_figure_preview></div>');
		var previewDiv = $('.tg_figure_preview', previewObj);
		var currentPreviewFigure = figures[Math.floor(Math.random()*figures.length)];
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
	var previewFSize = this.presentation.length;
	for (i=0;i<previewFSize;i++)
		for (j=0;j<previewFSize;j++) {
			var blockClass = this.presentation[i][j]==0 ? '' : 'colored';
			$(container).append('<div class="tg_figure_block '+blockClass+'"></div>');
		}
}


Figure.prototype.rotate = function() {}