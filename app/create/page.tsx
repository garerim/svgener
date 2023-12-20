"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatCompletionMessageParam } from "ai/prompts";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const useTimedState = (state: unknown, delay = 2000) => {
  const [timedState, setTimedState] = useState(state);

  const lastUpdateRef = useRef(Date.now());

  useEffect(() => {
    if (Date.now() - lastUpdateRef.current > delay) {
      setTimedState(state);
      lastUpdateRef.current = Date.now();
      return;
    }

    const timeout = setTimeout(() => {
      setTimedState(state);
      lastUpdateRef.current = Date.now();
    }, delay - (Date.now() - lastUpdateRef.current));

    return () => clearTimeout(timeout);

  }, [state, delay]);

  return timedState;
}

export default function CreatePage() {

  const [htmlCode, setHtmlCode] = useState("")
  const timedHtmlCode = useTimedState(htmlCode, 1000);
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const prompt = formData.get('prompt');

    setLoading(true);
    setHtmlCode("");
    const newMessages = [...messages, { content: prompt, role: 'user' }];

    setMessages(newMessages as ChatCompletionMessageParam[]);

    const result = await fetch('/api/svg', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages }),
    })

    const body = result.body as ReadableStream;

    if (!body) {
      alert('Something went wrong');
      return;
    }

    const reader = body.getReader();

    let html = "";

    const readChunk = async () => {
      const { done, value } = await reader.read();

      if (done) {
        setLoading(false);
        setMessages(current => {
          const newCurrent = current.filter(c => c.role !== "assistant")
          return [...newCurrent, {
            content: html,
            role: "assistant"
          }]
        })
        return;
      }

      const chunk = new TextDecoder().decode(value);
      html += chunk;
      setHtmlCode(html)
      await readChunk();
    }

    await readChunk();
  }

  return (
    <div className='flex flex-col items-center w-full px-3'>
      <div className='w-full max-w-lg h-[300px] border border-3 border-foreground rounded-lg flex items-center justify-center overflow-hidden bg-white'>
        {timedHtmlCode ? (
          <iframe className='w-full h-full overflow-hidde'
            srcDoc={`<!DOCTYPE html>  
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>CodePen - SVG Generator</title>
            <style>
              .body {
                background: #fff;
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
              }
              svg{
                transform: scale(0.28);
              }
            </style>
          </head>
          <body class="body">
          ${timedHtmlCode}
          </body>
          </html>`} />
        ) : null}
      </div>

      <div className="fixed bottom-0 right-0 left-0 p-2 flex flex-col items-center gap-y-2 w-full">
        <div className="flex flex-col items-center w-full max-w-lg">
          <p>2/5 Free Daily Generations</p>
          <div className="w-4/5 h-3 bg-zinc-200 rounded-full">
            <div className="h-full w-2/5 rounded-full bg-green-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-2 bg-green-200 dark:bg-zinc-800 flex items-center w-full rounded-lg max-w-lg">
          <fieldset className="flex items-center w-full gap-x-2 ">
            <Input name="prompt" className="flex-1" />
            <Button type="submit">
              <Send />
            </Button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
