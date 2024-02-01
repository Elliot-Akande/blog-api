const Author = require("../models/author");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Handle Author authentication on POST.
exports.login = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return next(err);
    }

    // Username or password error.
    if (!user) {
      const error = new Error(info.message);
      error.status = 400;
      return next(error);
    }

    // Generate signed JWT
    const token = jwt.sign(
      { sub: user._id },
      process.env.JWT_KEY,
      (err, token) => {
        return res.json({ token });
      }
    );
  })(req, res, next);
});

// Handle Author creation on POST.
exports.signup = [
  body("username", "Username must be present")
    .trim()
    .isLength({ min: 1 })
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers")
    .custom(async (username) => {
      const author = await Author.findOne({ username });
      if (author) {
        throw new Error("Username already in use");
      }
    }),
  body("password", "Password must be at least 8 characters in length").isLength(
    { min: 8 }
  ),
  body("passwordConfirmation", "Passwords do not match").custom(
    (passwordConfirmation, { req }) => {
      return passwordConfirmation === req.body.password;
    }
  ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
      return;
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);
      Author.create({
        username: req.body.username,
        password: hashedPassword,
      });
    });

    res.status(201).send();
  }),
];
