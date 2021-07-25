const express = require('express');
const mongoose = require('mongoose');
const { CreateAccountModel } = require('../Models/Accounts');

const AccountsRoute = express.Router();

AccountsRoute.route('/general-entry')
                    .get((req, res) => {
                        const accountModal = CreateAccountModel('cash');
                        new accountModal({
                            accountType: 'c',
                            creditAmount: 1200,
                            debitAmount: 1200,
                        }).save((err, data) => {
                            if(err) throw err;
                            console.log(data);
                        })
                        res.json({
                            name: 'Monis Mazhar'
                        });
                    })
                    .post((req, res) => {
                        const accountModal = CreateAccountModel('cash');
                        new accountModal({
                            accountType: 'c',
                            creditAmount: 1200,
                            debitAmount: 1200,
                        }).save((err, data) => {
                            if(err) throw err;
                            console.log(data);
                        })
                        res.json({
                            name: 'Monis Mazhar'
                        });
                    })

module.exports = AccountsRoute;