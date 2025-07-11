import {
    UserIcon,
    SettingsIcon,
    MenuIcon
} from "lucide-react"
import Link from "next/link";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Menu",
        icon: MenuIcon,
        url: "menuConfig",
    },
    {
        title: "Usuários",
        icon: UserIcon,
        url: "/admin/users",
    },
];

export function NavConfigApp({ permissions }: { permissions: string[] }) {
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
                {filteredItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.title}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};