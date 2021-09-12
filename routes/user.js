
const { authenticateToken } = require('../auth/index')

const router = require('express').Router();

const { createUser, loginuser, getAlldata, getOneByOne, getAllSearch, homepage, accendilastname, accendiOrderfirstname, accendiEmail, updateById, deleteById } = require("../controller/user")

router.get('/home', homepage)

router.post('/signup', createUser)

router.post('/login', loginuser)

router.get('/getAll', authenticateToken, getAlldata)

router.get('/getOneByone/:search', authenticateToken, getOneByOne)

router.get('/getall/search', authenticateToken, getAllSearch)

router.get('/acendFirstname', authenticateToken, accendiOrderfirstname)

router.get('/acendLastname', authenticateToken, accendilastname)

router.get('/acendEmail', authenticateToken, accendiEmail)

router.put('/update/:employee_id',authenticateToken,updateById)

router.delete('/delete/:employee_id',authenticateToken,deleteById)

module.exports = router;