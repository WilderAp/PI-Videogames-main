import React from "react";
import styles from './Pagination.module.css';

export default function Pagination({ countryPerPage, allCountries, paginado, currentPage }) {
    const pageCountrys = [];
    const maxVisiblePages = 7;
    const totalPages = Math.ceil(allCountries / countryPerPage);

    let startPage;
    let endPage;

    if (totalPages <= maxVisiblePages) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const maxVisiblePagesHalf = Math.floor(maxVisiblePages / 2);
        if (currentPage <= maxVisiblePagesHalf) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + maxVisiblePagesHalf >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - maxVisiblePagesHalf;
            endPage = currentPage + maxVisiblePagesHalf;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageCountrys.push(i);
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            paginado(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            paginado(currentPage + 1);
        }
    };

    return (
        <div className={styles["pagination"]}>
            <ul className={styles["paginationList"]}>
                <li>
                    <button
                        onClick={handlePrev}
                        className={`${styles["paginationLink"]} ${styles["paginationPrev"]}`}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                </li>
                {pageCountrys.map((page, index) => (
                    <li key={index} className={styles["paginationItem"]}>
                        <button
                            onClick={() => paginado(page)}
                            className={`${styles["paginationLink"]} ${page === currentPage ? styles["active"] : ""
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={handleNext}
                        className={`${styles["paginationLink"]} ${styles["nextButton"]}`}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
}
