import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Self-hosted Montserrat (латиница + кирилица) — без Google Fonts CDN,
// за да не изтича IP на посетителя към Google без съгласие (GDPR).
import '@fontsource/montserrat/100.css'
import '@fontsource/montserrat/200.css'
import '@fontsource/montserrat/300.css'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import './index.css'
import App from './App.tsx'

// Обратна съвместимост: стари споделени линкове от вида /#/uslugi
// пренасочваме към чистия път /uslugi, преди React Router да поеме.
if (window.location.hash.startsWith('#/')) {
  const target = window.location.hash.slice(1) + window.location.search
  window.history.replaceState(null, '', target)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
