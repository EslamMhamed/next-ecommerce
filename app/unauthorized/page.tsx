import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {title: "Unauthorized Access"}

function UnauthorizedPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-4  min-h-screen">
        <h1 className="h1-bold text-4xl ">Unauthorized Access</h1>
        <p className="text-muted-foreground">
            You do not have permission to access to this page
        </p>
        <Button>
            <Link href={"/"}>Return Home</Link>
        </Button>
    </div>
  )
}

export default UnauthorizedPage