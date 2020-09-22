export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
      .then(data => {return data})
}

export const postOrder = (name, ingredients) => {
  const stringifiedOrder = JSON.stringify({ name: name, ingredients: ingredients });
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringifiedOrder,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data
    })
}

export const deleteOrder = (orderId) => {
  console.log( `delete ${orderId}`)
  return fetch(`http://localhost:3001/api/v1/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
  })
}