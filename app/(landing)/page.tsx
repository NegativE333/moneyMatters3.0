import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import Link from "next/link";

import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2"
});

const textFont = Poppins({
  subsets: ["latin"],
  weight:[
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ]
})

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col", headingFont.className)}>
        <div className="mb-4 flex flex-col sm:flex-row items-center border shadow-sm p-4 bg-teal-100 text-teal-900 rounded-full uppercase text-center ml-2 mr-2 sm:ml-0 sm:mr-0 gap-1 sm:gap-0">
          <Gem className="h-6 w-6 mr-2"/>
          Best Expense Management Platform
        </div>
        <h1 className="text-3xl md:text-5xl text-center text-neutral-800 mb-6 ml-1 mr-1 sm:ml-0 sm:mr-0">
          Simplify Your Finances with Money Matters
        </h1>
        <div className="text-3xl md:text-5xl text-center bg-gradient-to-r from-cyan-600 to-red-600 text-white px-4 p-2 rounded-md pb-2 w-fit ml-2 mr-2 sm:ml-0 sm:mr-0">
          Effortless Expense Tracking and Bill Splitting
        </div>
      </div>
      <div className={cn("flex flex-col items-center justify-center mt-4 gap-2 rounded-sm p-4", textFont.className)}>
        <ol className="flex flex-col gap-2 items-center justify-center">
          <li className="bg-amber-200 text-amber-900 p-2 rounded-sm text-center">
            Effortlessly track your expenses in real-time
          </li>
          <li className="bg-amber-200 text-amber-800 p-2 rounded-sm text-center">
            Split bills seamlessly with friends and roommates
          </li>
          <li className="bg-amber-200 text-amber-700 p-2 rounded-sm text-center">
            Intuitive design for a hassle-free experience
          </li>
        </ol>
      </div>
      <Button 
        className="mt-3 sm:mt-4"
        size="lg"
      >
        <Link href="/sign-up">
          Get Started
        </Link>
      </Button>
    </div>
  )
}
