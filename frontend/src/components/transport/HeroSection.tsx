import type { ReactElement } from "react";

import { Search } from "lucide-react";
import imageBackground from "../../assets/background-transportation-1.jpg";

function HeroSection(): ReactElement {
    return (
        <>
            {/* HERO SECTION */}
            <section
                className="relative flex min-h-[600px] w-full items-center bg-cover bg-center md:h-screen"
                style={{
                    backgroundImage: `url(${imageBackground})`
                }}
            >

                {/* OVERLAY */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60"
                />

                <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-20 md:py-0">
                    <div className="max-w-3xl">
                        <h1 className="font-outfit text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                            Eksplorasi Transportasi
                        </h1>
                        <p className="mt-6 text-lg text-gray-200 md:text-xl hover:text-yellow-400">
                            Temukan transportasi terbaik untuk menunjang perjalanan wisata Anda dengan mudah
                        </p>

                        {/* SEARCH */}
                        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row">
                            <div className="flex w-full items-center gap-3 px-3">
                                <Search className="h-5 w-5 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Cari stasiun, terminal, kota, atau rute..."
                                    className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-400"
                                />
                            </div>

                            <button
                                className="w-full rounded-xl bg-yellow-400 px-8 py-3 font-bold text-gray-900 transition hover:bg-yellow-500 sm:w-auto"
                            >
                                Cari
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection;