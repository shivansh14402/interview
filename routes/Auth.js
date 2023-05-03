const express = require('express');

const AuthControler = require("../controlers/AuthControler")

const router = express.Router();

router.get("/signup", AuthControler.getSignup);

router.post("/signup", AuthControler.postSignup);

router.get("/login", AuthControler.getLogin);

router.post("/login", AuthControler.postLogin);

router.get("/userdetail", AuthControler.getuserDetail);

router.post("/userdetail", AuthControler.postuserDetail);

router.get("/edituserdetail", AuthControler.getEdituserDetail);

router.post("/edituserdetail", AuthControler.postEdituserDetail);

module.exports = router;