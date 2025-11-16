import { Shield, Lock, Code, Users, Zap, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "OWASP Top 10",
    description: "Vulnerabilidades mais críticas atualizadas para 2025 com exemplos práticos e mitigações.",
    link: "/owasp",
    color: "text-primary",
  },
  {
    icon: Lock,
    title: "Engenharia Social",
    description: "Guias completos contra phishing, vishing, smishing e outras técnicas de manipulação.",
    link: "/social-engineering",
    color: "text-destructive",
  },
  {
    icon: Code,
    title: "Desenvolvimento Seguro",
    description: "Boas práticas para mobile e web com snippets de código prontos para uso.",
    link: "/practices",
    color: "text-secondary",
  },
  {
    icon: Users,
    title: "Checklists Interativos",
    description: "Listas verificáveis para auditorias, code reviews e processos de desenvolvimento.",
    link: "/checklists",
    color: "text-success",
  },
  {
    icon: Zap,
    title: "Templates & Snippets",
    description: "Código reutilizável e templates prontos para implementação segura.",
    link: "/templates",
    color: "text-warning",
  },
  {
    icon: BookOpen,
    title: "Casos de Estudo",
    description: "Análises aprofundadas de incidentes reais e suas lições aprendidas.",
    link: "/cases",
    color: "text-info",
  },
];

const FeaturedCards = () => {
  return (
    <section className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Recursos Principais
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tudo que você precisa para construir aplicações seguras e proteger sua organização
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link key={index} to={feature.link}>
              <Card className="h-full card-hover transition-all hover:border-primary/50 group">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted group-hover:bg-primary/10 transition-colors ${feature.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedCards;
