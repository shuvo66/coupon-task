import Link from "next/link"
import { Button } from "./Button"
import { localStorageService } from "@/libs/local.storageService";

export const NavigationLink = () => {
    const userInfo = localStorageService.get('info') as API.UserInfo;

    return(
        <>
            <Link href={'coupon-request'}><Button name="Coupon Request"/></Link>
            <Link href={'coupon-list'}><Button name="Coupon List"/></Link>
            {userInfo?.role === 'admin' && <Link href={'coupon-approval'}><Button name="Coupon Approval"/></Link>}
        </>
    )
}

