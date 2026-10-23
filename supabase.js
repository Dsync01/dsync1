// ===== CONFIGURAÇÃO DO SUPABASE =====
// A chave "anon" pode ficar pública, MAS só é segura com RLS ativado nas tabelas.
const SUPABASE_URL = 'https://fudexadsgcmexawokykx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZGV4YWRzZ2NtZXhhd29reWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3Njg1NjQsImV4cCI6MjEwODM0NDU2NH0.UokFgP1zqf1EBTZoQM_Ae2YuyIRVlF8uYuZ0BV4dg8A';
// Cria o cliente NA HORA (síncrono). Este arquivo precisa vir DEPOIS do <script> do supabase-js.
// Antes, o cliente só era criado no evento "load", depois do DOMContentLoaded do script.js,
// e por isso window.supabase.auth não existia quando o app tentava restaurar a sessão.
(function () {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('❌ Biblioteca supabase-js não carregou (ou supabase.js foi executado duas vezes).');
    return;
  }
  window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      lock: async (name, acquireTimeout, fn) => await fn()
    }
  });
  console.log('✅ Supabase inicializado com sucesso!');
})();

// Usuário logado (usado pelo script.js)
let usuarioSupabase = null;