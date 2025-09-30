const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const ExtractResumeData = async (filePath) => {
    let text = "";

    if (filePath.endsWith(".pdf")) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        text = data.text;
    }

    // Simple extraction using regex 
    const email = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)?.[0] || "";
    const phone = text.match(/(\+?\d{1,3}[-.\s]?)?\d{10}/)?.[0] || "";
    // text = content of resume
    let name = "";
    text.split("\n").forEach(line => {
        line = line.trim();
        if (line && !line.toLowerCase().includes("resume") && !name) {
            name = line;
        }
    });

    return { name, email, phone };
};

module.exports = ExtractResumeData;
