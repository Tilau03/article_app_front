import { Rutas } from './routing/Rutas'
import {Provider} from "react-redux"
import {store} from "./store/store"


function App() {

  return (
    <Provider store={store}>
      <div className='layout'>

        <Rutas />
      </div>
    </Provider>
  )
}

export default App
