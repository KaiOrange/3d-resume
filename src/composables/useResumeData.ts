import type { ResumeData } from '@/types/resume'
import resumeJson from '@/assets/resume.json'

export function useResumeData() {
  const data = resumeJson as ResumeData
  return { data }
}
