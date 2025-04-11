import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutesComponent } from './routes/RoutesComponent'
import { AuthProvider } from './contexts/AuthContext'
import { register } from 'swiper/element/bundle'

register();

import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'  

function App(){
  return(
    <AuthProvider>
      <StrictMode>
        <RoutesComponent />
      </StrictMode>
    </AuthProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
