import Image from "next/image";

export interface ClassIconProps {
  classId: number;
}

export function ClassIcon({ classId }: ClassIconProps) {
  return (
    <Image
      src={`https://static.atlasacademy.io/JP/ClassIcons/class3_${classId}.png`}
      alt={"servant icon " + classId}
      width={30}
      height={30}
    />
  );
}
