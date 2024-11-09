/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
*/

import ReactDom from 'react-dom/client'

import App from './App'

ReactDom.createRoot(document.getElementById('root')).render(<App />)

/*
Juramento de los programadores web

Programar es difícil, por eso usaré todos los medios posibles para hacerlo más fácil.

  -  Tendré la consola de desarrollador de mi navegador abierta todo el tiempo.
  -  Progreso con pequeños pasos.
  -  Escribiré muchas declaraciones console.log para asegurarme de que entiendo cómo se comporta el código y para ayudar a identificar problemas.
  -  Si mi código no funciona, no escribiré más código. En lugar de eso, empiezo a eliminar el código hasta que funcione o simplemente vuelvo a un estado en el que todo seguía funcionando.
  -  Cuando pido ayuda en el canal de Discord del curso o en otro lugar, formulo mis preguntas correctamente, consulta aquí como pedir ayuda.

*/