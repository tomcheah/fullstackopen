const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('loginFormSubmit').click()
  }

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByTestId('blogFormTitle').fill(title)
  await page.getByTestId('blogFormAuthor').fill(author)
  await page.getByTestId('blogFormUrl').fill(url)
  await page.getByTestId('blogFormSubmit').click()
}

const logOut = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

export { createBlog, loginWith, logOut }
