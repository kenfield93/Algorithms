/*21. Merge Two Sorted Lists
Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Subscribe to see which companies asked this question. */
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
      
      
       ListNode head, currNode;
       head = currNode = null; 
       
            if( l1 == null && l2 == null)
               return null;
            else if( l1 == null){
               return l2;
               
            }
            else if( l2 == null){
               return l1;
            }
            if( l1.val <= l2.val){
                l1.next = mergeTwoLists(l1.next ,l2);
                return l1;
            }
            else if( l1.val > l2.val){
                l2.next = mergeTwoLists(l1, l2.next);
                return l2;
            }
            
            System.out.println("fook me");
            return l1;

    }
}