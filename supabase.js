// ===== CONFIGURAÇÃO DO SUPABASE =====
// A chave "anon" pode ficar pública, MAS só é segura com RLS ativado nas tabelas.
const SUPABASE_URL = 'https://ydwywfqtysdcybldzdqe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlkd3l3ZnF0eXNkY3libGR6ZHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MDYxNjQsImV4cCI6MjEwODI4MjE2NH0.j8wyP2K9GWRA8m56RQuA-d7Gu9_xqAH771JSyr9-akg';

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