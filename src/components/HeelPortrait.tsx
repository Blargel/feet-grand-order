import Image from "next/image";

export interface HeelPortraitProps {
  footId: number;
}

export function HeelPortrait({footId}: HeelPortraitProps) {
  return (
    <Image
      src={`/feet/${footId}.png`}
      alt="Someone's foot?"
      width={208}
      height={232}
      priority
    />
  )
}