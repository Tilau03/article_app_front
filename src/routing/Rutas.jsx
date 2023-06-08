import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Articulos } from "../components/pages/Articulos";
import { Articulo } from "../components/pages/Articulo";
import { Inicio } from "../components/pages/Inicio";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Busqueda } from "../components/pages/Busqueda";
import { Editar } from "../components/pages/Editar";
import { ArticulosProvider } from "../contexts/Articulos";

export const Rutas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />

      <section id='content' className='content'>
        <ArticulosProvider>
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/inicio' element={<Inicio />} />
            <Route path='/articulos' element={<Articulos />} />
            <Route path='/crear' element={<Crear />} />
            <Route path='/buscar/:busqueda' element={<Busqueda />} />
            <Route path='/articulo/:id' element={<Articulo />} />
            <Route path='/editar/:id' element={<Editar />} />

            <Route
              path='*'
              element={
                <div className='jumbo'>
                  <h1>Error 404 </h1>
                </div>
              }
            />
          </Routes>
        </ArticulosProvider>
      </section>

      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
