import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace("/public-api", "");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // GET /articles - List all published articles
    if (path === "/articles" && req.method === "GET") {
      const { data, error } = await supabaseClient
        .from("articles")
        .select("id, title, slug, excerpt, category, tags, severity, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify({ articles: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /articles/:slug - Get article by slug
    if (path.startsWith("/articles/") && req.method === "GET") {
      const slug = path.replace("/articles/", "");
      const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ article: data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET /checklists - Get checklists by category
    if (path === "/checklists" && req.method === "GET") {
      const category = url.searchParams.get("category") || "general";
      
      const checklists = {
        owasp: [
          { id: "owasp-1", title: "Injection Prevention", items: 5 },
          { id: "owasp-2", title: "Authentication Security", items: 8 },
        ],
        mobile: [
          { id: "mobile-1", title: "Mobile App Security", items: 12 },
        ],
        web: [
          { id: "web-1", title: "Web Application Security", items: 10 },
        ]
      };

      return new Response(
        JSON.stringify({ checklists: checklists[category as keyof typeof checklists] || [] }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Endpoint not found" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in public-api:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
