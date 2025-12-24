'use client'

import Navigation from '@/components/Navigation'
import Scene3D from '@/components/Scene3D'
import Hero from '@/components/Hero'
import WorkSection from '@/components/WorkSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ScrollIndicator from '@/components/ScrollIndicator'
import ProgressBar from '@/components/ProgressBar'
import SectionFollower from '@/components/SectionFollower'

export default function Home() {
  return (
    <main className="relative">
      <ProgressBar />
      <Navigation />
      <ScrollIndicator />
      <Scene3D />
      <SectionFollower />
      <Hero />
      <WorkSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
