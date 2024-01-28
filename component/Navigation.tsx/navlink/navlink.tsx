import Link from "next/link"
import { localStorageService } from "@/libs/local.storageService";
import { Button } from "@/component/atom/Button";
import { usePathname } from "next/navigation";

const NavigationLink = () => {

    return(
        <>
            <Link href={'coupon-request'}><Button name="Coupon Request"/></Link>
            <Link href={'coupon-list'}><Button name="Coupon List"/></Link>
        </>
    )
}

export default NavigationLink;