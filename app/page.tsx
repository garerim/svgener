import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth"
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="flex justify-center pt-20">
      <div className="w-full px-2 flex flex-col items-center gap-y-4">
        <h1 className="text-[10vw] md:text-8xl font-bold text-center">Welcome on <br /> <span className="text-primary">SVGener</span></h1>
        <p className="text-[3vw] md:text-xl text-zinc-600 dark:text-zinc-400 text-center">The best way to generate your SVG using AI</p>
        <Link href='/create'>
          <Button size="lg" className="font-bold text-xl">Create</Button>
        </Link>
      </div>
      <div>
        {/* TODO : Afficher les 50 ou 100 SVG le plus populaires  */}
      </div>
    </main>
  )
}
