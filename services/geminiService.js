import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with your key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateEmployeeScore(employeeData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

    const prompt = `
    Analyze this employee profile and provide a overall score out of 100, with explanation.
    Consider their work experience, education, and current status.

    Profile:
    - Username: ${employeeData.username}
    - Email: ${employeeData.email}
    - Phone: ${employeeData.phone}
    - role: ${employeeData.role}
    - age: ${employeeData.age}
    - Work Experience: ${employeeData.workExperience}
    - Education: ${employeeData.graduation}
    - Current Course: ${employeeData.currentCourse}
    - Work Status: ${employeeData.workStatus}

    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    // Extract score from response
    const scoreMatch = response.match(/(\d+)\/100/);
    if (scoreMatch) {
      const score = parseInt(scoreMatch[1]);
      return {
        score: score,
        explanation: response,
      };
    }

    try {
      return JSON.parse(response);
    } catch (e) {
      console.error("Failed to parse Gemini response:", response);
      return {
        score: 3,
        explanation:
          "Score generated with default values due to parsing error.",
      };
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
