const {GoogleGenAI} = require("@google/genai")
const {z}= require("zod")

const ai  = new  GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})





const interviewReportSchema = z.object({

    matchScore:z.number().describe("The match score between the candidate's profile and the job description, can be between 0 to 100"),

    technicalQuestions:z.array(z.object({
       question:z.string().describe("The technical question can be asked in the interview"),
       intention:z.string().describe("The intention of the interviewer behind the technical question"),
       answer:z.string().describe("How to answer the technical question, what points to be covered in the answer,what approach to take etc.")

    })).describe("List of technical questions that can be asked in the interview"),

    behavioralQuestions:z.array(z.object({
        question:z.string().describe("The behavioral question can be asked in the interview"),
        intention:z.string().describe("The intention of the interviewer behind the behavioral question"),    
    answer:z.string().describe("How to answer the behavioral question, what points to be covered in the answer,what approach to take etc.")
    })).describe("List of behavioral questions that can be asked in the interview"),

    skillGaps:z.array(z.object({
        skill:z.string().describe("The skill that is missing or needs improvement"),
        severity:z.enum(["low","medium","high"]).describe("The severity of the skill gap, can be low, medium or high")
    })).describe("skill gaps in the candidate's profile along with the severity of the gap, which can be low, medium or high"),

     preparationPlan:z.array(z.object({
         day:z.number().describe("The day number in the preparation plan"),
         focus:z.string().describe("The focus of that day's preparation"),
         tasks:z.array(z.string()).describe("List of tasks to be completed on that day")
     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview")

})


async function generateInterviewReport({resume ,selfDescription ,jobDescription}) {

    const promt = `
    Generate an interview report for the candidate based on the following information:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
`
    

    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:promt,
        config: {
            responseMimeType: 'application/json',
            responseJsonSchema: z.toJSONSchema(interviewReportSchema)
            
            
        }
    })


    console.log(response.text)
    
}

module.exports= generateInterviewReport

