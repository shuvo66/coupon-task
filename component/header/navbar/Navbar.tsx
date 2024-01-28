// "use client"

// import Link from "next/link"
// import Image from 'next/image'

// import logo from '@/asset/image/logo.svg'
// import { Button } from "../../atom/Button"
// import { Login } from "../../auth/login"
// import { localStorageService } from "@/libs/local.storageService"
// import { ChangeEvent, useCallback, useEffect, useState } from "react"
// import { authAPI } from "@/libs/apiService"
// import { useRouter } from "next/navigation";
// import { Registration } from "@/component/auth/registration"
// import { toast } from "react-toastify"

// interface CouponFormItem {
//     password: string;
//     email: string;
// }

//  const Navbar = () => {
//     const router = useRouter()

//     const [value, setValue] = useState<CouponFormItem>({
//         email: '',
//         password: ''
//     })
//     const [isLogged, setIsLogged] = useState<boolean>(false);
//     const [isToggle, setIsToggle] = useState<boolean>(false);
//     const userInfo = localStorageService.get('info') as API.UserInfo;

//     const changeHandler = (value: ChangeEvent<HTMLInputElement>) => {
//         setValue((prev)=> ({...prev, [value.target.name]: value.target.value}))
//     }

//     const finishHandler = (event: any) => {
//         event.preventDefault();
//         event.stopPropagation()
//         authAPI.login({...value}).then((data) => {
//             toast(data?.message)
//             localStorageService.set('info', data.data);
//             setIsLogged(true);
//             setIsToggle(false);
//             router.push("/dashboard")
//         })
//     }


//     const toggleHandler = useCallback(() =>{
//         setIsToggle(!isToggle)
//     }, [isToggle]);

//     const logoutHandler = () => {
//         toast('successfully logged-out')

//         localStorageService.remove('info');
//         setIsToggle(false);
//         setIsLogged(false)

//     }
//     return(
//         <>
//             <div className="bg-gray-800 rounded-sm">
//                 <div className="flex items-center justify-between shadow px-9 py-3 relative">
//                     <Link href={'/'}>
//                         <Image
//                             src={logo}
//                             width={130}
//                             height={130}
//                             alt="logo"
//                         />
//                     </Link>    
//                     <div className="flex items-center">
//                         <div onClick={toggleHandler}>
//                             <Button name={isLogged || userInfo ? 'Loggedin': 'login'}/>
//                         </div>
//                         { isLogged || userInfo ? <div onClick={logoutHandler} className="text-white cursor-pointer">Logout</div> : ''}
                        
//                     </div>
//                    { isToggle && <div className="absolute right-[10px] top-[75px]"><Login finishHandler={finishHandler} changeHandler={changeHandler} value={undefined} error={undefined} /></div> }
//                    { isToggle && <div className="absolute right-[10px] top-[75px]"><Registration finishHandler={finishHandler} changeHandler={changeHandler} error={undefined} value={undefined} /></div> }
             
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Navbar;
