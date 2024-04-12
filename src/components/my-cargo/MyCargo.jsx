import React from 'react'
import { Container, TypePart, From, Location, Properties, SingleProperty } from '../cargoContainer/style'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import globusIcon from "../../assets/globus_1.svg"
import { Title, Window } from '../transportContainer/style'
import AddCargo from '../addButtons/cargo/addCargo'
import Pagination from '../../utils/paginationTag/pagination'


export default function MyCargo() {
  return (
    <>
      <Window>
        <Title>My Cargo</Title>
        {Array(8).fill().map((_, containerIndex) => (
          <Container key={containerIndex} onClick={() => openModal(containerIndex)}>
            <TypePart>Cargo type</TypePart>
            <Location>
              <From>
                <img src={globusIcon} alt="" /><FaArrowRight color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} /> city, country <br />
              </From>
              <From>
                <img src={globusIcon} alt="" /><FaArrowLeft color='#000' style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} /> city, country
              </From>
            </Location>
            <Properties>
              <SingleProperty><span>Weight: </span><p>1 tonne</p> </SingleProperty>
              <SingleProperty><span>Date: </span><p>date</p> </SingleProperty>
            </Properties>

          </Container>
        ))}

      </Window>
      <AddCargo />
      <Pagination />
    </>


  )
}
