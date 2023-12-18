import { Logo } from "@/components/logo"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { MobileSidebar } from "./mobile-sidebar"


export const Navbar = () => {
    return(
        <div className="fixed z-50 top-0 px-2 sm:px-14 w-full h-14 border-b bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher 
                    hidePersonal
                    afterCreateOrganizationUrl="/group/:id"
                    afterSelectOrganizationUrl="/group/:id"
                    afterLeaveOrganizationUrl="/group/:id"
                    appearance={{
                        elements:{
                            rootBox:{
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center"
                            }
                        }
                    }}
                />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements:{
                            avatarBox:{
                                height: 30,
                                width: 30
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}