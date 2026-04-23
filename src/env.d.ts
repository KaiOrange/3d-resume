declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.glb' {
  const content: string
  export default content
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
