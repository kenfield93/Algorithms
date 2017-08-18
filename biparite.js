
function switchColor(c){
	return c == 'b' ? 'r' : 'b';
}
function isBipartite(G){
	var answer = true;
	var colored = new Array(G.length);
	var visited = new Array(G.length);
	for(var i = 0; i < G.length; i++)
		visited[i] = false;

	var color = 'r'	
	for(var v = 0; v < G.length; v++){
		if( !visited[v]){
			exploreAndPaint(v, color);
			color = switchColor(color);
		}
	}

	console.log(colored);
	return answer;	

	function exploreAndPaint(v, colorToPaint){
		//console.log(v);
		//console.log(colorToPaint);
		visited[v] = true;
		//console.log(visited[0]);
		//console.log(G[v].length);
		//if( colored[v] && colored[v] != colorToPaint) 
		//	answer = false;
		//At this point its the first visit so we need to color first time
		colored[v] = colorToPaint;
		//console.log(" node %s is colored %s", v, colorToPaint);

		var u;
		var newColor = switchColor(colorToPaint);
		for(var i = 0; i < G[v].length; i++ ){
			u = G[v][i];
		//	console.log("v: %s, u: %s ", v,u);
			if(colored[u] && colored[u] == colorToPaint )
				answer = false;
			if(! visited[u]){
				
				exploreAndPaint(u, newColor);
			}
		}

	}	
}

var g = new Array(6);
g[0] = [2]; //a
g[1] = [0,3]; //b
g[2] = [4,5]; //c
g[3] = [2]; //d
g[4] = [];
g[5] = [3];
console.log(g[0]);
console.log(isBipartite(g));

 