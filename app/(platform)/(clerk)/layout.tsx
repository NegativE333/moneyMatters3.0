const ClerkLayout = ({
    children
} : { children : React.ReactNode }) => {
    return (  
        <div 
            className="h-full flex flex-col sm:flex-row items-center justify-center"
        >
            <div className="sm:hidden w-[30%] h-[30%]">
                <div
                    style={{ backgroundImage : `url(logo3.svg)`}}
                    className="w-full h-full justify-center items-center bg-no-repeat bg-center"
                >
                </div>
            </div>    
            <div className="flex items-center justify-center h-full w-full">
                {children}
            </div>
            <div
                style={{ backgroundImage : `url(logo3.svg)`}}
                className="hidden h-[80%] w-full sm:flex justify-center items-center bg-no-repeat bg-center"
            >
            </div>
        </div>
    );
}
 
export default ClerkLayout;