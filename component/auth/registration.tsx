import { ChangeEvent, useState } from "react"
import { authAPI } from "@/libs/apiService"
import { Input } from "../atom/Input";
import { localStorageService } from "@/libs/local.storageService";

interface RegistrationProps {
    finishHandler: (value: any) => void;
    changeHandler: (value: any) => void;
    error: API.CreateRegistration;
    value: API.CreateRegistration
}
export const Registration = ({finishHandler, changeHandler, error, value}: RegistrationProps) => {
    return(
        <>
            <form className="bg-white shadow-md rounded" style={{padding: '20px'}} onSubmit={finishHandler}>
                <Input value={value?.name} error={error.name} name={'name'} label={"User Name"} type={"text"} placeholder={'Enter Your User'} onChange={changeHandler}/>
                <Input value={value?.email} error={error.email} name={'email'} label={"Email"} type={"text"} placeholder={'Enter Your email'} onChange={changeHandler}/>
                <Input value={value?.password} error={error.password} name={'password'} label={"Password"} type={"password"} placeholder={'Enter Your password'} onChange={changeHandler}/>
                <input type="Submit"  className="cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"/>
            </form>
        </>
    )
}