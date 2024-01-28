import { BadgeIndianRupee, Car, Cigarette, Coffee, Fuel, Home, IceCream2, PartyPopper, Pill, Popcorn, School, Scissors, Utensils } from "lucide-react"
import { cn } from "./utils";

export const generateIcon = (expenseType : string, className : string) => {
    if(
        expenseType === "chai" || 
        expenseType === "tea" || 
        expenseType === "coffee"
    ){
        return <Coffee className={cn(className)} />;
    } 
    else if(
        expenseType === "fuel" || 
        expenseType === "petrol"
    ){
        return <Fuel className={cn(className)} />;
    } 
    else if(
        expenseType === "food" || 
        expenseType === "j1" || 
        expenseType === "biryani" || 
        expenseType === "nasta" || 
        expenseType === "pulao" || 
        expenseType === "pohe" || 
        expenseType === "vadapav" || 
        expenseType === "maggie" || 
        expenseType === "dine" || 
        expenseType === "dinner" || 
        expenseType === "lunch" || 
        expenseType === "breakfast"||
        expenseType === "brunch"
    ){
        return <Utensils className={cn(className)} />;
    } 
    else if(
        expenseType === "ice-cream" || 
        expenseType === "ice" || 
        expenseType === "cream" || 
        expenseType === "icecream"||
        expenseType === "ice cream"
    ){
        return <IceCream2 className={cn(className)} />;
    } 
    else if(
        expenseType === "cigarette"
    ){
        return <Cigarette className={cn(className)} />;
    } 
    else if(
        expenseType === "car" || 
        expenseType === "auto"
    ){
        return <Car className={cn(className)} />;
    } 
    else if(
        expenseType === "medicine"
    ){
        return <Pill className={cn(className)} />;
    } 
    else if(
        expenseType === "rent"
    ){
        return <Home className={cn(className)} />;
    } 
    else if(
        expenseType === "cutting" ||
        expenseType === "hair cut" ||
        expenseType === "saloon"
    ){
        return <Scissors className={cn(className)}/>
    }
    else if(
        expenseType === 'movie' ||
        expenseType === 'cinema' ||
        expenseType === 'theater'
    ){
        return <Popcorn className={cn(className)}/>
    }
    else if(
        expenseType === 'book' ||
        expenseType === 'books' ||
        expenseType === 'pen' ||
        expenseType === 'pencil' ||
        expenseType === 'notebook'
    ){
        return <School className={cn(className)}/>
    }
    else if(
        expenseType === "welcomeexpenseunique"
    ){
        return <PartyPopper className={cn(className)} />;
    } 
    else{
        return <BadgeIndianRupee className={cn(className)} />;
    }
};
