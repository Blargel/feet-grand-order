import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface HeelPortraitProps {
  footId: number;
}

export function HeelPortrait({footId}: HeelPortraitProps) {
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setLoading(false)
  }, [])

  // Dumb jank to get the previous image off the screen
  // when loading a new image
  useEffect(() => {
    setRefresh(true)
    setLoading(true)
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
    <div className="relative">
      {
        loading &&
          (
            <div className="absolute inset-0 flex justify-center items-center">
              <CircularProgress />
            </div>
          )
      }
      <Image
        src={`/feet/${footId}.png`}
        alt="Someone's foot?"
        width={208}
        height={232}
        onLoadingComplete={handleLoadComplete}
        priority
      />
    </div>
  )
}