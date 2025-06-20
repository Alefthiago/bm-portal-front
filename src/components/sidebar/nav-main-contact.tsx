"use client"
import {
    Headset,
    Mails,
    PhoneCall,
    Copy as CopyIcon,
} from "lucide-react"
import { MdConnectWithoutContact } from "react-icons/md"
import { FaWhatsapp } from "react-icons/fa"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { CopyButton } from "@/components/btn/copy-button"
const items = [
    {
        title: "Números",
        icon: Headset,
        items: [
            {
                title: "(81) 3126-2050",
                hasCopy: true,
                hasWhatsapp: true,
                copy: "(81) 3126-2050",
                url: "https://wa.me/558131262050",
                icon: PhoneCall,
            },
            {
                title: "(81) 2011-2754",
                hasCopy: true,
                hasWhatsapp: false,
                copy: "(81) 2011-2754",
                url: "#",
                icon: PhoneCall,
            },
            {
                title: "(11) 2626-1337",
                hasCopy: true,
                hasWhatsapp: false,
                copy: "(11) 2626-1337",
                url: "#",
                icon: PhoneCall,
            },
        ],
    },
    {
        title: "E-mails",
        icon: Mails,
        items: [
            {
                title: "suporte@bminformatica.com.br",
                hasCopy: true,
                hasWhatsapp: false,
                copy: "suporte@bminformatica.com.br",
                url: "#",
                icon: Mails,
            },
            {
                title: "comercial@bminformatica.com.br",
                hasCopy: true,
                hasWhatsapp: false,
                copy: "comercial@bminformatica.com.br",
                url: "#",
                icon: Mails,
            },
        ],
    },
]

export function NavMainContact() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <MdConnectWithoutContact className="mr-2" />
                Contatos
            </SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <SidebarMenuButton className="cursor-pointer">
                                    {item.icon && <item.icon className="mr-2" />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{item.title}</AlertDialogTitle>
                                    <AlertDialogDescription asChild>
                                        <div className="space-y-2 max-h-[300px] overflow-y-auto mt-4">
                                            {item.items.map((sub, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center border-b text-sm"
                                                >
                                                    <div className="flex gap-1">
                                                        {sub.icon && <sub.icon size={16} />}
                                                        <a
                                                            href={sub.url}
                                                            target={sub.hasWhatsapp ? "_blank" : "_self"}
                                                            rel="noopener noreferrer"
                                                            className="hover:underline"
                                                        >
                                                            {sub.title}
                                                        </a>
                                                    </div>

                                                    <div className="flex gap-1 items-center">
                                                        {sub.hasWhatsapp && (
                                                            <a
                                                                href={sub.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                title="Abrir WhatsApp"
                                                                className="text-green-600"
                                                            >
                                                                <FaWhatsapp size={20} />
                                                            </a>
                                                        )}
                                                        
                                                        {sub.hasCopy && (
                                                            <CopyButton textToCopy={sub.copy} />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className={`cursor-pointer`}>Fechar</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
};