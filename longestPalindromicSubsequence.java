/*
Given a string s, find the longest palindromic subsequence's length in s. You may assume that the maximum length of s is 1000.

Example 1:
Input:

"bbbab"
Output:
4
One possible longest palindromic subsequence is "bbbb".
 */
public class Solution {
    public int longestPalindromeSubseq(String s) {
       char[] c = s.toCharArray();
       int n = c.length;

       int iIntervalSize = n-1;
       int jIntervalSize = 1;
       
       int[][] memoTable = new int[n][n];
       
       for(int i=0, j=0; i< n; i++,j++)
            memoTable[i][j] = 1;

       for(int iterationLevel = 0; iterationLevel < n; iterationLevel++, iIntervalSize--, jIntervalSize++){
            for(int i =0, j = jIntervalSize; i < iIntervalSize ; i++,j++){
                if(c[i] == c[j]){
                    memoTable[i][j] = memoTable[i+1][j-1] + 2;
                }
                else{
                    memoTable[i][j] = (memoTable[i][j-1] > memoTable[i+1][j]  ) ? memoTable[i][j-1] : memoTable[i+1][j] ;
                }
            }
       }
       return memoTable[0][n-1];
    }
}