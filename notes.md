How front end needs to handle verify email link
1. Takes the request 
2. Sends the request to the back end via a POST command
3. Redirect user to correct page on the front end


The verify link should look like 
https: //nodeauth.dev/verify/test%40leveluptuts.com/234kjh326hk236j2jq35jk235k2k235jb2

TODO
-----------------------------
Route to change user role to admin role
Add user authorization
    - Roles: User, Customer, and Admin (Others?)
Create documentation and readme file for this
    - Display technologies used 
Order Picking Route
    DONE - Get all orders that have order status of "Paid" and shows all products for that order (GET)
    DONE - Get single order that is ready to pick and shows all products for that order (GET/id)
    - Change status of order and order products (PUT/id)
        - Decrease on-hand amount by product quantity
        - Check if on-hand amount is at or below reorder level
        - Mark product as picked
        - Mark order as picked if all products are picked (Done throughOrder update)
Add and integrate stripe
    - Add new route for payments
Add testing - Jest
Add route for when supplier delivers more products
    - Make record of supplier delivery (SupplierShipment)
        - Supplier
        - Products and quantity of each
        - ??
    - Updates quantity of each product that is in shipment (Bulk product update?)
?? - Figure out when multiple items go into 1 box
?? - Add product location to each product

Things that the API should do
-----------------------------
- Check distance between warehouse and customer



Step 1 - Order happens
-----------------------
Customer selects items
Customer picks shipping methods
Customer picks payment method
Order is processed
 ## Done by API Call ##
    Verify that if there is a coupon, the coupon is correct and meets qualifications
    - Done with Stripe
    Charge card
    - Done with Stripe
Return order validation to website
Order gets completed
 ## Done by API Call ##
    Order status changed to paid
    Order delivery status changed to either company or 3rd party



Step 2 - Order is picked
------------------
Items are picked
Items are removed from inventory
Items are packed into box(es)
Order status is changed to Picked

After Order is Picked
--------------------------
If 3rd Party company
    status is set to Ready to Ship
    After order / items are picked up status is set to Shipped
If delivered by company
    status is set to Ready to Load
    Packages placed in area to be loaded


Item statuses
-------------
"on-hand"
"low level"
"out of stock"

Order statuses
--------------
Created - Default
Paid
Picked
Ready to Ship - If sent out through 3rd party company
Shipped - If sent out through 3rd party company
Ready to Load - If delivered by company
Loaded on Truck - If delivered by company
Out for delivery - If delivered by company
Delivered
Returned
Cancelled

Order Product Statuses
-----------------------
?? - Default
Picked