import { expect, test } from '@playwright/test';
import { addDays, bookingEngineUrl, bookingMessage, nightsBetween, validateBooking } from '../src/lib/booking';

const limits = { maxAdults: 10, maxChildren: 10, maxRooms: 5 };
const today = '2026-10-22';
const valid = { checkin: '2026-11-13', checkout: '2026-11-15', adults: 2, children: 0, rooms: 1 };

test.describe('regras de consulta de disponibilidade', () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'lógica pura: roda uma vez'));

  test('aceita uma consulta válida', () => {
    expect(validateBooking(valid, limits, today)).toEqual({});
  });

  test('exige check-out depois do check-in', () => {
    expect(validateBooking({ ...valid, checkout: valid.checkin }, limits, today).checkout).toMatch(/depois do check-in/);
    expect(validateBooking({ ...valid, checkout: '2026-11-12' }, limits, today).checkout).toMatch(/depois do check-in/);
  });

  test('recusa datas passadas, inválidas ou ausentes', () => {
    expect(validateBooking({ ...valid, checkin: '2026-10-21' }, limits, today).checkin).toMatch(/passada/);
    expect(validateBooking({ ...valid, checkin: '2026-02-30' }, limits, today).checkin).toMatch(/inválida/);
    expect(validateBooking({ ...valid, checkin: '', checkout: '' }, limits, today)).toMatchObject({
      checkin: expect.any(String),
      checkout: expect.any(String),
    });
  });

  test('valida hóspedes e quartos', () => {
    expect(validateBooking({ ...valid, adults: 0 }, limits, today).adults).toBeTruthy();
    expect(validateBooking({ ...valid, adults: 11 }, limits, today).adults).toMatch(/equipe/);
    expect(validateBooking({ ...valid, children: -1 }, limits, today).children).toBeTruthy();
    expect(validateBooking({ ...valid, rooms: 3, adults: 2 }, limits, today).rooms).toMatch(/1 adulto/);
  });

  test('calcula noites e datas sem erro de fuso', () => {
    expect(nightsBetween('2026-10-31', '2026-11-02')).toBe(2);
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  test('monta a mensagem e a URL do motor de reservas', () => {
    const msg = bookingMessage({ ...valid, interest: 'Suíte Superior' }, 'Luar de Minas Suítes');
    expect(msg).toContain('Check-in: 13/11/2026');
    expect(msg).toContain('(2 noites)');
    expect(msg).toContain('Acomodação de interesse: Suíte Superior');
    expect(bookingEngineUrl('https://x.test/?in={checkin}&out={checkout}&a={adults}&c={children}&r={rooms}', valid)).toBe(
      'https://x.test/?in=2026-11-13&out=2026-11-15&a=2&c=0&r=1',
    );
  });
});
