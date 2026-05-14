import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Info } from "lucide-react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";

function EksplorasiDetail() {
    const { slug } = useParams();
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // UseEffect for Destinations
    useEffect(() => {
        if (!slug) return;
        setLoading(true);

        fetch(
            `http://localhost:3000/api/destinations/${slug}`
        )
            .then((res) => {
                if (!res.ok) throw new Error("Data tidak ditemukan");
                return res.json();
            })
            .then((data) => {
                setDestination(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false); // Matikan loading juga jika error/tidak ketemu
            });
    }, [slug]);

    if (loading) {
        return <Loading message="Sedang mencari destinasi..." variant="fullscreen" />;
    }

    if (!destination) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-4">
                <h2 className="text-xl font-bold text-slate-800">Destinasi Tidak Ditemukan</h2>
                <p className="text-sm text-slate-500 max-w-sm">
                    Maaf, halaman wisata dengan alamat <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono text-xs">{slug}</code> tidak eksis atau telah dihapus.
                </p>
                <Link to="/eksplorasi" className="mt-2 rounded-lg bg-yellow-300 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-400 transition">
                    Kembali ke Jelajah Wisata
                </Link>
            </div>
        )
    }

    const image = destination.images?.[0];

    return (
        <div className="min-h-screen bg-white">

            {/* HERO IMAGE */}
            <div className="relative h-[500px] w-full">
                <img
                    src={
                        image
                            ? `http://localhost:3000${image.imageUrl}`
                            : "https://placehold.co/1200x800"
                    }
                    alt={destination.name}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
                    <h1 className="font-outfit text-4xl font-bold text-white md:text-6xl">
                        {destination.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-2 text-gray-200">
                        <MapPin className="h-5 w-5" />
                        <p className="hover:text-yellow-400">
                            {
                                destination.region
                                    ?.regionName
                            }
                            ,{" "}
                            {
                                destination.region
                                    ?.province
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="mx-auto max-w-5xl px-6 py-16">
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl bg-gray-50 p-8 shadow-sm">
                            <h2 className="font-outfit text-2xl font-bold text-gray-900">
                                Tentang Destinasi
                            </h2>
                            <p className="mt-6 leading-8 text-gray-600">
                                {destination.description}
                            </p>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="space-y-6">

                        {/* OPERATING HOURS */}
                        <div className="rounded-3xl bg-gray-50 p-6 shadow-sm">
                            <h3 className="font-outfit text-xl font-bold text-gray-900">
                                Jam Operasional
                            </h3>
                            <div className="mt-4 space-y-3">
                                {
                                    destination.operatingHours?.map(
                                        (hour: any) => {
                                            const days = [
                                                "Minggu",
                                                "Senin",
                                                "Selasa",
                                                "Rabu",
                                                "Kamis",
                                                "Jumat",
                                                "Sabtu",
                                            ]

                                            return (
                                                <div
                                                    key={hour.id}
                                                    className="flex items-center justify-between border-b border-gray-200 pb-2 text-sm"
                                                >
                                                    <span className="font-medium text-gray-700">
                                                        {days[hour.dayOfWeek]}
                                                    </span>

                                                    <span className="text-gray-500">
                                                        {
                                                            hour.is24Hours
                                                                ? "24 Jam"
                                                                : hour.isClosed
                                                                    ? "Tutup"

                                                                    : `${hour.openTime?.slice(11, 16)} - ${hour.closeTime?.slice(11, 16)}`
                                                        }

                                                    </span>
                                                </div>
                                            )
                                        }
                                    )
                                }

                            </div>
                        </div>

                        {/* TICKET PRICE */}
                        <div className="rounded-3xl bg-gray-50 p-6 shadow-sm">
                            <h3 className="font-outfit text-xl font-bold text-gray-900">
                                Harga Tiket
                            </h3>
                            <div className="mt-4 space-y-3">
                                {
                                    destination.destinationTicketPrices?.map(
                                        (ticket: any) => (
                                            <div
                                                key={ticket.id}
                                                className="flex items-center justify-between border-b border-gray-200 pb-2 text-sm"
                                            >
                                                <span className="font-medium text-gray-700">
                                                    {
                                                        ticket.ticketType
                                                            ?.ticketTypeName
                                                    }
                                                </span>
                                                <span className="font-bold text-yellow-500">
                                                    Rp. {
                                                        Number(ticket.price)
                                                            .toLocaleString("id-ID")
                                                    }
                                                </span>
                                            </div>
                                        )
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EksplorasiDetail;