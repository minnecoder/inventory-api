const express = require('express');

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: integer
 *          description: id for the customer
 *        Customer_Name:
 *          type: string
 *          description: Customer's name
 *        Customer_Address:
 *          type: string
 *          description: Customer's address
 *        Customer_City:
 *          type: string
 *          description: Customer's city
 *        Customer_State:
 *          type: string
 *          description: Customer's state
 *        Customer_Zip:
 *          type: integer
 *          description: Customer's zipcode
 *        Customer_Phone:
 *          type: string
 *          description: Customer's phone number
 *        Customer_Email:
 *          type: string
 *          description: Customer's email address
 *      example:
 *        id: 0
 *        Customer_Name: ABC Plumbing
 *        Customer_Address: 1234 Main St
 *        Customer_City: Coon Rapids
 *        Customer_State: MN
 *        Customer_Zip: 55344
 *        Customer_Phone: 123-456-7890
 *        Customer_Email: bill@abcplumbing.com
 *
 */

/**
 * @swagger
 * tags:
 *  name: Customer
 *  description: Customer
 */

/**
 * @swagger
 * /customers:
 *  get:
 *    summary: Returns all customers
 *    tags: [Customer]
 *    responses:
 *      200:
 *        description: Returns all customers
 *        content:
 *           application/json:
 *            schema:
 *              $ref: "#/components/schemas/Customer"
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Customer"
 *      500:
 *        description: Server Error
 *
 */

const {
  getCustomers,
  addCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');

const router = express.Router();

router.route('/').get(getCustomers).post(addCustomer);
router.route('/:id').get(getSingleCustomer).put(updateCustomer).delete(deleteCustomer);

module.exports = router;
