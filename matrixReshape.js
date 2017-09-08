var reshape = function(nums, r, c) {
    var ans = new Array(r);
    for(var i = 0; i < r; i++)
	ans[i] = new Array(c);	
    var cell;
    var next = getNext(nums);
    for(i = 0; i < r; i++){
        for(var j = 0; j < c; j++){
            cell = next();
            if(cell == null) return nums;
            ans[i][j] = cell;
        }
    }
    return ans;
};
function getNext(arr){
    var i = 0;
    var j = 0;	
    return function(){
        if(j >= arr[0].length) {j = 0; i++}
        if(i >= arr.length) return null;
        return arr[i][j++];
    };
};
console.log(reshape([[1,2],[3,4]], 1, 4));
