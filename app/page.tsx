'use client';

import Link from 'next/link';
import Image from 'next/image'

import './globals.css'

import { useUserContext } from './user-provider';
import logo from '@/asset/image/logo.svg'
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Login } from '@/component/auth/login';
import { localStorageService } from '@/libs/local.storageService';
import { authAPI } from '@/libs/apiService';
import CouponList from '@/component/coupon-list/page';
import CouponForm  from '@/component/coupon-request/couponForm';
import { Registration } from '@/component/auth/registration';
import { toast } from 'react-toastify';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface CouponFormItem {
  password: string;
  email: string;
}

export default function Home() {
  const [isToggle, setIsToggle] = useState<boolean>(false);  
  const [isRegistrationToggle, setIsRegistrationToggle] = useState<boolean>(false);  
  const [isCouponReq, setIsCouponReq] = useState<boolean>(false);  
  const [isCouponList, setIsCouponList] = useState<boolean>(true);  
  const [value, setValue] = useState<CouponFormItem>({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<API.CreateRegistration>({
    name: "",
    role: "user",
    email: "",
    status: false,
    password: "",
  });
  const [registrationValue, setRegistrationValue] = useState<API.CreateRegistration>({
    password: '',
    email: '',
    name: '',
    role: 'user',
    status: false,
  })

  const { handleLogin } = useUserContext();
  const loginRef = useRef<HTMLDivElement>(null);
  const registrationRef = useRef<HTMLDivElement>(null);



  useOutsideClick(loginRef, () => setIsToggle(false));
  useOutsideClick(registrationRef, () => setIsRegistrationToggle(false));

  
  const changeHandler = (value: ChangeEvent<HTMLInputElement>) => {
      setValue((prev)=> ({...prev, [value.target.name]: value.target.value}))
  }

  const onRegistrationChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setRegistrationValue((prev)=> ({...prev, [value.target.name]: value.target.value}))
  }

  const finishHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation()
    authAPI.login({...value}).then((data) => {
        toast(data?.message)
        localStorageService.set('info', data.data);
        setIsToggle(false);
        data?.data !== undefined && handleLogin()
        setValue({
          email: '',
          password: ''
        })
    }).catch((err) => {
      toast(err.message);
      setValue({
        email: '',
        password: ''
      })
    })
  }

  const registrationHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setErrors(validateValues(registrationValue));
    const check = Object.values(registrationValue).every((v) => v === "" && v?.status === false && v?.role === 'user');
    if(!check){
      authAPI.registration({...registrationValue}).then((data) => {
          toast(data?.message)
          setIsRegistrationToggle(false);
          setRegistrationValue({
            password: '',
            email: '',
            name: '',
            role: 'user',
            status: false,
          })
      }).catch((err) => {
        toast(err?.message);
        setRegistrationValue({
          password: '',
          email: '',
          name: '',
          role: 'user',
          status: false,
        })
      })
    }
  }

  const loginToggleHandler = useCallback(() =>{
    setIsToggle(true);
    isToggle && setIsRegistrationToggle(false)
  }, [isToggle, setIsToggle]);

  const registrationToggleHandler = useCallback(() =>{
    setIsRegistrationToggle(true)
  }, []);

  const couponRequestHandler = useCallback(() =>{
    setIsCouponReq(!isCouponReq)
    setIsCouponList(false)
  }, [isCouponReq]);

  const couponListHandler = useCallback(() =>{
    if(isCouponList){
      setIsCouponList(false)
    }else{
      setIsCouponList(true)
      setIsCouponReq(false)
    }

}, [isCouponList]);


const validateValues = (inputValues: API.CreateRegistration) => {

  let errors: API.CreateRegistration = {
      name: "",
      role: "user",
      email: "",
      status: false,
      password: "",
  };
  if (inputValues.email === '') {
    errors.email = "this Field must not be Empty!";
  }
  if (inputValues.name === '') {
    errors.name = "this Field must not be Empty!";
  }
  if (inputValues.password === '') {
    errors.password = "this Field must not be Empty!";
  }

  return errors;
};

  return (
    <main className="mb-2">
        <div className="bg-gray-800 rounded-sm ">
            <div className="flex items-center justify-between shadow px-9 py-3 relative">
                <Link href={'#'}>
                    <Image
                        src={logo}
                        width={130}
                        height={130}
                        alt="logo"
                    />
                </Link>    
              
                <div>
                  <button onClick={loginToggleHandler} className="mr-2 cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                    Login
                  </button>
                  <button onClick={registrationToggleHandler} className="cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                    Registration
                  </button>
                </div>
               
                { isToggle && (
                  <div ref={loginRef} className="absolute right-[10px] top-[75px] shadow-lg" style={{width: '400px'}}>
                    <Login error={errors} value={value} finishHandler={finishHandler} changeHandler={changeHandler} />
                  </div> 
                )}
                { isRegistrationToggle && (
                  <div ref={registrationRef} className="absolute right-[10px] top-[75px] shadow-lg" style={{width: '400px'}}>
                    <Registration value={registrationValue} error={errors} finishHandler={registrationHandler} changeHandler={onRegistrationChangeHandler} />
                  </div> 
                )}
                
              </div>
            </div>
        <div>
      </div>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Coupon - Management</h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 border bg-slate-100 mt-4 min-h-full">
          <button onClick={couponRequestHandler} className="mb-4 cursor-pointer rounded-md mr-4  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Coupon Request</button>
          <button onClick={couponListHandler} className="mb-4 cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Coupon List</button>
            {isCouponReq && <CouponForm />}
            {isCouponList &&  <CouponList />}
      </div>
    </main>
  );
}
