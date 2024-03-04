import { InfoImage } from "./info-image";
import { InfoTitle } from "./info-title";
import { BalanceFetcher } from "./balanceFetcher";
import { Option } from "./option";
import { Separator } from "@/components/ui/separator";
import { InfoMemberCount } from "./info-member-count";

export const Info = () => {
  return (
    <div>
      <div className="flex items-center gap-x-2 sm:gap-x-4 w-full">
        <InfoImage />
        <div className="space-y-1">
          <InfoTitle />
          <div className="flex gap-1 justify-center items-center">
            <BalanceFetcher />
            <Separator 
              orientation="vertical" 
              className="mx-2 h-4 bg-black/70"
            />
            <InfoMemberCount />
          </div>
        </div>
        <Option />
      </div>
      <Separator className="my-4"/>
    </div>
  );
};
