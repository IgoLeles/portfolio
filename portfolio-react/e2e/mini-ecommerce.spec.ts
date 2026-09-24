import { expect, test } from '@playwright/test';

const projectUrl = '#/projetos/mini-ecommerce';

test.beforeEach(async ({ page }) => {
  await page.goto(projectUrl);
});

test('busca produto por nome', async ({ page }) => {
  await page.getByLabel('Buscar produto').fill('Landing Page');

  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Landing Page Profissional' })).toBeVisible();
});

test('filtra catálogo por categoria', async ({ page }) => {
  await page.getByRole('button', { name: 'Segurança', exact: true }).click();

  await expect(page.locator('.product-card')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Revisão DevSecOps' })).toBeVisible();
});

test('adiciona produto e atualiza o resumo', async ({ page }) => {
  const card = page.locator('.product-card').filter({ hasText: 'Landing Page Profissional' });
  await card.getByRole('button', { name: 'Adicionar' }).click();

  const cart = page.locator('.cart-panel');
  await expect(cart.getByText('1 itens selecionados')).toBeVisible();
  await expect(cart.locator('.cart-summary').getByText('R$ 890,00')).toHaveCount(2);
});

test('soma unidades do mesmo produto em uma linha', async ({ page }) => {
  const card = page.locator('.product-card').filter({ hasText: 'Landing Page Profissional' });
  await card.getByRole('button', { name: 'Adicionar' }).click();
  await card.getByRole('button', { name: 'Adicionar' }).click();

  const cartItem = page.locator('.cart-item').filter({ hasText: 'Landing Page Profissional' });
  await expect(cartItem.locator('small')).toHaveText('2');
  await expect(page.locator('.cart-summary').getByText('R$ 1.780,00')).toHaveCount(2);
});

test('aplica desconto de 8% acima de três mil reais', async ({ page }) => {
  const card = page.locator('.product-card').filter({ hasText: 'Integração REST API' });
  await card.getByRole('button', { name: 'Adicionar' }).click();
  await card.getByRole('button', { name: 'Adicionar' }).click();

  const summary = page.locator('.cart-summary');
  await expect(summary.getByText('R$ 3.360,00')).toBeVisible();
  await expect(summary.getByText('R$ 268,80')).toBeVisible();
  await expect(summary.getByText('R$ 3.091,20')).toBeVisible();
});

test('remove item ao diminuir sua quantidade para zero', async ({ page }) => {
  const card = page.locator('.product-card').filter({ hasText: 'Revisão DevSecOps' });
  await card.getByRole('button', { name: 'Adicionar' }).click();
  await page.getByRole('button', { name: 'Diminuir quantidade de Revisão DevSecOps' }).click();

  await expect(page.getByText('Escolha um produto para montar o resumo da compra.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Finalizar simulação' })).toBeDisabled();
});

test('finaliza a simulação com quantidade e total', async ({ page }) => {
  const card = page.locator('.product-card').filter({ hasText: 'Landing Page Profissional' });
  await card.getByRole('button', { name: 'Adicionar' }).click();
  await page.getByRole('button', { name: 'Finalizar simulação' }).click();

  await expect(page.getByRole('status')).toContainText('1 item(ns)');
  await expect(page.getByRole('status')).toContainText('R$ 890,00');
});
