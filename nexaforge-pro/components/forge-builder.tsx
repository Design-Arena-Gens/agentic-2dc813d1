'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Wand2 } from 'lucide-react'

interface ForgeBuilderProps {
  onGenerate: (prompt: string) => void
  isGenerating: boolean
  progress: number
  currentAgent: string
}

export function ForgeBuilder({ onGenerate, isGenerating, progress, currentAgent }: ForgeBuilderProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      onGenerate(prompt)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center"
            >
              <Wand2 className="w-10 h-10 text-white" />
            </motion.div>
            <CardTitle className="text-4xl font-bold text-white">
              NexaForge Pro
            </CardTitle>
            <p className="text-white/80 text-lg">
              AI-Powered Website Builder - Agents at Work
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isGenerating ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-white/90 text-sm font-medium">
                    Describe your dream website
                  </label>
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A modern e-commerce site for luxury watches with a minimalist design"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                  disabled={!prompt.trim()}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Website
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-white text-xl font-semibold">
                      {currentAgent}
                    </p>
                  </motion.div>
                  <p className="text-white/70">
                    AI Agents are crafting your website...
                  </p>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-white/60 text-sm text-center">
                  {progress}% Complete
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-white">24</div>
                <div className="text-white/70 text-sm">Industries</div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-3xl font-bold text-white">20</div>
                <div className="text-white/70 text-sm">Themes</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
