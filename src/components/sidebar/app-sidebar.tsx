//   /UTILS.    //
import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavMainContact } from "@/components/sidebar/nav-main-contact";
import { NavConfigApp } from "@/components/sidebar/admin/nav-config-app";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
//   /UTILS.    //

export async function AppSidebar() {
  const session = await auth();
  const user = session?.user;

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

        <NavConfigApp permissions={user?.permissions ?? []} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}