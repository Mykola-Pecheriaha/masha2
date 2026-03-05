// Declarations to allow importing CSS, images and SVGs in TypeScript files
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
declare module '*.less'

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.avif'

declare module '*.svg' {
  const content: any
  export default content
}

export {}
