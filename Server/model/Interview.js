const { Schema, model } = require("mongoose");

const InterviewSchema = new Schema({
    userId: {
        type: String,
    },

    // Resume file
    resume: {
        type: String,
        required: true
    },

    title: {
        type: String
    },

    // Extracted details
    name: {
        type: String,
    },

    email: {
        type: String,
    },

    phone: {
        type: String,
    },

    completed: {
        type: Boolean,
        default: false
    },

    score: {
        type: Number,
        default: 0
    },

    // Interview Q&A
    questions: [
        {
            question: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true },
        },
    ],

    interviewHistory: [
        {
            question: {
                type: String,
                require: true
            },
            answer: {
                type: String
            },
        },
    ],

    summary: {
        type: String
    }
    
}, { timestamps: true });

const Interview = model("interview", InterviewSchema);
module.exports = Interview