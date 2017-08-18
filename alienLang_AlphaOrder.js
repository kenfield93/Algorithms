
//assumes no repeated words
function getAlphaOrder(words, numOfLetters){
	var order;
	var graph = initAdjList(numOfLetters);
	var addEdge = setGraphToAddEdge(graph);

	// Set up edges of graph
	var word;
	for(var i = 0, j = 1; i < words.length-1 && j < words.length; i++, j++){
		word1 = words[i];
		word2 = words[j];
		for( var w1Index = 0, w2Index = 0; w1Index < word1.length && w2Index < word2.length; w1Index++, w2Index++ ){
			if( word1[w1Index] != word2[w2Index] ){
				var w1Num = word1.charCodeAt(w1Index) - 'a'.charCodeAt(0);
				var w2Num = word2.charCodeAt(w2Index) - 'a'.charCodeAt(0);
				addEdge(w1Num, w2Num);
				break;
			}
		}

	}
	//////////////////////

	var reverseOrder =  topologicalSort(graph, words, numOfLetters);
	while( reverseOrder.length > 0 ){
		console.log(reverseOrder.pop());
	}
	//return reverseOrder;
}

function topologicalSort(g, words, numOfLetters){

	var stack = [];
	var hasBeenVisited = [];

	function explore(v){
		hasBeenVisited[v] = true;

		var edgesOfV = g[v];
		var u;
		for( var i = 0; i < edgesOfV.length; i++){
			u = edgesOfV[i];
			if(!hasBeenVisited[u])
				explore(u);
		}
		//console.log(stack);
		var letter = String.fromCharCode( (v + 'a'.charCodeAt(0)) );
		stack.push(letter);
	}

	for( var i = 0; i < numOfLetters; i++){
		if(! hasBeenVisited[i])
			explore(i);
	}
	return stack;
}


function setGraphToAddEdge(graph){
	return function(u, v){
		console.log("u: " + u + " v: " + v);
		graph[u].push(v);
	}
}

function initAdjList(numOfLetters){
	var adjList = new Array(numOfLetters);
	for(var i = 0; i < numOfLetters; i++)
		adjList[i] = [];
	return adjList;
}

//var dubs = ["baa", "abcd", "abca", "cab", "cad"];
var dubs = ["gcf", "gab", "bfd", "fed"];
getAlphaOrder(dubs, 7);


