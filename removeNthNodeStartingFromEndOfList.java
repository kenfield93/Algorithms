/*
Given a linked list, remove the nth node from the end of list and return its head.

For example,

   Given linked list: 1->2->3->4->5, and n = 2.

   After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:
Given n will always be valid.
Try to do this in one pass.
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
    public ListNode removeNthFromEnd(ListNode head, int n) {
        if( n <= 0 )
           return head;
        ListNode ogHead = new ListNode(head.val);
        ogHead.next = head.next;
        int count = 1;
        ListNode nodeToRemove = head;
        while( head.next != null){
            count++;
            if(count - n > 1){
                nodeToRemove = nodeToRemove.next ;
            }
            head = head.next;
            
        }
        if( count == 1 ){
            ogHead.next = null;
            return null;
        }
        else if(count > 1){
            nodeToRemove.next = nodeToRemove.next.next;
             // for taking deleting first node
             if( count == n){
                return ogHead.next;
             }
             // for deleting second node
             else if( count - n == 1)
                return nodeToRemove;
            return ogHead;
        }
        return head;   
        
    }
}