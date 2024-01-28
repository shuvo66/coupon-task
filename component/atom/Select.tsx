import { CLASS_NAME } from "@/component/coupon-request/const";
import { ChangeEvent } from "react";

type SelectTypeProps = {
    label: string;
    type: string;
    onChange: (value: any) => void;
    error: string;
    value: string;
}
export const Select = ({label, type, onChange, error, value}: SelectTypeProps) => {
    return(
        <div className="mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                {label}
            </label><br/>
            <select value={value} style={{padding: '5px 10px', marginBottom: '10px', width: '100%'}} onChange={onChange} name={type}  className="py-2 px-3 mb-3 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option>Please Select</option>
                {
                    CLASS_NAME.map((value, i) => (
                        <option value={value.value} key={i}>{value.label}</option>
                    ))
                }
            </select>
            {error ? (
                <span style={{color: 'red'}}>
                    This field must not be empty!
                </span>
                ) : null
            }
        </div>
    )
}