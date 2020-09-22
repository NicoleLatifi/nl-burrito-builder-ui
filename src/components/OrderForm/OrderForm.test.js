import React from 'react'
import { screen, render } from '@testing-library/react'
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

    expect(name).toBeInTheDocument
    expect(beansButton).toBeInTheDocument
    expect(steakButton).toBeInTheDocument
    expect(submitButton).toBeInTheDocument
  })

  it('Should update the name and ingredients as they are entered and selected', () => {

  })

  it('Should fire the correct method when submitted', () => {
{/* <OrderForm postSubmittedOrder={this.postSubmittedOrder} /> */}
  })
})