import { test, expect } from '@playwright/test';

test.describe('Lead Form', () => {
  test('should submit lead form successfully', async ({ page }) => {
    // Zur Produktseite navigieren (nehmen wir eine existierende)
    await page.goto('/produkte');
    
    // Auf "Details ansehen" klicken (erste Produktkarte)
    await page.click('text=Details ansehen');
    
    // Warten bis die Seite geladen ist
    await page.waitForLoadState('networkidle');
    
    // Formular ausfüllen
    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'max.mustermann@example.com');
    await page.fill('input[name="telefon"]', '+49 123 456789');
    await page.fill('textarea[name="nachricht"]', 'Ich interessiere mich für dieses Produkt und benötige ein Angebot für 100 Stück. Bitte senden Sie mir weitere Informationen zu.');
    
    // Datenschutz-Checkbox aktivieren
    await page.check('input[name="datenschutz"]');
    
    // Formular absenden
    await page.click('button[type="submit"]');
    
    // Danke-Hinweis erwarten
    await expect(page.locator('text=Vielen Dank für Ihre Anfrage!')).toBeVisible();
    await expect(page.locator('text=Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.')).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/produkte');
    await page.click('text=Details ansehen');
    await page.waitForLoadState('networkidle');
    
    // Formular ohne Daten absenden
    await page.click('button[type="submit"]');
    
    // Validierungsfehler erwarten
    await expect(page.locator('text=Name ist erforderlich')).toBeVisible();
    await expect(page.locator('text=E-Mail ist erforderlich')).toBeVisible();
    await expect(page.locator('text=Nachricht ist erforderlich')).toBeVisible();
    await expect(page.locator('text=Datenschutzerklärung muss akzeptiert werden')).toBeVisible();
  });

  test('should show error for short message', async ({ page }) => {
    await page.goto('/produkte');
    await page.click('text=Details ansehen');
    await page.waitForLoadState('networkidle');
    
    // Formular mit zu kurzer Nachricht ausfüllen
    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'max@example.com');
    await page.fill('textarea[name="nachricht"]', 'Kurze Nachricht');
    await page.check('input[name="datenschutz"]');
    
    await page.click('button[type="submit"]');
    
    // Fehler für zu kurze Nachricht erwarten
    await expect(page.locator('text=Nachricht muss mindestens 20 Zeichen lang sein')).toBeVisible();
  });

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/produkte');
    await page.click('text=Details ansehen');
    await page.waitForLoadState('networkidle');
    
    // Formular mit ungültiger E-Mail ausfüllen
    await page.fill('input[name="name"]', 'Max Mustermann');
    await page.fill('input[name="email"]', 'ungueltige-email');
    await page.fill('textarea[name="nachricht"]', 'Ich interessiere mich für dieses Produkt und benötige ein Angebot für 100 Stück. Bitte senden Sie mir weitere Informationen zu.');
    await page.check('input[name="datenschutz"]');
    
    await page.click('button[type="submit"]');
    
    // Fehler für ungültige E-Mail erwarten
    await expect(page.locator('text=Bitte geben Sie eine gültige E-Mail-Adresse ein')).toBeVisible();
  });
});
