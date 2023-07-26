import Image from "next/image";
import { useEffect, useState } from "react";

export interface HeelPortraitProps {
  footId: number;
}

export function HeelPortrait({footId}: HeelPortraitProps) {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(true)
  }, [footId])

  useEffect(() => {
    if (refresh) {
      setRefresh(false)
    }
  }, [refresh])

  if (refresh) {
    return <div className="w-[208px] h=[232px]"/>
  }

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