const path = require("path");

const bcrypt = require("bcryptjs")

const Signup = require("../models/signup")

exports.getSignup = (req, res, next) => {
    res.render(path.join(__dirname, "..", "views", "signupForm.ejs"))
}

exports.getLogin = (req, res, next) => {
    res.render(path.join(__dirname, "..", "views", "loginForm.ejs"))
}

exports.postSignup = async (req, res, next) => {

    const { email, name, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    Signup.findOne({ email: email }).then(userData => {

        if (userData) {
            res.write("<h1>email already exist</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            return res.end();
        }

        const user = new Signup({
            email,
            password: hashPassword,
            name
        })

        user.save();

        res.write("<h1>user created sucessfully</h1>");
        res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
        return res.end();

    }).catch(err => {
        console.log(err)
    })
}

exports.postLogin = async (req, res, next) => {

    const { email, password } = req.body;

    Signup.findOne({ email: email }).then((userData, err) => {

        if (err) {
            console.log(err)
            res.write("<h1>oops! something went wrong</h1>");
            res.write("<h1>please try again later</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            res.end();
        }
        else if (!userData) {
            res.write("<h1>No user found</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            res.end();
        }

        bcrypt.compare(password, userData.password).then(result => {
            if(result){
                req.session.isLogedIn = true;
                req.session.user = userData;
                res.write("<h1>Login sucessfull</h1>");
                res.end();
                res.redirect("/")
            }else{
                res.write("<h1>password not match</h1>");
                res.write("<a href='/auth/signup'>signup</a>")
                res.write("<a href='/auth/login'>login</a>")
                res.end();
                res.redirect("/auth/login")
            }
        })


    }).catch(err => {
        console.log(err)
    })
}

exports.getuserDetail = (req, res, next) => {
    res.render(path.join(__dirname, "..", "views", "getuserDetail.ejs"))
}

exports.postuserDetail = async (req, res, next) => {

    const { email} = req.body;

    Signup.findOne({ email: email }).then((userData, err) => {

        if (err) {
            console.log(err)
            res.write("<h1>oops! something went wrong</h1>");
            res.write("<h1>please try again later</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            return res.end();
        }
        else if (!userData) {
            res.write("<h1>No user found</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            return res.end();
        }

        res.render(path.join(__dirname, "..", "views", "showuserDetail.ejs"), {
            user: userData
        })


    }).catch(err => {
        console.log(err)
    })
}

exports.getEdituserDetail = (req, res, next) => {

    if(!req.session.isLogedIn){
        res.redirect("/auth/login");
    }

    res.render(path.join(__dirname, "..", "views", "edituserDetail.ejs"))
}

exports.postEdituserDetail = async (req, res, next) => {

    const {name, email} = req.body;
    console.log(req.body)

    Signup.findOneAndUpdate({ email: email }, {name: name}).then((userData, err) => {

        if (err) {
            console.log(err)
            res.write("<h1>oops! something went wrong</h1>");
            res.write("<h1>please try again later</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            return res.end();
        }
        else if (!userData) {
            res.write("<h1>No user found</h1>");
            res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            return res.end();
        }

        res.write("<h1>user update sucessfull</h1>");
        res.write("<a href='/auth/signup'>signup</a>")
            res.write("<a href='/auth/login'>login</a>")
            return res.end();

    }).catch(err => {
        console.log(err)
    })
}