import { useState, useEffect, type ReactElement, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { MapPin } from "lucide-react";

import type { TransportStop } from "../../types/transportStop";
import type { TransportStopCategories } from "../../types/transportStopCategory";
import { getTransportStopIcon } from "../../utils/TransportStopIcon";
import { getAllTransportationStop, getAllTransportationStopCategory } from "../../services/api";
import PaginationSection from "./Pagination";
import Loading from "../Loading";
import usePagination from "../../hooks/usePagination";

const ITEMS_PER_PAGE = 9;

function TransportStopSection(): ReactElement {
    const navigate = useNavigate();

    const [filterTransportStops, setFilterTransportStops] = useState<TransportStopCategories[]>([]);
    const [transportStop, setTransportStop] = useState<TransportStop[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [currentPage, setCurrentPage] = useState<number>(1);

    /// GET API FETCH
    useEffect(() => {
        setLoading(true);

        Promise.all([
            getAllTransportationStop(),
            getAllTransportationStopCategory()
        ])
            .then(([
                transportationStopData,
                categoriesTransportationStopData,
            ]) => {
                setTransportStop(transportationStopData);
                setFilterTransportStops(categoriesTransportationStopData);

                setLoading(false);
            })
            .catch((err) => {
                console.error("API gagal dimuat: ", err);
                setLoading(false);
            });
    }, [])

    // RESET PAGE 1>
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Logic filter TransportStop
    const filteredTransportStops = useMemo(() => {
        return activeCategory === "Semua"
            ? transportStop
            : transportStop.filter(
                (item) =>
                    item.category?.name === activeCategory
            );
    }, [transportStop, activeCategory])


    // PAGINATION HOOKS
    const { currentItems, totalPages, pageNumbers } = usePagination({
        data: filteredTransportStops,
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    if (loading) {
        return <Loading message="Sedang mencari data..." variant="card" />
    };

    return (
        <>
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
                        {filterTransportStops.map((filter) => (
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

                    {currentItems.map((item) => {

                        const image = item.images?.[0];

                        return (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >

                                {/* IMAGE */}
                                <div className="relative h-64 overflow-hidden">

                                    <img
                                        src={
                                            image
                                                ? `http://localhost:3000${image.imageUrl}`
                                                : "https://placehold.co/600x400"
                                        }
                                        alt={item.name}
                                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    />

                                    {/* BADGES */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">

                                        <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-900 shadow-sm">
                                            {item.category?.name}
                                        </div>

                                        {item.code && (
                                            <div className="rounded-xl bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                                                {item.code}
                                            </div>
                                        )}
                                    </div>
                                    {/* COPYRIGHT */}
                                    <div className="absolute bottom-4 right-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-medium text-gray-700 shadow-sm backdrop-blur-sm">
                                        © {image?.copyright ?? "Google Maps"}
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="space-y-4 p-6">

                                    <h3 className="font-outfit text-xl font-bold text-gray-900">
                                        {item.name}
                                    </h3>

                                    <div className="flex items-center gap-1.5 text-sm text-gray-500">

                                        <MapPin className="h-4 w-4 text-rose-500" />

                                        <span>
                                            {item.region
                                                ? `${item.region.regionType} ${item.region.regionName}, ${item.region.province}`
                                                : "Lokasi tidak diketahui"
                                            }
                                        </span>
                                    </div>

                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        {item.description}
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(`/transportasi/detail/${item.id}`)
                                        }
                                        className="w-full rounded-xl bg-gray-50 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-400"
                                    >
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* PAGINATION */}
                <PaginationSection
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageNumbers={pageNumbers}
                    onPageChange={setCurrentPage}
                />
            </section>

        </>
    )
}

export default TransportStopSection;