'use client'

import { useState } from 'react'
import { ForgeBuilder } from '@/components/forge-builder'
import { GeneratedSite } from '@/components/generated-site'
import { ForgeOutput } from '@/lib/agents/orchestrator'

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentAgent, setCurrentAgent] = useState('')
  const [generatedSite, setGeneratedSite] = useState<ForgeOutput | null>(null)

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true)
    setProgress(0)
    setCurrentAgent('🏗️ Architect Agent')

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev
          return prev + 5
        })
      }, 300)

      // Update agent names
      setTimeout(() => setCurrentAgent('✍️ Copywriter Agent'), 2000)
      setTimeout(() => setCurrentAgent('🎨 Visual Agent'), 4000)
      setTimeout(() => setCurrentAgent('🔌 Integration Agent'), 6000)

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const data = await response.json()

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentAgent('✅ Complete!')

      setTimeout(() => {
        setGeneratedSite(data)
        setIsGenerating(false)
      }, 500)
    } catch (error) {
      console.error('Generation error:', error)
      setIsGenerating(false)
      setProgress(0)
      alert('Failed to generate website. Please try again.')
    }
  }

  const handleReset = () => {
    setGeneratedSite(null)
    setProgress(0)
    setCurrentAgent('')
  }

  if (generatedSite) {
    return <GeneratedSite data={generatedSite} onReset={handleReset} />
  }

  return (
    <ForgeBuilder
      onGenerate={handleGenerate}
      isGenerating={isGenerating}
      progress={progress}
      currentAgent={currentAgent}
    />
  )
}
