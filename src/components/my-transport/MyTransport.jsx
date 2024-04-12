import React from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty } from '../transportContainer/style'
import { FaArrowLeft } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import { Title, Window } from '../transportContainer/style'
import AddTransport from '../addButtons/transport/addTransport'
import Pagination from '../../utils/paginationTag/pagination'


export default function MyTransport() {
  return (
    <>
      <Window>
        <Title>My Transport</Title>
        {Array(8).fill().map((_, containerIndex) => (
          <Container key={containerIndex} onClick={() => openModal(containerIndex)}>
            <TypePart>Transport type</TypePart>
            <Location>
              <From>
                <FaArrowLeft color='#000' style={{ marginRight: "0.5rem" }} />
                <img src={globusIcon} alt="" style={{ marginRight: "0.5rem" }} />
                city, country <br />
              </From>
              <From>
                <img src={globusIcon} alt="" />
                <FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />
                city, country
              </From>
            </Location>
            <Properties>
              <SingleProperty><span>Date: </span><p>date</p> </SingleProperty>
            </Properties>
          </Container>
        ))}
      </Window>
      <AddTransport />
      <Pagination />
    </>


  )
}
