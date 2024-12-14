import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutesComponent } from './routes/RoutesComponent'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesComponent />
  </StrictMode>
)
