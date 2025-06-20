import {
    ChevronRight,
    BookA,
    PlusCircleIcon,
    Bot,
    BookOpen,
} from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Cadastros",
        url: "#",
        icon: PlusCircleIcon,
        items: [
            {
                title: "Produto",
                url: "#",
            },
            {
                title: "Pessoa F/J",
                url: "#",
            },
            {
                title: "Forma de Pagamento",
                url: "#",
            },
            {
                title: "CFOP",
                url: "#",
            },
            {
                title: "Settings",
                url: "#",
            }
        ],
    },
    {
        title: "Administrativo",
        url: "#",
        icon: Bot,
        items: [
            {
                title: "NF-e",
                url: "#",
            },
            {
                title: "NFC-e",
                url: "#",
            },
            {
                title: "MDF-e",
                url: "#",
            },
        ],
    },
    {
        title: "Comercial",
        url: "#",
        icon: BookOpen,
        items: [
            {
                title: "Introduction",
                url: "#",
            },
            {
                title: "Get Started",
                url: "#",
            },
            {
                title: "Tutorials",
                url: "#",
            },
            {
                title: "Changelog",
                url: "#",
            },
        ],
    }
]

export function NavMain() {
    const { isMobile } = useSidebar();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                <BookA className="mr-2" />
                Manuais
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title} className={`cursor-pointer`}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
    )
}