/**
 * Fotografias oficiais. Salve os arquivos em `src/assets/fotos/` com o nome
 * indicado — o build gera versões AVIF/WebP otimizadas. Enquanto um arquivo
 * não existir, o site mostra uma moldura elegante no lugar.
 *
 * Use SOMENTE fotos reais do Luar de Minas Suítes (ou de Lavras Novas, nas
 * paisagens). Nunca use imagens de outras hospedagens.
 */
export interface PhotoRef {
  file: string;
  alt: string;
  /** Legenda curta, exibida na galeria e no visualizador. */
  label: string;
}

export const featuredPhotos = {
  hero: { file: 'hero.jpg', alt: 'Suíte do Luar de Minas Suítes em Lavras Novas', label: 'Suíte' },
  about: { file: 'sobre-01.jpg', alt: 'Ambiente do Luar de Minas Suítes', label: 'A hospedagem' },
  aboutDetail: { file: 'sobre-02.jpg', alt: 'Detalhe da decoração do Luar de Minas Suítes', label: 'Detalhes' },
  finalCta: { file: 'chamada-final.jpg', alt: 'Paisagem das montanhas de Lavras Novas', label: 'Lavras Novas' },
} satisfies Record<string, PhotoRef>;

/** Ordem da galeria: a primeira foto ocupa o destaque do mosaico. */
export const galleryPhotos: PhotoRef[] = [
  { file: 'galeria-quarto-01.jpg', alt: 'Quarto com cama arrumada no Luar de Minas Suítes', label: 'Quartos e camas' },
  { file: 'galeria-banheiro-01.jpg', alt: 'Banheiro privativo de uma suíte', label: 'Banheiros' },
  { file: 'galeria-varanda-01.jpg', alt: 'Varanda ou terraço da hospedagem', label: 'Varandas e terraços' },
  { file: 'galeria-interior-01.jpg', alt: 'Ambiente interno da hospedagem', label: 'Ambientes internos' },
  { file: 'galeria-decoracao-01.jpg', alt: 'Detalhe da decoração', label: 'Detalhes da decoração' },
  { file: 'galeria-convivencia-01.jpg', alt: 'Área de convivência', label: 'Áreas de convivência' },
  { file: 'galeria-paisagem-01.jpg', alt: 'Paisagem natural de Lavras Novas', label: 'Paisagens de Lavras Novas' },
  { file: 'galeria-quarto-02.jpg', alt: 'Outro ângulo de uma suíte', label: 'Quartos e camas' },
];
