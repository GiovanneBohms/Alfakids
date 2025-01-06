import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutesComponent } from './routes/RoutesComponent'
import { AuthProvider } from './contexts/AuthContext'

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
