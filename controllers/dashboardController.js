const mongoose = require('mongoose');
const Job = require("../models/Job");
const User = require ('../models/User')
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

module.exports.dashboard_get = async (req, res) => {

    const locals = {
        title: "Jobacy - Dashboard",
        description: "Keep track of your job applications",
    }
        const token = req.cookies.jwt;
        const user = jwt.verify(token, jwtSecret, (err, decodedToken) => {
            return decodedToken.id;
        })

    try {

        const jobs = await Job.find({"user":user});

        res.render('dashboard', {
            locals,
            jobs
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports.myProfile_get = (req, res) => {
    const locals = {
        title: "Jobacy - My Profile",
        description: "Keep track of your job applications",
    }

    res.render('myProfile', locals);
}

module.exports.addJob_get = (req, res) => {
    const locals = {
        title: "Jobacy - Add Job",
        description: "Keep track of your job applications",
    }

    res.render('addJob', locals);
}

module.exports.job_get = (req, res) => {
    const locals = {
        title: "Jobacy - View Job",
        description: "Keep track of your job applications",
    }

    res.render('job', locals);
}

module.exports.addJob_post = async (req, res) => {
    const { jobTitle, companyName, website, contactName, contactEmail, contactPhone, address, origin, status, comments } = req.body;

    const token = req.cookies.jwt;
    const user = jwt.verify(token, jwtSecret, (err, decodedToken) => {
        return decodedToken.id;
    })

    try {
        const job = await Job.create({ user, jobTitle, companyName, website, contactName, contactEmail, contactPhone, address, origin, status, comments });
        res.status(201).json({ job: job._id });
    }
    catch(err) {
        res.status(400).json({ err });
    }
}