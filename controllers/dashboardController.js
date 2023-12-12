const Job = require("../models/Job");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require ('../models/User')
const jwtSecret = process.env.JWT_SECRET;

module.exports.dashboard_get = async (req, res) => {

    const locals = {
        title: "Dashboard",
        description: "Keep track of your job applications",
    }
        const token = req.cookies.jwt;
        const user = jwt.verify(token, jwtSecret, (err, decodedToken) => {
            return decodedToken.id;
        })

    try {

        const jobs = await Job.find({"user":user});

        res.render('home', {
            locals,
            jobs
        });

    } catch (error) {

    }
}

module.exports.myProfile_get = (req, res) => {
    res.render('myProfile');
}

module.exports.addJob_get = (req, res) => {
    res.render('addJob');
}

module.exports.addJob_post = async (req, res) => {
    const { jobTitle, website, contactName, contactEmail, contactPhone, address, comments } = req.body;

    const token = req.cookies.jwt;
    const user = jwt.verify(token, jwtSecret, (err, decodedToken) => {
        return decodedToken.id;
    })

    try {
        const job = await Job.create({ user, jobTitle, website, contactName, contactEmail, contactPhone, address, comments });
        res.status(201).json({ job: job._id });
    }
    catch(err) {
        res.status(400).json({ err });
    }
}