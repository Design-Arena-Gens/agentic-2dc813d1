'use client'

import { motion } from 'framer-motion'
import { ForgeOutput } from '@/lib/agents/orchestrator'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

interface GeneratedSiteProps {
  data: ForgeOutput
  onReset: () => void
}

export function GeneratedSite({ data, onReset }: GeneratedSiteProps) {
  const { architecture, copy, visual, integration } = data

  const getDesignClass = () => {
    switch (visual.designStyle) {
      case 'glassmorphism':
        return 'bg-white/10 backdrop-blur-lg border border-white/20'
      case 'neumorphism':
        return 'bg-gray-100 shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]'
      case 'gradient':
        return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10'
      default:
        return 'bg-white border border-gray-200'
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: architecture.colorPalette.background,
        color: architecture.colorPalette.text,
      }}
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${visual.heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            style={{ fontFamily: visual.typography.heading }}
          >
            {copy.heroHeadline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
            style={{ fontFamily: visual.typography.body }}
          >
            {copy.heroSubheadline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              style={{
                backgroundColor: architecture.colorPalette.primary,
                color: 'white',
              }}
            >
              {copy.cta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: visual.typography.heading,
                color: architecture.colorPalette.primary,
              }}
            >
              About Us
            </h2>
            <p
              className="text-lg md:text-xl max-w-3xl mx-auto"
              style={{ fontFamily: visual.typography.body }}
            >
              {copy.aboutText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4" style={{ backgroundColor: architecture.colorPalette.background }}>
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{
              fontFamily: visual.typography.heading,
              color: architecture.colorPalette.primary,
            }}
          >
            Our Services
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {copy.servicesText.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={`p-6 h-full ${getDesignClass()}`}>
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{
                      fontFamily: visual.typography.heading,
                      color: architecture.colorPalette.primary,
                    }}
                  >
                    Service {index + 1}
                  </h3>
                  <p style={{ fontFamily: visual.typography.body }}>{service}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {integration.features.contactForm && (
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
              style={{
                fontFamily: visual.typography.heading,
                color: architecture.colorPalette.primary,
              }}
            >
              Get In Touch
            </motion.h2>
            <Card className={`p-8 ${getDesignClass()}`}>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6" style={{ color: architecture.colorPalette.accent }} />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6" style={{ color: architecture.colorPalette.accent }} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6" style={{ color: architecture.colorPalette.accent }} />
                  <span>123 Business St, City, State 12345</span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t" style={{ borderColor: architecture.colorPalette.primary }}>
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <p style={{ fontFamily: visual.typography.body }}>
            Built with NexaForge Pro | {architecture.industry} | {architecture.theme} Theme
          </p>
          <Button onClick={onReset} variant="outline">
            Create Another Website
          </Button>
        </div>
      </footer>
    </div>
  )
}
