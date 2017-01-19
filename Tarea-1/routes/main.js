const router = require('express').Router();
const UserPayment = require('../models/employeepayment');
const fs = require('fs');
const formate = require('dateformat');
const padding = require('pad');
const sync = require('async');

router.get("/", function(req, resp) {
    resp.render("frontpage");
});

router.post("/", function(req, resp) {
    const header = "E" + padding(req.body.id, 13) + padding(req.body.name, 10) + padding(req.body.account, 15) + formate(new Date(), 'yyyymmdd');
    var count = 0;
    var sum = 0.0;
    sync.series([
        function(callback) {
            fs.appendFile('unapec-appap.txt', header + "\n", callback);
        },

        function(callback) {
            UserPayment.find({}, function(error, usersdata) {
                count = usersdata.length;
                usersdata.forEach(function(user) {
                    sum += user.Amount;
                    fs.appendFile('unapec-appap.txt', 'D' + padding(user.Id, 13) + user.IdType + padding(user.Account, 15) + padding(user.Amount, 20), function(err) {
                        console.log(err);
                    });
                });
                callback();
            });
        },
        function(callback) {
            fs.appendFile('unapec-appap.txt', 'S' + padding(count + "", 9, "") + padding(sum + ".", 20, '0') + "\n");
            callback();
        }
    ], function(error, results) {});

    resp.render("frontpage", {
        message: "Se ha generado el archivo con exito"
    });


});


module.exports = router;
