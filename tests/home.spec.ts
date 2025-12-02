import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/August Meyer/);
    
    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Industrielle Lösungen');
    
    // Check navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Startseite' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Produkte' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kontakt' })).toBeVisible();
  });

  test('should display featured products', async ({ page }) => {
    await page.goto('/');
    
    // Check featured products section
    await expect(page.getByRole('heading', { level: 2, name: 'Unsere Produkthighlights' })).toBeVisible();
    
    // Check if products are displayed
    const productCards = page.locator('[data-testid="product-card"]');
    await expect(productCards).toHaveCount(3);
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to products page
    await page.getByRole('link', { name: 'Produkte' }).click();
    await expect(page).toHaveURL('/produkte');
    
    // Test navigation to contact page
    await page.getByRole('link', { name: 'Kontakt' }).click();
    await expect(page).toHaveURL('/kontakt');
    
    // Test navigation back to home
    await page.getByRole('link', { name: 'Startseite' }).click();
    await expect(page).toHaveURL('/');
  });

  test('should have proper accessibility features', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toHaveAttribute('id');
    
    // Check for proper alt text on images
    const images = page.locator('img');
    for (const img of await images.all()) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for proper form labels
    const inputs = page.locator('input, textarea, select');
    for (const input of await inputs.all()) {
      const id = await input.getAttribute('id');
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        await expect(label).toBeVisible();
      }
    }
  });

  test('should have responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeVisible();
    
    // Test mobile menu functionality
    await page.getByRole('button', { name: 'Menü öffnen' }).click();
    await expect(page.getByRole('link', { name: 'Startseite' })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    
    // Check if desktop navigation is visible
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
