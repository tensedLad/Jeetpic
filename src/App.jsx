import Header from './components/Header'
import Hero from './components/Hero'
import PromiseSection from './components/PromiseSection'
import ComparisonTable from './components/ComparisonTable'
import TrustSection from './components/TrustSection'
import PartnerForm from './components/PartnerForm'
import Footer from './components/Footer'
import FloatingLemons from './components/FloatingLemons'
import QuickStorePage from './components/QuickStorePage'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'
import RefundPolicy from './components/RefundPolicy'
import ShippingPolicy from './components/ShippingPolicy'
import ContactUs from './components/ContactUs'
import NotFound from './components/NotFound'
import ServerError from './components/ServerError'
import { Routes, Route } from 'react-router-dom'
import { useVisitorTracking, useInteractionTracking } from './hooks/useTracking'

function App() {
  // Initialize tracking
  useVisitorTracking();
  useInteractionTracking();

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/error" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

