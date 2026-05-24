import { useState, useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bus, Train, Plane, ShipWheel, Shapes, MapPin, ChevronRight, ChevronLeft } from "lucide-react";

import type { Transport } from "../types/transport";
import type { TransportStop } from "../types/transportStop";
import type { TransportStopCategories } from "../types/transportStopCategory";
import type { TransportCategories } from "../types/transportCategory";

import { getAllTransportations, getAllTransportationStop, getAllTransportationStopCategory, getAllTransportationCategory } from "../services/api";

import Loading from "../components/Loading";


import imageBackground from "../assets/background-transportation-1.jpg"

function Transportasi(): ReactElement {
    const navigate = useNavigate()

    const [filterTransportStops, setFilterTransportStops] = useState<TransportStopCategories[]>([]);
    const [filterTransports, setFilterTransports] = useState<TransportCategories[]>([]);

    const [transportStop, setTransportStop] = useState<TransportStop[]>([]);
    const [transport, setTransport] = useState<Transport[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [activeCategoryTransport, setActiveCategoryTransport] = useState<string>("Semua");

    // --- STATE PAGINATION ---
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 9;

    const getTransportStopIcon = (category: string) => {
        switch (category) {
            case "Stasiun" : 
                return <Train className="h-4 w-4"/>;
            case "Terminal":
                return <Bus className="h-4 w-4" />;
            case "Halte": 
                return <Bus className="h-4 w-4" />;
            case "Bandara": 
                return <Plane className="h-4 w-4" />;
            case "Pelabuhan": 
                return <ShipWheel className="h-4 w-4" />;
            default:
                return <Shapes className="h-4 w-4" />
        }
    }

    const getTransportIcon = (category: string) => {
        switch (category) {
            case "Kereta Api":
                return <Train className="h-4 w-4" />;
            case "Surabaya Bus":
                return <Bus className="h-4 w-4" />;
            case "TransJatim":
                return <Bus className="h-4 w-4" />;
            default:
                return <Shapes className="h-4 w-4" />;
        }
    };

    // UseEffect for reset pagination
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // useEffect get API Data 
    useEffect(() => {
        setLoading(true);

        Promise.all([
            getAllTransportationCategory(),
            getAllTransportationStopCategory(),
            getAllTransportations(),
            getAllTransportationStop()
        ])
        .then(([categoriesTransportationData, 
                categoriesTransportationStopData,
                transportationsData,
                transportationStopData,
            ]) => 
                {
                    setFilterTransports(categoriesTransportationData);
                    setFilterTransportStops(categoriesTransportationStopData);
                    setTransport(transportationsData);
                    setTransportStop(transportationStopData);

                    setLoading(false);
        })
        .catch((err) => {
        console.error("Salah satu API gagal dimuat:", err);
        setLoading(false);
        });
    }, [])

    if (loading) {
        return <Loading message="Sedang mencari data..." variant="fullscreen" />;
    }

    // Logic filter TransportStop
    const filteredTransportStop =
        activeCategory === "Semua"
            ? transportStop
            : transportStop.filter(
                (item: any) =>
                    item.category?.name === activeCategory
            );

    // Logic filter Transport
    const filteredTransport =
        activeCategoryTransport === "Semua"
            ? transport
            : transport.filter(
                (item: any) =>
                    item.category?.name === activeCategoryTransport
            );

    // Logic slice data for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = filteredTransportStop.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTransportStop.length / itemsPerPage);

    const currentItemsTransport = filteredTransport.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesTransport = Math.ceil(filteredTransport.length / itemsPerPage);

    // Construct list page number transport stop
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Construct list page number transport 
    const pageNumbersTransport = [];
    for (let i = 1; i <= totalPagesTransport; i++) {
        pageNumbersTransport.push(i);
    }

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

                {/* Transportations Stop */}
                <section className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mb-10 flex flex-col gap-6 justify-between">
                        <div>
                            <h2 className="font-outfit text-3xl font-bold text-gray-900 md:text-4xl">
                                Tempat Pemberhentian
                            </h2>
                            <div className="mt-2 h-1 w-20 rounded-full bg-yellow-400" />
                        </div>

                        {/* FILTER CATEGORY */}
                        <div className="flex flex-wrap gap-3">

                            {/* ALL BUTTON */}
                            <button
                                onClick={() => setActiveCategory("Semua")}
                                className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition
                                    ${activeCategory === "Semua"
                                        ? "bg-yellow-400 text-black shadow-md"
                                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                    }
                                `}
                            >
                                Semua
                            </button>

                            {/* BUTTON CATEGORY */}
                            {filterTransportStops.map((filter: any) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveCategory(filter.name)}
                                    className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition
                                        ${activeCategory === filter.name
                                            ? "bg-yellow-400 text-black shadow-md"
                                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    {getTransportStopIcon(filter.name)}

                                    {filter.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* GRID CARD */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {currentItems.map((item: any) => {
                            const image = item.images?.[0];
                            return (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    {/* IMAGE */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={image ? `http://localhost:3000${image.imageUrl}` : "https://placehold.co/600x400"}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                        />

                                        {/* BADGE AREA */}
                                        <div className="absolute top-4 left-4 flex items-center gap-2">

                                            {/* BADGE CATEGORY */}
                                            <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm backdrop-blur-sm select-none">
                                                {item.category?.name}
                                            </div>

                                            {/* BADGE CODE */}
                                            {item.code && (
                                                <div className="rounded-xl bg-emerald-600 px-2 py-0.5 text-[10px] font-mono font-bold text-white shadow-md uppercase tracking-wider animate-in fade-in duration-300">
                                                    {item.code}
                                                </div>
                                            )}

                                        </div>
                                        <div className="absolute bottom-4 right-4 rounded-full bg-white/70 px-2.5 py-0.5 text-[10px] font-medium text-gray-700 backdrop-blur-sm shadow-sm">
                                            © {image?.copyright || "Google Maps"}
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="space-y-4 p-6">
                                        <h3 className="font-outfit text-xl font-bold text-gray-900">{item.name}</h3>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                            <MapPin className="h-4 w-4 text-rose-500" />
                                            <span>{item.region?.name || "Banyuwangi"}</span>
                                        </div>
                                        <p className="line-clamp-2 text-sm text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <button
                                            onClick={() => navigate(`/transportasi/detail/${item.id}`)}
                                            className="w-full rounded-xl bg-gray-50 py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-yellow-400 hover:text-black"
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* PAGINATION CONTROLS */}
                    {totalPages > 1 &&
                        <div className="mt-16 flex items-center justify-center gap-2">

                            {/* BUTTON PREV */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            {/* NUMBER PAGE */}
                            {pageNumbers.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number)}
                                    className={`h-10 px-4 rounded-xl text-sm font-semibold transition ${currentPage === number
                                        ? "bg-yellow-400 text-gray-900 shadow-sm"
                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}

                            {/* BUTTON NEXT */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    }
                </section>

                {/* Transportations Type */}
                <section className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mb-10 flex flex-col gap-6 justify-between">
                        <div>
                            <h2 className="font-outfit text-3xl font-bold text-gray-900 md:text-4xl">
                                Jenis Transportasi
                            </h2>
                            <div className="mt-2 h-1 w-20 rounded-full bg-yellow-400" />
                        </div>

                        {/* FILTER CATEGORY */}
                        <div className="flex flex-wrap gap-3">

                            {/* BUTTON SEMUA */}
                            <button
                                onClick={() => setActiveCategoryTransport("Semua")}
                                className={`rounded-2xl px-5 py-2.5 text-sm font-semibold transition
                                    ${activeCategoryTransport === "Semua"
                                        ? "bg-yellow-400 text-black shadow-md"
                                        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                    }
                                `}
                            >
                                Semua
                            </button>

                            {/* BUTTON CATEGORY */}
                            {filterTransports.map((filter: any) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveCategoryTransport(filter.name)}
                                    className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition
                                        ${activeCategoryTransport === filter.name
                                            ? "bg-yellow-400 text-black shadow-md"
                                            : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                                        }
                                    `}
                                >
                                    {getTransportIcon(filter.name)}

                                    {filter.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* GRID CARD */}
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {currentItemsTransport.map((item: any) => {
                            return (
                                <div
                                    key={item.id}
                                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                >

                                    {/* CONTENT */}
                                    <div className="space-y-4 p-6">
                                        <h3 className="font-outfit text-xl font-bold text-gray-900">{item.name}</h3>
                                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                            <MapPin className="h-4 w-4 text-rose-500" />
                                            {/* <span>{item.region?.name || "Banyuwangi"}</span> */}
                                        </div>
                                        <p className="line-clamp-2 text-sm text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <button
                                            onClick={() => navigate(`/transportasi/detail/${item.id}`)}
                                            className="w-full rounded-xl bg-gray-50 py-3 text-center text-sm font-semibold text-gray-900 transition hover:bg-yellow-400 hover:text-black"
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* PAGINATION CONTROLS */}
                    {totalPages > 1 &&
                        <div className="mt-16 flex items-center justify-center gap-2">

                            {/* BUTTON PREV */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            {/* NUMBER PAGE */}
                            {pageNumbersTransport.map((number) => (
                                <button
                                    key={number}
                                    onClick={() => setCurrentPage(number)}
                                    className={`h-10 px-4 rounded-xl text-sm font-semibold transition ${currentPage === number
                                        ? "bg-yellow-400 text-gray-900 shadow-sm"
                                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}

                            {/* BUTTON NEXT */}
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    }
                </section>
            </div>
        </>
    )
}

export default Transportasi;