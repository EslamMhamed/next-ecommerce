"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { formUrlQuery } from "@/lib/utils"


type PaginationProps = {
    page : string | number,
    totalPages : number,
    urlParamName?: string
}

function Pagination({page, totalPages, urlParamName}:PaginationProps) {

    const router = useRouter()
    const searchParams = useSearchParams()

    function handleClick(btnType: string){
        const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) -1 
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: urlParamName || "page",
            value: pageValue.toString()
        })
        router.push(newUrl)
    }

  return (
    <div className="flex gap-2 ">
        <Button variant="outline" size="lg" disabled={Number(page) <=1 } onClick={()=>handleClick("prev")}>Previous</Button>
        <Button variant="outline" size="lg" disabled={Number(page) >= totalPages } onClick={()=>handleClick("next")} >Next</Button>
    </div>
  )
}

export default Pagination