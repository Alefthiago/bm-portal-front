import * as React from "react"
import Image from "next/image"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Image
            src={`/logo.ico`}
            alt="Logo"
            width={32}
            height={32}
            className="mx-auto"
          />

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              Bm Portal
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}