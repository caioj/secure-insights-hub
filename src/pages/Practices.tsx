import { useState } from "react";
import { Code, Smartphone, Cloud, Lock, Shield, Database, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Link } from "react-router-dom";

const practices = [
  {
    id: "input-validation",
    category: "Web",
    title: "Validação de Entrada Robusta",
    description: "Implementar validação completa de todas as entradas do usuário para prevenir injection attacks.",
    technologies: ["React", "Node.js", "TypeScript"],
    severity: "Critical",
    icon: Shield,
  },
  {
    id: "secure-auth",
    category: "Web",
    title: "Autenticação Segura",
    description: "Implementar autenticação forte com JWT, bcrypt para hashing de senhas e políticas de sessão seguras.",
    technologies: ["Node.js", "Express", "JWT"],
    severity: "Critical",
    icon: Lock,
  },
  {
    id: "sql-injection-prevention",
    category: "Web",
    title: "Prevenção de SQL Injection",
    description: "Usar prepared statements e ORMs seguros para todas as queries de banco de dados.",
    technologies: ["PostgreSQL", "Prisma", "TypeORM"],
    severity: "Critical",
    icon: Database,
  },
  {
    id: "mobile-storage",
    category: "Mobile",
    title: "Armazenamento Seguro em Mobile",
    description: "Usar Keychain (iOS) e Keystore (Android) para dados sensíveis. Nunca usar SharedPreferences/UserDefaults para segredos.",
    technologies: ["Swift", "Kotlin", "React Native"],
    severity: "High",
    icon: Smartphone,
  },
  {
    id: "api-security",
    category: "Web",
    title: "Segurança de APIs REST",
    description: "Implementar rate limiting, autenticação por token, CORS apropriado e validação de entrada em todos os endpoints.",
    technologies: ["Node.js", "Express", "Fastify"],
    severity: "High",
    icon: Cloud,
  },
  {
    id: "secure-coding",
    category: "General",
    title: "Princípios de Código Seguro",
    description: "Seguir OWASP Secure Coding Practices: least privilege, fail securely, defense in depth.",
    technologies: ["All"],
    severity: "High",
    icon: Code,
  },
];

const Practices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPractices = practices.filter((practice) => {
    const matchesSearch = practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         practice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || practice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <BreadcrumbNav items={[{ label: "Boas Práticas" }]} />
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary">
                <Code className="h-7 w-7 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Boas Práticas de Desenvolvimento Seguro
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Guias práticos e recomendações para implementar segurança em cada fase do desenvolvimento, 
                  com exemplos de código e checklist de verificação.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8">
          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar práticas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="Web">Web</TabsTrigger>
                <TabsTrigger value="Mobile">Mobile</TabsTrigger>
                <TabsTrigger value="General">Geral</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Practices Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <Card 
                  key={practice.id} 
                  className="card-hover group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
                        practice.severity === "Critical" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {practice.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{practice.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {practice.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {practice.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild variant="outline" className="w-full" size="sm">
                        <Link to={`/practices/${practice.id}`}>
                          Ver Guia Completo
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPractices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma prática encontrada com os filtros selecionados.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Practices;
