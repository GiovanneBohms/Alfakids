import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutesComponent } from './routes/RoutesComponent'
import App from './App.jsx'
import { RouteComponent } from './routes/RouteComponent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesComponent />
  </StrictMode>
    <RouteComponent />
  </StrictMode>
)
