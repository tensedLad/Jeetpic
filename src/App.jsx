import Header from './components/Header'
import Hero from './components/Hero'
import PromiseSection from './components/PromiseSection'
import ComparisonTable from './components/ComparisonTable'
import TrustSection from './components/TrustSection'
import PartnerForm from './components/PartnerForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-blue-900 via-blue-600 to-white text-white">
      <Header />
      <main className="flex-grow">
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
