import { useState } from "react";
import { Code2, Copy, Check, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { toast } from "sonner";

interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  code: string;
  tags: string[];
}

const snippets: Snippet[] = [
  {
    id: "input-validation-zod",
    title: "Validação de Input com Zod",
    description: "Schema de validação completo para formulários com mensagens personalizadas",
    language: "TypeScript",
    category: "Validation",
    code: `import { z } from 'zod';

const userSchema = z.object({
  email: z.string()
    .email({ message: "Email inválido" })
    .max(255),
  password: z.string()
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
    .regex(/[A-Z]/, { message: "Senha deve conter letra maiúscula" })
    .regex(/[0-9]/, { message: "Senha deve conter número" }),
  name: z.string()
    .trim()
    .min(2)
    .max(100),
});

type UserInput = z.infer<typeof userSchema>;`,
    tags: ["validation", "zod", "typescript"],
  },
  {
    id: "jwt-auth-node",
    title: "Autenticação JWT Segura",
    description: "Implementação de JWT com refresh tokens e blacklist",
    language: "Node.js",
    category: "Authentication",
    code: `import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
  
  const refreshToken = jwt.sign(
    { userId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  
  return { accessToken, refreshToken };
};`,
    tags: ["jwt", "authentication", "bcrypt"],
  },
  {
    id: "sql-prepared-statement",
    title: "Prepared Statements - PostgreSQL",
    description: "Queries seguras usando prepared statements para prevenir SQL Injection",
    language: "TypeScript",
    category: "Database",
    code: `import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ SEGURO - Usa prepared statement
export const getUser = async (email: string) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

// ❌ INSEGURO - Concatenação direta (NÃO USAR)
// const query = \`SELECT * FROM users WHERE email = '\${email}'\`;`,
    tags: ["sql", "postgresql", "injection-prevention"],
  },
  {
    id: "react-xss-prevention",
    title: "Prevenção de XSS em React",
    description: "Sanitização de HTML e uso seguro de conteúdo dinâmico",
    language: "React",
    category: "Frontend",
    code: `import DOMPurify from 'dompurify';

// ✅ SEGURO - Sanitiza HTML antes de renderizar
export const SafeHTML = ({ html }: { html: string }) => {
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href'],
  });
  
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

// ✅ SEGURO - React escapa automaticamente
export const SafeText = ({ text }: { text: string }) => {
  return <p>{text}</p>; // React escapa automaticamente
};`,
    tags: ["xss", "react", "sanitization"],
  },
  {
    id: "cors-config",
    title: "Configuração CORS Segura",
    description: "Setup de CORS com whitelist de origens permitidas",
    language: "Node.js",
    category: "API",
    code: `import cors from 'cors';

const allowedOrigins = [
  'https://yourdomain.com',
  'https://app.yourdomain.com',
];

export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Uso: app.use(cors(corsOptions));`,
    tags: ["cors", "api", "express"],
  },
  {
    id: "rate-limiting",
    title: "Rate Limiting com Express",
    description: "Implementação de rate limiting para proteger APIs",
    language: "Node.js",
    category: "API",
    code: `import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 requests por IP
  message: 'Muitas requisições, tente novamente mais tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 tentativas de login
  skipSuccessfulRequests: true,
});

// Uso:
// app.use('/api/', apiLimiter);
// app.use('/auth/login', authLimiter);`,
    tags: ["rate-limiting", "ddos", "api"],
  },
];

const Templates = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast.success("Código copiado!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error("Erro ao copiar código");
    }
  };

  const languages = ["all", ...Array.from(new Set(snippets.map(s => s.language)))];
  
  const filteredSnippets = selectedLanguage === "all" 
    ? snippets 
    : snippets.filter(s => s.language === selectedLanguage);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <BreadcrumbNav items={[{ label: "Templates & Snippets" }]} />
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-info">
                <Code2 className="h-7 w-7 text-info-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Templates & Snippets de Código
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Código pronto para uso com implementações seguras e validadas. 
                  Copie e adapte para seu projeto.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-8">
          <div className="mb-6">
            <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtrar por linguagem:</span>
              </div>
              <TabsList>
                {languages.map(lang => (
                  <TabsTrigger key={lang} value={lang} className="capitalize">
                    {lang === "all" ? "Todas" : lang}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredSnippets.map((snippet, index) => (
              <Card 
                key={snippet.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <CardTitle className="text-lg">{snippet.title}</CardTitle>
                        <Badge variant="secondary">{snippet.language}</Badge>
                      </div>
                      <CardDescription>{snippet.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-2">
                    {snippet.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-80">
                      <code>{snippet.code}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(snippet.code, snippet.id)}
                    >
                      {copiedId === snippet.id ? (
                        <>
                          <Check className="h-3 w-3 mr-1" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;
