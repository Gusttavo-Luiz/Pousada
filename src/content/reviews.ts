/**
 * Reputação — dados fornecidos pela hospedagem a partir de uma plataforma de
 * avaliações. As notas mudam com o tempo: atualize `score`, `count`,
 * `categories` e `updatedAt` sempre que conferir a fonte.
 */
export const reviews = {
  score: 9.1,
  label: 'Fantástico',
  scale: 10,
  count: 71,
  /** Mês/ano em que os números foram conferidos na fonte. */
  updatedAt: 'outubro de 2026',
  source: {
    /** Nome da plataforma de origem, quando confirmado (ex.: 'Booking.com'). */
    platform: '',
    /** Link público para as avaliações na plataforma de origem. */
    url: '',
  },
  categories: [
    { label: 'Funcionários', score: 9.8 },
    { label: 'Limpeza', score: 9.6 },
    { label: 'Conforto', score: 9.4 },
    { label: 'Localização', score: 9.3 },
    { label: 'Comodidades', score: 9.2 },
    { label: 'Custo-benefício', score: 9.0 },
    { label: 'Wi-Fi gratuito', score: 10.0 },
  ],
  /**
   * Trechos de avaliações reais. Preencha `author` somente com autorização.
   */
  testimonials: [
    {
      quote:
        'Localização excelente e segurança… Anfitriã Fabiana foi muito educada e atenciosa… Quarto em excelentes condições, muito limpo e organizado.',
      author: '',
    },
    {
      quote:
        'Estive na pousada no fim de semana do Dia dos Namorados. Tudo maravilhoso! Um atendimento único, limpeza impecável e um café da manhã delicioso.',
      author: '',
    },
    {
      quote: 'A acomodação estava impecável, muito limpa, confortável e exatamente como descrita no anúncio.',
      author: '',
    },
    {
      quote: 'Ótimas acomodações. Quarto amplo e limpeza impecável. Café da manhã farto e muito gostoso.',
      author: '',
    },
  ] as { quote: string; author: string }[],
};

export const formatScore = (n: number) => n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
