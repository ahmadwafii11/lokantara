import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, MapPinned, ChevronLeft, ChevronRight, Star} from "lucide-react";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import MapView from "../components/MapView";

function EksplorasiDetail() {
    const { slug } = useParams();
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0)
    const [reviews, setReviews] = useState<any[]>([])
    const [username, setUsername] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(5)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
                setReviews(data.reviews || [])
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
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

    const images = destination?.images || []

    const nextImage = () => {
        setCurrentImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        )
    }

    const prevImage = () => {
        setCurrentImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        )
    }

    const submitReview = async () => {

        // VALIDASI USERNAME
        if (!username.trim()) {
            alert(
                "Nama pengguna wajib diisi sebelum mengirim ulasan!"
            )

            return
        }

        // VALIDASI REVIEW
        const haveRating = rating > 0
        const haveComment = comment.trim().length > 0
        const haveImage = selectedFiles.length > 0

        if (!haveRating && !haveComment && !haveImage) {

            alert(
                "Silakan berikan rating, komentar, atau foto untuk melengkapi ulasan Anda!"
            )

            return
        }

        try {

            // FORM DATA
            const formData = new FormData()

            formData.append("username", username)
            formData.append("comment", comment)
            formData.append("rating", rating.toString())

            selectedFiles.forEach((file) => {
                formData.append("images", file)
            })

            // SUBMIT REVIEW
            const response = await fetch(
                `http://localhost:3000/api/destinations/${slug}/reviews`,
                {
                    method: "POST",
                    body: formData,
                }
            )

            if (!response.ok) {
                throw new Error("Gagal mengirim review")
            }

            const data = await response.json()

            console.log(data)

            // REFRESH REVIEW
            const updatedReviews = await fetch(
                `http://localhost:3000/api/destinations/${slug}`
            )

            const destinationData =
                await updatedReviews.json()

            setReviews(destinationData.reviews)

            // RESET FORM
            setUsername("")
            setComment("")
            setRating(5)
            setSelectedFiles([])

            alert("Review berhasil dikirim!")

        } catch (error) {

            console.error(error)

            alert("Terjadi kesalahan saat mengirim review")
        }
    }

    return (
        <div className="min-h-screen bg-white">

            {/* HERO IMAGE */}
            <div className="relative h-[500px] w-full overflow-hidden">
                <img
                    src={`http://localhost:3000${images[currentImage]?.imageUrl}`}
                    alt={destination.name}
                    className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* BUTTON LEFT */}
                {images.length > 1 && (
                    <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/60"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                )}

                {/* BUTTON RIGHT */}
                {images.length > 1 && (
                    <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-black/60"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                )}

                <div className="absolute bottom-10 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
                    {/* CONTENT HEADER IMAGE */}
                    <div className="absolute bottom-0 left-0 z-10 w-full p-8 md:p-16">
                        <div className="mx-auto max-w-7xl">
                            <h1 className="font-outfit text-4xl font-bold text-white md:text-6xl">
                                {destination.name}
                            </h1>

                            <div className="mt-4 flex items-center gap-2 text-gray-200">
                                <MapPin className="h-5 w-5 text-red-400" />
                                <p>
                                    {destination.region?.regionName},{" "}
                                    {destination.region?.province}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
                <div className="mx-auto -mt-10 flex max-w-7xl gap-4 overflow-x-auto px-6 pb-4 relative z-20">
                    {images.map((image: any, index: number) => (
                        <button
                            key={image.id}
                            onClick={() => setCurrentImage(index)}
                            className={`overflow-hidden rounded-2xl border-4 transition ${currentImage === index
                                ? "border-yellow-400"
                                : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                        >
                            <img
                                src={`http://localhost:3000${image.imageUrl}`}
                                alt={destination.name}
                                className="h-24 w-40 object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* CONTENT DESTINATIONS*/}
            <div className="mx-auto max-w-5xl px-6 py-16">
                <div className="grid gap-8 lg:grid-cols-3">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-3xl bg-gray-50 p-8 shadow-sm">
                            <h2 className="font-outfit text-2xl font-bold text-gray-900">
                                Tentang Destinasi
                            </h2>
                            <p className="mt-6 leading-8 text-gray-600">
                                {destination.description}
                            </p>
                        </div>

                        {/* INPUT REVIIEWS */}
                        <div className="rounded-3xl bg-white p-8 shadow-sm">
                            <h2 className="font-outfit text-2xl font-bold">
                                Berikan Review
                            </h2>

                            {/* STAR SELECTOR */}
                            <div className="mt-6 flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                    >
                                        <Star
                                            className={`h-7 w-7 ${star <= rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* USERNAME */}
                            <input
                                type="text"
                                placeholder="Nama Anda"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-6 w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-yellow-400"
                            />

                            {/* IMAGE */}
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    if (!e.target.files) return

                                    setSelectedFiles(
                                        Array.from(e.target.files)
                                    )
                                }}
                            />

                            {/* COMMENT */}
                            <textarea
                                placeholder="Tulis review..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={5}
                                className="mt-4 w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-yellow-400"
                            />

                            <button
                                className="mt-4 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black hover:bg-yellow-500"
                                onClick={submitReview}
                            >
                                Kirim Review
                            </button>
                        </div>

                        {/* REVIEWS */}
                        <div className="mt-10 space-y-6">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900">
                                            {review.username}
                                        </h3>

                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-5 w-5 ${star <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-4 flex gap-3 overflow-x-auto">
                                            {review.image.map((image: any) => (
                                                <img
                                                    key={image.id}
                                                    src={`http://localhost:3000${image.imageUrl}`}
                                                    alt="Review"
                                                    className="h-24 w-24 rounded-xl object-cover"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="mt-4 text-gray-600">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
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
                        {/* MAP */}
                        <div className="mt-10">
                            <h3 className="mb-6 font-outfit text-xl font-bold text-gray-900">
                                Lokasi Destinasi
                            </h3>

                            <div className="relative z-0 overflow-hidden rounded-xl">
                                <MapView
                                    latitude={Number(destination.latitude)}
                                    longitude={Number(destination.longitude)}
                                    name={destination.name}
                                />
                            </div>
                            <button
                                onClick={() =>
                                    window.open(
                                        `https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`,
                                        "_blank"
                                    )
                                }
                                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-3 font-semibold text-white transition hover:bg-green-600"
                            >
                                <MapPinned className="h-5 w-5" />
                                Buka di Google Maps
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EksplorasiDetail;