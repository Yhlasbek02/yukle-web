import React from 'react'
import { Item, Link, MenuItems, MenuStyle, Title } from './style'
import main from "../../../assets/Home_icon.svg"
import cargo from "../../../assets/cargo.svg"
import transport from "../../../assets/transport.svg"
import user from "../../../assets/user.svg"
export default function Menu() {
  return (
    <MenuStyle>
      <Title>Menu</Title>
      <hr />
      <MenuItems>
        <Item>
          <img src={main} alt="menu_icon" /><Link className='active'> Main</Link>
        </Item>
        <hr />
        <Item>
          <img src={cargo} alt="" /><Link>My Cargo</Link>
        </Item>
        <hr />
        <Item>
          <img src={transport} alt="" /><Link>My Transport</Link>
        </Item>
        <hr />
        <Item>
          <img src={user} alt="" /><Link>Profile</Link>
        </Item>

      </MenuItems>
    </MenuStyle>
  )
}
