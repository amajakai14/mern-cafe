import React from 'react'
import { navItems } from './NavItems'
import { Link } from 'react-router-dom'
import  ShoppingCart  from "../../assets/shoppingcart.svg"
export default function DropdownItem(props) {
  return (
        <ul className="dropdown-nav-items">
            {navItems.map((item) =>{
                return(
                    <li className='nav-item mb-2 dropdown-nav-item' key={item.id}>
                        <Link to={item.path}>{
                           (item.svg)
                            ? <img src={ShoppingCart} alt="Shopping Cart"/>
                            : <>{item.title}</>
                        }</Link>
                    </li>
                )
            })}
        </ul>
  )
}