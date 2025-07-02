
import {

    CopyIcon
} from "lucide-react";


const cardData = [
    {
        title: "Título do Card",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
        action: "Card Action",
        icon: CopyIcon,
        url: "https://example.com"
    },
    {
        title: "Outro Card",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
        action: "Ver Detalhes",
        icon: CopyIcon,
        url: "https://example.com"
    },
    {
        title: "Card Adicional",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
        action: "Acessar",
        icon: CopyIcon,
        url: "https://example.com"
    },
    {
        title: "Card Extra",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
        action: "Saiba Mais",
        icon: CopyIcon,
        url: "https://example.com"
    },
    {
        title: "Card Final", 
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
        action: "Finalizar",
        icon: CopyIcon,
        url: "https://example.com"
    },
    {
        title: "Card de Exemplo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet",
        action: "Ação do Card",
        icon: CopyIcon,
        url: "https://example.com"
    }
];

export default function MostViewed() {
    return (
        <section className="grid grid-cols-1 gap-8 mt-5 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
            {cardData.map((card, index) => (
                <div className="space-y-3" key={index}>
                    <span className="inline-block p-3 text-[#206BA5] bg-blue-100 rounded-full dark:text-white dark:bg-[#206BA5]">
                        {/* <CopyIcon className="w-6 h-6" /> */}
                        <card.icon className="w-6 h-6" />
                    </span>

                    <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                        {card.title}
                    </h1>

                    <p className="text-gray-500 dark:text-gray-300">
                        {card.description}
                    </p>

                    <a href={card.url} className="inline-flex items-center -mx-1 text-sm text-[#206BA5] capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-[#206BA5]">
                        <span className="mx-1">Ver mais</span>
                        <svg className="w-4 h-4 mx-1 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                </div>
            ))}
        </section>
    );
}