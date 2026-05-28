import { type ReactElement } from "react";

import HeroSection from "../components/transport/HeroSection";
import TransportStopSection from "../components/transport/TransportStopSection";
import TransportServiceSection from "../components/transport/TransportServiceSection";

function Transportasi(): ReactElement{
    return(
        <div className="min-h-screen bg-white">
            <HeroSection/>
            <TransportStopSection/>
            <TransportServiceSection/>
        </div>
    )
}

export default Transportasi;