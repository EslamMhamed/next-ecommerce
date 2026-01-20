import DeleteDialog from "@/components/shared/DeleteDialog"
import Pagination from "@/components/shared/Pagination"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllUsers } from "@/lib/actions/user.action"
import { formatDateTime, formatId } from "@/lib/utils"
import { Link } from "lucide-react"


export const metadata = {title : "Admin Users"}

async function AdminUserPage({searchParams}: {searchParams: {page: number}}) {

    const {page} = await searchParams

    const users = await getAllUsers({page: Number(page) || 1})

  return (
   <div className="space-y-2">
      <h2 className="h2-bold">Users</h2>
      <div
        className="overflow-x-auto 
      "
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>ROLE</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{formatId(user.id)}</TableCell>
                <TableCell>
                    {user.name}
                </TableCell>
                <TableCell>
                  {user.email}
                </TableCell>
                <TableCell>
                  {user.role === 'user' ? (
                    <Badge variant="secondary" >User</Badge>
                  ) : (<Badge variant="default"  >Admin</Badge>)}
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`admin/users/${user.id}`}>
                    Edit
                    </Link>
                  </Button>
                  {/* <DeleteDialog id={user.id} action={} /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {users.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={users?.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export default AdminUserPage