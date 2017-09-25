/*
Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

For example,
Given board =

[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED", -> returns true,
word = "SEE", -> returns true,
word = "ABCB", -> returns false.
 */
const ROW = 0;
const COL = 1
function Pos(row, col){
	return [row, col];
}
const getStartingPos = (matrix, c) =>{
	 matchingCharList = [];
	 for(let i = 0; i < matrix.length; i++)
	 	for(let j = 0; j < matrix[i].length; j++)
	 		if(matrix[i][j] === c)
	 			matchingCharList.push([i,j]);
	 return matchingCharList;		
}
function neighbors(board, pos){
	let i = pos[ROW], j = pos[COL];
     let r = board.length,  c = board[0].length;
  
    let m = [];
    if( i-1 >= 0) m.push([i-1,j]);
    if( i+1 < r  ) m.push([i+1,j]);
    if( j-1 >= 0) m.push([i,j-1]);
    if( j+1 < c) m.push([i,j+1])
    return m;
                          
}  

//assume str.len > 1 for right now
const exist = (matrix, str) => {
	startingCharPos = getStartingPos(matrix, str[0]);
	let isStrFound = false;
	let visit = new Map();
	let pos;
	while( pos = startingCharPos.pop()){
        visit[pos] = true;
		backtrack(matrix, pos, str.substring(1) );
        visit[pos] = false;
		if(isStrFound)
			return true
	}
	return isStrFound;

	function backtrack (matrix, currPos, str)  {

		if(str.length == 0 ){
			isStrFound = true;
			return;
		}
		let nextChar = str[0];
		let possibleMoves = neighbors(matrix, currPos);

		for(let pos of possibleMoves){
			if(visit[pos])
				continue;

			visit[pos] = true; //makeMove
			if(nextChar == matrix[pos[ROW]][pos[COL]] )
				backtrack(matrix, pos, str.substring(1) );
			visit[pos] = false; // unMakeMove
			if(isStrFound)
				return;
		}
	}
}