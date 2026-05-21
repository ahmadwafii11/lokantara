import { JSX, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, Bus, Train, Plane, ShipWheel, Shapes, MapPin } from "lucide-react";

import imageBackground from "../assets/background-transportation-1.jpg"

function Transportasi() {
    const { filter } = useParams()
    const navigate = useNavigate()

    const [filters, setFilters] = useState<any[]>([]);
    const [transportStop, setTransportStop] = useState<any[]>([]);

    const transportFilters: Record<string, JSX.Element> = {
        Stasiun: <Train className="h-4 w-4" />,
        Terminal: <Bus className="h-4 w-4" />,
        Halte: <Bus className="h-4 w-4" />,
        Bandara: <Plane className="h-4 w-4" />,
        Pelabuhan: <ShipWheel className="h-4 w-4" />,
    }

    // useEffect for filter button
    useEffect(() => {
        fetch("http://localhost:3000/api/transportstopcategories")
            .then((res) => res.json())
            .then((data) => setFilters(data));
    }, [])

    // useEffect for section transportstop
    useEffect(() => {
        const url = filter
            ? `http://localhost:3000/api/transportstop/transportstopcategories/${filter}`
            : "http://localhost:3000/api/transportstop"
        fetch(url)
            .then((res) => res.json())
            .then((data) => setTransportStop(data))
    }, [filter]);

    return (
        <>
            <div className="min-h-screen bg-white">

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
                                        placeholder="Cari transportasi..."
                                        className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-400"
                                    />
                                </div>

                                <button
                                    className="w-full rounded-xl bg-yellow-400 px-8 py-3 font-bold text-gray-900 transition hover:bg-yellow-500 sm:w-auto"
                                >
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
                                                `/transportasi/search?category=${filter.name.toLowerCase()}`
                                            )
                                        }
                                        className="flex flex-shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-yellow-400 hover:text-black"
                                    >
                                        {
                                            transportFilters[filter.name]
                                            ||
                                            <Shapes className="h4-w-4" />
                                        }
                                        {filter.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Transportations Stop */}
                <section className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <h2 className="font-outfit text-3xl font-bold text-gray-900 md:text-4xl">
                                Tempat Pemberhentian Populer
                            </h2>
                            <div className="mt-2 h-1 w-20 rounded-full bg-yellow-400" />
                        </div>
                        <button className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-800">
                            Lihat Semua
                        </button>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {transportStop.map((transportStop: any) => {
                            // const image = destination.images?.[0];
                            return (
                                <div
                                    key={transportStop.id}
                                    className="group cursor-pointer rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-xl"
                                >

                                    {/* IMAGE */}
                                    {/* <div className="relative overflow-hidden rounded-t-3xl">
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
                                    </div> */}

                                    {/* CONTENT */}
                                    <div className="p-6">
                                        <h3 className="font-outfit text-xl font-bold text-gray-900 transition group-hover:text-emerald-700">
                                            {transportStop.name}
                                        </h3>
                                        <div className="mt-2 flex items-center gap-2 text-gray-500">
                                            <MapPin className="h-4 w-4 text-red-500"
                                            />
                                            <p className="text-sm font-medium">
                                                {
                                                    transportStop.region
                                                        ?.regionName
                                                }
                                            </p>
                                        </div>
                                        <button
                                            key={transportStop.id}
                                            onClick={() =>
                                                navigate(
                                                    `/transportasi/${transportStop.slug}`
                                                )
                                            }
                                            className="mt-6 w-full rounded-xl bg-gray-50 py-3 font-semibold text-gray-900 transition hover:bg-yellow-400"
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Transportasi;