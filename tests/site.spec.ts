import { expect, test, type Page } from '@playwright/test';

const isMobile = (name: string) => name === 'mobile';

async function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.route(/google\.com/, (route) => route.abort());
  return errors;
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('página inicial completa, sem erros nem rolagem horizontal', async ({ page }) => {
  const errors = await trackErrors(page);
  await page.goto('/');
  await expect(page).toHaveTitle(/Luar de Minas Suítes/);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toContainText('Viva Minas');

  for (const id of ['inicio', 'sobre', 'acomodacoes', 'experiencia', 'galeria', 'avaliacoes', 'localizacao', 'reservas', 'perguntas']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = schemas.map((s) => JSON.parse(s)['@type']);
  expect(types).toEqual(expect.arrayContaining(['LodgingBusiness', 'FAQPage']));
  expect(schemas.join()).not.toContain('aggregateRating');

  expect(errors).toEqual([]);
});

test('produção não exibe conteúdo pendente', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Categoria a confirmar')).toHaveCount(0);
  await expect(page.locator('.photo-placeholder__file')).toHaveCount(0);
  await expect(page.locator('#galeria .photo-placeholder__scene')).toHaveCount(8);
  await expect(page.getByRole('heading', { name: 'Suítes para cada momento da sua viagem' })).toBeVisible();
});

test('dados de avaliações e comodidades confirmadas', async ({ page }) => {
  await page.goto('/');
  const reviews = page.locator('#avaliacoes');
  await expect(reviews).toContainText('9,1');
  await expect(reviews).toContainText('Fantástico');
  await expect(reviews).toContainText('71 avaliações');
  await expect(reviews.locator('blockquote')).toHaveCount(4);
  await expect(page.locator('#experiencia')).toContainText('Pet friendly');
  await expect(page.locator('#localizacao')).toContainText('Rua do Campo, 280');
});

test('cabeçalho fica sólido ao rolar', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('[data-header]');
  await expect(header).not.toHaveClass(/is-solid/);
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(header).toHaveClass(/is-solid/);
});

test('menu móvel abre, navega e fecha', async ({ page }, info) => {
  test.skip(info.project.name === 'desktop', 'menu compacto só em telas menores');
  await page.goto('/');
  const toggle = page.locator('[data-menu-toggle]');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('#menu-mobile');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await toggle.click();
  await menu.getByRole('link', { name: 'Galeria' }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#galeria$/);
});

test('formulário valida datas e não simula reserva', async ({ page }) => {
  await page.goto('/#reservas');
  const form = page.locator('[data-booking-form]');
  const submit = form.getByRole('button', { name: 'Consultar disponibilidade' });

  await submit.click();
  await expect(form.locator('#checkin-error')).toHaveText('Informe a data de check-in.');
  await expect(form.locator('#checkin')).toHaveAttribute('aria-invalid', 'true');

  const fmt = (d: Date) => d.toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
  const day = 86_400_000;
  const checkin = fmt(new Date(Date.now() + 10 * day));
  const checkout = fmt(new Date(Date.now() + 13 * day));

  await form.locator('#checkin').fill(checkin);
  await expect(form.locator('#checkout')).not.toHaveValue('');
  await form.locator('#checkout').fill(checkin);
  await submit.click();
  await expect(form.locator('#checkout-error')).toHaveText('O check-out deve ser depois do check-in.');

  await form.locator('#checkout').fill(checkout);
  await form.getByRole('button', { name: 'Aumentar crianças' }).click();
  await expect(form.locator('#children')).toHaveValue('1');
  await submit.click();
  const status = form.locator('[data-status]');
  await expect(status).toBeVisible();
  await expect(status).toContainText('nada foi enviado');
  await expect(status).toContainText('3 noites');
  await expect(status).not.toContainText(/reserva (confirmada|concluída)/i);
});

test('contadores respeitam os limites', async ({ page }) => {
  await page.goto('/#reservas');
  const minus = page.getByRole('button', { name: 'Diminuir adultos' });
  await minus.click();
  await expect(page.locator('#adults')).toHaveValue('1');
  await expect(minus).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Diminuir crianças' })).toBeDisabled();
});

test('galeria amplia, navega e fecha', async ({ page }) => {
  await page.goto('/#galeria');
  const items = page.locator('[data-lightbox-item="galeria"]');
  await items.first().click();
  const dialog = page.locator('[data-lightbox]');
  await expect(dialog).toBeVisible();
  const total = await items.count();
  await expect(dialog.locator('[data-lb-counter]')).toHaveText(`1 / ${total}`);
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-lb-counter]')).toHaveText(`2 / ${total}`);
  await dialog.getByRole('button', { name: 'Foto anterior' }).click();
  await expect(dialog.locator('[data-lb-counter]')).toHaveText(`1 / ${total}`);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(items.first()).toBeFocused();
});

test('perguntas frequentes abrem e fecham', async ({ page }) => {
  await page.goto('/#perguntas');
  const item = page.locator('details.faq__item').filter({ hasText: 'Existe estacionamento?' });
  await item.locator('summary').click();
  await expect(item).toHaveAttribute('open', '');
  await expect(item).toContainText('não oferece estacionamento');
  await item.locator('summary').click();
  await expect(item).not.toHaveAttribute('open', '');
});

test('mapa só carrega sob demanda e links de rota apontam para o endereço', async ({ page }) => {
  await trackErrors(page);
  await page.goto('/#localizacao');
  await expect(page.locator('#localizacao iframe')).toHaveCount(0);
  const directions = page.getByRole('link', { name: /Como chegar/ });
  await expect(directions).toHaveAttribute('href', /google\.com\/maps\/dir\/.*Rua%20do%20Campo%2C%20280/);
  await page.getByRole('button', { name: 'Carregar mapa' }).click();
  await expect(page.locator('#localizacao iframe')).toHaveAttribute('src', /google\.com\/maps\?q=Rua%20do%20Campo/);
});

test('barra de reserva móvel aparece após a primeira dobra', async ({ page }, info) => {
  test.skip(!isMobile(info.project.name), 'somente celular');
  await page.goto('/');
  const bar = page.locator('[data-mobile-cta]');
  await expect(bar).not.toHaveClass(/is-visible/);
  await page.locator('#galeria').scrollIntoViewIfNeeded();
  await expect(bar).toHaveClass(/is-visible/);
});

test('política de privacidade e página 404', async ({ page }) => {
  await page.goto('/politica-de-privacidade/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Política de privacidade');
  const res = await page.goto('/nao-existe');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('não leva a lugar nenhum');
});
