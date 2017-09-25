/* Similar to wordSearchHorizontal&Vertical.js
   but also finds words diagonally as well, basically and touching letter is fair game on the path to finding the word
   */
const ROW = 0;
const COL = 1;
const getStartingPos = (matrix, c) =>{
	 matchingCharList = [];
	 for(let i = 0; i < matrix.length; i++)
	 	for(let j = 0; j < matrix[i].length; j++)
	 		if(matrix[i][j] === c)
	 			matchingCharList.push([i,j]);
	 return matchingCharList;		
}
function neighbors(pos){
	let i = pos[ROW], j = pos[COL];
    return [Pos[i,j-1], Pos[i,j+1], Pos[i-1, j-1], Pos[i-1, j], Pos[i-1, j+1], Pos[i+1, j-1], Pos[i+1, j], Pos[i+1, j+1]];                               
}        
function getNode( pos, board){
	let i = pos[ROW], j = pos[COL];
    let r = board.length,  c = board[0].length;
    if(i<0 || i >= r) return null;
    if(j<0 || j >= c) return null;
    return board[i][j];
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
			return true;
	}
	return isStrFound;

	function backtrack (matrix, currPos, str)  {
		if(str.length == 0 ){
			isStrFound = true;
			return;
		}
		let nextChar = str[0];
		let possibleMoves = neighbors(currPos);
		for(let pos of possibleMoves){
			if(visit[pos])
				continue;

			visit[pos] = true; //makeMove
			if(nextChar == getNode(pos, matrix) )
				backtrack(matrix, pos, str.substring(1) );
			visit[pos] = false; // unMakeMove
			if(isStrFound)
				return;
		}
	}
}
