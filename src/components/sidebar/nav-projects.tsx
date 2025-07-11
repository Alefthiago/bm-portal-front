"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Wrench
} from "lucide-react";

const projects = [
  {
    name: "Disponibilidade NF-e",
    url: "https://www.nfe.fazenda.gov.br/portal/disponibilidade.aspx",
  },
  {
    name: "Disponibilidade NFC-e",
    url: "https://nfce.sefaz.se.gov.br/portal/painelMonitor.jsp",
  },
  {
    name: "Sintegra",
    url: "http://www.sintegra.gov.br/",
  }
];

export function NavProjects() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <Wrench className="mr-2 h-4 w-4" />
        Útil
      </SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
};