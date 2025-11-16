import { UserX, Mail, Phone, MessageSquare, Shield, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";

const attackVectors = [
  {
    id: "phishing",
    icon: Mail,
    title: "Phishing",
    description: "Emails fraudulentos que se passam por entidades legítimas",
    indicators: [
      "Remetente suspeito ou desconhecido",
      "Erros de ortografia e gramática",
      "Senso de urgência artificial",
      "Links suspeitos ou encurtados",
      "Pedidos de credenciais ou informações sensíveis",
    ],
    prevention: [
      "Verificar sempre o remetente completo",
      "Não clicar em links suspeitos",
      "Validar URLs antes de inserir credenciais",
      "Usar autenticação de dois fatores",
      "Reportar emails suspeitos ao time de segurança",
    ],
  },
  {
    id: "vishing",
    icon: Phone,
    title: "Vishing (Voice Phishing)",
    description: "Golpes por telefone se passando por autoridades ou empresas",
    indicators: [
      "Chamadas não solicitadas pedindo informações",
      "Pressão para tomar decisões rápidas",
      "Pedidos de transferências bancárias urgentes",
      "Ameaças ou intimidação",
    ],
    prevention: [
      "Nunca fornecer informações sensíveis por telefone",
      "Desligar e retornar usando número oficial",
      "Validar identidade do interlocutor",
      "Questionar pedidos urgentes",
    ],
  },
  {
    id: "smishing",
    icon: MessageSquare,
    title: "Smishing (SMS Phishing)",
    description: "Mensagens SMS fraudulentas com links maliciosos",
    indicators: [
      "SMS de números desconhecidos",
      "Links encurtados suspeitos",
      "Prêmios ou ofertas irreais",
      "Alertas falsos de segurança",
    ],
    prevention: [
      "Não clicar em links de SMS não solicitados",
      "Verificar comunicações através de canais oficiais",
      "Deletar mensagens suspeitas",
      "Reportar números suspeitos",
    ],
  },
  {
    id: "pretexting",
    icon: UserX,
    title: "Pretexting",
    description: "Criação de cenários falsos para obter informações",
    indicators: [
      "Histórias elaboradas e convincentes",
      "Fingimento de autoridade ou identidade",
      "Pedidos de validação de informações",
    ],
    prevention: [
      "Validar identidade através de canais oficiais",
      "Seguir protocolos de verificação",
      "Não compartilhar informações sem validação",
      "Treinar equipe sobre táticas comuns",
    ],
  },
];

const responsePlaybook = [
  {
    step: 1,
    title: "Identificação",
    actions: [
      "Reconhecer sinais de tentativa de engenharia social",
      "Não entrar em pânico ou agir por impulso",
      "Documentar detalhes da interação",
    ],
  },
  {
    step: 2,
    title: "Contenção",
    actions: [
      "Interromper a comunicação imediatamente",
      "Não fornecer informações adicionais",
      "Isolar sistemas ou contas comprometidas",
    ],
  },
  {
    step: 3,
    title: "Reporte",
    actions: [
      "Reportar ao time de segurança imediatamente",
      "Fornecer todos os detalhes coletados",
      "Seguir protocolo de resposta a incidentes",
    ],
  },
  {
    step: 4,
    title: "Remediação",
    actions: [
      "Alterar credenciais comprometidas",
      "Verificar acessos e transações recentes",
      "Aplicar controles de segurança adicionais",
    ],
  },
];

const SocialEngineering = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <BreadcrumbNav items={[{ label: "Engenharia Social" }]} />
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-destructive">
                <Shield className="h-7 w-7 text-destructive-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Engenharia Social
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Guias completos sobre técnicas de manipulação psicológica, vetores de ataque 
                  e estratégias de prevenção e resposta.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8">
          <Alert className="mb-8 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção: O Fator Humano é o Elo Mais Fraco</AlertTitle>
            <AlertDescription>
              70% dos ataques cibernéticos bem-sucedidos começam com engenharia social. 
              Treinar sua equipe é tão importante quanto implementar controles técnicos.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="vectors" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-auto">
              <TabsTrigger value="vectors">Vetores de Ataque</TabsTrigger>
              <TabsTrigger value="response">Playbook de Resposta</TabsTrigger>
            </TabsList>

            <TabsContent value="vectors" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {attackVectors.map((vector, index) => {
                  const Icon = vector.icon;
                  return (
                    <Card 
                      key={vector.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                            <Icon className="h-6 w-6 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl">{vector.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {vector.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            Indicadores de Ataque
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {vector.indicators.map((indicator, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-destructive mt-1">•</span>
                                <span>{indicator}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-success" />
                            Como Prevenir
                          </h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {vector.prevention.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-success mt-1">✓</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="response" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Playbook de Resposta a Incidentes</CardTitle>
                  <CardDescription>
                    Passos a seguir quando você suspeitar ou confirmar uma tentativa de engenharia social
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {responsePlaybook.map((phase, index) => (
                      <div 
                        key={phase.step}
                        className="flex gap-4 animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                          {phase.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{phase.title}</h3>
                          <ul className="space-y-2">
                            {phase.actions.map((action, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-primary mt-1">→</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertTitle>Lembre-se</AlertTitle>
                <AlertDescription>
                  O melhor remédio é a prevenção. Treinamentos regulares, simulações de phishing 
                  e uma cultura de segurança forte são suas melhores defesas contra engenharia social.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SocialEngineering;
