import { render, screen, fireEvent } from "@testing-library/react"
import { signIn, useSession } from 'next-auth/client'
import { mocked } from "ts-jest/utils"
import { useRouter } from 'next/router'
import { SubscribeButton } from "."

// Se mockar aqui em cima, pode dar erro na hora de mockar dentro dos contextos
// jest.mock('next-auth/client', () => {
//   return {
//     useSession() {
//       return [null, false]
//     },
//     signIn: jest.fn()
//   }
// })

jest.mock('next-auth/client')
jest.mock('next/router')


describe('SubscribeButton component', () => {

  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirect to posts when user already as a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user:
        {
          name: 'John Doe',
          email: 'john.doe.@example.com'
        },
        activeSubscription: 'fake-active-subscription',
        expires: 'fake-expires'
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts')
  })

})

