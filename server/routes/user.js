const express = require('express');
const { signIn, signUp, updateUser, refresh, logout } = require('../controllers/user.js');
const { body } = require("express-validator");
const UserModel = require('../models/UserModel.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/signin',[
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ], signIn);

router.post('/signup',[
    body('email').isEmail().withMessage('Please enter a valid email').custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then(userDoc => {
            if (userDoc) return Promise.reject("E-Mail exists already, please pick a different one")
        })
    }).normalizeEmail(),
    body('phone').isMobilePhone().withMessage('Please enter a valid phone').custom((value, { req }) => {
        return UserModel.findOne({ phone: value }).then(userDoc => {
            if (userDoc) return Promise.reject("Phone exists already, please pick a different one")
        })
    }),
    body('password', 'Please enter a password with only numbers and text at least 5 characters').isLength({ min: 5 }).isAlphanumeric().trim(),
    body('confirmPassword').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password have to match')
        }
        return true
    })
], signUp);

router.get('/refresh', refresh);
router.post('/logout', logout);

router.patch('/:id', [auth, body('email').isEmail().withMessage('Please enter a valid email').custom((value, { req }) => {
    return UserModel.findOne({ email: value }).then(userDoc => {
        if (userDoc && req.params.id != userDoc._id) return Promise.reject("E-Mail exists already, please pick a different one")
    })
}).normalizeEmail(),
body('phone').isMobilePhone().withMessage('Please enter a valid phone').custom((value, { req }) => {
    return UserModel.findOne({ phone: value }).then(userDoc => {
        if (userDoc && req.params.id != userDoc._id) return Promise.reject("Phone exists already, please pick a different one")
    })
}),
body('password', 'Please enter a password with only numbers and text at least 5 characters').isLength({ min: 5 }).isAlphanumeric().trim(),
body('confirmPassword').trim().custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Password have to match')
    }
    return true
})], updateUser);

module.exports = router;
