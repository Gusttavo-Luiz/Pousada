import type { PhotoRef } from './photos';

/**
 * Acomodações. Somente `status: 'confirmado'` aparece no site de produção;
 * as demais aparecem apenas na demonstração/desenvolvimento, com o selo
 * "Categoria a confirmar".
 *
 * Não preencha camas, capacidade, metragem ou preço sem confirmação.
 */
export interface Room {
  id: string;
  name: string;
  status: 'confirmado' | 'a-confirmar';
  description: string;
  /** Ex.: '1 cama de casal'. `null` = consultar a equipe. */
  beds: string | null;
  /** Ex.: 'Até 2 hóspedes'. `null` = consultar a equipe. */
  capacity: string | null;
  /** Comodidades verificadas desta categoria. */
  amenities: string[];
  /** A primeira foto é a capa; com 2+ fotos o card ganha uma galeria. */
  photos: PhotoRef[];
}

/** Comodidades confirmadas para toda a hospedagem (valem para qualquer suíte). */
export const roomBaseAmenities = ['Banheiro privativo', 'Wi-Fi gratuito'];

export const rooms: Room[] = [
  {
    id: 'suite-1-quarto',
    name: 'Suíte de 1 Quarto',
    status: 'a-confirmar',
    description: 'Suíte com quarto independente, pensada para quem busca privacidade e descanso.',
    beds: null,
    capacity: null,
    amenities: [...roomBaseAmenities],
    photos: [{ file: 'suite-1-quarto-01.jpg', alt: 'Suíte de 1 Quarto', label: 'Suíte de 1 Quarto', scene: 'bed' }],
  },
  {
    id: 'suite-superior',
    name: 'Suíte Superior',
    status: 'a-confirmar',
    description: 'Categoria superior para uma estadia confortável e tranquila em Lavras Novas.',
    beds: null,
    capacity: null,
    amenities: [...roomBaseAmenities],
    photos: [{ file: 'suite-superior-01.jpg', alt: 'Suíte Superior', label: 'Suíte Superior', scene: 'bed' }],
  },
  {
    id: 'suite-deluxe-hidromassagem',
    name: 'Suíte Deluxe com Banheira de Hidromassagem',
    status: 'a-confirmar',
    description: 'Suíte com banheira de hidromassagem, ideal para momentos especiais a dois.',
    beds: null,
    capacity: null,
    amenities: ['Banheira de hidromassagem', ...roomBaseAmenities],
    photos: [
      { file: 'suite-deluxe-01.jpg', alt: 'Suíte Deluxe com Banheira de Hidromassagem', label: 'Suíte Deluxe', scene: 'bath' },
    ],
  },
  {
    id: 'estudio-standard',
    name: 'Estúdio Standard',
    status: 'a-confirmar',
    description: 'Estúdio em ambiente integrado, prático e aconchegante.',
    beds: null,
    capacity: null,
    amenities: [...roomBaseAmenities],
    photos: [{ file: 'estudio-standard-01.jpg', alt: 'Estúdio Standard', label: 'Estúdio Standard', scene: 'armchair' }],
  },
];
