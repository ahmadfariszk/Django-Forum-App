import { Button } from "~/shared/shadcn-ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/shared/shadcn-ui/Card"
import { Input } from "~/shared/shadcn-ui/Input"
import { Label } from "~/shared/shadcn-ui/Label"

export const TestPage = () => {
    return(
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
    )
}