import React from 'react'
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import { Button, PaginationContainer, Span } from './style'

export default function Pagination() {
  return (
    <PaginationContainer>
        <Button><FaArrowLeft /></Button>
        <Span>Page 1 of 50</Span>
        <Button><FaArrowRight /></Button>
    </PaginationContainer>
  )
}
