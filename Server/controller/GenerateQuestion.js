const Interview = require("../model/Interview");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GenerateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const interview = await Interview.findById(id);

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found",
            });
        }

        // If questions already exist, return them
        if (interview.questions && interview.questions.length > 0) {
            return res.json({ success: true, questions: interview.questions });
        }

        // Generate questions from OpenAI
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an interview assistant that generates technical MCQs.",
                },
                {
                    role: "user",
                    content: `Generate 6 multiple-choice questions for topic "${interview.title}" in JSON format. Each question must have: "question" (string), "options" (array of 4 strings), "correctAnswer" (string). Return JSON only.`,
                },
            ],
        });

        let content = response.choices[0].message.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let questions = JSON.parse(content);

        // Save questions in DB
        interview.questions = questions;
        await interview.save();

        res.json({ success: true, questions });
    }

    catch (error) {
        // Handle OpenAI rate limit errors
        if (error.code === "rate_limit_exceeded") {
            return res.status(429).json({
                success: false,
                message: `Rate limit exceeded. Try again in ${error.headers?.get("retry-after") || 400} seconds.`,
            });
        }
        
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = GenerateQuestion;
