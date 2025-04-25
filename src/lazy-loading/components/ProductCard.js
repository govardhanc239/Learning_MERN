import React from 'react'

export default function ProductCard({product,onClick}) {
  return (
    <div className="card" onClick={onClick}>
      <img src={product.image} alt={product.name} width="100" />
      <h3>{product.name}</h3>
      <p>💲{product.price}</p>
    </div>
  )
}
