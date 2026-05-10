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

  return (
    // <div className="relative h-screen w-full bg-cover bg-center"
    //         style={{
    //             backgroundImage: `url(${imageBackground})`,
    //         }}
    // >
        <div className="min-h-screen bg-white-950 text-white">
            <div className="relative h-screen w-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(${imageBackground})`,
            }}>
                {/* HERO */}
                <section className="border-b border-white/10 bg-gradient-to-b from-indigo-950/40 to-gray-950">
                    <div className="mx-auto max-w-7xl px-6 py-50">
                        <h1 className="font-outfit text-5xl font-bold md:text-6xl">
                            Eksplorasi Wisata
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-gray-300 hover:text-yellow-400">
                            Temukan destinasi wisata terbaik dengan integrasi transportasi
                            publik yang mudah dan efisien.
                        </p>

                        {/* SEARCH */}
                        <div className="mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
                            <Search className="h-5 w-5 text-gray-400" />

                            <input
                                type="text"
                                placeholder="Cari destinasi wisata..."
                                className="w-full bg-transparent outline-none placeholder:text-gray-500"
                            />

                            <button className="bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out hover:bg-amber-500 hover:shadow-lg">
                                Cari
                            </button>
                        </div>

                        {/* TRANSPORT FILTER */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <Landmark className="h-4 w-4" />
                                Musuem
                            </button>

                            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <Landmark className="h-4 w-4" />
                                Monumen
                            </button>

                            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <Trees className="h-4 w-4" />
                                Alam
                            </button>
                            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <TreePine className="h-4 w-4" />
                                Taman
                            </button>
                            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <Volleyball className="h-4 w-4" />
                                Pantai
                            </button>
                            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <Mountain className="h-4 w-4" />
                                Gunung
                            </button>
                            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-yellow-300">
                                <VenetianMask className="h-4 w-4" />
                                Budaya
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* DESTINATION GRID */}
            <section className="mx-auto max-w-7xl px-6 py-16 ">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="font-outfit text-3xl font-bold text-gray-800">
                        Destinasi Populer
                    </h2>

                    <button className="text-sm text-yellow-400 hover:text-yellow-500">
                        Lihat Semua
                    </button>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination) => (
                    <div
                        key={destination.name}
                        className="group overflow-hidden rounded-3xl border text-gray-800 border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={destination.image}
                                alt={destination.name}
                                className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="p-5">
                            <h3 className="font-outfit text-2xl font-semibold">
                                {destination.name}
                            </h3>

                        <div className="mt-2 flex items-center gap-2 text-gray-400">
                            <MapPin className="h-4 w-4" />
                            <p className="text-sm">{destination.location}</p>
                        </div>

                        <button className="mt-5 w-full rounded-2xl bg-yellow-400 text-gray-900 px-4 py-3 font-medium transition duration-200 hover:bg-amber-500 hover:shadow-lg">
                            Lihat Detail
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
            </section>
        </div>
    // </div>
  );
}

export default Eksplorasi;
