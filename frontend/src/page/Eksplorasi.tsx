import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Search, MapPin, Landmark, TreePine, Trees, Volleyball, Mountain, VenetianMask, Shapes } from "lucide-react";

import imageBackground from "../assets/background.jpeg";

function Eksplorasi() {

    const [destinations, setDestinations] = useState<any[]>([]);
    const [filters, setFilters] = useState<any[]>([]);
    const navigate = useNavigate();
    const iconMap: Record<string, JSX.Element> = {
        Museum: <Landmark className="h-4 w-4"/>,
        Monumen: <Landmark className="h-4 w-4"/>,
        Alam: <Trees className="h-4 w-4"/>,
        Taman: <TreePine className="h-4 w-4"/>,
        Pantai: <Volleyball className="h-4 w-4"/>,
        Gunung: <Mountain className="h-4 w-4"/>,
        Budaya: <VenetianMask className="h-4 w-4"/>
    }
    const { filter } = useParams()

    // useEffect for filter button
    useEffect(() => {
        fetch("http://localhost:3000/api/tourismcategories")
            .then((res) => res.json())
            .then((data) => setFilters(data));
    }, [])

    // useEffect for section destinations
    useEffect(() => {
        const url =  filter
            ? `http://localhost:3000/api/destinations/tourismcategories/${filter}`
            : "http://localhost:3000/api/destinations"
        fetch(url)
            .then((res)  => res.json())
            .then((data) => setDestinations(data))
    }, [filter]);

    return (
        <div className="min-h-screen bg-white">

            {/* HERO SECTION */}
            <section
                className="relative flex min-h-[600px] w-full items-center bg-cover bg-center md:h-screen"
                style={{
                    backgroundImage: `url(${imageBackground})`,
                }}
            >

                {/* OVERLAY */}
                <div
                    className="
                        absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-950/40 via-[60%]to-white"
                />

                <div className="relative z-10 mx-auto max-w-7xl w-full px-6 py-20 md:py-0">
                    <div className="max-w-3xl">
                        <h1 className="font-outfit text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                            Eksplorasi Wisata
                        </h1>

                        <p className="mt-6 text-lg text-gray-200 md:text-xl hover:text-yellow-400">
                            Temukan destinasi wisata terbaik dengan
                            integrasi transportasi publik yang mudah
                            dan efisien.
                        </p>

                        {/* SEARCH */}
                        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md sm:flex-row">
                            <div className="flex w-full items-center gap-3 px-3">
                                <Search className="h-5 w-5 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Cari destinasi wisata..."
                                    className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-400"
                                />
                            </div>

                            <button className="w-full rounded-xl bg-yellow-400 px-8 py-3 font-bold text-gray-900 transition hover:bg-yellow-500 sm:w-auto">
                                Cari
                            </button>
                        </div>

                        {/* FILTERS */}
                        <div className="mt-8 flex flex-wrap gap-3 overflow-x-auto pb-4">
                            {filters.map((filter: any) => (
                                <button
                                    key={filter.id}
                                    onClick={() => 
                                        navigate(
                                            `/eksplorasi/category/${filter.categoryName.toLowerCase()}`
                                        )
                                    }
                                    className="flex flex-shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-yellow-400 hover:text-black">
                                    {
                                        iconMap[filter.categoryName]
                                        ||
                                        <Shapes className="h4-w-4"/>
                                    }
                                    {filter.categoryName}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DESTINATIONS */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="font-outfit text-3xl font-bold text-gray-900 md:text-4xl">
                            Destinasi Populer
                        </h2>
                        <div className="mt-2 h-1 w-20 rounded-full bg-yellow-400"/>
                    </div>
                    <button className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800">
                        Lihat Semua
                    </button>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination: any) => {
                        const image = destination.images?.[0];
                        return (
                            <div
                                key={destination.id}
                                className="group cursor-pointer rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
                            >

                                {/* IMAGE */}
                                <div className="relative overflow-hidden rounded-t-3xl">
                                    <img
                                        src={
                                            image
                                                ? `http://localhost:3000${image.imageUrl}`
                                                : "https://placehold.co/600x400"
                                        }
                                        alt={destination.name}
                                        className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 backdrop-blur-sm">
                                        Terpopuler
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-6">
                                    <h3 className="font-outfit text-xl font-bold text-gray-900 transition group-hover:text-blue-500">
                                        {destination.name}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-2 text-gray-500">
                                        <MapPin className="h-4 w-4 text-red-500"
                                        />
                                        <p className="text-sm font-medium">
                                            {
                                                destination.region
                                                    ?.regionName
                                            }
                                        </p>
                                    </div>
                                    <button className="mt-6 w-full rounded-xl bg-gray-50 py-3 font-semibold text-gray-900 transition hover:bg-yellow-400">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default Eksplorasi;
