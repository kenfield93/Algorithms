// Determine whether an integer is a palindrome. Do this without extra space. 
public class Solution {
    public boolean isPalindrome(int x) {
        char[] c = String.valueOf(x).toCharArray();
        for(int i = 0, j = c.length-1 ; i < c.length; j--,i++){
            if(c[i] != c[j])
               return false;
        }
        return true;
    }
}