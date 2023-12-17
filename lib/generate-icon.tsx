import { BadgeIndianRupee, Car, Cigarette, Coffee, Fuel, Home, IceCream2, PartyPopper, Pill, Utensils } from "lucide-react"
import { cn } from "./utils";

export const generateIcon = (expenseType : string, className: string) => {
    switch(expenseType){
        case "chai":
            return <Coffee className={cn(className)}/>;
        case "tea":
            return <Coffee className={cn(className)}/>;
        case "coffee":
            return <Coffee className={cn(className)}/>;
        case "fuel":
            return <Fuel className={cn(className)}/>;
        case "petrol":
            return <Fuel className={cn(className)}/>;
        case "food":
            return <Utensils className={cn(className)}/>;
        case "j1":
            return <Utensils className={cn(className)}/>;
        case "biryani":
            return <Utensils className={cn(className)}/>;
        case "nasta":
            return <Utensils className={cn(className)}/>;
        case "pulao":
            return <Utensils className={cn(className)}/>;
        case "pohe":
            return <Utensils className={cn(className)}/>;
        case "vadapav":
            return <Utensils className={cn(className)}/>;
        case "maggie":
            return <Utensils className={cn(className)}/>;
        case "dine":
            return <Utensils className={cn(className)}/>;
        case "dinner":
            return <Utensils className={cn(className)}/>;
        case "lunch":
            return <Utensils className={cn(className)}/>;
        case "breakfast":
            return <Utensils className={cn(className)}/>;
        case "ice-cream":
            return <IceCream2 className={cn(className)}/>;
        case "ice":
            return <IceCream2 className={cn(className)}/>;
        case "cream":
            return <IceCream2 className={cn(className)}/>;
        case "icecream":
            return <IceCream2 className={cn(className)}/>;
        case "cigarette":
            return <Cigarette className={cn(className)}/>;
        case "car":
            return <Car className={cn(className)}/>;
        case "auto":
            return <Car className={cn(className)}/>;
        case "medicine":
            return <Pill className={cn(className)}/>;
        case "rent":
            return <Home className={cn(className)}/>;
        case "welcomeexpenseunique":
            return <PartyPopper className={cn(className)}/>;
        default:
            return <BadgeIndianRupee className={cn(className)}/>;
        
    }
}