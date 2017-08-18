/*
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:
coins = [1, 2, 5], amount = 11
return 3 (11 = 5 + 5 + 1)

Example 2:
coins = [2], amount = 3
return -1.

Note:
You may assume that you have an infinite number of each kind of coin.
 */

/*
Note: Can probably improve performance by changing iteration? maybe iterate by each value seen so far. idk if possible but 0-n seems like a waste, especially for something like [481, 186, 83], 6333 as a random example
*/
public class Solution {
    public int coinChange(int[] coins, int amount) {
        if(amount == 0 ) return 0;
        int coinLen = coins.length;
        int[] tempVals= new int[coinLen];
        // so i can index from 1-n to check each  subproblem value from  1-amount 
        int[] minCoins = new int[amount+1];
        int INF = Integer.MAX_VALUE;
        
        int currMin = INF;
        int cc = 0;
        for(int i = 1; i <= amount ; i++){
            for(int j = 0; j < coinLen; j++ ){
                cc = coins[j];
                if(i == cc)
                    tempVals[j] = 1;
                else if(i < cc)
                    tempVals[j] = INF;
                else if( i > cc && minCoins[i-cc] > 0){
                    tempVals[j] = minCoins[i-cc] + 1;
                }
            }
            currMin = INF;
            for(int k = 0; k < coinLen; k++){
                if( tempVals[k] < currMin && tempVals[k] > 0)
                    currMin = tempVals[k];
            }
            tempVals= new int[coinLen];
            minCoins[i] = (currMin == INF  ) ? -1 : currMin;

        }
        return (minCoins[amount] == 0) ? -1 :  minCoins[amount];
    }
}