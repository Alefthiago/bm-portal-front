//      UTILS.      //
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveTable } from "@/components/tables/data-tables";
import { ModalAddMenu } from "@/components/modals/modal-add-menu";

//     /UTILS.      //

export default async function MenuConfigPage() {
    const session = await auth();
    const user = session?.user;

    if (!user?.permissions?.includes("view_menu")) {
        redirect("/");
    }

    return (
        <section className="flex flex-col gap-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">
                                Início
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                                <Link href="#">
                                    Configurações
                                </Link>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem>
                                    <Link href="/menuConfig">
                                        Menu
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/menuConfig/permissions">
                                        Usuários
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">
                                Menu
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="min-h-[100lvh]">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                            Configuração de Menus
                        </h1>
                        <ModalAddMenu />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveTable />
                </CardContent>
            </Card>
        </section>
    );
};