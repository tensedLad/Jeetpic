import Header from './components/Header'
import Hero from './components/Hero'
import PromiseSection from './components/PromiseSection'
import ComparisonTable from './components/ComparisonTable'
import TrustSection from './components/TrustSection'
import PartnerForm from './components/PartnerForm'
import Footer from './components/Footer'
import FloatingLemons from './components/FloatingLemons'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-blue-900 via-blue-600 to-white text-white relative">
      <FloatingLemons />
      <Header />
      <main className="flex-grow pt-20 relative z-10">
        <Hero />
        <PromiseSection />
        <ComparisonTable />
        <TrustSection />
        <PartnerForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
