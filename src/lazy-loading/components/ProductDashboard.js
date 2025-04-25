import React, { Suspense, useState } from 'react';
import { products } from '../data/products';
const ProductCard = React.lazy(()=> import('./ProductCard'));
const ProductDetails = React.lazy(()=>import('./ProductDetails'));
const ChartWidget = React.lazy(()=> import ('./ChartWidget'));


export default function ProductDashboard() {
    const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div>
        <h1>🛍️ Product Dashboard</h1>

        <Suspense fallback ={<div>📊 Loading analytics...</div>}>
        <ChartWidget/>
        </Suspense>
        <div className='product-grid'>
            {products.map((product)=>(
                <Suspense key={product.id} fallback={<div>Loading card...</div>}>
                <ProductCard product = {product} onClick = {()=>setSelectedProduct(product)}/>
                </Suspense>
            ))}

        </div>
        {selectedProduct &&  (
            <Suspense fallback={<div>Loading details...</div>}>
             <ProductDetails product = {selectedProduct} onClose = {()=> setSelectedProduct(null)}/>
            </Suspense>
        )}

    </div>
  )
}
