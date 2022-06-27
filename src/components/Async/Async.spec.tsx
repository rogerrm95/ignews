import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { Async } from '.'

// Componente de teste //
// Testes Assíncrono //

describe('Async Component', () => {
    it('renders correctly 1', async () => {
        render(<Async />)

        expect(screen.getByText('Hello Guys')).toBeInTheDocument()
        expect(await screen.findByText('Botão')).toBeInTheDocument()
    })

    it('renders correctly | waitFor', async () => {
        render(<Async />)

        expect(screen.getByText('Hello Guys')).toBeInTheDocument()
        
        
        await waitFor(() => {
            return expect(screen.getByText('Botão')).toBeInTheDocument()
        })
    })

    // Vai testar se há algum elemento removido - irá FALHAR//
    // it('renders correctly | waitForElementToBeRemoved', async () => {
    //     render(<Async />)

    //     expect(screen.getByText('Hello Guys')).toBeInTheDocument()
        
        
    //     await waitForElementToBeRemoved(screen.queryByText('Botão'))
    // })
}) 