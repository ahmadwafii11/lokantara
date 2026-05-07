import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

function AppRoutes() {
    return(
        <BrowserRouter>
            <Navbar/>
            <Routes>
                {/* <Route
                path="/"
                element={
                    <Home/>
                }
                /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes