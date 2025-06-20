import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const cardData = {
  title: "Continue assistindo",
  description: "Titutlo do card",
  action: "Card Action",
  content: "Card Content",
  footer: "Card Footer",
};

export default function Page() {
  return (
    <section className="flex flex-col gap-4">
      <Card className="">
        <CardHeader>
          <CardTitle>{cardData.title}</CardTitle>
          <CardDescription>{cardData.description}</CardDescription>
          <CardAction>{cardData.action}</CardAction>
        </CardHeader>
        <CardContent>
          <p>{cardData.content}</p>
        </CardContent>
        <CardFooter>
          <p>{cardData.footer}</p>
        </CardFooter>
      </Card>

      <Card className="h-svh">
        <CardHeader>
          <CardTitle>Mais Vistos</CardTitle>
          <CardDescription>
            Descubra os conteúdos mais populares entre os usuários
          </CardDescription>
          {/* <CardAction>{cardData.action}</CardAction> */}
        </CardHeader>
        <CardContent>
          <p>{cardData.content}</p>
        </CardContent>
        <CardFooter>
          <p>{cardData.footer}</p>
        </CardFooter>
      </Card>
    </section>
  );
}
