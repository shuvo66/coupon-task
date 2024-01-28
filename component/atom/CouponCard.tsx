import { Button } from "./Button"

type CouponCardProps = {
    item?: API.UserInfo
}
export const CouponCard = ({item}: CouponCardProps) => {

    return(
        <div className=" bg-white p-4">
            <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6">
                <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-600 mb-2"><b>Name: </b>{item?.user_name}</p>
                    <p className="truncate text-sm leading-5 text-gray-600 mb-2"><b>Email: </b>{item?.email}</p>
                    <p className="truncate text-sm leading-5 text-gray-600 mb-2"><b>Class Roll: </b>{item?.roll}</p>
                    <p className="truncate text-sm leading-5 text-gray-600 mb-2"><b>Class Name: </b>{item?.class_name}</p>
                    <p className="truncate text-sm leading-5 text-gray-600 mb-2"><b>School Name: </b>{item?.school_name}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="flex items-center gap-x-1.5">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700  ring-1 ring-inset ring-red-600/10">
                            {item?.status && 'Approved'}
                        </span>
                    </div>
                </div>
                </li>
            </ul>
        </div>
    )
}