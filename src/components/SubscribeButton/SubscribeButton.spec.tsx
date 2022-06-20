import { render, screen, fireEvent } from '@testing-library/react'
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'

jest.mock('next-auth/client')
jest.mock('next/router')

// Categorização nos testes //
describe('SubscribeButton component', () => {
    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)

        expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn) // Verificando se a função foi chamada //
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now')

        // Disparador de Eventos //
        fireEvent.click(subscribeButton)

        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects user to posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            {
                user:
                {
                    name: 'John Doe',
                    email: 'john.doe@example.com'
                },
                activeSubscription: 'fake-active',
                expires: 'fake-expires'
            } as any,
            false])

        const pushMock = jest.fn()

        useRouterMocked.mockReturnValueOnce({ pushMock } as any)

        render(<SubscribeButton />)

        const subscribeButton = screen.getByText('Subscribe Now')

        // Disparador de Eventos //
        fireEvent.click(subscribeButton)

        expect(useRouterMocked).toHaveBeenCalled()
    })
}) 