import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-2">404</h1>
          <div className="h-1 w-24 bg-gradient-primary mx-auto mb-6" />
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Página Não Encontrada</h2>
        <p className="text-lg text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary-hover">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar ao Início
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/owasp">
              <Search className="mr-2 h-5 w-5" />
              Explorar Conteúdo
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Ou use a busca no topo da página para encontrar o que precisa
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
