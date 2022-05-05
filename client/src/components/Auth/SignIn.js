import React, {useState, useEffect, useRef} from 'react'

import { useDispatch } from 'react-redux';
import {  useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { signin, signup, signupGoogle } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};
const EmailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [checkPassword, setCheckPassword] = useState()
    const confirmRef = useRef()

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
      };

    const location = useLocation()
    const LOCAL_STORAGE_KEY = 'profile'
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
    }, [location])

    
    useEffect(() =>{
        setCheckPassword(formData.password === formData.confirmPassword)
        const elem = confirmRef.current
        if(elem){
            if(checkPassword){
                if(elem?.classList.contains("border-rose-500")) elem.classList.remove("border-rose-500","border-2")
                if(!elem?.classList.contains("border-brightmint")) elem.classList.add("border-brightmint", "border-2")
            }else{
                if(elem.classList.contains("border-brightmint")) elem.classList.remove("border-brightmint", "border-2")
                if(!elem.classList.contains("border-rose-500")) elem.classList.add("border-rose-500", "border-2")
            }
        }
    },[formData.confirmPassword,checkPassword])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() }); 
        if(e.target.name !== "confirmPassword"){
            if(e.target?.value.trim() === "") {
                if(e.target.classList.contains("border-brightmint")) e.target.classList.remove("border-brightmint", "border-2")
                if(!e.target.classList.contains("border-rose-500")) e.target.classList.add("border-rose-500", "border-2")
            }
            else{
                if(e.target.classList.contains("border-rose-500")) e.target.classList.remove("border-rose-500","border-2")
                if(!e.target.classList.contains("border-brightmint")) e.target.classList.add("border-brightmint", "border-2")
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
         if (isSignup) {
            dispatch(signup(formData, navigate));
         } else {
            dispatch(signin(formData, navigate));
         }
      };


    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        
        dispatch(signupGoogle({email:result?.email, firstName:result?.givenName, lastName:result?.familyName}))
        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/')
        } catch (error) {
          console.log(error);
        }
      };
    
      const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    const classes = {
        btnLogin: 'bg-white shadow-lg h-10 py-2 px-5 m-2 text-md text-grey-700 rounded border border-white focus:outline-none  hover:opacity-75',
    };

    function IsEmailValid(){
        const valid = EmailRegex.test(formData.email)
        console.log(valid)
    }

    return (
        <div className='h-full flex '>
            <div className='w-full max-w-md m-autorounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    {isSignup? "Welcome to our family!":"Log in to your account"} 
                </h1>

                <form onSubmit={handleSubmit}>
                {isSignup &&
                    <div className='flex justify-center'>
                        <input
                            name='firstName'
                            aria-label='First Name'
                            onChange={handleChange}
                            autoFocus={true}
                            placeholder='First Name'
                            className={`w-full p-2 mr-2 relative text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                        />
                        <input
                            name='lastName'
                            aria-label='Last Name'
                            onChange={handleChange}
                            placeholder='Last Name'
                            className={`w-full p-2 relative text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                        />
                    </div>
                }
                    <div>
                        <label htmlFor='email' className='text-white'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                            name='email'
                            placeholder='Your Email'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className='text-white'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                            name='password'
                            placeholder='Password'
                            onChange={handleChange}
                        />
                    </div>
                    {isSignup && 
                        <div>
                            <label htmlFor='password' className='text-white'>Confirm Password</label>
                            <input
                                ref={confirmRef}
                                type='password'
                                className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-2`}
                                name='confirmPassword'
                                placeholder='Confirm Your Password'
                                onChange={handleChange}
                            />
                            {(!checkPassword) &&
                                <div>Hi</div>
                            }
                        </div>
                    }
                    {!isSignup ?
                    <div className='flex justify-between items-center mt-6'>
                        <button className={classes.btnLogin} onClick={handleSubmit}>
                            Login
                        </button>
                        {/* <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                            <button className={classes.btnLogin} color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                                Google Sign In
                            </button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        /> */}
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="SIGN IN WITH GOOGLE"
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    :
                    <div className='flex justify-center items-center'>
                         <button className={classes.btnLogin} onClick={handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                    }
                    <div className='flex justify-center pt-2'>
                        <p>{ isSignup ?  "Already have an account?" : "Don't have an account?"}</p>
                        <button className='pl-2 text-purple hover:opacity-75' onClick={switchMode}>{isSignup ? 'Sign In Here!':'Sign Up Here!'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;