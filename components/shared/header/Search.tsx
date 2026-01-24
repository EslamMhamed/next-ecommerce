import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/procdut.action"
import { SearchIcon } from "lucide-react"

async function Search() {
    const caregories = await getAllCategories()
  return (
    <form action='/search' method="GET">
        <div className="flex items-center space-x-2 w-full max-w-sm">
            <Select name="category" >
                <SelectTrigger className="w-45" >
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="mt-10" >
                    <SelectItem key="All" value="all">All</SelectItem>
                    {caregories.map((category) => (
                        <SelectItem key={category.category} value={category.category}>
                            {category.category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input name="q" type="text" placeholder="Search..." className="md:w-25 lg:w-75" />
            <Button>
                <SearchIcon />
            </Button>
        </div>
    </form>
  )
}

export default Search