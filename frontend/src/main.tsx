import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PrimeReactProvider } from 'primereact/api'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
        
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
        <RouterProvider router={router} />
    </PrimeReactProvider>
  </StrictMode>,
)
