/*
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not
 */
public class Solution {
    public boolean isValid(String s) {
                    // 3 stacks for [], {}, ()
        // 1 stack for opens (, {, [
        // if open brak is seen, put on stack 
        // when closing is seen, pop off top of stack and see if they match, if so contineu, if not return false
        if( s == null || s.length() == 0) return true;
        Stack<Character> openParen = new Stack<Character>();
        char[] c = s.toCharArray();
        
        for(int i = 0; i < c.length; i++){
            if(isOpen(c[i]))
               openParen.push(c[i]);
            if(isClose(c[i])){
                if( openParen.empty() )
                    return false;
                else if(! isMatch(openParen.pop(), c[i]) )
                    return false;
            }   
        }
        if(openParen.empty() )
            return true;
        return false;    
    }
    
    public boolean isOpen(char c){
        return (c == '[' || c == '(' || c == '{') ? true : false;
    }
    public boolean isClose(char c){
        return (c == ']' || c == ')' || c == '}') ? true : false;
    }
    public boolean isMatch(char open, char close){
        if( open == '(' && close == ')') return true;
        if( open == '{' && close == '}') return true;
        if( open == '[' && close == ']') return true;
        return false;
    }
}