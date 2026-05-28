import { Bus, Train, Plane, ShipWheel, Shapes } from "lucide-react";

export const getTransportStopIcon = (category: string) => {
        switch (category) {
            case "Stasiun" : 
                return <Train className="h-4 w-4"/>;
            case "Terminal":
                return <Bus className="h-4 w-4" />;
            case "Halte": 
                return <Bus className="h-4 w-4" />;
            case "Bandara": 
                return <Plane className="h-4 w-4" />;
            case "Pelabuhan": 
                return <ShipWheel className="h-4 w-4" />;
            default:
                return <Shapes className="h-4 w-4" />
        }
    }