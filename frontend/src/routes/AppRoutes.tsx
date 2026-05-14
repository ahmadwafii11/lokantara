import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import Beranda from "../page/Beranda";
import Eksplorasi from "../page/Eksplorasi";

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
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes