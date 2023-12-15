const ClerkLayout = ({
    children
} : { children : React.ReactNode }) => {
    return (  
        <div 
            className="h-full flex items-center justify-center"
        >
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