import { GroupControl } from "./_components/group-control";

const GroupIdLayout = ({
    children
} : { children : React.ReactNode}) => {
    return (  
        <>
            <GroupControl />
            {children}
        </>
    );
}
 
export default GroupIdLayout;