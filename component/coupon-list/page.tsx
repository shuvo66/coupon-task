import { CouponCard } from "@/component/atom/CouponCard"
import { couponAPI } from "@/libs/apiService/couponApi"
import { useQuery } from "@tanstack/react-query"

const CouponList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => couponAPI.list()
      })
    

    if (error) return 'An error has occurred: ' + error.message;

    return(

        <>
            <div className="grid grid-rows-2 gap-4 ">
                {
                    data?.data?.map((item, i) => (
                        <div key={i}>{item?.status && <CouponCard item={item}/>}</div>
                    ))
                }
            </div>
            {
                isPending && (
                    <button type="button" className="mt-4">
                        Loading...
                    </button>
                )
            }
        </>
    )
}
export default CouponList;