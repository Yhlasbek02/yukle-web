import React from 'react'
import { Window } from '../cargoContainer/style';
import { AdminMessage, Body, Input, Messages, SendContainer, Title } from './style';
import { ProfileMobile } from '../../utils/switchButtons.jsx/style'
import { IoMdSend } from 'react-icons/io';
export default function Support() {
  return (
    <>
        <Window>
            <ProfileMobile>
                <Title>Contact centre</Title>
            </ProfileMobile>
            <Body>
                <Messages>
                <AdminMessage />
                </Messages>
                
                <SendContainer>
                    <Input></Input>
                    <IoMdSend fontSize="2.5rem" color='#4D9FFF' />
                </SendContainer>
                

            </Body>
            
        </Window>
    </>
  )
}
