
type ButtonProps = {
    name: string;
}
export const Button = ({name}: ButtonProps) => {
    return(<button className="transition ease-in-out delay-150  rounded-md px-4 py-2 mr-4 text-white  bg-[#2d4797] hover:bg-[#8897c8]">{name}</button>)
}