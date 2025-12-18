import { NextRequest, NextResponse } from 'next/server'
import { forgeEngine } from '@/lib/agents/orchestrator'
import { DEMO_MODE, mockArchitectOutput, mockCopyOutput, mockVisualOutput, mockIntegrationOutput } from '@/lib/demo-mode'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid prompt provided' },
        { status: 400 }
      )
    }

    // Use demo mode if OpenAI key not configured
    if (DEMO_MODE) {
      console.log('Running in DEMO MODE (no API keys required)')
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000))

      return NextResponse.json({
        architecture: mockArchitectOutput,
        copy: mockCopyOutput,
        visual: mockVisualOutput,
        integration: mockIntegrationOutput,
        generatedAt: new Date().toISOString()
      })
    }

    // Run the real Forge Engine if API key is present
    const result = await forgeEngine(prompt)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate website' },
      { status: 500 }
    )
  }
}
