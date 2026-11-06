// ===== CONFIGURAÇÃO DO SUPABASE =====

const SUPABASE_URL = 'https://ydwywfqtysdcybldzdqe.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkd3l3ZnF0eXNkY3libGR6ZHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MDYxNjQsImV4cCI6MjEwODI4MjE2NH0.j8wyP2K9GWRA8m56RQuA-d7Gu9_xqAH771JSyr9-akg';

let supabaseClient = null;
let usuarioSupabase = null;

if (
  window.supabase &&
  typeof window.supabase.createClient === 'function'
) {
  const supabaseBiblioteca = window.supabase;

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );
  window.supabase = supabaseClient;

  console.log('Supabase inicializado com sucesso.');
} else {
  console.error(
    'Biblioteca do Supabase não carregada. Verifique o index.html.'
  );
}
