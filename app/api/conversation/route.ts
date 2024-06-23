import { checkApiLimit, increaseApiLimit } from "@/lib/userApiLimit";
import  { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const chat = model.startChat({
            history: [
            {
                role: "user",
                parts: [{ text: '', }],
            },
            {
                role: "model",
                parts: [{ text:"Continue the conversation without any code snippets " }],
            },
            ],
            generationConfig: {
            maxOutputTokens: 1000,
            },
        });

export async function POST(req:Request){
    const {message}:{message:string} = await req.json()
    try {
        
        const result = await chat.sendMessageStream(message);
        const freeTrial = await checkApiLimit()

        if(!freeTrial){
            return new NextResponse('Free trial expired',{status:403})
        }
       
        const response = await result.response;
        const content =  response.text()
        const role = response?.candidates[0].content.role
        
        await increaseApiLimit()
        return NextResponse.json({role,content},{status:201})

        

        
    } catch (error) {
        console.log('error',error)
        return new NextResponse('internal server error',{status:500})
        
    }
}


// async function run() {
//   // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

//   const chat = model.startChat({
//     history: [
//       {
//         role: "user",
//         parts: [{ text: "Hello, I have 2 dogs in my house." }],
//       },
//       {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//       },
//     ],
//     generationConfig: {
//       maxOutputTokens: 100,
//     },
//   });

//   const msg = "hi";

//   const result = await chat.sendMessageStream(msg);
//   let text = '';
//         for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             console.log(chunkText);
//             text += chunkText;
//         }
//   const response = await result.response;
//   const msgs = response.text();
//   console.log(text);
// }

// // run();
