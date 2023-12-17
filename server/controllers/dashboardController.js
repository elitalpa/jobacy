const Job = require("../models/Job");

const mongoose = require("mongoose");
const User = require("../models/User");

// GET // DASHBOARD

exports.dashboard = async (req, res) => {

  let perPage = 12;
  let page = req.query.page || 1;

  const locals = {
    title: "Dashboard",
    description: "Track your job applications",
  };

  try {
    const jobs = await Job.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: locals.id } },
      ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Job.count();

    res.render('dashboard/index', {
      userName: locals.userName,
      locals,
      jobs,
      current: page,
      pages: Math.ceil(count / perPage)
    });

  } catch (error) {
    console.log(error);
  }
};

// GET // MY PROFILE

exports.myProfile = async (req, res) => {
  const locals = {
    title: "Jobacy - My Profile",
    description: "Track your job applications",
  };

  res.render("dashboard/myProfile", locals)
};

// GET // VIEW JOB

exports.dashboardViewJob = async (req, res) => {
  const locals = {
    title: "Jobacy - View Job",
    description: "Track your job applications",
  };

  const job = await Job.findById({ _id: req.params.id })
    .where({ user: req.user })
    .lean();

  if (job) {
    res.render("dashboard/view-job", {
      jobID: req.params.id,
      job,
      locals
    });
  } else {
    res.send("Something went wrong.");
  }
};

// PUT // UPDATE JOB

exports.dashboardUpdateJob = async (req, res) => {
  try {
    await Job.findOneAndUpdate(
      { _id: req.params.id },
      { jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        website: req.body.website,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        origin: req.body.origin,
        status: req.body.status,
        comments: req.body.comments,
        updatedAt: Date.now() }
    ).where({ user: req.user });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// DELETE // DELETE JOB

exports.dashboardDeleteJob = async (req, res) => {
  try {
    await Job.deleteOne({ _id: req.params.id }).where({ user: req.user });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// GET // ADD JOB

exports.dashboardAddJob = async (req, res) => {
  res.render("dashboard/add", {
  });
};

// POST // ADD JOB

exports.dashboardAddJobSubmit = async (req, res) => {
  try {
    req.body.user = req.user;
    await Job.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};