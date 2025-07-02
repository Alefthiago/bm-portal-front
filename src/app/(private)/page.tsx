"use client";

import MostViewed from "@/components/cards/most-viewed";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const cardData = {
  title: "Título do Card",
  description: "Continue assistindo",
  action: "Card Action",
};

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{cardData.title}</CardTitle>
          <CardDescription>{cardData.description}</CardDescription>
          <CardAction>{cardData.action}</CardAction>
        </CardHeader>
      </Card>

      <Card className="min-h-[100lvh]">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              Mais populares
            </h1>
          </CardTitle>
          <CardDescription>
            <p>
              Descubra os conteúdos mais populares entre os usuários
            </p>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <MostViewed />
        </CardContent>
      </Card>
    </section >
  );
}