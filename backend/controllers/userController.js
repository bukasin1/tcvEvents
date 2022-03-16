const Users = require('../models/user.model')
const bcrypt = require('bcryptjs')

const userSchema = require('../utils/validation').userSchema
const loginSchema = require('../utils/validation').loginSchema
const Auth = require('../middlewares/auth')

exports.Signup = async (req, res) => {
    try {
        console.log("entered", req.body)
        const validation = userSchema.validate(req.body)
        if (validation.error) {
            res.status(404).send({
                error_message: validation.error.details[0].message
            })
            return;
        }
        const { email, password, admin, interests } = req.body
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await Users.findOne({ email })
        if (user) {
            res.status(401).send({
                error_message: "Email already registered"
            })
            return;
        }
        await Users.create({
            email,
            password: hashPassword,
            admin: admin ? admin : false,
            interests: interests.trim()
        })
        res.status(201).send({
            message: "User registered successfully!"
        })
    } catch (error) {
        console.log(error, "error")
        res.status(404).send({
            error_message: "An error occured!",
            error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const validation = loginSchema.validate(req.body)
        if (validation.error) {
            res.status(404).send({
                error_message: validation.error.details[0].message
            })
            return;
        }
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        const validUser = await bcrypt.compare(password, user.password)
        if (user && validUser) {
            const token = Auth.signToken(user.id, user.admin)
            // res.cookie("npcToken", token)
            res.status(201).send({ message: "Logged in", user, token })
            return;
        }
        res.status(404).send({
            error_message: "Invalid login details"
        })
    } catch (error) {
        console.log(error, "error")
        res.status(404).send({
            error_message: "Invalid login details",
            error
        })
    }
}