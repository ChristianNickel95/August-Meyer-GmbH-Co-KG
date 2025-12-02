import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Check page title
    await expect(page).toHaveTitle(/Kontakt/);
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Kontakt');
    
    // Check contact information
    await expect(page.getByText('August Meyer GmbH & Co. KG')).toBeVisible();
    await expect(page.getByText('Musterstraße 123')).toBeVisible();
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Check form elements
    await expect(page.getByLabel('Name *')).toBeVisible();
    await expect(page.getByLabel('E-Mail *')).toBeVisible();
    await expect(page.getByLabel('Unternehmen')).toBeVisible();
    await expect(page.getByLabel('Telefon')).toBeVisible();
    await expect(page.getByLabel('Nachricht *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Anfrage senden' })).toBeVisible();
  });

  test('should submit lead form successfully', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Fill out the form
    await page.getByLabel('Name *').fill('Max Mustermann');
    await page.getByLabel('E-Mail *').fill('max@example.com');
    await page.getByLabel('Unternehmen').fill('Test GmbH');
    await page.getByLabel('Telefon').fill('+49 123 456789');
    await page.getByLabel('Nachricht *').fill('Ich interessiere mich für Ihre Produkte.');
    
    // Submit the form
    await page.getByRole('button', { name: 'Anfrage senden' }).click();
    
    // Check success message
    await expect(page.getByText('Vielen Dank für Ihre Anfrage!')).toBeVisible();
    await expect(page.getByText('Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Try to submit empty form
    await page.getByRole('button', { name: 'Anfrage senden' }).click();
    
    // Check that form is still visible (not submitted)
    await expect(page.getByLabel('Name *')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Fill form with invalid email
    await page.getByLabel('Name *').fill('Max Mustermann');
    await page.getByLabel('E-Mail *').fill('invalid-email');
    await page.getByLabel('Nachricht *').fill('Test message');
    
    // Submit form
    await page.getByRole('button', { name: 'Anfrage senden' }).click();
    
    // Check that form is still visible (not submitted)
    await expect(page.getByLabel('Name *')).toBeVisible();
  });

  test('should have proper form accessibility', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Check form labels
    const nameInput = page.getByLabel('Name *');
    const emailInput = page.getByLabel('E-Mail *');
    const messageInput = page.getByLabel('Nachricht *');
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
    
    // Check required field indicators
    await expect(page.getByText('Name *')).toBeVisible();
    await expect(page.getByText('E-Mail *')).toBeVisible();
    await expect(page.getByText('Nachricht *')).toBeVisible();
  });

  test('should display company benefits', async ({ page }) => {
    await page.goto('/kontakt');
    
    // Check benefits section
    await expect(page.getByRole('heading', { level: 3, name: 'Warum August Meyer?' })).toBeVisible();
    
    // Check specific benefits
    await expect(page.getByText('Über 50 Jahre Erfahrung in der Industrie')).toBeVisible();
    await expect(page.getByText('Maßgeschneiderte Lösungen für Ihre Anforderungen')).toBeVisible();
    await expect(page.getByText('Persönliche Beratung und Support')).toBeVisible();
  });
});
