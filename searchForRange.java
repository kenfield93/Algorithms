
/*
Total Accepted: 126093
Total Submissions: 405753
Difficulty: Medium
Contributor: LeetCode
Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

For example,
Given [5, 7, 7, 8, 8, 10] and target value 8,
return [3, 4].
 */
public class Solution {
    public int[] searchRange(int[] nums, int target) {
    //base cases //
       if ( nums == null || nums.length < 1) { 
           return new int[]{-1,-1};
       }  
         
        if( nums.length == 1){
               if(target == nums[0]) return new int[] {0,0}; 
               else return new int[] {-1, -1};
        }
        if(nums[0] > target || nums[nums.length-1] < target)
           return new int [] {-1, -1 };
        
        if(nums[0] == target && nums[nums.length-1] == target)
           return new int [] {0, nums.length-1};
       
        if(nums.length == 2 ){
            if( nums[0] == target)   
               return new int [] {0,0};
            if( nums[1] == target)
                return new int [] {1, 1};
            else
                return new int [] {-1, -1};
        }
        // base cases end// 
        int halfway = nums.length/2;
        int[] a1 = searchRange(Arrays.copyOfRange(nums, 0, halfway  ), target );
        int[] a2 = searchRange(Arrays.copyOfRange(nums, halfway, nums.length), target);
        
        // inc a2 so it is correct index for each level
        if( a2[0] != -1 )
            a2[0] += halfway;
        if( a2[1] != -1 )   
            a2[1] += halfway;
       
       // MAKE sure a1 is true min/max out of a1/a2
       int min = -1;
       int max = -1;
   
       if(a1[1] != -1 ) min = a1[1];
       if(a1[0] != -1 ) min = a1[0];
        if(min == -1) {
            if(a2[1] != -1) min = a2[1];
            if(a2[0] != -1) min = a2[0];
        }

        if(a2[0] != -1) max = a2[0];
        if(a2[1] != -1) max = a2[1];
        if(max == -1){
            if(a1[0] != -1) max = a1[0];
            if(a1[1] != -1) max = a1[1];
        }
    
       if(min == -1 && max != -1)
           min = max;
       if(max == -1 && min != -1)
           max = min;
       return new int[] {min, max} ;
      
    }
    
}