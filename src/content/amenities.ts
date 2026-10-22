import type { IconName } from '../components/icons';

/** Comodidades confirmadas. Não acrescente serviços sem confirmação. */
export const amenities: { icon: IconName; title: string; text: string }[] = [
  { icon: 'coffee', title: 'Café da manhã', text: 'Para começar o dia com calma e sabor mineiro.' },
  { icon: 'wifi', title: 'Wi-Fi gratuito', text: 'Conexão sem custo em toda a propriedade.' },
  { icon: 'bath', title: 'Banheiro privativo', text: 'Mais privacidade e conforto na sua suíte.' },
  { icon: 'leaf', title: 'Ambientes bem cuidados', text: 'Espaços confortáveis, limpos e acolhedores.' },
  { icon: 'key', title: 'Check-in e check-out privativos', text: 'Chegada e saída com mais discrição e praticidade.' },
  {
    icon: 'kitchen',
    title: 'Cozinha equipada',
    text: 'Com micro-ondas e frigobar, disponível em algumas unidades.',
  },
  {
    icon: 'paw',
    title: 'Pet friendly',
    text: 'Animais de estimação mediante solicitação, com possível cobrança adicional.',
  },
];

/** Destaques da seção de apresentação. */
export const highlights: { icon: IconName; title: string }[] = [
  { icon: 'sparkle', title: 'Conforto e limpeza' },
  { icon: 'heart', title: 'Hospitalidade atenciosa' },
  { icon: 'pin', title: 'Localização privilegiada' },
  { icon: 'wifi', title: 'Wi-Fi gratuito' },
];
