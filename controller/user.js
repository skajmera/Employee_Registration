
const knex = require('../database/user')
const bcrypt = require('bcrypt')
const { generateAccessToken } = require('../auth/index')

exports.homepage = (req, res) => {
    console.log("hello this is home page");
    res.send("hello this is home page")
}

exports.createUser = (req, res) => {
    var encoded = bcrypt.hashSync(req.body.password, 10)
    knex
        .select('*')
        .from('users')
        .where({ "email": req.body.email })
        .then((data) => {
            if (data.length < 1) {
                knex('users').insert({
                    "firstname": req.body.firstname,
                    "lastname": req.body.lastname,
                    "email": req.body.email,
                    "password": encoded,
                    "organization": req.body.organization
                })
                    .then((result) => {
                        res.send({ "message": "successfull iserted data" })
                    }).catch((err) => {
                        console.log(err);
                    })
            } else {
                res.send({
                    "exist": "this user alredy exists.."
                })
            }
        })
}

exports.loginuser = (req, res) => {
    knex
        .select('*')
        .from('users')
        .where({ 'email': req.body.email })
        .then((data) => {
            if (!data[0]) {
                console.log("email is not correct");
                res.send("email not correct")
            } else {
                const match = bcrypt.compareSync(req.body.password, data[0].password)
                if (match) {
                    const user = { email: data[0].email, customer_id: data[0].customer_id }
                    const token = generateAccessToken(user)
                    console.log(token)
                    console.log('successfull login')
                    res.cookie('token', token)
                    res.send(data)
                } else {
                    console.log("incorrect password");
                    res.send("incorrect password")
                }
            }
        }).catch((err) => {
            console.log(err);
        })
}


exports.getAlldata = (req, res) => {
    knex.select('*').from('users').then((result) => {
        console.log(result);
        res.send(result)

    }).catch((err) => {
        console.log(err);
        res.send(err)

    });
}

exports.getOneByOne = (req, res) => {
    knex('users').where(function () {
        this.where('firstname', req.params.search).orWhere('lastname', req.params.search)
    }).orWhere({ email: req.params.search })

        .then((result) => {
            console.log(result);
            res.send(result)

        }).catch((err) => {
            console.log(err);
            res.send(err)

        });
}

exports.getAllSearch = (req, res) => {
    ///////// http://localhost:3014/product/search?query_string=sea
    const search = req.query.search

    knex.select('firstname', "lastname", "employee_id").from('users').where("firstname", 'like', `%${search}%`)
        .orWhere('lastname', 'like', `%${search}%`)
        .orWhere('employee_id', 'like', `%${search}%`)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.accendiOrderfirstname = (req, res) => {
    knex('users').orderBy('firstname')
        .then((result) => {
            console.log(result);
            res.send(result)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
}

exports.accendilastname = (req, res) => {
    knex('users').orderBy('lastname')
        .then((result) => {
            console.log(result);
            res.send(result)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
}

exports.accendiEmail = (req, res) => {
    knex('users').orderBy('email')
        .then((result) => {
            console.log(result);
            res.send(result)

        }).catch((err) => {
            console.log(err);
            res.send(err)
        });
}

exports.updateById = (req, res) => {
    knex('users')
        .where('employee_id', req.params.employee_id)
        .update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        })
        .then((data) => {
            console.log(data);
            res.send("updated successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
}

exports.deleteById = (req, res) => {
    knex('users')
        .where('employee_id', req.params.employee_id)
        .del()
        .then((data) => {
            console.log(data);
            res.send("deleted successfully")
        })
        .catch((er) => {
            console.log(er);
            res.json({ "message": er })
        });
}