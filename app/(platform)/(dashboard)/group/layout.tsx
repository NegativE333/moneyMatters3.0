import { Sidebar } from "../_components/sidebar";

const GroupLayout = ({
    children
}: {children: React.ReactNode}) => {
    return (  
        <main className="pt-4 md:pt-8 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                {children}
            </div>
        </main>
    );
}
 
export default GroupLayout;