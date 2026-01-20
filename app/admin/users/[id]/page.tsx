import { getUserById } from "@/lib/actions/user.action"
import { notFound } from "next/navigation"

export const metadata = {title : "Update User"}

async function AdminUserUpdatePage({params}: {params:{id:string}}) {

    const {id} = await params

    const user = await getUserById(id)

    if(!user)  notFound()

        console.log(user)

  return (
    <div className="space-y-8 max-w-lg mx-auto">
        <h1 className="h2-bold">Update User</h1>
    </div>
  )
}

export default AdminUserUpdatePage