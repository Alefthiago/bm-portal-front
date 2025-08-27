"use client";

import {
    UserIcon,
    SettingsIcon,
    MenuIcon,
    ChevronRight
} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";

const items = [
    {
        title: "Menu",
        icon: MenuIcon,
        items: [
            { title: "Primário", url: "/menuConfig/main" },
            { title: "Secundário", url: "/menuConfig/sub" }
        ],
        url: "menuConfig",
    },
    {
        title: "Usuários",
        icon: UserIcon,
        items:[],
        url: "/admin/users",
    },
];

export function NavConfigApp({ permissions }: { permissions: string[] }) {

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const filteredItems = items.filter((item) => {
        if (item.title === "Usuários" && !permissions.includes("view_users")) {
            return false;
        }
        if (item.title === "Menu" && !permissions.includes("view_menu")) {
            return false;
        }
        return true;
    });

    if (filteredItems.length === 0) return null;

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <SettingsIcon className="mr-2" />
                Configurações
            </SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        open={openMenu === item.title}
                        onOpenChange={(isOpen) =>
                            setOpenMenu(isOpen ? item.title : null)
                        }
                        asChild
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    className="cursor-pointer"
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    {item.items?.length != 0 && (
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    )}

                                </SidebarMenuButton>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};