/* Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.

For "(()", the longest valid parentheses substring is "()", which has length = 2.

Another example is ")()())", where the longest valid parentheses substring is "()()", which has length = 4.
*/
public class Solution {
    public int longestValidParentheses(String s) {
        
        if( s == null || s.length() == 0) return 0;

        
        Stack<Character> parens = new Stack<Character>();
        Stack<Integer>   parenToMatchIndex = new Stack<Integer>();
        char[] c = s.toCharArray();
        
        //keep track of char and indecicies of possible illegal paren
        for(int i = 0; i < c.length; i++){
            if(isOpen(c[i])){
                parenToMatchIndex.push(i);
                parens.push(c[i]);
            }
            if(isClose(c[i])){
                if(parenToMatchIndex.empty()){
                    parenToMatchIndex.push(i);
                    parens.push(c[i]);
                }
                else{
                    char topParen = parens.peek();
                    // looking at closing parent and have open on in top of stack so it's legal
                    if( isOpen(topParen)){
                        parens.pop();
                        parenToMatchIndex.pop();
                    }
                    else{
                        // no open paren on top of stack to make a legal pair so add closing paren to the stack
                        parenToMatchIndex.push(i);
                        parens.push(c[i]);
                    }
                }
            }
            
        }
        int max = 0;
        // the entire string is legal so return the length
        if(parenToMatchIndex.empty())
           return c.length;
        
        // put stack to array (in opposite order)
        int shit [] = new int[c.length];
        int i = c.length-1;
        int illegalSize = 0;
        while(! parenToMatchIndex.empty()){
            shit [i] = parenToMatchIndex.pop();
            i--;
            illegalSize++;
        }
        
        // put correct order (or high - low)
        int [] illegalParenIndex = new int[illegalSize];
        for(int j = 0, k = c.length-1; j < illegalSize; j++, k--){
            illegalParenIndex[j] = shit[k]; 
        }

        // We basically want the number of paren between the illegal ones. This loop includes end of array to highest illgeal paren    
        int upperBoundary = c.length - 1;
        for(i = 0; i < illegalSize; i++){
            
            if( upperBoundary-illegalParenIndex[i] > max )
                max = upperBoundary-illegalParenIndex[i];
            upperBoundary = illegalParenIndex[i]-1;
          
        }
        
        // upperBoundary + 1 is the # of legal paren from beggiing of array to the index of the first (lowest value) illegal paren
        return (max > upperBoundary+1) ? max : upperBoundary+1;    
    }

  
    public boolean isOpen(char c){
        return ( c == '(' ) ? true : false;
    }
    public boolean isClose(char c){
        return ( c == ')') ? true : false;
    }

}