import React from 'react'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App Component', () => {
  let possibleIngredients, mockData, mockPostData
  beforeEach(() => {
    possibleIngredients = ['beans', 'steak'],
    mockData = {
      orders: [
        {
          name: "Pat",
          ingredients: ['beans', 'steak']
        }
      ]
    },
    mockPostData = {
      id: "1",
      name: "Nicole",
      ingredients: ['beans']
    }
  })
  
  it('Should render the form', () => {
    getOrders.mockResolvedValue(mockData)

    render (
      <App />
    )

    const header = screen.getByRole('heading', { name: 'Burrito Builder' })
    const nameInput = screen.getByPlaceholderText('Name')
    const beansButton = screen.getByRole('button', { name: 'beans' })
    const submitButton = screen.getByRole('button', { name: 'Submit Order' })

    expect(header).toBeInTheDocument
    expect(nameInput).toBeInTheDocument
    expect(beansButton).toBeInTheDocument
    expect(submitButton).toBeInTheDocument
  })

  it('Should render the orders', async () => {
    getOrders.mockResolvedValue(mockData)

    render (
      <App />
    )
    
    const orderName = await waitFor(() => screen.getByRole('heading', { name: 'Pat' }))
    const orderIngredient = await waitFor(() => screen.getAllByText('beans'))

    expect(orderName).toBeInTheDocument
    expect(orderIngredient.length).toEqual(2)
  })

  it('Should post order when submitted if name is entered and an ingredient is selected', async () => {
    getOrders.mockResolvedValue(mockData)
    postOrder.mockResolvedValue(mockPostData)

    render (
      <App />
    )

    const submitButton = screen.getByRole('button', { name: 'Submit Order' })
    const nameInput = screen.getByPlaceholderText('Name')  
    const beansButton = screen.getByRole('button', { name: 'beans' })
    
    fireEvent.click(beansButton, { target: { name: 'beans' } })
    fireEvent.change(nameInput, { target: { value: 'Nicole' } })
    fireEvent.click(submitButton)

    expect(postOrder).toHaveBeenCalledTimes(1)
    expect(postOrder).toHaveBeenCalledWith('Nicole', ['beans'])

    const orderName = await waitFor(() => screen.getByRole('heading', { name: 'Nicole' }))
    const orderIngredient = await waitFor(() => screen.getAllByText('beans'))

    expect(orderName).toBeInTheDocument
    expect(orderIngredient.length).toEqual(3)
  })
})