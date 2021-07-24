Things that the API should do
-----------------------------
Return basic info for all items to e-commerce site
Return details for single item



Order happens
--------------
Customer places order
Move items from "on-hand" to "on-hold"
Verify that prices match what is in database
Verify that the items in the order are available
Verify that if there is a coupon, the coupon is correct
Return order validation to website
Order gets completed and paid for
Order status changed to paid

Order is picked up
------------------
Items are picked
Items are removed from inventory
Items are packed into box(es)
Order status is changed to Picked


Item statuses
-------------
"on-hand"
"on-hold"
"low level"
"out of stock"

Order statuses
--------------
Created - Default
Paid
Picked
Out for delivery
Delivered
Returned
Cancelled

TODO
-----------------------------
Add way to move item from "on-hand" from "on-hold"
Add user authorization
Figure out when multiple items go into 1 box