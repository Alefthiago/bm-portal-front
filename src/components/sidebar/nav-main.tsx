"use client";

import { useState } from "react";
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
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Cadastros",
    url: "#",
    icon: PlusCircleIcon,
    items: [
      { title: "Clientes", url: "#", tutorials: [] },
      { title: "Convênios", url: "#", tutorials: [] },
      { title: "Entregas", url: "#", tutorials: [] },
      { title: "Formas de Pagamento", url: "#", tutorials: [] },
      { title: "Fornecedores", url: "#", tutorials: [] },
      { title: "Indicações", url: "#", tutorials: [] },
      { title: "Motivos Desconto", url: "#", tutorials: [] },
      { title: "Naturezas de Operação", url: "#", tutorials: [] },
      { title: "Ordem de Serviço", url: "#", tutorials: [] },
      { title: "Produtos", url: "#", tutorials: [] },
      { title: "Transportadoras", url: "#", tutorials: [] },
      { title: "Unidades da Federação", url: "#", tutorials: [] },
      { title: "Vendedores", url: "#", tutorials: [] },
    ],
  },
  {
    title: "Movimentações",
    url: "#",
    icon: Bot,
    items: [
      { title: "Ajuste de Estoques", url: "#", tutorials: [] },
      { title: "Crédito Cliente", url: "#", tutorials: [] },
      { title: "Compras", url: "#", tutorials: [] },
      { title: "Frente de Loja", url: "#", tutorials: [] },
      { title: "Notas Contra CNPJ", url: "#", tutorials: [] },
      { title: "Notas Fiscais de Entrada", url: "#", tutorials: [] },
      { title: "Notas Fiscais de Saída", url: "#", tutorials: [] },
      { title: "Notas Fiscais do Consumidor", url: "#", tutorials: [] },
      { title: "Eletrônica (NFC-e/CF-E)", url: "#", tutorials: [] },
      { title: "Ordem de Serviço", url: "#", tutorials: [] },
      { title: "Nota Manual", url: "#", tutorials: [] },
      { title: "Indústria", url: "#", tutorials: [] },
      { title: "Pedido de Venda", url: "#", tutorials: [] },
      { title: "Expedição", url: "#", tutorials: [] },
      { title: "Transferência Entre filiais", url: "#", tutorials: [] },
      { title: "Uso e Consumo", url: "#", tutorials: [] },
      { title: "Transferência Entre Estoques", url: "#", tutorials: [] },
    ],
  },
  {
    title: "Financeiro",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Entradas", url: "#", tutorials: [] },
      { title: "Saídas", url: "#", tutorials: [] },
      { title: "Transferências", url: "#", tutorials: [] },
      { title: "Análise Cliente", url: "#", tutorials: [] },
      { title: "Centros de Custo", url: "#", tutorials: [] },
      { title: "Grupos de Contas Correntes", url: "#", tutorials: [] },
      { title: "Contas Correntes", url: "#", tutorials: [] },
      { title: "Grupos de Despesas", url: "#", tutorials: [] },
      { title: "Despesas", url: "#", tutorials: [] },
      { title: "Grupos de Receitas", url: "#", tutorials: [] },
      { title: "Receitas", url: "#", tutorials: [] },
      { title: "OFX", url: "#", tutorials: [] },
    ],
  },
  {
    title: "Contas",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "Contas a Pagar", url: "#", tutorials: [] },
      { title: "Contas a Receber", url: "#", tutorials: [] },
      { title: "Contas Pagas", url: "#", tutorials: [] },
      { title: "Contas Recebidas", url: "#", tutorials: [] },
      { title: "Contas Canceladas", url: "#", tutorials: [] },
      { title: "Administradoras de Cartão", url: "#", tutorials: [] },
      { title: "Sincronização de Cartão", url: "#", tutorials: [] },
      { title: "Boletos", url: "#", tutorials: [] },
      { title: "Arquivos de Remessa", url: "#", tutorials: [] },
      { title: "Arquivos de Retorno", url: "#", tutorials: [] },
    ],
  },
];


export function NavMain() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
  );
};