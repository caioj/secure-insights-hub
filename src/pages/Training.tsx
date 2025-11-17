import { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Target, Trophy, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Training = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedSimulation, setSelectedSimulation] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const simulations = [
    {
      id: "phishing-1",
      title: "Detecção de Phishing",
      description: "Aprenda a identificar emails de phishing comuns",
      difficulty: "beginner",
      duration: "15 min",
      points: 100,
      attackType: "Phishing",
    },
    {
      id: "social-eng-1",
      title: "Engenharia Social - Pretexting",
      description: "Simule cenários de pretexting e aprenda a se defender",
      difficulty: "intermediate",
      duration: "25 min",
      points: 200,
      attackType: "Social Engineering",
    },
    {
      id: "vishing-1",
      title: "Vishing Attack Simulation",
      description: "Identifique tentativas de vishing por telefone",
      difficulty: "advanced",
      duration: "30 min",
      points: 300,
      attackType: "Vishing",
    },
  ];

  const difficultyColors = {
    beginner: "bg-green-500/10 text-green-500 border-green-500/20",
    intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    advanced: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Shield className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <BreadcrumbNav
          items={[
            { label: "Início", href: "/" },
            { label: "Treinamento", href: "/training" },
          ]}
        />

        <div className="mt-8 mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Shield className="w-4 h-4" />
            <span className="font-semibold">Plataforma de Treinamento</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Simulações de Segurança</h1>
          <p className="text-lg text-muted-foreground">
            Pratique identificação de ameaças em ambientes seguros e ganhe experiência valiosa
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {simulations.map((sim) => (
            <Card key={sim.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge className={difficultyColors[sim.difficulty as keyof typeof difficultyColors]}>
                    {sim.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Trophy className="w-4 h-4" />
                    <span>{sim.points} pts</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{sim.title}</CardTitle>
                <CardDescription>{sim.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Tipo:</span>
                    </div>
                    <span className="font-medium">{sim.attackType}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Duração:</span>
                    </div>
                    <span className="font-medium">{sim.duration}</span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedSimulation(sim.id)}
                  >
                    Iniciar Simulação
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
            <CardDescription>Acompanhe suas conquistas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Simulações Completas</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">0</div>
                <div className="text-sm text-muted-foreground">Pontos Totais</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <div className="text-3xl font-bold text-primary mb-1">0%</div>
                <div className="text-sm text-muted-foreground">Taxa de Sucesso</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Training;
