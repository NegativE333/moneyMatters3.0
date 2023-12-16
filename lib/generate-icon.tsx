import { BadgeIndianRupee, Car, Cigarette, Coffee, Fuel, Home, IceCream2, IndianRupee, PartyPopper, Pill, Utensils } from "lucide-react"

export const generateIcon = (expenseType : string) => {
    switch(expenseType){
        case "chai":
            return <Coffee className="h-10 w-10"/>;
        case "tea":
            return <Coffee className="h-10 w-10"/>;
        case "coffee":
            return <Coffee className="h-10 w-10"/>;
        case "fuel":
            return <Fuel className="h-10 w-10"/>;
        case "petrol":
            return <Fuel className="h-10 w-10"/>;
        case "food":
            return <Utensils className="h-10 w-10"/>;
        case "j1":
            return <Utensils className="h-10 w-10"/>;
        case "biryani":
            return <Utensils className="h-10 w-10"/>;
        case "nasta":
            return <Utensils className="h-10 w-10"/>;
        case "pulao":
            return <Utensils className="h-10 w-10"/>;
        case "pohe":
            return <Utensils className="h-10 w-10"/>;
        case "vadapav":
            return <Utensils className="h-10 w-10"/>;
        case "maggie":
            return <Utensils className="h-10 w-10"/>;
        case "dine":
            return <Utensils className="h-10 w-10"/>;
        case "dinner":
            return <Utensils className="h-10 w-10"/>;
        case "lunch":
            return <Utensils className="h-10 w-10"/>;
        case "breakfast":
            return <Utensils className="h-10 w-10"/>;
        case "ice-cream":
            return <IceCream2 className="h-10 w-10"/>;
        case "ice":
            return <IceCream2 className="h-10 w-10"/>;
        case "cream":
            return <IceCream2 className="h-10 w-10"/>;
        case "icecream":
            return <IceCream2 className="h-10 w-10"/>;
        case "cigarette":
            return <Cigarette className="h-10 w-10"/>;
        case "car":
            return <Car className="h-10 w-10"/>;
        case "auto":
            return <Car className="h-10 w-10"/>;
        case "medicine":
            return <Pill className="h-10 w-10"/>;
        case "rent":
            return <Home className="h-10 w-10"/>;
        case "welcomeexpenseunique":
            return <PartyPopper className="h-10 w-10"/>;
        default:
            return <BadgeIndianRupee className="h-10 w-10"/>;
        
    }
}