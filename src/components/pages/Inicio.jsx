import React from 'react'
import { Link } from 'react-router-dom'


export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Welcome to my proyect "My Blog"</h1>
      <p>The  operation of this project is thanks to  an API-REST created with MongoBD, ExpressJS and NodeJS. The structure of the visible components was created with ReactJS more ViteJS. </p>
      <Link to="/articulos" className='button'>View articles</Link>
    </div>
  )
}
