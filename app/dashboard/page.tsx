'use client';

import { useUserContext } from '../user-provider';
import Link from 'next/link';
import Image from 'next/image'
import logo from '@/asset/image/logo.svg'
import { authAPI } from '@/libs/apiService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { couponAPI } from '@/libs/apiService/couponApi';
import { useCallback } from 'react';
import { localStorageService } from '@/libs/local.storageService';
import { toast } from 'react-toastify';


export default function Dashboard() {
  const { handleLogout } = useUserContext();
  const userInfo = localStorageService.get('info') as API.UserInfo;
  const { mutate: userStatusMutation } = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: API.Status }) =>
    authAPI.approval(id, payload),
		onSuccess: (data) => {
      refetch();
      toast(data?.message)

		},
    onError:(error: Error) => {
      toast('Something Went Wrong')
    }
	});

  const { mutate: couponApprovalMutation } = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: API.Status }) =>
    couponAPI.approvalCoupon(id, payload),
		onSuccess: (data) => {
      couponRefetch();
      toast(data?.message)
		},
    onError:(error: Error) => {
      toast('Something Went Wrong')
    }
	});

  const changeStatusHandler = useCallback((status: boolean, id: string) => {
    const payload = {
      status: status ? false : true,
    }
    userStatusMutation({id, payload}) as unknown as any;
  }, [userStatusMutation])


  const changeApprovalHandler = useCallback((status: boolean, id: string) => {
    const payload = {
      status: status ? false : true,
    }
    couponApprovalMutation({id, payload}) as unknown as any;
  }, [couponApprovalMutation])

  const { isPending, data, refetch } = useQuery({
    queryKey: ['user_list'],
    queryFn: () => authAPI.userList()
  })

  const { isPending: isCouponPending, data:couponData, refetch:couponRefetch } = useQuery({
    queryKey: ['coupons_list'],
    queryFn: () => couponAPI.list()
  })

  if (isPending || isCouponPending) return 'Loading...';

  return (

    <main className="">
      <div className="bg-gray-800 rounded-sm ">
          <div className="flex items-center justify-between shadow px-9 py-3 relative">
              <Link href={'/'}>
                  <Image
                      src={logo}
                      width={130}
                      height={130}
                      alt="logo"
                  />
              </Link>    
                <button className="cursor-pointer rounded-md  bg-indigo-500  px-3.5 py-2 mt-2 text-[14px] font-small text-white shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleLogout}>
                  Logout
                </button>
              </div>
          </div>
      <div>
    </div>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Coupon</h1>
        </div>
      </header>

      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 border bg-slate-100 mt-4 min-h-full">
        <div className='grid grid-rows-3 grid-flow-col gap-4'>
          <div className="row-span-3 bg-white rounded-sm p-4">
            <h1 className='font-semibold'>User-List</h1>
            <ul role="list" className="divide-y divide-gray-100">
              {data?.data.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {person.role}
                      </span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="mt-1 flex items-center gap-x-1.5">
                      {
                        person.status ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700  ring-1 ring-inset ring-red-600/10">
                            Active
                          </span>
                        ) : (                        
                          <span className="inline-flex items-center rounded-md  bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
                            In-Active
                          </span>
                        )
                      }
                    </div>
                    {
                      userInfo?.role === 'admin' && (
                        <div onClick={()=>changeStatusHandler(person?.status, person?._id)} className="cursor-pointer rounded-md border  px-3.5 py-1 mt-2 text-[13px] font-small text-black shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        { person.status ? 'Reject' : 'Accept'}
                       </div>
                      )
                    }
                
               
                  </div>
                  
                </li>
              ))}
            </ul>
          </div>
          <div className="row-span-3 bg-white rounded-sm p-4">
          <h1 className='font-semibold'>Coupon-List</h1>
            <ul role="list" className="divide-y divide-gray-100">
                {couponData?.data.map((person) => (
                  <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.user_name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.role}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.class_name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.school_name}</p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        {
                          !person.status ? (
                            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                              Not Approved
                            </span>
                          ) : (                        
                              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                Approved
                              </span>
                          )
                        }
                      </div>
                      {
                        userInfo?.role === 'admin' && (
                          <div onClick={()=> changeApprovalHandler(person?.status, person?._id)} className="cursor-pointer rounded-md border  px-3.5 py-1 mt-2 text-[13px] font-small text-black shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                              { person.status ? 'Reject' : 'Accept'}
                          </div>
                        )
                      }
                    </div>
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
