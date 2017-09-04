/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
        if(nums.length == 0 ) return 1;
        if(nums.length == 1){
            if(nums[0] == 1) return 2;
            return 1;
        }
    var n, tmpN;
    for(var i = 0; i < nums.length; i++){
        n = nums[i];
        while(n <= nums.length && n > 0 && nums[n-1] != n){
            tmpN = nums[n-1];
            nums[n-1] = n;
            n = tmpN;
        }
    }
    for(i = 0; i < nums.length; i++){
        if(nums[i] != i+1) {
            return i+1;
            
        }
    }
    return i+1;

};
// maps element to that address in array, treating current array as hash and using element as key and element as value
// we can then go through array and make sure each index matches it's value, otherwise that the first one to fail
// else its n+1
//since array is 0 -> n-1 we sub 1 from element when using it as index when setting array, and add 1 to index when using it as element when checking for missing values
//ex: [1,2,3,5] a[0] = 1 when adding we would have done a[1-1] = 1, and checking if a[0] == 0+1 then its legal
// also make sure that key is inbounds for us (postivite ie: > 0).
//even though we have a while loop in the for, it only moves each element once due to nums[n-1] != n condition in while
