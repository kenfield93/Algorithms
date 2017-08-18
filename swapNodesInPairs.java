/*
 Given a linked list, swap every two adjacent nodes and return its head.

For example,
Given 1->2->3->4, you should return the list as 2->1->4->3.

Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.
*/
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    
    /* leetcode wasn't accepting seperate functions. maybe for security reasons
    public void swapPair(prevNode, firstNode, secondNode){
        firstNode.next = secondNode.next;
        secondNode.next = firstNode;
        prev.next = secondNode;
        prev = firstNode;
    }
    */
    public ListNode swapPairs(ListNode head) {
        ListNode prev, first_node, second_node;
        
        if( head == null || head.next == null)
            return head;
        
        // list is at least 2
        prev = first_node = head;
        second_node = head.next;
        head.next = second_node.next;
        second_node.next = first_node;
        head = second_node; // so we can return 'new' head
        prev = first_node;
        
        // either at end of list OR only 1 node left(so no more pairs )
        while( prev.next != null && prev.next.next != null ){
                  // set up next pair
                  first_node = prev.next;
                  second_node = first_node.next;
                  // switch
                  first_node.next = second_node.next;
                  second_node.next = first_node;
                  prev.next = second_node;
                  prev = first_node;
        }
        
        
        // ignoring null right now
    
      //  prev.next = null; 
        return head;
    }
    

}
