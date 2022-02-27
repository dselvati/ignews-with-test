import { render, screen } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {

  it('renders correctly', () => {
    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    // debug()
    expect(screen.getByText('Home')).toBeInTheDocument() // 1º forma
  })

  it('adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    )

    // debug()
    expect(getByText('Home')).toHaveClass('active') // 2º forma
  })

})

