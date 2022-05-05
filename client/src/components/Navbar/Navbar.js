import React, {useState, useEffect} from 'react'
import NavbarUser from './NavbarUser';
import MenuIcon from '../../assets/hamberger.svg';
import ReactLogo from '../../assets/react-2.svg';



export default function Navbar() {

  const [active, setActive] = useState(false)

  const handleMenubar = () =>{
    setActive(!active)
  }

  

  return (
      <nav className='flex justify-between relative bg-brightmint h-10'>
        <div className='hidden sm:flex px-3 py-2 items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'>Home</div>
        <div className='flex sm:hidden'>
          <img src={ReactLogo} alt="CompanyLogo"  height={25} width={25} />
        </div>
        <div className='flex'>
          <button className='sm:hidden relative' onClick={handleMenubar}>
              <img src={MenuIcon} alt="MenuIcon" height={25} width={25} />
          </button>
          <NavbarUser active={active}/>
          {/* <DropdownItem active={active}/> */}
        </div>
      </nav>
  );
}
