import { useMemo } from "react";

interface PaginationProps<T> {
    data: T[];
    currentPage: number;
    itemsPerPage: number;
}

type PageNumber = number | string;

const MAX_VISIBLE_PAGES = 5;

function usePagination<T>({data,currentPage,itemsPerPage}: PaginationProps<T>) {
    
    return useMemo(() => {

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const currentItems = data.slice(
            indexOfFirstItem,
            indexOfLastItem
        );

        const totalPages = Math.max(
            1,
            Math.ceil(data.length / itemsPerPage)
        );

        const pageNumbers: PageNumber[] = [];

        const siblingCount = 1;

        if (totalPages <= MAX_VISIBLE_PAGES) {

            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }

        } else {

            const leftSiblingIndex = Math.max(
                currentPage - siblingCount,
                1
            );

            const rightSiblingIndex = Math.min(
                currentPage + siblingCount,
                totalPages
            );

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

            if (!shouldShowLeftDots && shouldShowRightDots) {

                const itemCount = 3 + 2 * siblingCount;

                for (let i = 1; i <= itemCount; i++) {
                    pageNumbers.push(i);
                }

                pageNumbers.push("...");
                pageNumbers.push(totalPages);

            } else if (shouldShowLeftDots && !shouldShowRightDots) {

                const itemCount = 3 + 2 * siblingCount;

                pageNumbers.push(1);
                pageNumbers.push("...");

                for (
                    let i = totalPages - itemCount + 1;
                    i <= totalPages;
                    i++
                ) {
                    pageNumbers.push(i);
                }

            } else {

                pageNumbers.push(1);
                pageNumbers.push("...");

                for (
                    let i = leftSiblingIndex;
                    i <= rightSiblingIndex;
                    i++
                ) {
                    pageNumbers.push(i);
                }

                pageNumbers.push("...");
                pageNumbers.push(totalPages);
            }
        }

        return {
            currentItems,
            totalPages,
            pageNumbers,
        };

    }, [data, currentPage, itemsPerPage]);
}

export default usePagination;