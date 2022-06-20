import { render, screen } from '@testing-library/react'
import { ActiveLink } from '.'

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

// Categorização nos testes //
describe('ActiveLink component', () => {
    // it or test //
    it('renders correctly', () => {
        render(
            <ActiveLink href={'/'} activeClassName='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('adds active class if the link as currently active', () => {
        render(
            <ActiveLink href={'/'} activeClassName='active'>
                <a>Home</a>
            </ActiveLink>
        )

        expect(screen.getByText('Home')).toHaveClass('active')
    })
}) 
