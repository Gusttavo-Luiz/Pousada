/**
 * Exibe conteúdo ainda não confirmado (as categorias de suíte "a confirmar").
 * Ativo em `npm run dev` e na demonstração; no build de produção, somente com
 * PUBLIC_SHOW_PENDING=true.
 */
export const showPending = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_PENDING === 'true';

/**
 * Marcações técnicas para quem edita o site (nomes dos arquivos de fotos,
 * selos "a confirmar"/"a configurar"). Só em `npm run dev` — nunca na
 * versão mostrada ao cliente.
 */
export const devHints = import.meta.env.DEV;

/**
 * Demonstração estática (GitHub Pages): o formulário apenas valida os dados e
 * avisa que nada foi enviado. A página não é indexada.
 */
export const demoMode = import.meta.env.PUBLIC_DEMO_MODE === 'true';
