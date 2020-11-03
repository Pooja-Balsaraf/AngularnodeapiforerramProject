const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const registerModel = require('../models/register');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

router.use(bodyParser.json());

router.get('/api', (req, res) => {
    console.log(registerModel);
    registerModel.find({}).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
})


router.post('/register', (req, res) => {
    console.log(req.body);

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(404).send(err);
        } else {
            return res.status(200).send(hash);

            const token = jsonwebtoken.sign({ id: 1 }, 'My/_SCRET_KEY');
            console.log(token);
            const register = new registerModel({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                token: token
            });

            console.log(register);

            register.save((err, data) => {
                if (err) {
                    res.status(404).send({
                        title: 'Registration Error',
                        detail: 'Something went wrong'
                    });
                } else {
                    res.status(200).json({
                        title: ' User Registration Successful!!',
                        detail: 'Successfully registered new user'
                    })
                }
            })
        }
    })

})

router.post('/login', async(req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        // if (!isEmail(email)) {
        //     return res.status(400).json({
        //         errors: [{
        //             title: 'Bad request',
        //             details: 'Email must be valid email Address'
        //         },
        //   ],
        //     })
        // }

        // if (typeof password !== 'string') {
        //     return res.status(400).json({
        //         errors: [{
        //             title: 'Bad Request',
        //             detail: 'Password must be String'
        //         },],
        //     })
        // }

        const user = await registerModel.findOne({ email });
        console.log('User exist', user);
        if (!user) {
            throw new Error();
        } else {
            const passwordvalidated = await bcrypt.compare(password, user.password);
            console.log('Valid password', passwordvalidated);
            if (!passwordvalidated) {
                throw new Error();
            } else {
                res.json({
                    title: 'Login Successfully',
                    detail: 'Successfully validate user Credentials'
                })
            }
        }
    } catch (err) {
        return res.status(401).json({
            errors: [{
                title: 'Invalid Credentails',
                details: 'Check email & password Combination'
            }]
        })
    }


})

module.exports = router;