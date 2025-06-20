import type { Metadata } from "next";

import { SidebarProvider } from "@/components/ui/sidebar";
import { CustomTrigger } from "@/components/sidebar/custom-trigger";
import { SessionProvider } from "next-auth/react";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: 'BM Portal',
  // description: 'Portal de para auxilar',
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <section className="flex-1 overflow-y-auto p-2">
            <div className={`mb-2 gap-2`}>
              <CustomTrigger />
            </div>
            {children}
            <Toaster richColors closeButton />
          </section>
        </SidebarProvider>
      </SessionProvider>
    </main >
  );
};