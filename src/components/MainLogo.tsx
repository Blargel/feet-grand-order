import Image from 'next/image'

export function MainLogo() {
  return (
    <div className="relative max-w-[551px] w-screen aspect-[551/248]">
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/feet-grand-order-logo.png"
        alt="Feet/Grand Order"
        fill
        priority
      />
    </div>
  )
}
