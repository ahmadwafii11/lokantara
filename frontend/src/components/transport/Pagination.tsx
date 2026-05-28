import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: (number | string)[];
    onPageChange: (page: number) => void;
}

function PaginationSection({
    currentPage,
    totalPages,
    pageNumbers,
    onPageChange,
}: PaginationProps) {

    if (totalPages <= 1) return null;

    return (
        <div className="mt-16 flex items-center justify-center gap-2">

            {/* PREV */}
            <button
                onClick={() =>
                    onPageChange(Math.max(currentPage - 1, 1))
                }
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            {/* PAGE NUMBERS */}
            {pageNumbers.map((page, index) => {

                if (page === "...") {
                    return (
                        <span
                            key={index}
                            className="px-2 text-gray-400"
                        >
                            ...
                        </span>
                    );
                }

                return (
                    <button
                        key={`${page}-${index}`}
                        onClick={() => onPageChange(Number(page))}
                        className={`h-10 px-4 rounded-xl text-sm font-semibold transition
                            ${
                                currentPage === page
                                    ? "bg-yellow-400 text-black"
                                    : "border border-gray-200 text-gray-600"
                            }
                        `}
                    >
                        {page}
                    </button>
                );
            })}

            {/* NEXT */}
            <button
                onClick={() =>
                    onPageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}

export default PaginationSection;