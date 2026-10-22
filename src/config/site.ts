/**
 * Dados editáveis da hospedagem — fonte única para todo o site.
 *
 * Regra de ouro: só preencha um campo com informação CONFIRMADA pela
 * hospedagem. Campos vazios (`''` ou `null`) fazem o site ocultar o recurso
 * correspondente ou orientar o visitante a consultar a equipe.
 */
export const site = {
  name: 'Luar de Minas Suítes',
  shortName: 'Luar de Minas',
  tagline: 'Luar de Minas Suítes — sua experiência em Lavras Novas, Minas Gerais.',

  /**
   * Domínio oficial (ex.: 'https://www.seudominio.com.br'). Enquanto vazio, o
   * site não gera URLs canônicas absolutas. Não invente um domínio.
   */
  url: '',

  address: {
    street: 'Rua do Campo, 280',
    district: 'Lavras Novas',
    state: 'MG',
    postalCode: '35450-000',
    country: 'BR',
    countryName: 'Brasil',
  },

  /** Canais oficiais de atendimento. Deixe vazio até a confirmação. */
  contact: {
    /** WhatsApp oficial — somente dígitos com DDI e DDD (ex.: '5531999999999'). */
    whatsapp: '',
    /** Telefone para exibição (ex.: '(31) 99999-9999'). */
    phoneDisplay: '',
    email: '',
  },

  /**
   * Motor de reservas oficial, se existir. Marcadores aceitos:
   * {checkin} {checkout} (AAAA-MM-DD), {adults} {children} {rooms}.
   */
  bookingEngineUrl: '',

  social: {
    instagram: '',
    facebook: '',
  },

  /** Informações legais exibidas no rodapé quando preenchidas. */
  legal: {
    companyName: '',
    cnpj: '',
    cadastur: '',
  },

  /** Limites do formulário de consulta (apenas interface, não regra da casa). */
  bookingLimits: {
    maxAdults: 10,
    maxChildren: 10,
    maxRooms: 5,
  },
};

const query = encodeURIComponent(
  `${site.address.street}, ${site.address.district}, ${site.address.state}, ${site.address.postalCode}, ${site.address.countryName}`,
);

export const mapLinks = {
  /** Abre a localização no Google Maps. */
  view: `https://www.google.com/maps/search/?api=1&query=${query}`,
  /** Rota até a hospedagem no Google Maps. */
  directions: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
  /** Mapa incorporado (carregado somente quando o visitante solicita). */
  embed: `https://www.google.com/maps?q=${query}&output=embed&hl=pt-BR`,
};

export const addressLines = [
  `${site.address.street} — ${site.address.district}, ${site.address.state}`,
  `CEP ${site.address.postalCode} — ${site.address.countryName}`,
];

export const whatsappLink = (message?: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`
    : '';
