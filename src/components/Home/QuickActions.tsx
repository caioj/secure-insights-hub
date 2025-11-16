import { Zap, Download, Bell, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: Bookmark,
    title: "Favoritos",
    description: "Acesse seus artigos salvos",
    action: "Ver Favoritos",
    href: "#favorites",
    color: "text-warning",
  },
  {
    icon: Download,
    title: "Exportar Checklists",
    description: "Baixe checklists em PDF/Markdown",
    action: "Exportar",
    href: "/checklists",
    color: "text-success",
  },
  {
    icon: Bell,
    title: "Alertas de Segurança",
    description: "CVEs e vulnerabilidades recentes",
    action: "Ver Alertas",
    href: "#alerts",
    color: "text-destructive",
  },
  {
    icon: Zap,
    title: "Guia Rápido",
    description: "Início rápido para novos usuários",
    action: "Começar",
    href: "#quick-start",
    color: "text-info",
  },
];

const QuickActions = () => {
  return (
    <section className="container py-12 border-t">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Ações Rápidas</h2>
        <p className="text-muted-foreground">Acesso direto às funcionalidades mais usadas</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index}
              className="card-hover group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-muted group-hover:bg-muted/80 transition-colors ${action.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link to={action.href}>
                      {action.action}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
