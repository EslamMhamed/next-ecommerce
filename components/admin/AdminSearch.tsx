"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"


function AdminSearch() {
    const pathname = usePathname()
    const formActionUrl = pathname.includes("/admin/orders") ? "/admin/orders" : pathname.includes("/admin/users") ? "/admin/users" : "/admin/products"

    const searchParams = useSearchParams()
    const [queryValue, setQueryValue] = useState(searchParams.get("query")  || "")

    
  return (
    <form action={formActionUrl} method="GET">
        <Input className="md:w-25 lg:w-75 " name="query" placeholder="Search..." value={queryValue} onChange={(e)=> setQueryValue(e.target.value)}  />
        <button className="sr-only" type="submit">Search</button>
    </form>
  )
}

export default AdminSearch