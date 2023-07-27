import type { ServantClass } from "@/servants";
import Image from "next/image";

export interface ClassIconProps {
  servantClass: ServantClass;
}

export function ClassIcon({ servantClass }: ClassIconProps) {
  return (
    <Image
      src={`/class/${servantClass}.png`}
      alt={servantClass}
      width={30}
      height={30}
    />
  );
}
