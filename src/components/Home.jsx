import React from 'react'
import { productData } from '../utils/productData';
import Card from './Card';

const Home = ({showAlert}) => {
  return (
    <div className='container text-center py-4'>
      <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center">
        {
          productData && productData.map(product => {
            return <Card key={product.id} product={product} showAlert={showAlert} />
          })
        }
      </ div>
    </div>
  )
}

export default Home;