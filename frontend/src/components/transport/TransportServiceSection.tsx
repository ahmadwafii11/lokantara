import { useState, useEffect, type ReactElement, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Route } from "lucide-react";

import type { TransportService } from "../../types/transportService";
import type { TransportCategories } from "../../types/transportCategory";
import { getTransportIcon } from "../../utils/TransportIcon";
import { getAllTransportations, getAllTransportationCategory } from "../../services/api";
import usePagination from "../../hooks/usePagination";
import PaginationSection from "./Pagination";
import Loading from "../Loading";

const ITEMS_PER_PAGE = 9;

function TransportServiceSection(): ReactElement {
    const navigate = useNavigate();

    const [filterTransportServices, setFilterTransportServices] = useState<TransportCategories[]>([]);
    const [transportServices, setTransportServices] = useState<TransportService[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [currentPage, setCurrentPage] = useState<number>(1);

    // GET API FETCH
    useEffect(() => {
        setLoading(true);

        Promise.all([
            getAllTransportations(),
            getAllTransportationCategory()
        ])
            .then(([
                transportationServiceData,
                categoriesTransportationServiceData,
            ]) => {
                setTransportServices(transportationServiceData);
                setFilterTransportServices(categoriesTransportationServiceData);

                setLoading(false);
            })
            .catch((err) => {
                console.error("API gagal dimuat: ", err);
                setLoading(false);
            })
    }, [])

    // RESET PAGE 1>
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    // Logic filter TransportService
    const filteredTransportService = useMemo(() => {
        return activeCategory === "Semua"
            ? transportServices
            : transportServices.filter(
                (item) =>
                    item.category?.name === activeCategory
            );
    }, [transportServices, activeCategory])

    // PAGINATION HOOKS
    const { currentItems, totalPages, pageNumbers } = usePagination({
        data: filteredTransportService,
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    if (loading) {
        return <Loading message="Sedang mencari data..." variant="card" />
    };

    return (
        <>
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
                        {filterTransportServices.map((filter: any) => (
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
                                {getTransportIcon(filter.name)}

                                {filter.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID CARD */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {currentItems.map((item: TransportService) => {
                        return (
                            <div
                                key={item.id}
                                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >

                                {/* CONTENT */}
                                <div className="space-y-5 p-6">

                                    {/* HEADER */}
                                    <div>
                                        <h3 className="font-outfit text-xl font-bold text-gray-900">
                                            {item.name}
                                        </h3>

                                        <div className="mt-3 flex flex-wrap gap-2">

                                            {/* CATEGORY */}
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                {item.category?.name}
                                            </span>

                                            {/* TYPE */}
                                            {item.type?.name && (
                                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                    {item.type?.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* STATS */}
                                    <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3">

                                        <Route className="h-4 w-4 text-yellow-500" />

                                        <span className="text-sm font-medium text-gray-700">
                                            {item.route?.length ?? 0} Rute Aktif
                                        </span>
                                    </div>

                                    {/* DESCRIPTION */}
                                    <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>

                                    {/* BUTTON */}
                                    <button
                                        onClick={() => navigate(`/transportasi/detail/${item.id}`)}
                                        className="w-full rounded-xl bg-gray-100 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-400 hover:text-black"
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
};

export default TransportServiceSection;