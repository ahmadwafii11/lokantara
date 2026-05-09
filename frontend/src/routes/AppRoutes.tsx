import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import Beranda from "../page/Beranda";

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
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes