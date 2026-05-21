import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Disclaimer from "../components/Disclaimer";


import Beranda from "../page/Beranda";
import Eksplorasi from "../page/Eksplorasi";
import EksplorasiDetail from "../page/EksplorasiDetail";
import EksplorasiSearch from "../page/EksplorasiSearch";
import Transportasi from "../page/Transportasi";

function AppRoutes() {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route
                path="/"
                element={
                    <Beranda/>
                }
                />
                <Route
                path="/eksplorasi"
                element={
                    <Eksplorasi/>
                }
                />
                <Route
                path="/eksplorasi/category/:filter"
                element={
                    <Eksplorasi />
                }
                />
                <Route
                path="/eksplorasi/:slug"
                element={
                    <>
                        <EksplorasiDetail />
                        <Disclaimer />
                    </>
                }
                />
                <Route
                path="/eksplorasi/search"
                element={
                    <EksplorasiSearch/>
                }
                />
                <Route
                path="/transportasi"
                element={
                    <Transportasi/>
                }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes