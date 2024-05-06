import React from 'react'
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import { Button, PaginationContainer, Span } from './style'

export default function Pagination({currentPage, totalPages}) {
  return (
    <PaginationContainer>
        <Button><FaArrowLeft /></Button>
        <Span>Page {currentPage} of {totalPages}</Span>
        <Button><FaArrowRight /></Button>
    </PaginationContainer>
  )
}
