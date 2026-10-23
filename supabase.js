// ===== CONFIGURAÇÃO DO SUPABASE =====

const SUPABASE_URL = 'https://fudexadsgcmexawokykx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZGV4YWRzZ2NtZXhhd29reWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3Njg1NjQsImV4cCI6MjEwODM0NDU2NH0.UokFgP1zqf1EBTZoQM_Ae2YuyIRVlF8uYuZ0BV4dg8A';
// Inicializa imediatamente, antes de o script.js tentar recuperar a sessão.
if (
  window.supabase &&
  typeof window.supabase.createClient === 'function'
) {
  window.supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  console.log('✅ Supabase inicializado com sucesso!');
} else {
  console.error(
    '❌ Biblioteca do Supabase não carregou. Verifique o script CDN no index.html.'
  );
}

// Usuário autenticado
let usuarioSupabase = null;
