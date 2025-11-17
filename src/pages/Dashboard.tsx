import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, FileText, TrendingUp, Settings } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>("user");
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalUsers: 0,
    publishedArticles: 0,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadUserRole();
      loadStats();
    }
  }, [user]);

  const loadUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setUserRole(data.role);
      }
    } catch (error: any) {
      console.error("Error loading user role:", error);
    }
  };

  const loadStats = async () => {
    try {
      const [articlesResult, usersResult, publishedResult] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("articles").select("id", { count: "exact", head: true }).eq("published", true),
      ]);

      setStats({
        totalArticles: articlesResult.count || 0,
        totalUsers: usersResult.count || 0,
        publishedArticles: publishedResult.count || 0,
      });
    } catch (error: any) {
      console.error("Error loading stats:", error);
      toast.error("Erro ao carregar estatísticas");
    }
  };

  const isAdmin = userRole === "admin";
  const isEditor = userRole === "editor" || isAdmin;

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta! Gerencie conteúdo e visualize métricas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Artigos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
              <p className="text-xs text-muted-foreground">
                {stats.publishedArticles} publicados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registrados na plataforma</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seu Papel</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{userRole}</div>
              <p className="text-xs text-muted-foreground">
                {isAdmin ? "Acesso total" : isEditor ? "Pode editar" : "Apenas leitura"}
              </p>
            </CardContent>
          </Card>
        </div>

        {isEditor && (
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Gerencie o conteúdo da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="w-full" onClick={() => toast.info("Funcionalidade em desenvolvimento")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Criar Artigo
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast.info("Funcionalidade em desenvolvimento")}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Ver Métricas
                </Button>
              </div>
              {isAdmin && (
                <Button variant="outline" className="w-full" onClick={() => toast.info("Funcionalidade em desenvolvimento")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Gerenciar Usuários
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
