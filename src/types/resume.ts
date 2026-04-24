export interface Social {
  platform: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  title: string
  avatar: string
  email: string
  phone: string
  location: string
  socials: Social[]
  bio: string
}

export interface Experience {
  company: string
  role: string
  period: string
  color: string
  highlights: string[]
}

export interface Project {
  name: string
  tech: string[]
  category: 'frontend' | 'backend' | 'fullstack'
  description: string
  link: string
}

export interface SceneConfig {
  themeColor: string
  accentColor: string
  nebulaColor: string
  starCount: number
}

export interface ResumeData {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  scene: SceneConfig
}
