"use client"

import bgHome from "@/assets/images/anime.jpg";
import HeaderProps from "@/components/headerImage";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Code2Icon, User } from "lucide-react";
import { motion } from "framer-motion"; 
import Link from "next/link";

export default function PageHome() {

  const cards = [
    {
      title: "Linkedin",
      description:
        "Conecte-se comigo no Linkedin e fique por dentro das minhas atualizações profissionais.",
      icon: BookOpen,
      link: 'https://www.linkedin.com/in/andreo-henrique'
    },
    {
      title: "Sobre Mim",
      description:
        "Saiba mais sobre minha trajetória, habilidades e objetivos como desenvolvedor full-stack.",
      icon: User,
      link: "https://www.andreodev.com.br"
    },
    {
      title: "Github",
      description:
        "Saiba mais sobre o desenvolvimento e código fonte dessa aplicação.",
      icon: Code2Icon,
      link: "https://github.com/andreodev/blog-Next"
    },
  ];

  return (
    <div className="flex flex-col" >
      <HeaderProps
        buttonText="Teste a aplicação"
        imageSrc={bgHome}
        text="SEJA BEM-VINDO AO MEU BLOG. FAÇA LOGIN OU CADASTRE-SE PARA EXPLORAR O QUE FOI CONSTRUÍDO!"
      />

      <main className="flex-1 bg-white text-gray-800 py-16 px-6 md:px-16">
        <section className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold">Desenvolvido por Andreo Henrique</h1>
          <p className="text-lg text-gray-600">
            Este blog é um espaço onde compartilho conhecimentos, experiências e projetos sobre desenvolvimento web,
            programação e tecnologia em geral.
          </p>
          <Link href={'https://www.andreodev.com.br/' } target="_blank">
          <Button className="mt-4 text-lg px-6 py-3 transition-all duration-500 hover:scale-105 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-blue-500/50 cursor-pointer">
            Conheça meus Projetos
          </Button>
          </Link>
        </section>

        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-md transition-all hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Link href={`${card.link}`} target="_blank" className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100 text-blue-600">
                  <Icon size={28} />
                </div>
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-sm text-gray-600">{card.description}</p>
                </Link>
              </motion.div>
            );
          })}
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-sm">
          © {new Date().getFullYear()} Andreo Henrique. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
