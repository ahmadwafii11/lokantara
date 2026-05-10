import { Search, MapPin, Landmark, TreePine, Trees, Volleyball, Mountain, VenetianMask } from "lucide-react";
import imageBackground from "../assets/background.jpeg";

function Eksplorasi() {
    const destinations = [
        {
            name: "Gunung Bromo",
            location: "Jawa Timur",
            image: "https://images.unsplash.com/photo-1570789210967-2cac24afeb00",
        },
        {
            name: "Malioboro",
            location: "Yogyakarta",
            image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47",
        },
        {
            name: "Danau Toba",
            location: "Sumatera Utara",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        },
    ];

    const filters = [
        { name: "Museum", icon: <Landmark className="h-4 w-4" /> },
        { name: "Monumen", icon: <Landmark className="h-4 w-4" /> },
        { name: "Alam", icon: <Trees className="h-4 w-4" /> },
        { name: "Taman", icon: <TreePine className="h-4 w-4" /> },
        { name: "Pantai", icon: <Volleyball className="h-4 w-4" /> },
        { name: "Gunung", icon: <Mountain className="h-4 w-4" /> },
        { name: "Budaya", icon: <VenetianMask className="h-4 w-4" /> },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* HERO SECTION */}
            <section
                className="relative min-h-[600px] md:h-screen w-full flex items-center bg-cover bg-center"
                style={{ backgroundImage: `url(${imageBackground})` }}
            >
                {/* Overlay agar teks terbaca dan menyatu ke bawah */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/60 via-indigo-950/40 to-white" />

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-0 w-full">
                    <div className="max-w-3xl">
                        <h1 className="font-outfit text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                            Eksplorasi Wisata
                        </h1>

                        <p className="mt-6 text-lg text-gray-200 md:text-xl hover:text-yellow-400">
                            Temukan destinasi wisata terbaik dengan integrasi transportasi
                            publik yang mudah dan efisien.
                        </p>

                        {/* SEARCH BOX */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md">
                            <div className="flex w-full items-center gap-3 px-3">
                                <Search className="h-5 w-5 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Cari destinasi wisata..."
                                    className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <button className="w-full sm:w-auto rounded-xl bg-yellow-400 px-8 py-3 font-bold text-gray-900 transition hover:bg-yellow-500">
                                Cari
                            </button>
                        </div>

                        {/* FILTER BUTTONS - Scrollable on mobile */}
                        <div className="mt-8 flex flex-wrap gap-3 overflow-x-auto pb-4 sm:pb-0 no-scrollbar">
                            {filters.map((filter) => (
                                <button
                                    key={filter.name}
                                    className="flex flex-shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-yellow-400 hover:text-black"
                                >
                                    {filter.icon}
                                    {filter.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DESTINATION GRID */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="font-outfit text-3xl font-bold text-gray-900 md:text-4xl">
                            Destinasi Populer
                        </h2>
                        <div className="mt-2 h-1 w-20 rounded-full bg-yellow-400" />
                    </div>

                    <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition ">
                        Lihat Semua &rarr;
                    </button>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination) => (
                        <div
                            key={destination.name}
                            className="group cursor-pointer rounded-3xl bg-white shadow-sm border border-gray-100 transition hover:shadow-xl"
                        >
                            <div className="relative overflow-hidden rounded-t-3xl">
                                <img
                                    src={destination.image}
                                    alt={destination.name}
                                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-900 backdrop-blur-sm">
                                    Terpopuler
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="font-outfit text-xl font-bold text-gray-900 group-hover:text-blue-500 transition">
                                    {destination.name}
                                </h3>

                                <div className="mt-2 flex items-center gap-2 text-gray-500">
                                    <MapPin className="h-4 w-4 text-red-500" />
                                    <p className="text-sm font-medium">{destination.location}</p>
                                </div>

                                <button className="mt-6 w-full rounded-xl bg-gray-50 py-3 font-semibold text-gray-900 transition hover:bg-yellow-400">
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Eksplorasi;