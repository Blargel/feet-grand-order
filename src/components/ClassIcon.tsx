import type { ServantClass } from "@/servants";
import Image from "next/image";

export interface ClassIconProps {
  className: ServantClass;
}

export function ClassIcon({className}: ClassIconProps) {
  return (
    <Image
      src={`/class/${className}.png`}
      alt="Someone's foot?"
      width={35}
      height={35}
    />
  )
}