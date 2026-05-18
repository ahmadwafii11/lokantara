import { useEffect, useState, useRef, ReactElement } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapPin, Compass, ImageOff, Search, ChevronDown } from "lucide-react";

import Loading from "../components/Loading";

function EksplorasiSearch(): ReactElement {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const category = searchParams.get("category") || "";
    const currentProvince = searchParams.get("province") || "";
    const currentRegion = searchParams.get("region") || "";

    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [regionsMaster, setRegionsMaster] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [searchRegionQuery, setSearchRegionQuery] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const searchQuery = searchParams.get("q") || ""

    // FUNCTION NAVIGATION SPA
    const handleRegionChange = (
        provinceValue: string,
        regionValue: string
    ) => {

        const cleanCategory =
            searchParams.get("category") || "";

        navigate(
            `/eksplorasi/search?category=${cleanCategory}&province=${provinceValue}&region=${regionValue}`
        );
    };

    const filteredRegions = regionsMaster.filter((reg) => {
        const query = searchRegionQuery.toLowerCase();
        return (
            reg.province?.toLowerCase().includes(query) ||
            reg.regionName?.toLowerCase().includes(query) ||
            reg.regionType?.toLowerCase().includes(query)
        );
    });

    useEffect(() => {
        fetch("http://localhost:3000/api/regions")
            .then((res) => res.json())
            .then((data) => setRegionsMaster(data))
            .catch((err) => console.error("Gagal mengambil data wilayah:", err));
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        setLoading(true);

        const queryParams = new URLSearchParams({
            q: searchQuery,
            category,
            province: currentProvince,
            region: currentRegion,
        }).toString();

        fetch(`http://localhost:3000/api/destinations/search?${queryParams}`)
            .then((res) => {
                if (!res.ok) throw new Error("Gagal memuat data");
                return res.json();
            })
            .then((data) => {
                setDestinations(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });

    }, [category, currentProvince, currentRegion]);

    return (
        <div className="max-w-4xl mx-auto mt-8 px-4 font-outfit space-y-10">

            {/* HEADER AND TITLE */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-1">
                        <Compass className="h-4 w-4" />
                        <span>Jelajah Lokantara</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        Hasil Eksplorasi
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 flex items-center gap-1.5">
                        Kategori:
                        <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                            {category || "Semua Wisata"}
                        </span>
                    </p>
                </div>

                {/* ========================================================= */}
                {/* PERBAIKAN: DROPDOWN WILAYAH KUSTOM DENGAN INPUT PENCARIAN */}
                {/* ========================================================= */}
                <div ref={dropdownRef} className="relative bg-white p-2 rounded-2xl border border-gray-200 shadow-sm sm:w-80">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-500 pl-1">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 select-none">
                                Wilayah / Tempat
                            </label>
                            <div className="text-sm font-semibold text-gray-800 truncate pr-4 flex items-center justify-between">
                                <span>
                                    {currentRegion
                                        ? `${currentRegion}, ${currentProvince}`
                                        : currentProvince || "Semua Provinsi / Daerah"}
                                </span>
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </div>
                        </div>
                    </div>

                    {/* Jendela Dropdown Menu (Hanya muncul jika di-klik) */}
                    {isDropdownOpen && (
                        <div className="absolute left-0 right-0 top-[105%] z-50 mt-1 max-h-80 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                            {/* Kolom Teks Pencarian */}
                            <div className="relative mb-2 sticky top-0 bg-white pb-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Cari kota, kabupaten, atau provinsi..."
                                    value={searchRegionQuery}
                                    onChange={(e) => setSearchRegionQuery(e.target.value)}
                                    className="w-full rounded-xl border border-gray-100 bg-gray-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
                                />
                            </div>

                            {/* Opsi Reset Filter */}
                            <div
                                onClick={() =>
                                    handleRegionChange("", "") 
                                }
                                className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${!currentProvince ? "bg-emerald-50 text-emerald-700" : "text-gray-700 hover:bg-gray-50"}`}
                            >
                                Semua Provinsi / Wilayah
                            </div>

                            <div className="h-px bg-gray-100 my-1" />

                            {/* Kumpulan Daftar Wilayah dari Database */}
                            {filteredRegions.length > 0 ? (
                                filteredRegions.map((reg) => (
                                    <div
                                        key={reg.id}
                                        onClick={() =>
                                            handleRegionChange(
                                                reg.province,
                                                reg.regionName
                                            )
                                        }
                                        className={`group flex cursor-pointer flex-col rounded-xl px-3 py-2 transition hover:bg-gray-50 ${currentProvince === reg.province ? "bg-emerald-50" : ""}`}
                                    >
                                        <span className={`text-sm font-bold ${currentProvince === reg.province ? "text-emerald-700" : "text-gray-800"}`}>
                                            {reg.regionType} {reg.regionName}
                                        </span>
                                        <span className="text-[11px] text-gray-400 group-hover:text-gray-500 font-medium">
                                            Provinsi {reg.province}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="p-3 text-center text-xs text-gray-400 font-medium">Wilayah tidak ditemukan</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* CONDITION LOADING */}
            {loading ? (
                <div className="mt-12">
                    <Loading variant="card" message="Menyaring destinasi terbaik..." />
                </div>
            ) :
                /* CONDITION DATA NAN */
                destinations.length === 0 ? (

                    <div className="mt-16 flex flex-col items-center justify-center text-center gap-2">
                        <ImageOff className="h-10 w-10 text-gray-300" />
                        <h3 className="text-lg font-bold text-gray-700">Destinasi Tidak Ditemukan</h3>
                        <p className="text-sm text-gray-400 max-w-xs">Tidak ada tempat wisata yang cocok dengan filter kategori atau wilayah yang Anda pilih.</p>
                    </div>
                ) : (

                    /* DATA LOADED SUCCESS */
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {destinations.map((destination: any) => {
                            const image = destination.images?.[0];

                            return (
                                <div
                                    key={destination.id}
                                    onClick={() => navigate(`/eksplorasi/${destination.slug}`)}
                                    className="group rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition duration-300"
                                >
                                    <div className="h-64 w-full overflow-hidden bg-gray-100">
                                        {image?.imageUrl ? (
                                            <img
                                                src={`http://localhost:3000${image.imageUrl}`}
                                                alt={destination.name}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                <ImageOff className="h-6 w-6" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h2 className="font-outfit text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-emerald-600 transition">
                                            {destination.name}
                                        </h2>
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
                                        <button
                                            key={destination.id}
                                            onClick={() =>
                                                navigate(
                                                    `/eksplorasi/${destination.slug}`
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
                )}
        </div>
    );
}

export default EksplorasiSearch;
