import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

test('it renders correctly', async () => {
  render(<Async />)

  // screen.logTestingPlaygroundURL()

  expect(screen.getByText('Hello World')).toBeInTheDocument()
  // expect(await screen.findByText('Button')).toBeInTheDocument()

  await waitForElementToBeRemoved(screen.queryByText('Button'))

  // await waitFor(() => {
  //   // return expect(screen.getByText('Button')).toBeInTheDocument()
  //   // return expect(screen.queryByText('Button')).not.toBeInTheDocument()

  // })
})

// screen:
// get -> procurar um elemento de forma sincrona, e da erro se não encontrar
// query -> procurar um elemento, se não encontrar não vai dar erro
// find -> procurar um elemento até ele aparecer, e da erro se não encontrar (pode configurar um timeout)