"use client"

import * as React from "react"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";
import { Skeleton } from "@/components/ui/skeleton"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {mounted ? (
            <Image
              src={`/logo${theme != "dark" ? "Azul" : "Branco"}.svg`}
              alt="Logo"
              width={32}
              height={32}
              className="mx-auto"
            />
          ) : (
            <Skeleton className={`mx-auto h-[32px] w-[32px] rounded-full`} />
          )}
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