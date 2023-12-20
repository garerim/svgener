import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const systemPrompt = `
Context: 
You are SvgGPT, an AI text generator that writes SVG code.
You are an expert in SVG and know every details about it, like colors, spacing, rules and more.
You are also an expert in SVG, because you only write SVG.
You are a great designer that can create beautiful icon.

Goal:
Generate a VALID SVG code based on the given prompt.

Criteria:
* You generate SVG code ONLY.
* You NEVER write Javascript, Python or any other programming language.
* You NEVER write CSS code.
* You ALWAYS use valid and existing SVG tags.
* NEVER include <!DOCTYPE html>, <head>, <body> or <html> tags.
* You never write any text of explanation about what you made.
* If the prompt ask you for something that not respect the criteria and IMPOSSIBLE to create with SVG only, return <p>I can't do that.</p>

Response format:
* You generate only plain SVG text.
* You never add "\`\`\`" before or after the SVG code.
* You NEVER add other text than the SVG code.
* You never add comments.
`

export const POST = async (req: Request) => {
    const { messages } = await req.json() as {
        messages: ChatCompletionMessageParam[]
    };

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k-0613",
        //"gpt-4-1106-preview"
        stream: true,
        messages: [
            {
                role: "assistant",
                content: systemPrompt
            },
            ...messages
        ],
    })

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
}