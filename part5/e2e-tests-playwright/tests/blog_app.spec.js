const { test, expect, beforeEach, describe } = require('@playwright/test')
const { createBlog, loginWith, logOut } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test',
        username: 'Test',
        password: 'test'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'Test2',
        username: 'Test2',
        password: 'test2'
      }
    })


    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to blogs')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Test', 'test')
      await expect(page.getByText('Test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Test', 'wrongpassword')

      const errorDiv = await page.getByTestId('notification')
      await expect(errorDiv).toContainText('Incorrect username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Test', 'test')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'VSCode', 'Test', 'playwright.url')
      await expect(page.getByText('VSCode').filter( { hasNotText: 'has been created' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Playwright Test Blog', 'Test', 'playwright.url')
      await expect(page.getByText('Playwright Test Blog').filter( { hasNotText: 'has been created' })).toBeVisible()

      await page.getByText('view').click()
      await expect(page.getByText('likes: 0')).toBeVisible()

      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, 'Playwright Test Blog', 'Test', 'playwright.url')
      await expect(page.getByText('Playwright Test Blog').filter( { hasNotText: 'has been created' })).toBeVisible()

      await page.getByText('view').click()
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click();

      await expect(page.getByText('Playwright Test Blog').filter( { hasNotText: 'has been created' })).not.toBeVisible()
  })

    test('only user who created the blog can see delete button', async ({ page }) => {
      await createBlog(page, 'Playwright Test Blog', 'Test', 'playwright.url')
      await expect(page.getByText('Playwright Test Blog').filter( { hasNotText: 'has been created' })).toBeVisible()

      await page.getByText('view').click()
      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

      await logOut(page)

      await loginWith(page, 'Test2', 'test2')
      await expect(page.getByText('Playwright Test Blog').filter( { hasNotText: 'has been created' })).toBeVisible()
      await page.getByText('view').click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      // Set up First Blog with 2 likes
      await createBlog(page, 'First Blog', 'Test', 'playwright.url')
      await expect(page.getByText('First Blog').filter( { hasNotText: 'has been created' })).toBeVisible()
      await page.getByText('view').click()
      await expect(page.getByText('likes: 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 2')).toBeVisible()
      await page.getByText('hide').click()

      // Set up Second Blog with 0 likes
      await createBlog(page, 'Second Blog', 'Test', 'playwright.url')
      await expect(page.getByText('Second Blog').filter( { hasNotText: 'has been created' })).toBeVisible()

      // Get all divs with class "blog"
      const blogs = await page.locator('.blog')

      // Assert correct order
      const expectedFirstblog = await blogs.nth(0).textContent()
      const expectedSecondBlog = await blogs.nth(1).textContent()

      await expect(expectedFirstblog).toContain('First Blog')
      await expect(expectedFirstblog).toContain('likes: 2')

      await expect(expectedSecondBlog).toContain('Second Blog')
      await expect(expectedSecondBlog).toContain('likes: 0')
    })
  })
})
