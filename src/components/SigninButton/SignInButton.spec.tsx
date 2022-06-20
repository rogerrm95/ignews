import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { SigninButton } from '.'

// Imitação //
jest.mock('next-auth/client')

// Categorização nos testes //
describe('SignInButton component', () => {
    // it or test //
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = mocked(useSession)

        // mockReturnValue !== mockReturnValueOnce //
        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SigninButton />
        )

        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession)

        // mockReturnValue !== mockReturnValueOnce //
        useSessionMocked.mockReturnValueOnce([{
            user: {
                name: 'John Doe',
                email: 'example@gmail.com',
            },
            expires: 'fake-expires'
        }, false])

        render(
            <SigninButton />
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
}) 

// mocked() para simular diferentes estados dos componentes //