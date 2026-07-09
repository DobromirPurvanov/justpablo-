import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Services from './pages/Services'
import Results from './pages/Results'
import Strategy from './pages/Strategy'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import CookiesPage from './pages/CookiesPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import CookieBanner from './components/CookieBanner'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uslugi" element={<Services />} />
          <Route path="/rezultati" element={<Results />} />
          <Route path="/strategiya" element={<Strategy />} />
          <Route path="/ceni" element={<Pricing />} />
          <Route path="/zapitvane" element={<Contact />} />
          <Route path="/biskvitki" element={<CookiesPage />} />
          <Route path="/poveritelnost" element={<PrivacyPage />} />
          <Route path="/usloviya" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
