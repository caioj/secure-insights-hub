import { Search, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar vulnerabilidades, práticas, checklists..."
              className="w-full pl-9 bg-muted/50"
            />
          </div>
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
          <Button variant="default" size="sm" className="bg-secondary hover:bg-secondary-hover">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
