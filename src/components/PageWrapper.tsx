import { ReactNode } from "react"

export interface PageWrapperProps {
  children?: ReactNode
}

export function PageWrapper({children}: PageWrapperProps) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {children}
    </main>
  )
}
