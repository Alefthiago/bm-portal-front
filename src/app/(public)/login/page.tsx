//      COMPONENTS.     //
import { LoginForm } from "@/components/auth/form-login";
import { FaGoogle } from "react-icons/fa";
import {

} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
//     /COMPONENTS.     //

export default function loginPage() {
  return (
    <section className={`p-6 sm:w-[500px] w-full`}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Bm Portal</CardTitle>
          <CardDescription>Realize o login</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="destructive" className={`cursor-pointer`}>
            <FaGoogle /> Entrar com Google
          </Button>
        </CardFooter>
      </Card>
    </section >
  );
}