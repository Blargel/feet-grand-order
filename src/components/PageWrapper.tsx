import { ReactNode } from "react";

export interface PageWrapperProps {
  children?: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="flex min-h-screen max-w-[1200px] mx-auto flex-col items-center px-2">
      {children}
    </main>
  );
}
