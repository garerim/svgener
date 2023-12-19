import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function CreatePage() {
  return (
    <div className='flex flex-col items-center w-full px-3'>
      <div className='w-full max-w-lg h-[300px] border border-3 border-foreground rounded-lg'></div>

      <div className="fixed bottom-0 right-0 left-0 p-2 flex flex-col items-center gap-y-2 w-full">
        <div className="flex flex-col items-center w-full max-w-lg">
          <p>2/5 Free Daily Generations</p>
          <div className="w-4/5 h-3 bg-zinc-200 rounded-full">
            <div className="h-full w-2/5 rounded-full bg-green-500" />
          </div>
        </div>

        <form className="p-2 bg-green-200 dark:bg-zinc-800 flex items-center gap-x-2 w-full rounded-lg max-w-lg">
          <Input className="flex-1" />
          <Button>
            <Send />
          </Button>
        </form>
      </div>
    </div>
  )
}
