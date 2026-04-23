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

export function createExperienceTexture(experience: ExperienceData): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(800, 300)

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, 'rgba(20, 0, 40, 0.9)')
  gradient.addColorStop(1, 'rgba(40, 0, 80, 0.9)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 800, 300)

  // Border
  ctx.strokeStyle = '#00ff88'
  ctx.lineWidth = 3
  ctx.shadowColor = '#00ff88'
  ctx.shadowBlur = 15
  ctx.strokeRect(8, 8, 784, 284)
  ctx.shadowBlur = 0

  // Company
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 42px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'left'
  ctx.shadowColor = '#00ff88'
  ctx.shadowBlur = 8
  ctx.fillText(experience.company, 40, 70)
  ctx.shadowBlur = 0

  // Role
  ctx.fillStyle = '#00ff88'
  ctx.font = '32px Microsoft YaHei, Arial, sans-serif'
  ctx.fillText(experience.role, 40, 130)

  // Period
  ctx.fillStyle = '#888888'
  ctx.font = '24px Microsoft YaHei, Arial, sans-serif'
  ctx.fillText(experience.period, 40, 180)

  // Decorative dot
  ctx.fillStyle = '#00ff88'
  ctx.beginPath()
  ctx.arc(760, 40, 20, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function createProjectTexture(project: ProjectData): THREE.CanvasTexture {
  const { canvas, ctx } = createCanvas(900, 400)

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(30, 0, 50, 0.9)')
  gradient.addColorStop(1, 'rgba(60, 0, 100, 0.9)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 900, 400)

  // Border
  ctx.strokeStyle = '#bf5af2'
  ctx.lineWidth = 3
  ctx.shadowColor = '#bf5af2'
  ctx.shadowBlur = 15
  ctx.strokeRect(8, 8, 884, 384)
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

  // Description
  ctx.fillStyle = '#cccccc'
  ctx.font = '26px Microsoft YaHei, Arial, sans-serif'
  ctx.textAlign = 'left'
  const descY = currentY + 70

  // Word wrap description
  const maxWidth = 820
  const words = project.description.split('')
  let line = ''
  let y = descY

  words.forEach((char) => {
    const testLine = line + char
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, 40, y)
      line = char
      y += 40
    } else {
      line = testLine
    }
  })
  ctx.fillText(line, 40, y)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
