import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import Beranda from "../page/Beranda";
import Eksplorasi from "../page/Eksplorasi";
import EksplorasiDetail from "../page/EksplorasiDetail";

import Disclaimer from "../components/Disclaimer";

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
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes