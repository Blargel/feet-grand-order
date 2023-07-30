import { Dispatch, SetStateAction, useState } from "react";
import { ClassIcon } from "./ClassIcon";

const CLASS_FILTERS = [
  [
    1001, // all
    1, // saber
    2, // archer
    3,
  ], // lancer
  [
    4, // rider
    5, // caster
    6, // assassin
    7, // berserker
    1002,
  ], // extra
];

const EXTRA_CLASSES = [
  8, // shielder
  9, // ruler
  10, // alter ego
  11, // avenger
  23, // moon cancer
  25, // foreigner
  28, // pretender
  33, // playable beast
];

export interface ClassFilterProps {
  onClassFilterChanged: Dispatch<SetStateAction<number[]>>;
}

export function ClassFilter({ onClassFilterChanged }: ClassFilterProps) {
  const [currentClassId, setCurrentClassId] = useState(1001);

  return (
    <div className="flex flex-wrap justify-center">
      {CLASS_FILTERS.map((classGroup) => {
        return (
          <div className="flex justify-center" key={classGroup.join()}>
            {classGroup.map((classId) => {
              const className =
                classId === currentClassId
                  ? "p-1"
                  : "p-1 opacity-50 cursor-pointer";

              return (
                <div
                  className={className}
                  key={classId}
                  onClick={() => {
                    setCurrentClassId(classId);
                    if (classId === 1001) {
                      onClassFilterChanged([]);
                    } else if (classId === 1002) {
                      onClassFilterChanged(EXTRA_CLASSES);
                    } else {
                      onClassFilterChanged([classId]);
                    }
                  }}
                >
                  <ClassIcon classId={classId} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
