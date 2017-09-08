/*
    move in place so each element is at element-1 index. If a copy of that value already existed there then add to ans
    only count if you tried to move element into right place and it already existed, not just if it already existed. This way we  don't double count.
    Also, since we aren't striclty swapping items, but placing them in the correct bin, overrite the old  version w/ -1, otherwise itll get re-positioned 
    when a different number goes to that bin, acting as a false positive.
    */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
   var ans=[];
    var n;
    for(var i = 0; i < nums.length; i++){
        n = nums[i];
        nums[i] = -1;
        if(nums[n-1] == n) ans.push(n);
        while(nums[n-1] != n && n > 0){
            
            tmp = nums[n-1];
            nums[n-1] = n;
            n = tmp;
            if(nums[n-1] == n) ans.push(n);
        }
    }

    return ans;
};
