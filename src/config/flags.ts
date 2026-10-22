/**
 * Exibe conteúdo ainda não confirmado (categorias de suíte "a confirmar",
 * nomes de arquivos de fotos pendentes). Ativo em `npm run dev` e na
 * demonstração; no build de produção, somente com PUBLIC_SHOW_PENDING=true.
 */
export const showPending = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_PENDING === 'true';

/**
 * Demonstração estática (GitHub Pages): o formulário apenas valida os dados e
 * avisa que nada foi enviado. A página não é indexada.
 */
export const demoMode = import.meta.env.PUBLIC_DEMO_MODE === 'true';
