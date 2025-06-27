import React from 'react'
import { NavStyled, Username } from '../../styles/mainStyle'
import { FiBell } from 'react-icons/fi'
import LanguageSelect from '../../utils/languageSelect'
import Menu from './menu/Menu'
import Filter from './filter/Filter'



export default function Navigation() {
    return (
        <NavStyled>
            <div className='menu-items'>
                <li>
                    <Username>
                        <div className='left'>
                            <h4>Hello,</h4>
                            <h3>Jelil Tuwakow</h3>
                        </div>
                        <div className='right'>
                            <LanguageSelect />
                            <FiBell style={{ marginTop: "7px", fontSize: "1.5rem", cursor: "pointer" }} />
                        </div>
                    </Username>
                </li>
                <li>
                    <Menu />
                </li>
                <li>
                    <Filter />
                </li>
            </div>

            
        </NavStyled>

    )
}
