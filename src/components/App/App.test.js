import React from 'react'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { getOrders } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App Component', () => {
  let possibleIngredients, data
  beforeEach(() => {
    possibleIngredients = ['beans', 'steak']
    data = {
      orders: [
        {
          name: "Pat",
          ingredients: ['beans', 'steak']
        }
      ]
    }
  })
  
  it.skip('Should render the form', () => {
    render (
      <App />
    )

    const header = screen.getByRole('heading', { name: 'Burrito Builder' })
    const nameInput = screen.getByPlaceholderText('Name')
    const beansButton = screen.getByRole('button', { name: 'beans' })


    expect(header).toBeInTheDocument
    expect(nameInput).toBeInTheDocument
    expect(beansButton).toBeInTheDocument
  })

  it('Should render the orders', async () => {
    getOrders.mockResolvedValue(data)

    render (
      <App />
    )
    
    const orderName = await waitFor(() => screen.getByRole('heading', { name: 'Pat' }))

    expect(orderName).toBeInTheDocument
  })
})