# NexaForge Pro - Demo Setup (No API Keys Required)

## 🎯 Quick Demo Mode

Want to test NexaForge Pro without setting up API keys? Use this demo configuration!

### 1. Create Mock Demo File

Create a file at `lib/demo-mode.ts`:

```typescript
// Mock data for demo purposes (no API keys needed)
export const DEMO_MODE = true

export const mockArchitectOutput = {
  industry: 'E-commerce' as const,
  theme: 'Modern' as const,
  siteStructure: {
    pages: ['Home', 'Products', 'About', 'Contact'],
    sections: ['Hero', 'Features', 'Products', 'Testimonials', 'Contact']
  },
  colorPalette: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937'
  }
}

export const mockCopyOutput = {
  heroHeadline: 'Transform Your Vision Into Reality',
  heroSubheadline: 'AI-powered website generation that brings your ideas to life in seconds',
  aboutText: 'We combine cutting-edge AI technology with beautiful design to create stunning websites that convert. Our platform makes professional web development accessible to everyone.',
  servicesText: [
    'Lightning-fast AI generation that creates complete websites in under 60 seconds',
    'Professional designs across 24 industries with 20 unique themes to match your brand',
    'SEO-optimized content with structured data for maximum search engine visibility'
  ],
  metaTags: {
    title: 'NexaForge Pro - AI Website Builder',
    description: 'Create stunning websites with AI-powered generation',
    keywords: ['AI', 'website builder', 'automation', 'no-code']
  },
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NexaForge Pro',
    description: 'AI-Powered Website Builder'
  },
  cta: 'Get Started Free'
}

export const mockVisualOutput = {
  heroImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
  designStyle: 'glassmorphism' as const,
  animationPreset: 'fade' as const,
  typography: {
    heading: 'Inter',
    body: 'Inter'
  }
}

export const mockIntegrationOutput = {
  features: {
    contactForm: true,
    booking: false,
    ecommerce: true,
    blog: true,
    newsletter: true
  },
  stripeProducts: [
    { name: 'Starter', price: 2999, description: 'Perfect for getting started' },
    { name: 'Pro', price: 9999, description: 'For growing businesses' },
    { name: 'Enterprise', price: 24999, description: 'Full-featured solution' }
  ],
  integrations: ['Google Analytics', 'Meta Pixel', 'Contact Form', 'Stripe Checkout', 'Newsletter Signup']
}
```

### 2. Update API Route for Demo Mode

Modify `app/api/generate/route.ts`:

```typescript
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
    if (DEMO_MODE || !process.env.OPENAI_API_KEY) {
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
```

### 3. Run the Demo

```bash
cd nexaforge-pro
npm run dev
```

Visit http://localhost:3000 and try these prompts:
- "A modern e-commerce site for luxury watches"
- "A fitness studio website with booking"
- "An elegant law firm site"

The demo will show a realistic preview without requiring any API keys!

## 🔑 When You're Ready for Production

1. Get your API keys:
   - OpenAI: https://platform.openai.com
   - Supabase: https://supabase.com (optional)
   - Stripe: https://stripe.com (optional)

2. Add them to `.env.local`

3. Set `DEMO_MODE = false` in `lib/demo-mode.ts`

4. Deploy to Vercel!

---

**Enjoy exploring NexaForge Pro!** 🚀
