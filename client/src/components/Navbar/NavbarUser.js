import React ,{useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import UserCircle from '../../assets/user-circle.svg';
import  './DropdownMenu.css'
import './NavbarUser.css'
import DropdownItem from './DropdownItem';
import * as actionType from '../../constants/actionTypes'
import { useDispatch } from 'react-redux';


const LOCAL_STORAGE_KEY = 'profile'
export default function NavbarUser(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState()

    useEffect(() => {
        const userJson = localStorage.getItem(LOCAL_STORAGE_KEY)
        if(userJson != null) setUser(JSON.parse(userJson))
    }, [location])

    const handleLogout = () =>{
        dispatch({type:actionType.LOGOUT})
        navigate('/')
        setUser(null)
      }
 
  return (
      <ul className={`  ${(props.active) ? 'dropdown-menu': 'flex dropdown-hidden'}`}>
            {(user) &&
                <>
                    <li className="nav-item flex relative nav-profile">
                        <a href='/#' className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                               
                        >
                            <span className="ml-2 ">Profile </span>
                            <img src={UserCircle} alt="User Icon" />
                        </a>
                        <DropdownItem  />
                    </li>
                    <li className="flex">
                        <p className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white cursor-default ">
                            <span className="ml-2">{user.name}</span>
                        </p>
                    </li>
                    <li className="nav-item flex">
                        <button className="px-3 py-2 ml-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </li>
                </>
            }
            {(!user) &&
                <>
                    <li className="nav-item flex ">
                    <a 
                        href="/signup"
                        color="inherit"
                        underline='none'
                        className='hover:opacity-75'
                    >
                        <i className=" text-white opacity-75"></i><span className="ml-2">Register</span>
                    </a>
                    </li>
                    <li className="nav-item flex">
                    <a
                        href="/signin"
                        color="inherit"
                        underline='none'
                        className='hover:opacity-75'
                    >
                        <i className="text-white opacity-75"></i><span className="ml-2">Log In</span>
                    </a>
                    </li>
                </>
            }
        </ul>
  )
}
