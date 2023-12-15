import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

const LandingLayout = ({
    children
} : { children : React.ReactNode}) => {
    return (  
        <div className="h-full bg-slate-100">
            <Navbar />
            <main className="pt-24 sm:pt-32 pb-16 bg-slate-100">
                {children}
            </main>
            <Footer />
        </div>
    );
}
 
export default LandingLayout;