import { ChangeEvent } from "react";

type InputTypeProps = {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    error: string;
    value: string;
}
export const Input = ({label, type, placeholder, name, onChange, error, value}: InputTypeProps) => {
    return(
        <div className="mb-2" style={{marginBottom: '10px'}}>
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                {label}
            </label><br/>
            <input value={value} style={{padding: '5px 10px', width: '100%', marginTop: '3px'}} onChange={onChange} name={name} type={type} className=" shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"   placeholder={placeholder} />
            {error ? (
                <span style={{color: 'red'}}>
                    This field must not be empty!
                </span>
                ) : null}
        </div>
    )
}