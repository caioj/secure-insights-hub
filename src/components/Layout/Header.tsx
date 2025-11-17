import { Search, Shield, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/SearchDialog";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">SecureDev</span>
            <span className="text-xs text-muted-foreground leading-none mt-0.5">Knowledge Base</span>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <SearchDialog />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link to="/owasp" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hidden lg:block">
            OWASP Top 10
          </Link>
          <Link to="/practices" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hidden lg:block">
            Boas Práticas
          </Link>
          <Link to="/checklists" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hidden lg:block">
            Checklists
          </Link>
          {user && (
            <Link to="/training" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hidden lg:block">
              Treinamento
            </Link>
          )}
          <Link to="/templates" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hidden xl:block">
            Templates
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size="sm" className="bg-secondary hover:bg-secondary-hover" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
