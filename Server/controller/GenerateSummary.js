const Interview = require("../model/Interview");
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const GenerateSummary = async (req, res) => {
    try {
        const { answers, score } = req.body;
        const { id } = req.params;

        // Save answers + score
        const interview = await Interview.findById(id);

        // Generate summary with AI
        const summaryPrompt = `
            Candidate interview results:
            Score: ${score}%
            Answers: ${JSON.stringify(answers, null, 2)}

            Please generate a short summary:
            - Key strengths
            - Weak areas
            - Suggestions for improvement`;

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: summaryPrompt }],
        });

        const summary = completion.choices[0].message.content;

        // Save summary in DB
        interview.summary = summary;
        await interview.save();

        return res.status(200).json({
            success: true,
            summary
        })
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error finishing interview" });
    }
}

module.exports = GenerateSummary;