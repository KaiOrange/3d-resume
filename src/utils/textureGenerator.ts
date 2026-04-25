import * as THREE from 'three'

export interface ProfileData {
  name: string
  title: string
  email: string
  phone: string
  location: string
}

export interface ExperienceData {
  company: string
  role: string
  period: string
  icon?: string
}

export interface ProjectData {
  name: string
  tech: string[]
  description: string
}

function createCanvas(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  return { canvas, ctx }
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

export function createProfileTexture(profile: ProfileData): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(1024, 512)

  // Background with gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 512)
  gradient.addColorStop(0, 'rgba(0, 20, 40, 0.9)')
  gradient.addColorStop(1, 'rgba(0, 40, 80, 0.9)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1024, 512)

  // Border glow
  ctx.strokeStyle = '#00d4ff'
  ctx.lineWidth = 4
  ctx.shadowColor = '#00d4ff'
  ctx.shadowBlur = 20
  ctx.strokeRect(10, 10, 1004, 492)
  ctx.shadowBlur = 0

  // Name
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 64px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.shadowColor = '#00d4ff'
  ctx.shadowBlur = 10
  ctx.fillText(profile.name, 512, 120)
  ctx.shadowBlur = 0

  // Title
  ctx.fillStyle = '#00d4ff'
  ctx.font = '36px Microsoft YaHei, Arial, sans-serif'
  ctx.fillText(profile.title, 512, 180)

  // Divider
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.5)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(200, 220)
  ctx.lineTo(824, 220)
  ctx.stroke()

  // Contact info
  ctx.fillStyle = '#ffffff'
  ctx.font = '28px Microsoft YaHei, Arial, sans-serif'
  const contactY = 290
  ctx.fillText(`📧 ${profile.email}`, 512, contactY)
  ctx.fillText(`📱 ${profile.phone}`, 512, contactY + 50)
  ctx.fillText(`📍 ${profile.location}`, 512, contactY + 100)

  // Decorative corner elements
  ctx.fillStyle = '#00d4ff'
  ctx.globalAlpha = 0.3
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(80, 0)
  ctx.lineTo(0, 80)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(1024, 0)
  ctx.lineTo(944, 0)
  ctx.lineTo(1024, 80)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(0, 512)
  ctx.lineTo(80, 512)
  ctx.lineTo(0, 432)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(1024, 512)
  ctx.lineTo(944, 512)
  ctx.lineTo(1024, 432)
  ctx.fill()
  ctx.globalAlpha = 1

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function createExperienceTexture(experience: ExperienceData, iconUrl?: string): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(600, 240)

  // Background with gradient
  const gradient = ctx.createLinearGradient(0, 0, 600, 0)
  gradient.addColorStop(0, 'rgba(10, 20, 35, 0.95)')
  gradient.addColorStop(1, 'rgba(20, 40, 60, 0.95)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 600, 240)

  // Left side accent bar (thin line on left edge)
  ctx.fillStyle = '#00ff88'
  ctx.fillRect(0, 0, 3, 240)

  // Logo area on left side
  const logoSize = 80
  const logoX = 15
  const logoY = 15
  const logoEndX = logoX + logoSize

  // Draw placeholder circle first
  ctx.fillStyle = 'rgba(0, 255, 136, 0.1)'
  ctx.beginPath()
  ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = 'rgba(0, 200, 136, 0.3)'
  ctx.beginPath()
  ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 - 5, 0, Math.PI * 2)
  ctx.fill()

  // Draw company initial as placeholder
  ctx.fillStyle = '#00ff88'
  ctx.font = 'bold 40px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(experience.company.charAt(0), logoX + logoSize / 2, logoY + logoSize / 2)
  ctx.textAlign = 'left'
  ctx.textBaseline = 'alphabetic'

  // Content area starts after logo (flex-start with gap)
  const contentStartX = logoEndX + 20
  const contentGap = 10

  // Company name - prominent (below logo in flex-start layout)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 28px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(experience.company, contentStartX + contentGap, 50)

  // Role - accent color
  ctx.fillStyle = '#00ff88'
  ctx.font = '22px Microsoft YaHei, Arial, sans-serif'
  ctx.fillText(experience.role, contentStartX + contentGap, 90)

  // Period - subtle
  ctx.fillStyle = '#8ba4bd'
  ctx.font = '18px Microsoft YaHei, Arial, sans-serif'
  ctx.fillText(experience.period, contentStartX + contentGap, 130)

  // Decorative separator line
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(contentStartX + contentGap, 150)
  ctx.lineTo(contentStartX + contentGap + 160, 150)
  ctx.stroke()

  // Indicator dots at bottom
  ctx.fillStyle = '#00ff88'
  ctx.globalAlpha = 0.5
  const dotY = 190
  ctx.beginPath()
  ctx.arc(contentStartX + contentGap, dotY, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(contentStartX + contentGap + 18, dotY, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(contentStartX + contentGap + 36, dotY, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = 1

  // Bottom decorative line
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 238)
  ctx.lineTo(600, 238)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  // Load icon image asynchronously
  if (iconUrl) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      // Draw the actual icon on top of placeholder
      ctx.drawImage(img, logoX + 5, logoY + 5, logoSize - 10, logoSize - 10)
      texture.needsUpdate = true
    }
    img.src = iconUrl
  }

  return texture
}

export function createProjectTexture(project: ProjectData): THREE.CanvasTexture {
  // Pre-calculate needed height based on content
  const headerHeight = 100
  const techAreaHeight = 120
  const lineHeight = 45

  // Calculate description height
  const descLines = project.description.split('\n')
  let totalDescLines = 0
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')!
  tempCtx.font = '24px Microsoft YaHei, Arial, sans-serif'

  descLines.forEach(line => {
    const words = line.split('')
    let currentLine = ''
    const maxWidth = 820
    words.forEach(char => {
      const testLine = currentLine + char
      const metrics = tempCtx.measureText(testLine)
      if (metrics.width > maxWidth && currentLine !== '') {
        totalDescLines++
        currentLine = char
      } else {
        currentLine = testLine
      }
    })
    if (currentLine !== '') {
      totalDescLines++
    }
  })

  const descHeight = totalDescLines * lineHeight
  const bottomPadding = 10
  const canvasHeight = headerHeight + techAreaHeight + descHeight + bottomPadding

  const { canvas, ctx } = createCanvas(900, canvasHeight)

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
  gradient.addColorStop(0, 'rgba(30, 0, 50, 0.9)')
  gradient.addColorStop(1, 'rgba(60, 0, 100, 0.9)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 900, canvasHeight)

  // Border
  ctx.strokeStyle = '#bf5af2'
  ctx.lineWidth = 3
  ctx.shadowColor = '#bf5af2'
  ctx.shadowBlur = 15
  ctx.strokeRect(8, 8, 884, canvasHeight - 16)
  ctx.shadowBlur = 0

  // Project name
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 48px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.shadowColor = '#bf5af2'
  ctx.shadowBlur = 8
  ctx.fillText(project.name, 40, 80)
  ctx.shadowBlur = 0

  // Tech stack tags
  const tagX = 40
  let currentX = tagX
  let currentY = 120
  ctx.font = '22px Microsoft YaHei, Arial, sans-serif'

  project.tech.forEach((tech, index) => {
    const tagWidth = ctx.measureText(tech).width + 30
    if (currentX + tagWidth > 860) {
      currentX = tagX
      currentY += 40
    }

    // Tag background
    ctx.fillStyle = 'rgba(191, 90, 242, 0.3)'
    roundedRect(ctx, currentX, currentY - 20, tagWidth, 35, 8)
    ctx.fill()

    // Tag text
    ctx.fillStyle = '#bf5af2'
    ctx.fillText(tech, currentX + 15, currentY + 5)

    currentX += tagWidth + 15
  })

  // Description - with proper \n handling
  ctx.fillStyle = '#cccccc'
  ctx.font = '24px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'left'
  const descY = currentY + 60

  const maxWidth = 820
  let y = descY

  // Split by \n to handle explicit line breaks
  const paragraphs = project.description.split('\n')

  paragraphs.forEach((paragraph, pIndex) => {
    if (pIndex > 0) {
      y += lineHeight
    }

    const words = paragraph.split('')
    let line = ''

    words.forEach((char) => {
      const testLine = line + char
      const metrics = ctx.measureText(testLine)
      if (metrics.width > maxWidth && line !== '') {
        ctx.fillText(line, 40, y)
        line = char
        y += lineHeight
      } else {
        line = testLine
      }
    })
    if (line !== '') {
      ctx.fillText(line, 40, y)
    }
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
