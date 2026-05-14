import { Info } from "lucide-react";

function Disclaimer() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      <p className="flex items-center gap-2 text-xs text-amber-800 font-medium">
        <Info className="h-3.5 w-3.5 flex-shrink-0" />
        <span>Harga tiket dan jam operasional dapat berubah sewaktu-waktu.</span>
      </p>
    </div>
)};

export default Disclaimer;