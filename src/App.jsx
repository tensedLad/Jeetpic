import Header from './components/Header'
import Hero from './components/Hero'
import PromiseSection from './components/PromiseSection'
import ComparisonTable from './components/ComparisonTable'
import TrustSection from './components/TrustSection'
import PartnerForm from './components/PartnerForm'
import Footer from './components/Footer'
import FloatingLemons from './components/FloatingLemons'
import QuickStorePage from './components/QuickStorePage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-blue-900 via-blue-600 to-white relative">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main className="flex-grow pt-20">
              <div className="relative">
                <FloatingLemons />
                <div className="relative z-10">
                  <Hero />
                  <PromiseSection />
                  <ComparisonTable />
                  <TrustSection />
                </div>
              </div>
              <PartnerForm />
            </main>
            <Footer />
          </>
        } />
        <Route path="/shop" element={<QuickStorePage />} />
      </Routes>
    </div>
  )
}

export default App
