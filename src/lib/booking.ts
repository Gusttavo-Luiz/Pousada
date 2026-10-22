/**
 * Regras do formulário "Consultar disponibilidade" — sem dependência do DOM,
 * usadas no navegador e nos testes.
 */
export interface BookingRequest {
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  rooms: number;
  interest?: string;
}

export interface BookingLimits {
  maxAdults: number;
  maxChildren: number;
  maxRooms: number;
}

export type BookingErrors = Partial<Record<'checkin' | 'checkout' | 'adults' | 'children' | 'rooms', string>>;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Data local (não UTC) no formato AAAA-MM-DD. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return toISODate(new Date(y, m - 1, d + days));
}

export function nightsBetween(checkin: string, checkout: string): number {
  const [a, b] = [checkin, checkout].map((iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  });
  return Math.round((b - a) / 86_400_000);
}

function isValidISODate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

export function validateBooking(req: BookingRequest, limits: BookingLimits, today: string): BookingErrors {
  const errors: BookingErrors = {};

  if (!req.checkin) errors.checkin = 'Informe a data de check-in.';
  else if (!isValidISODate(req.checkin)) errors.checkin = 'Data de check-in inválida.';
  else if (req.checkin < today) errors.checkin = 'O check-in não pode ser uma data passada.';

  if (!req.checkout) errors.checkout = 'Informe a data de check-out.';
  else if (!isValidISODate(req.checkout)) errors.checkout = 'Data de check-out inválida.';
  else if (!errors.checkin && req.checkout <= req.checkin)
    errors.checkout = 'O check-out deve ser depois do check-in.';

  if (!Number.isInteger(req.adults) || req.adults < 1) errors.adults = 'Informe pelo menos 1 adulto.';
  else if (req.adults > limits.maxAdults)
    errors.adults = `Para mais de ${limits.maxAdults} adultos, fale diretamente com a equipe.`;

  if (!Number.isInteger(req.children) || req.children < 0) errors.children = 'Número de crianças inválido.';
  else if (req.children > limits.maxChildren)
    errors.children = `Para mais de ${limits.maxChildren} crianças, fale diretamente com a equipe.`;

  if (!Number.isInteger(req.rooms) || req.rooms < 1) errors.rooms = 'Informe pelo menos 1 quarto.';
  else if (req.rooms > limits.maxRooms)
    errors.rooms = `Para mais de ${limits.maxRooms} quartos, fale diretamente com a equipe.`;
  else if (!errors.adults && req.rooms > req.adults)
    errors.rooms = 'Cada quarto precisa de pelo menos 1 adulto.';

  return errors;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function bookingSummary(req: BookingRequest): string[] {
  const nights = nightsBetween(req.checkin, req.checkout);
  return [
    `Check-in: ${formatDateBR(req.checkin)}`,
    `Check-out: ${formatDateBR(req.checkout)} (${plural(nights, 'noite', 'noites')})`,
    `Adultos: ${req.adults}`,
    `Crianças: ${req.children}`,
    `Quartos: ${req.rooms}`,
    ...(req.interest ? [`Acomodação de interesse: ${req.interest}`] : []),
  ];
}

export function bookingMessage(req: BookingRequest, propertyName: string): string {
  return [`Olá! Gostaria de consultar a disponibilidade no ${propertyName}.`, '', ...bookingSummary(req)].join('\n');
}

/** Preenche os marcadores da URL do motor de reservas oficial. */
export function bookingEngineUrl(template: string, req: BookingRequest): string {
  const values: Record<string, string> = {
    checkin: req.checkin,
    checkout: req.checkout,
    adults: String(req.adults),
    children: String(req.children),
    rooms: String(req.rooms),
  };
  return template.replace(/\{(checkin|checkout|adults|children|rooms)\}/g, (_, key: string) =>
    encodeURIComponent(values[key]),
  );
}
