import { OrganizationList } from "@clerk/nextjs";

const SelectGroup = () => {
    return (  
        <OrganizationList 
            hidePersonal
            afterSelectOrganizationUrl="/group/:id"
            afterCreateOrganizationUrl="/group/:id"
        />
    );
}
 
export default SelectGroup;