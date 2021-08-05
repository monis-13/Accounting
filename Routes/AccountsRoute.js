const express = require("express");

const AccountsRoute = express.Router();
const { generalJournalService, createAccount } = require("../Service");

/**
 * @swagger
 *    components:
 *       schemas:
 *          GeneralEntry:
 *             type: object
 *             properties: 
 *                debitAmount:
 *                   type: number         
 *                   description: Debit Amount of the entry
 *                creditAmount:
 *                   type: number         
 *                   description: Credit Amount of the entry
 *                accountName:
 *                   type: string         
 *                   description: Account Name of the entry
 *                accountType:
 *                   type: string         
 *                   description: Account Type of the entry
 *                transactionId:
 *                   type: string         
 *                   description: transi of the entry   
 *                _id: 
 *                   type: string 
 *                   description: Object Id of the entry
*/

/**
 * @swagger
 * /accounts/general-entries:
 *    operationId: getGJ
 *    get:
 *       tags:
 *          - Get General Journal
 *       summary: Get all general Entries
 *       description: Retrieve a list of all general entries
 *       responses:
 *          200:
 *             content:
 *                application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                         $ref: '#/components/schemas/GeneralEntry' 
 *                   
*/

/**
 * @swagger
 * /accounts/general-entries:
 *    post:
 *       tags:
 *         - Create General Journal
 *       summary: post a general entry
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                    $ref: '#/components/schemas/GeneralEntry'
 *       responses:
 *          201:
 *             content: 
 *                application/json:
 *                   schema:
 *                       type: string
*/

AccountsRoute.route("/general-entries")
  .get(async (req, res) => {
    try {
      await generalJournalService(req, res);
    } catch (err) {
      res.json({ err });
    }
  })
  .post((req, res) => {
    createAccount(req, res);
  });

  

module.exports = AccountsRoute;
