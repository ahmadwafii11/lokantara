import { useState } from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <>
            {/*Menu Navbar*/}
            <nav className="hidden md:block">
                <ul className="flex gap-6 items-center">
                    <li>
                        <NavLink to="/"
                        >
                            <span className="hover: text-red-500">Beranda</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/eksplorasi"
                        >
                            <span className="hover: text-red-500">Eksplorasi</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/transportasi"
                        >
                            <span className="hover: text-red-500">Transportasi</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rencanatrip"
                        >
                            <span className="hover: text-red-500">RencanaTrip</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorit"
                        >
                            <span className="hover: text-red-500">Favorit</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tentangkami"
                        >
                            <span className="hover: text-red-500">TentangKami</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar