import { ChangeEvent, useState } from "react"
import { authAPI } from "@/libs/apiService"
import { Input } from "../atom/Input";
import { localStorageService } from "@/libs/local.storageService";


interface CouponFormItem {
    password: string;
    email: string;
  }

interface LoginProps {
    finishHandler: (value: any) => void;
    changeHandler: (value: any) => void;
    value: CouponFormItem;
    error: {}
}
export const Login = ({finishHandler, changeHandler, value, error}: LoginProps) => {
    return(
        <>
            <form className="bg-white shadow-md rounded" style={{padding: '20px'}} onSubmit={finishHandler}>
                <Input error={''} value={value?.email} name={'email'} label={"Email"} type={"text"} placeholder={'Enter Your email'} onChange={changeHandler}/>
                <Input error={''} value={value?.password} name={'password'} label={"Password"} type={"password"} placeholder={'Enter Your password'} onChange={changeHandler}/>
                <input type="Submit"  className="cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"/>
            </form>
        </>
    )
}