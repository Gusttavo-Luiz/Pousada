import { addressLines, site } from '../config/site';

/**
 * Perguntas frequentes. Responda apenas com informações confirmadas; quando
 * faltar um dado, oriente o visitante a consultar a equipe.
 * As respostas também geram os dados estruturados FAQPage.
 */
const contactChannels = [
  site.contact.whatsapp && `WhatsApp ${site.contact.phoneDisplay || `+${site.contact.whatsapp}`}`,
  !site.contact.whatsapp && site.contact.phoneDisplay && `telefone ${site.contact.phoneDisplay}`,
  site.contact.email && `e-mail ${site.contact.email}`,
].filter(Boolean);

const contactAnswer = contactChannels.length
  ? `Fale com a equipe pelos canais oficiais: ${contactChannels.join(' ou ')}. Você também pode usar o formulário "Consultar disponibilidade".`
  : 'Use o formulário "Consultar disponibilidade" nesta página. Os canais oficiais de atendimento serão divulgados aqui assim que confirmados.';

export const faq: { question: string; answer: string }[] = [
  {
    question: 'Onde fica o Luar de Minas Suítes?',
    answer: `Em ${addressLines[0]}, ${addressLines[1]}. Há restaurantes a partir de cerca de 350 m e a Cachoeira Três Pingos fica a aproximadamente 3 km.`,
  },
  {
    question: 'O café da manhã está incluído?',
    answer:
      'A hospedagem oferece café da manhã. A inclusão na diária pode variar conforme a tarifa e o período — confirme com a equipe ao consultar a disponibilidade.',
  },
  {
    question: 'A hospedagem oferece Wi-Fi gratuito?',
    answer: 'Sim. O Wi-Fi é gratuito em toda a propriedade.',
  },
  {
    question: 'Os quartos possuem banheiro privativo?',
    answer: 'Sim, as acomodações contam com banheiro privativo.',
  },
  {
    question: 'A hospedagem aceita animais de estimação?',
    answer:
      'Sim, mediante solicitação prévia, e pode haver cobrança adicional. Consulte as condições com a equipe antes de reservar.',
  },
  {
    question: 'Existe estacionamento?',
    answer:
      'De acordo com as informações disponíveis, a hospedagem não oferece estacionamento. Caso isso mude, a informação será atualizada aqui — em caso de dúvida, consulte a equipe.',
  },
  {
    question: 'Quais são os horários de check-in e check-out?',
    answer:
      'O check-in e o check-out são privativos. Os horários ainda não foram publicados — consulte a equipe ao planejar sua estadia.',
  },
  {
    question: 'Como consultar os preços e a disponibilidade?',
    answer:
      'Informe as datas e o número de hóspedes no formulário "Consultar disponibilidade". Preços e disponibilidade são informados pela equipe, de acordo com as datas escolhidas.',
  },
  {
    question: 'Existem suítes com varanda?',
    answer: 'Consulte a equipe para saber quais acomodações estão disponíveis para as suas datas e os detalhes de cada uma.',
  },
  {
    question: 'Como entrar em contato com a hospedagem?',
    answer: contactAnswer,
  },
];
