const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const jobSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    jobTitle: {
        type: String,
        required: [true, 'Please enter a job title'],
    },
    website: {
        type: String,
    },
    contactName: {
        type: String,
    },
    contactEmail: {
        type: String,
    },
    contactPhone: {
        type: String,
    },
    address: {
        type: String,
    },
    origin: {
        type: String,
    },
    status: {
        type: String,
    },
    comments: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Job = mongoose.model('job', jobSchema);

module.exports = Job;