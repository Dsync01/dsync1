// ===== CONFIGURAÇÃO DO SUPABASE =====
// A chave "anon" pode ficar pública, MAS só é segura com RLS ativado nas tabelas.
const SUPABASE_URL = 'https://fudexadsgcmexawokykx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZGV4YWRzZ2NtZXhhd29reWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3Njg1NjQsImV4cCI6MjEwODM0NDU2NH0.UokFgP1zqf1EBTZoQM_Ae2YuyIRVlF8uYuZ0BV4dg8A';

// Aguarda a biblioteca carregar
function inicializarSupabase() {
  if (typeof window.supabase === 'undefined') {
    console.log('⏳ Aguardando Supabase carregar...');
    setTimeout(inicializarSupabase, 300);
    return;
  }
  
  // Cria o cliente usando as variáveis corretas
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      lock: async (name, acquireTimeout, fn) => await fn()
    }
  });

  // Deixa o cliente disponível globalmente
  window.supabase = supabaseClient;
  console.log('✅ Supabase inicializado com sucesso!');
}

// Inicia quando a página carregar
window.addEventListener('load', inicializarSupabase);

// Variável global para guardar o usuário logado
let usuarioSupabase = null;