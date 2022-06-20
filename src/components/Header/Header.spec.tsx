import { render, screen } from '@testing-library/react'
import { Header } from '.'

// Imitação //
jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

jest.mock('next-auth/client', () => {
    return {
        useSession(){
            return [
                null, false
            ]
        }
    }
})

// Categorização nos testes //
describe('Header component', () => {
    // it or test //
    it('renders correctly', () => {
        render(
            <Header />
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Posts')).toBeInTheDocument()
    })
}) 
