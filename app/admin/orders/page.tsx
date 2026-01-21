import DeleteDialog from "@/components/shared/DeleteDialog";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteOrder, getAllOrder } from "@/lib/actions/order.actions";
import { requireAdmin } from "@/lib/auth-guard";
import { formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";

export const metadata = { title: "Admin Orders" };

async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { page: string, query: string };
}) {
  await requireAdmin();

  const { page = "1", query } = await searchParams;

  const orders = await getAllOrder({ page: Number(page), limit: 2, query });

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
                <h1 className="h2-bold">Orders</h1>
                {query && (
                    <div>
                        Filtered by <i>&quot;{ query }&quot;</i>{' '}
                        <Link href={"/admin/orders"} >
                            <Button variant="outline" size="sm">
                                Remove Filter
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
      <div
        className="overflow-x-auto 
      "
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>BUYER</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt).dateTime}
                </TableCell>
                <TableCell>
                  {order.user.name}
                </TableCell>
                <TableCell>
                  {order.totalPrice.toNumber().toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : "Not Paid"}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? formatDateTime(order.deliveredAt).dateTime
                    : "Not Deliverd"}
                </TableCell>
                <TableCell>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/order/${order.id}`}>
                    Details
                    </Link>
                  </Button>
                  <DeleteDialog id={order.id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  );
}

export default AdminOrdersPage;
