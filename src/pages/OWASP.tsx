import { Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const owaspTop10 = [
  {
    rank: "A01",
    title: "Broken Access Control",
    description: "Falhas que permitem usuários acessarem recursos e funcionalidades sem permissão adequada.",
    severity: "Critical",
    examples: ["Bypass de autorização", "IDOR", "Elevação de privilégios"],
  },
  {
    rank: "A02",
    title: "Cryptographic Failures",
    description: "Falhas relacionadas à criptografia que levam à exposição de dados sensíveis.",
    severity: "High",
    examples: ["Dados não criptografados", "Algoritmos fracos", "Gestão inadequada de chaves"],
  },
  {
    rank: "A03",
    title: "Injection",
    description: "Injeção de código malicioso através de entradas não validadas.",
    severity: "Critical",
    examples: ["SQL Injection", "NoSQL Injection", "Command Injection"],
  },
  {
    rank: "A04",
    title: "Insecure Design",
    description: "Falhas fundamentais no design e arquitetura da aplicação.",
    severity: "High",
    examples: ["Falta de threat modeling", "Design patterns inseguros", "Ausência de controles"],
  },
  {
    rank: "A05",
    title: "Security Misconfiguration",
    description: "Configurações inadequadas ou inseguras em qualquer nível da aplicação.",
    severity: "High",
    examples: ["Defaults não seguros", "Mensagens de erro verbose", "Features desnecessárias"],
  },
  {
    rank: "A06",
    title: "Vulnerable and Outdated Components",
    description: "Uso de bibliotecas e frameworks com vulnerabilidades conhecidas.",
    severity: "Medium",
    examples: ["Dependências desatualizadas", "Componentes sem patch", "Versões inseguras"],
  },
  {
    rank: "A07",
    title: "Identification and Authentication Failures",
    description: "Falhas que comprometem a identidade e autenticação de usuários.",
    severity: "High",
    examples: ["Credential stuffing", "Session hijacking", "Weak password policies"],
  },
  {
    rank: "A08",
    title: "Software and Data Integrity Failures",
    description: "Falhas relacionadas à integridade de código e dados.",
    severity: "High",
    examples: ["Insecure CI/CD", "Auto-update inseguro", "Deserialização não confiável"],
  },
  {
    rank: "A09",
    title: "Security Logging and Monitoring Failures",
    description: "Ausência ou inadequação de logs e monitoramento de segurança.",
    severity: "Medium",
    examples: ["Eventos não logados", "Logs inadequados", "Alertas ineficazes"],
  },
  {
    rank: "A10",
    title: "Server-Side Request Forgery (SSRF)",
    description: "Aplicação busca recursos remotos sem validar URL fornecida pelo usuário.",
    severity: "High",
    examples: ["SSRF para sistemas internos", "Cloud metadata exposure", "Port scanning"],
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "bg-destructive text-destructive-foreground";
    case "High":
      return "bg-warning text-warning-foreground";
    case "Medium":
      return "bg-info text-info-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const OWASP = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/30 py-12 md:py-16">
          <div className="container">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  OWASP Top 10 - 2025
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  As 10 vulnerabilidades de segurança web mais críticas, atualizadas e classificadas 
                  pela Open Web Application Security Project (OWASP). Este é o padrão de referência 
                  para segurança em aplicações web.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OWASP List */}
        <section className="container py-12">
          <div className="space-y-4">
            {owaspTop10.map((item, index) => (
              <Card 
                key={index} 
                className="card-hover group animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg shrink-0">
                        {item.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                          <Badge className={getSeverityColor(item.severity)}>
                            {item.severity}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <Link to={`/owasp/${item.rank.toLowerCase()}`}>
                        <span className="sr-only">Ver detalhes de {item.title}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Exemplos:</span>{" "}
                      {item.examples.join(", ")}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/30 py-12">
          <div className="container text-center">
            <h2 className="text-2xl font-bold mb-4">
              Precisa de Ajuda para Implementar Proteções?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Acesse nossos guias práticos, checklists e snippets de código para implementar 
              proteções contra cada uma dessas vulnerabilidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary-hover">
                <Link to="/practices">
                  Ver Boas Práticas
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/checklists">
                  Acessar Checklists
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OWASP;
