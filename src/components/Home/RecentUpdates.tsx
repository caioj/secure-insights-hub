import { Clock, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const updates = [
  {
    id: 1,
    title: "OWASP Top 10 2025 Atualizado",
    description: "Nova versão do OWASP Top 10 com foco em APIs e aplicações modernas",
    date: "2025-01-15",
    category: "OWASP",
    importance: "high",
  },
  {
    id: 2,
    title: "Novo Guia: Autenticação com Passkeys",
    description: "Como implementar autenticação sem senha usando WebAuthn",
    date: "2025-01-10",
    category: "Prática",
    importance: "medium",
  },
  {
    id: 3,
    title: "Alerta: Vulnerabilidade em Log4j",
    description: "Atualização crítica sobre CVE-2024-XXXX e recomendações",
    date: "2025-01-08",
    category: "Alerta",
    importance: "critical",
  },
  {
    id: 4,
    title: "Checklist de Code Review Atualizado",
    description: "Novos itens adicionados focando em segurança de containers",
    date: "2025-01-05",
    category: "Checklist",
    importance: "medium",
  },
];

const getImportanceBadge = (importance: string) => {
  switch (importance) {
    case "critical":
      return <Badge className="bg-destructive">Crítico</Badge>;
    case "high":
      return <Badge className="bg-warning">Alta</Badge>;
    case "medium":
      return <Badge variant="outline">Média</Badge>;
    default:
      return null;
  }
};

const RecentUpdates = () => {
  return (
    <section className="container py-16 md:py-24 bg-muted/30">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Atualizações Recentes</h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Fique por dentro das últimas adições, alertas de segurança e atualizações de conteúdo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {updates.map((update, index) => (
          <Card 
            key={update.id}
            className="card-hover animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {update.category}
                </Badge>
                {getImportanceBadge(update.importance)}
              </div>
              <CardTitle className="text-base leading-tight">
                {update.title}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-2">
                {update.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <time dateTime={update.date}>
                  {new Date(update.date).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link 
          to="/updates" 
          className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
          Ver todas as atualizações
          <TrendingUp className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default RecentUpdates;
