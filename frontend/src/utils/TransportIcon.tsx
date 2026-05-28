import { Bus, Train, Plane, ShipWheel, Shapes } from "lucide-react";

export const getTransportIcon = (category: string) => {
        switch (category) {
            case "Kereta Api" : 
                return <Train className="h-4 w-4"/>;
            case "Bus":
                return <Bus className="h-4 w-4" />;
            case "MiniBus": 
                return <Bus className="h-4 w-4" />;
            case "Pesawat": 
                return <Plane className="h-4 w-4" />;
            case "Kapal": 
                return <ShipWheel className="h-4 w-4" />;
            default:
                return <Shapes className="h-4 w-4" />
        }
    }