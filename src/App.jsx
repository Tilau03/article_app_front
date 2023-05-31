import { useState } from 'react'
import { Inicio } from './components/pages/inicio'
import { Articulos } from './components/pages/Articulos'
import { Crear } from './components/pages/Crear'
import { Rutas } from './routing/Rutas'
import { ArticulosProvider } from './contexts/Articulos'


function App() {

  return (
    <ArticulosProvider>
      <div className='layout'>

        <Rutas />
      </div>
    </ArticulosProvider>
  )
}

export default App
