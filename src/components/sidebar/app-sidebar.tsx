"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  PlusCircleIcon,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavMainContact } from "@/components/sidebar/nav-main-contact"
import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import { ModeToggle } from "@/components/mode-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "alef thiago silva",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Cadastro",
      url: "#",
      icon: PlusCircleIcon,
      items: [
        {
          title: "Cliente",
          url: "#",
        },
        {
          title: "Convênios",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        }
      ],
    },
    {
      title: "Emissão",
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
      title: "Documentation",
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
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <ModeToggle />
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <NavMain />
        <NavMainContact />
        <NavProjects />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}