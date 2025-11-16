import { useState, useEffect } from "react";
import { Search, FileText, CheckSquare, Code2, Shield } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: string;
  title: string;
  type: string;
  url: string;
  icon: any;
}

const searchData: SearchResult[] = [
  { id: "owasp", title: "OWASP Top 10", type: "Categoria", url: "/owasp", icon: Shield },
  { id: "practices", title: "Boas Práticas", type: "Categoria", url: "/practices", icon: FileText },
  { id: "checklists", title: "Checklists", type: "Categoria", url: "/checklists", icon: CheckSquare },
  { id: "templates", title: "Templates & Snippets", type: "Categoria", url: "/templates", icon: Code2 },
  { id: "social-eng", title: "Engenharia Social", type: "Categoria", url: "/social-engineering", icon: Shield },
  
  // OWASP items
  { id: "a01", title: "Broken Access Control", type: "OWASP", url: "/owasp", icon: Shield },
  { id: "a02", title: "Cryptographic Failures", type: "OWASP", url: "/owasp", icon: Shield },
  { id: "a03", title: "Injection", type: "OWASP", url: "/owasp", icon: Shield },
  
  // Practices
  { id: "input-val", title: "Validação de Entrada", type: "Prática", url: "/practices", icon: FileText },
  { id: "auth", title: "Autenticação Segura", type: "Prática", url: "/practices", icon: FileText },
  
  // Social Engineering
  { id: "phishing", title: "Phishing", type: "Ataque", url: "/social-engineering", icon: Shield },
  { id: "vishing", title: "Vishing", type: "Ataque", url: "/social-engineering", icon: Shield },
];

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (url: string) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full max-w-md"
      >
        <div className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground hover:bg-muted/80 transition-colors">
          <Search className="h-4 w-4" />
          <span>Buscar...</span>
          <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Buscar vulnerabilidades, práticas, checklists..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          
          <CommandGroup heading="Categorias">
            {searchData
              .filter(item => item.type === "Categoria")
              .map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.url)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                );
              })}
          </CommandGroup>

          <CommandGroup heading="OWASP Top 10">
            {searchData
              .filter(item => item.type === "OWASP")
              .map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.url)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                );
              })}
          </CommandGroup>

          <CommandGroup heading="Práticas e Ataques">
            {searchData
              .filter(item => item.type === "Prática" || item.type === "Ataque")
              .map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.url)}
                    className="cursor-pointer"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{item.type}</span>
                  </CommandItem>
                );
              })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
