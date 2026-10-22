import type { IconName } from '../components/icons';

/**
 * Pontos de interesse próximos. Distâncias aproximadas, em linha reta ou
 * conforme a fonte — não são garantia de percurso a pé ou de carro.
 */
export const nearby: { icon: IconName; name: string; distance: string; kind: string }[] = [
  { icon: 'utensils', name: 'Restaurante Bem-te-vi', distance: '350 m', kind: 'Restaurante' },
  { icon: 'utensils', name: 'Restaurante Recanto do Gabiru', distance: '550 m', kind: 'Restaurante' },
  { icon: 'utensils', name: 'Restaurante Dus Prazeres', distance: '600 m', kind: 'Restaurante' },
  { icon: 'waterfall', name: 'Cachoeira Três Pingos', distance: '3 km', kind: 'Natureza' },
  { icon: 'mountain', name: 'Parque Estadual do Itacolomi', distance: '13 km', kind: 'Natureza' },
];

/**
 * Atrações complementares de Ouro Preto. Inclua apenas com distâncias
 * verificadas; a lista vazia não é exibida.
 */
export const ouroPreto: { name: string; distance: string }[] = [];
