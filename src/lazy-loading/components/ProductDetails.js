import React from 'react'

export default function ProductDetails({product,onClose}) {
  return (
    <div className="modal">
      <button onClick={onClose}>❌ Close</button>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p>Price: 💲{product.price}</p>
    </div>
  )
}
