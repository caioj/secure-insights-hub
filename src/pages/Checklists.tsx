import { useState } from "react";
import { CheckSquare, Download, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  text: string;
  reference?: string;
}

interface Checklist {
  id: string;
  title: string;
  description: string;
  category: string;
  items: ChecklistItem[];
}

const checklists: Checklist[] = [
  {
    id: "web-security",
    title: "Web Application Security",
    description: "Checklist essencial para auditoria de segurança em aplicações web",
    category: "Web",
    items: [
      { id: "1", text: "Todas as entradas de usuário são validadas e sanitizadas", reference: "OWASP A03" },
      { id: "2", text: "Prepared statements são usados para queries SQL", reference: "OWASP A03" },
      { id: "3", text: "Autenticação implementa MFA quando possível", reference: "OWASP A07" },
      { id: "4", text: "Senhas são hasheadas com bcrypt/argon2", reference: "OWASP A02" },
      { id: "5", text: "HTTPS é obrigatório em produção", reference: "OWASP A02" },
      { id: "6", text: "Headers de segurança configurados (CSP, HSTS, X-Frame-Options)", reference: "OWASP A05" },
      { id: "7", text: "Rate limiting implementado em APIs críticas", reference: "OWASP A07" },
      { id: "8", text: "Logs de segurança são coletados e monitorados", reference: "OWASP A09" },
    ],
  },
  {
    id: "mobile-security",
    title: "Mobile App Security",
    description: "Verificações de segurança para aplicativos iOS e Android",
    category: "Mobile",
    items: [
      { id: "1", text: "Dados sensíveis armazenados em Keychain/Keystore", reference: "OWASP Mobile" },
      { id: "2", text: "Certificate pinning implementado para APIs críticas", reference: "OWASP Mobile" },
      { id: "3", text: "Ofuscação de código aplicada", reference: "OWASP Mobile" },
      { id: "4", text: "Detecção de jailbreak/root implementada", reference: "OWASP Mobile" },
      { id: "5", text: "Logs sensíveis removidos em builds de produção", reference: "OWASP Mobile" },
      { id: "6", text: "Permissões mínimas necessárias solicitadas", reference: "OWASP Mobile" },
    ],
  },
  {
    id: "code-review",
    title: "Security Code Review",
    description: "Checklist para revisão de código focada em segurança",
    category: "Development",
    items: [
      { id: "1", text: "Não há hardcoded secrets ou credenciais", reference: "OWASP A05" },
      { id: "2", text: "Dependências estão atualizadas sem CVEs conhecidas", reference: "OWASP A06" },
      { id: "3", text: "Tratamento adequado de erros sem vazar informações", reference: "OWASP A05" },
      { id: "4", text: "Autorização verificada em todos os endpoints", reference: "OWASP A01" },
      { id: "5", text: "Upload de arquivos tem validação de tipo e tamanho", reference: "OWASP A04" },
      { id: "6", text: "Tokens e sessões têm expiração apropriada", reference: "OWASP A07" },
    ],
  },
];

const Checklists = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, Set<string>>>({});

  const toggleItem = (checklistId: string, itemId: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev[checklistId] || []);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return { ...prev, [checklistId]: newSet };
    });
  };

  const getProgress = (checklistId: string, totalItems: number) => {
    const checked = checkedItems[checklistId]?.size || 0;
    return (checked / totalItems) * 100;
  };

  const exportChecklist = (checklist: Checklist) => {
    const checked = checkedItems[checklist.id] || new Set();
    const markdown = `# ${checklist.title}\n\n${checklist.description}\n\n## Items\n\n${
      checklist.items.map(item => 
        `- [${checked.has(item.id) ? 'x' : ' '}] ${item.text}${item.reference ? ` (${item.reference})` : ''}`
      ).join('\n')
    }`;
    
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${checklist.id}-checklist.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Checklist exportado com sucesso");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <BreadcrumbNav items={[{ label: "Checklists" }]} />
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-success">
                <CheckSquare className="h-7 w-7 text-success-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Checklists de Segurança
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Listas verificáveis para auditorias, code reviews e validação de processos de segurança. 
                  Marque os itens concluídos e exporte para acompanhamento.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {checklists.map((checklist, index) => {
              const progress = getProgress(checklist.id, checklist.items.length);
              const checked = checkedItems[checklist.id]?.size || 0;
              
              return (
                <Card 
                  key={checklist.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{checklist.title}</CardTitle>
                          <Badge variant="outline">{checklist.category}</Badge>
                        </div>
                        <CardDescription>{checklist.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => exportChecklist(checklist)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Progresso
                        </span>
                        <span className="font-medium">
                          {checked}/{checklist.items.length} concluídos
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      {checklist.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Checkbox
                            id={`${checklist.id}-${item.id}`}
                            checked={checkedItems[checklist.id]?.has(item.id) || false}
                            onCheckedChange={() => toggleItem(checklist.id, item.id)}
                            className="mt-0.5"
                          />
                          <label
                            htmlFor={`${checklist.id}-${item.id}`}
                            className="flex-1 text-sm cursor-pointer leading-relaxed"
                          >
                            {item.text}
                            {item.reference && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {item.reference}
                              </Badge>
                            )}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checklists;
