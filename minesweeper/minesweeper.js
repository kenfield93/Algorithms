var readline = require('readline');

function Cell(boardObj){
	this.adjBombCellCount = 0;
	this.isBomb = false;
	this.display = false;
	this.boardObj = boardObj;
}
Cell.prototype.setDisplay = function(state){
	if(state && this.display != true)
		this.boardObj.numLegalCellsLeft--;
	this.display = state;
}
// create matrix, randomize bomb positions, use those to set adjBombCellCount.
function createNewBoard(rows, cols, numMines){
	 rows = rows ? rows :10;
	 cols = cols ? cols :10;
	var boardObj = {};
	 numMines = (numMines && numMines < rows*cols) ? numMines : 12;
	var nonBombCells = rows * cols - numMines;

	var board = new Array(rows);
	for(var i = 0; i < rows; i++){
		board[i] = new Array(cols);
		for(var j = 0; j < cols; j++){
			board[i][j] = new Cell(boardObj);
		}
	}
	var mines = [], mine = {};
	for(var i = 0; i < numMines; i++){
		 mine = {};
		mine.col = Math.floor(Math.random()*(cols-1));
		mine.row = Math.floor(Math.floor(Math.random()*(rows-1)));

		if(! isMineUnique(mine)){ // if same mine already exists dec counter so it'll try again
			i--;
		}
		else{
			mines.push(mine);
			board[mine.row][mine.col].isBomb = true;
		}
	}
	initAdjBombCellCount(board, mines);

	function isMineUnique(mine){
		if( mines.length == 0) return true;
		for(var i = 0; i < mines.length; i++){
			if(positionsAreEqual(mine, mines[i]))
				return false;
		}
		return true;
	}
	boardObj.cellMatrix = board, boardObj.numLegalCellsLeft = nonBombCells, boardObj.minePositions = mines;
	return boardObj;
}
function positionsAreEqual(p1, p2){
	if(p1.col == p2.col && p1.row == p2.row)
		return true;
	return false;
}
function initAdjBombCellCount(board, mines){
	function incAdjBombCountOfNonBombCells(cell){
		if(cell.isBomb) return;
		cell.adjBombCellCount++;
	}
	var mine;
	for(var i = 0; i < mines.length; i++){
		mine = mines[i];
		setAdjCell(mine.row, mine.col, incAdjBombCountOfNonBombCells, board);
	}
}
function setAdjCell(row, col, cellFn, board){
		function adjColFromRow(row){
			if(row < 0 || row >= board.length) return;
			var lCell = board[row][col-1], rCell= board[row][col+1], cCell= board[row][col];
			if(lCell) cellFn(lCell, row, col-1, board);
			if(rCell) cellFn(rCell, row, col+1, board);
			if(cCell) cellFn(cCell, row, col, board);	
		}
		adjColFromRow( row-1);
		adjColFromRow( row);
		adjColFromRow( row+1);
}
function setAdjCellRecursive(cell, row, col, board){
		if(!cell.display && cell.adjBombCellCount == 0){
			cell.setDisplay(true);	
			setAdjCell(row, col, setAdjCellRecursive, board);
		}
		if(!cell.isBomb)
			cell.setDisplay(true);	
}

function setNewCellsToBeDisplayed(row, col, board){
	var cell = board[row][col];
	function setCellDisplay(cell){cell.setDisplay(true);}
	if(cell.adjBombCellCount == 0){
		setAdjCell(row, col, setAdjCellRecursive, board);	
	}
	setCellDisplay(cell);
}
function setAllBombCells(board, minePositions){
	var mine;
	for(var i = 0; i < minePositions.length; i++){
		mine = minePositions[i];
		board[mine.row][mine.col].setDisplay(true);
	}
}
function makeMove(rowIndex, colIndex, boardObj){
	var cellMatrix = boardObj.cellMatrix;
	if(rowIndex < 0 || rowIndex >= cellMatrix.length){
		return {status: "Incorrect Row " + rowIndex + ". Should be between 1 and " + cellMatrix.length};
	}
	if(colIndex < 0 || colIndex >= cellMatrix[0].length){
		return {status: "Incorrect Row " + rowIndex + ". Should be between 1 and " + cellMatrix.length};
	}
	var chosenCell = cellMatrix[rowIndex][colIndex]
	if(chosenCell.isBomb){
		return {status: 'lose'}
	}
	if( !chosenCell.display ){
		return {status: 'valid'};
	}
	//already taken
	return {status: 'taken' }
}
function startRounds(board, inputListener){
	console.log("enter row,col");
	inputListener.on('line', function(line){

		var row, col;
		var input = line.trim().split(',');
		row = input[0]-1, col = input[1]-1;
		if(isNaN(row) || isNaN(col) ){
			displayErrorAndBoard("Incorrect input: expecting 2 numbers seperated by a come. Ex: 2,5 ", board.cellMatrix);
			displayBoard(board.cellMatrix);
			return;
		}

		var move = makeMove(row, col, board);
		if(move.status == "lose") 
			lose(board.cellMatrix, board.minePositions); 
		if(move.status == "valid" || move.status == "taken"){
			setNewCellsToBeDisplayed(row, col, board.cellMatrix);
			console.log("numLegalCellsLeft %s", board.numLegalCellsLeft);
			if(board.numLegalCellsLeft <= 0)
				win(board.cellMatrix);
			else{//TODO choose what new tiles to display }
				setNewCellsToBeDisplayed(row, col, board.cellMatrix)
				displayBoard(board.cellMatrix);
			}
		}
		else{
			displayErrorAndBoard(move.status, board.cellMatrix);
		}

	});
}
function lose(cellMatrix, minePositions){
	displayBoardAndBombs(cellMatrix, minePositions);
	console.log("You lost :'( ");
	process.exit(0);
};
function win(board){
	displayBoard(board);
	console.log("Congrats. You Win!");
	process.exit(0);
};
//TODO Print _ on top and bottom to create box look
function displayBoard(board){
	var row;
	for(var i = 0; i < board.length; i++){
		row = [];
		row.push("|")
		for(var j = 0; j < board[i].length; j++){
			if( board[i][j].isBomb && board[i][j].display)
				row.push("X");	
			else if(board[i][j].display){
				row.push(board[i][j].adjBombCellCount);
			}
			else
				row.push(" ");
			row.push("|");
		}
		console.log(row.join(""));
	}
}
function displayBoardAndBombs(board, minePositions){
	setAllBombCells( board, minePositions);
	displayBoard(board);
}
function displayErrorAndBoard(err, board){
	console.log(err);
	displayBoard(board);	
}
function getReadInputListener(){
	return readline.createInterface({
  		input: process.stdin,
  		output: process.stdout,
  		terminal: true
	});
}
function startGame(){
	// possibly get input for dimensions of game
	var board = createNewBoard();
	displayBoard(board.cellMatrix);
	var rl = getReadInputListener();
	startRounds(board, rl);
}
startGame();

