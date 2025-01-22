import { cn } from "@/lib/utils";
import _ from "lodash";
import { Fragment } from "react";
import { format } from "date-fns";

export function GridTimeline({
  birthDate,
  currentDate,
  agiDate,
}: {
  birthDate: Date;
  currentDate: Date;
  agiDate: Date;
}) {
  const weekNumbers = _.range(0, 52);
  // birthdate.getFullYear()
  // agiDate.getFullYear()
  // years from birth year to AGI year
  const birthYear = birthDate.getFullYear();
  const birthMiliseconds = birthDate.getTime();
  const agiMiliseconds = agiDate.getTime();
  const currentMiliseconds = currentDate.getTime();
  const agiYear = agiDate.getFullYear();
  const years = _.range(birthYear, agiYear + 1);
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  return (
    <div>
      <div className="mt-4">
        <p className="mt-4">
          According to{" "}
          <a href="https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/">
            Metaculus
          </a>
          , the median date we should expect AGI to arrive is{" "}
          {format(agiDate, "MMMM d, yyyy")}.
        </p>
      </div>

      <div
        style={{
          gridTemplateColumns: "3rem repeat(52, 1fr)",
          gridTemplateRows: "2rem repeat(" + years.length + ", 1fr)",
        }}
        className="grid gap-0.5 w-full"
      >
        {/* <div className="bg-green-600 h-4 w-4 col-start-1 row-start-1" />
      <div className="bg-red-600 h-4 w-4 col-start-2 row-start-2" /> */}

        {/* week labels */}
        {weekNumbers.map((weekNumber) =>
          weekNumber % 5 === 0 ? (
            <div
              key={weekNumber}
              className="bg-gray-200 w-0 flex items-end text-sm"
              style={{
                gridColumnStart: weekNumber + 2,
                gridRowStart: 1,
              }}
            >
              {weekNumber}
            </div>
          ) : null
        )}

        {years.map((year, yearIndex) => (
          <Fragment key={year}>
            {/* Year label */}
            {(year === birthYear ||
              year === agiYear ||
              (year % 5 === 0 &&
                Math.abs(year - birthYear) > 1 &&
                Math.abs(year - agiYear) > 1)) && (
              <div
                style={{
                  gridColumnStart: 1,
                  gridRowStart: yearIndex + 2,
                }}
                className="bg-gray-200 h-0 text-right pr-2"
              >
                {year}
              </div>
            )}

            {/* Squares */}
            {weekNumbers.map((weekNumber) => {
              const squareDateInMiliseconds =
                new Date(year, 0, 1).getTime() + weekNumber * msPerWeek;

              return (
                <div
                  className={cn(
                    "w-full aspect-square min-w-0",
                    squareDateInMiliseconds < birthMiliseconds ||
                      squareDateInMiliseconds > agiMiliseconds
                      ? "bg-white"
                      : squareDateInMiliseconds < currentMiliseconds
                      ? "bg-green-500"
                      : "bg-gray-300"
                  )}
                  key={weekNumber}
                  style={{
                    gridColumnStart: weekNumber + 2,
                    gridRowStart: yearIndex + 2,
                  }}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
