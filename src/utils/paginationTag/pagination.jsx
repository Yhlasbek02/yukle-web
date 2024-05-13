import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button, PaginationContainer, Span } from './style';

export default function Pagination({ currentPage, totalPages, onPrevPage, onNextPage }) {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPrevPage();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onNextPage();
        }
    };

    return (
        <PaginationContainer>
            <Button disabled={currentPage === 1} onClick={handlePrevPage}><FaArrowLeft /></Button>
            <Span>Page {currentPage} of {totalPages}</Span>
            <Button disabled={currentPage === totalPages} onClick={handleNextPage}><FaArrowRight /></Button>
        </PaginationContainer>
    );
}
