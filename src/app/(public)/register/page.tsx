import Image from "next/image";

import { RegisterForm } from "@/components/auth/form-register";
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


export default function cadastroPage() {
  return (
    <section className={`p-6 sm:w-[500px] w-full`}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Bm Portal</CardTitle>
          <CardDescription>Crie sua Conta</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="destructive" className={`cursor-pointer`}><FaGoogle /> Entrar com Google</Button>
        </CardFooter>
      </Card>
    </section >
  );
}