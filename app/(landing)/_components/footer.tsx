import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const Footer = () => {
    return(
        <div className="fixed bottom-0 w-full p-4 border-t bg-slate-100 ">
            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-center sm:justify-between">
                <Logo />
                <div className="hidden sm:flex">
                    © 2023 Money Matters
                </div>
                <div className="space-x-4 md:block md:w-auto flex items-center">
                    <Button size="sm" variant="ghost" asChild>
                        <Link 
                            target="_blank"
                            href="https://money-matter2-0-d6qr.vercel.app/"
                        >
                            Visit Money Matters 2.0
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}