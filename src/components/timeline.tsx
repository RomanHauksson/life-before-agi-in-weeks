import { cn } from "@/lib/utils";
import _ from "lodash";
import { Fragment } from "react";
import { format } from "date-fns";

export function Timeline({
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
  console.log("birthYear: ", birthYear);
  console.log("birthdate: ", birthDate);
  console.log("years: ", years);
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  return (
    <>
      <div
        style={{
          gridTemplateColumns: "1fr 1fr repeat(52, 1fr)",
          gridTemplateRows: "1rem 1rem repeat(" + years.length + ", 1fr)",
        }}
        className="grid gap-0.5 w-full mb-4"
      >
        <div
          style={{
            gridColumnStart: 3,
            gridColumnEnd: -1,
            gridRowStart: 1,
            alignSelf: "end",
          }}
        >
          Week number →
        </div>

        {/* year number label */}

        <div
          style={{ gridColumnStart: 1, gridRowStart: 3, gridRowEnd: -1 }}
          className="writing-vertical whitespace-nowrap"
        >
          <span style={{ writingMode: "vertical-rl" }}>Year →</span>
        </div>

        {/* week labels */}
        {weekNumbers.map((weekNumber) =>
          (weekNumber + 1) % 5 === 0 || weekNumber === 0 ? (
            <div
              key={weekNumber}
              className="bg-gray-200 w-0 flex items-end text-sm"
              style={{
                gridColumnStart: weekNumber + 3,
                gridRowStart: 2,
              }}
            >
              {weekNumber + 1}
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
                  gridColumnStart: 2,
                  gridRowStart: yearIndex + 3,
                }}
                className="bg-gray-200 h-0 text-right pr-2 leading-none"
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
                    gridColumnStart: weekNumber + 3,
                    gridRowStart: yearIndex + 3,
                  }}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-center text-center text-lg font-medium">
        <p>
          According to{" "}
          <a
            className="text-blue-500 hover:text-blue-700 underline"
            href="https://www.metaculus.com/questions/5121/date-of-artificial-general-intelligence/"
          >
            Metaculus
          </a>
          , the median date we should expect AGI to arrive is{" "}
          <span className="font-bold">{format(agiDate, "MMMM d, yyyy")}</span>.
        </p>
        <p>
          You have lived{" "}
          {Math.round(
            ((currentMiliseconds - birthMiliseconds) /
              (agiMiliseconds - birthMiliseconds)) *
              100
          )}
          % of your pre-AGI life.
        </p>
      </div>
    </>
  );
}
