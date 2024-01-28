
import { Input } from "@/component/atom/Input"
import { Select } from "@/component/atom/Select"
import { couponAPI } from "@/libs/apiService/couponApi";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

type CouponFormProps = {}
interface CouponFormItem {
    user_name: string,
    roll: string,
    email: string,
    school_name: string,
    class_name: string
}

const CouponForm = ({}: CouponFormProps) => {
    const [value, setValue] = useState<CouponFormItem>({
        user_name: '',
        roll: '',
        email: '',
        school_name: '',
        class_name: ''
    });
    const [errors, setErrors] = useState<CouponFormItem>({
        user_name: '',
        roll: '',
        email: '',
        school_name: '',
        class_name: ''
    });

    const changeHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setValue((prev)=> ({...prev, [value.target.name]: value.target.value}))
    }

    const finishHandler = (event: any) => {
        event.preventDefault();
        event.stopPropagation()
        setErrors(validateValues(value));

        const check = Object.values(value).every((v) => v !== "");
        if(check){
            couponAPI.createCoupon({...value}).then((data) => {
              toast(data?.message);
              setValue({
                user_name: '',
                roll: '',
                email: '',
                school_name: '',
                class_name: ''
              })
            }).catch((err) => {
              toast(err)
            })
        }
    }

    const validateValues = (inputValues: CouponFormItem) => {
        let errors: CouponFormItem = {
            user_name: "",
            roll: "",
            email: "",
            school_name: "",
            class_name: ""
        };
        if (inputValues.email === '') {
          errors.email = "this Field must not be Empty!";
        }
        if (inputValues.user_name === '') {
          errors.user_name = "this Field must not be Empty!";
        }
        if (inputValues.school_name === '') {
          errors.school_name = "this Field must not be Empty!";
        }
        if (inputValues.class_name === '') {
          errors.class_name = "this Field must not be Empty!";
        }
        if (inputValues.roll === '') {
          errors.class_name = "this Field must not be Empty!";
        }
        return errors;
      };


    return(
        <div className="mt-6" style={{width: '500px'}}>
            <form className="bg-white shadow-lg rounded mb-4 p-4 mt-4" onSubmit={finishHandler}>
                <Input value= {value.user_name} error={errors.user_name} name={'user_name'} label={"User Name"} type={"text"} placeholder={'Enter Your Name'} onChange={changeHandler}/>
                <Input value= {value.roll} error={errors.roll} name={'roll'} label={"Roll"} type={"number"} placeholder={'Enter Your Roll'} onChange={changeHandler}/>
                <Input value= {value.email} error={errors.email} name={'email'} label={"Email Address"} type={"email"} placeholder={'Enter Your Email Address'} onChange={changeHandler}/>
                <Input value= {value.school_name} error={errors.school_name} name={'school_name'} label={"School Name"} type={"text"} placeholder={'Enter Your School Name'} onChange={changeHandler}/>
                <Select value= {value.class_name} error={errors.class_name} label={"Class Name"} type={"class_name"} onChange={changeHandler}/>
                <input type="Submit"  className="cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"/>
            </form>
        </div>
    )
}
export default CouponForm;