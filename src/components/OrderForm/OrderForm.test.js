import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import OrderForm from './OrderForm'

describe('OrderForm Component', () => {
  let possibleIngredients
  beforeEach(() => {
    possibleIngredients = ['beans', 'steak']
  })

  it('Should render the correct content', () => {
    render (
      <OrderForm />
    )

    const nameInput = screen.getByPlaceholderText('Name')
    const beansButton = screen.getByRole('button', { name: 'beans' })
    const steakButton = screen.getByRole('button', { name: 'steak' })
    const submitButton = screen.getByRole('button', { name: 'Submit Order' })

    expect(nameInput).toBeInTheDocument
    expect(beansButton).toBeInTheDocument
    expect(steakButton).toBeInTheDocument
    expect(submitButton).toBeInTheDocument
  })

  it('Should update name when inputted', () => {
    render (
      <OrderForm />
    )
    
    const nameInput = screen.getByPlaceholderText('Name')
    
    fireEvent.change(nameInput, { target: { value: 'Nicole' } })

    expect(nameInput.value).toEqual('Nicole')
  })

  it('Should post order when submitted if name is entered and an ingredient is selected', () => {
    const mockPostSubmittedOrder = jest.fn()

    render (
      <OrderForm postSubmittedOrder={mockPostSubmittedOrder} />
    )

    const submitButton = screen.getByRole('button', { name: 'Submit Order' })
    fireEvent.click(submitButton)
    expect(mockPostSubmittedOrder).toHaveBeenCalledTimes(0)

    const nameInput = screen.getByPlaceholderText('Name') 
    fireEvent.change(nameInput, { target: { value: 'Nicole' } })
    fireEvent.click(submitButton)
    expect(mockPostSubmittedOrder).toHaveBeenCalledTimes(0)
    
    const beansButton = screen.getByRole('button', { name: 'beans' })
    fireEvent.click(beansButton, { target: { name: 'beans' } })
    fireEvent.change(nameInput, { target: { value: 'Nicole' } })
    fireEvent.click(submitButton)

    expect(mockPostSubmittedOrder).toHaveBeenCalledTimes(1)
    
  })
})