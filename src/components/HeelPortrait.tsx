import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export interface HeelPortraitProps {
  footId: number;
}

export function HeelPortrait({ footId }: HeelPortraitProps) {
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Dumb jank to get the previous image off the screen
  // when loading a new image
  useEffect(() => {
    setRefresh(true);
  }, [footId]);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div className="relative w-[208px] h-[232px]">
      <div className="absolute inset-0 flex justify-center items-center">
        {loading && <CircularProgress />}
      </div>

      {!refresh && (
        <Image
          src={`/feet/${footId}.png`}
          alt="Someone's foot?"
          width={208}
          height={232}
          onLoadingComplete={handleLoadingComplete}
          priority
        />
      )}
    </div>
  );
}
