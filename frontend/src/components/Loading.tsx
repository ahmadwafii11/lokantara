import { ReactElement } from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
    message?: string;
    variant?: "fullscreen" | "card" | "inline";
}

function Loading({
    message = "Memuat data...",
    variant = "fullscreen"
}: LoadingProps): ReactElement {

    // Konten utama spinner dan teks
    const content = (
        <div className="flex flex-col items-center justify-center gap-3 p-4">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-sm font-medium text-slate-500 animate-pulse">{message}</p>
        </div>
    );

    // Fullscreen
    if (variant === "fullscreen") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    // Card
    if (variant === "card") {
        return (
            <div className="flex min-h-[250px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                {content}
            </div>
        );
    }

    // 3. Tampilan Baris Tipis (Cocok untuk ditaruh di dalam tombol atau form kecil)
    return (
        <div className="flex items-center gap-2 py-2 justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
            <span className="text-xs text-slate-500">{message}</span>
        </div>
    );
}

export default Loading;