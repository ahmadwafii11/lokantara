import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Menu,
    X,
    Bell,
    MapPinned,
    Train,
    Heart,
    Users,
    Route,
} from "lucide-react";

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);

    const navItems = [
        {
            name: "Beranda",
            path: "/",
        },
        {
            name: "Eksplorasi",
            path: "/eksplorasi",
        },
        {
            name: "Transportasi",
            path: "/transportasi",
        },
        {
            name: "RencanaTrip",
            path: "/rencanatrip",
        },
        {
            name: "Komunitas",
            path: "/komunitas",
        },
        {
            name: "Favorit",
            path: "/favorit",
        },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-blue-500/70 backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-10">

                        {/* LOGO */}
                        <NavLink
                            to="/"
                            className="flex items-center gap-2"
                        >
                            <div className="rounded-xl bg-yellow-300 p-2">
                                <Train className="h-5 w-5 text-white" />
                            </div>

                            <div>
                                <h1 className="text-lg font-bold text-white">
                                    Lokantara
                                </h1>

                                <p className="text-[10px] text-gray-100">
                                    Smart Public Journey
                                </p>
                            </div>
                        </NavLink>

                        {/* DESKTOP MENU */}
                        <div className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200
                                        
                                        ${
                                            isActive
                                                ? "bg-yellow-300 text-white"
                                                : "text-white hover:bg-yellow-100/50 hover:text-white"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">

                        {/* ICON BUTTONS */}
                        <button className="hidden sm:flex rounded-xl p-2 text-gray-300 hover:bg-white/5 hover:text-white transition">
                            <MapPinned className="h-5 w-5" />
                        </button>

                        <button className="hidden sm:flex rounded-xl p-2 text-gray-300 hover:bg-white/5 hover:text-white transition">
                            <Bell className="h-5 w-5" />
                        </button>

                        {/* PROFILE */}
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setProfileMenu(!profileMenu)
                                }
                                className="flex items-center"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                                    alt="profile"
                                    className="h-10 w-10 rounded-full border border-white/10 object-cover"
                                />
                            </button>

                            {/* DROPDOWN */}
                            {profileMenu && (
                                <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl">
                                    <div className="border-b border-white/10 p-4">
                                        <h3 className="font-semibold text-white">
                                            Ahmad Wafi
                                        </h3>

                                        <p className="text-sm text-gray-400">
                                            ahmad@email.com
                                        </p>
                                    </div>

                                    <div className="p-2">
                                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                            <Users className="h-4 w-4" />
                                            Profil Saya
                                        </button>

                                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                            <Route className="h-4 w-4" />
                                            Trip Saya
                                        </button>

                                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white">
                                            <Heart className="h-4 w-4" />
                                            Favorit
                                        </button>

                                        <hr className="my-2 border-white/10" />

                                        <button className="flex w-full items-center rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* MOBILE BUTTON */}
                        <button
                            onClick={() =>
                                setMobileMenu(!mobileMenu)
                            }
                            className="rounded-xl p-2 text-gray-300 hover:bg-white/5 hover:text-white md:hidden"
                        >
                            {mobileMenu ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenu && (
                <div className="border-t border-white/10 bg-gray-950/95 backdrop-blur-xl md:hidden">
                    <div className="space-y-2 px-4 py-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `block rounded-xl px-4 py-3 text-sm font-medium transition
                                    
                                    ${
                                        isActive
                                            ? "bg-yellow-300 text-white"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;