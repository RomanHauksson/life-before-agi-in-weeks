import _ from "lodash";

export function MyTimeline({
  birthDate,
  currentDate,
  agiDate,
}: {
  birthDate: Date;
  currentDate: Date;
  agiDate: Date;
}) {
  const weekNumbers = Array.from({ length: 52 }, (_, i) => i + 1);
  const birthYear = birthDate.getFullYear();
  const birthMiliseconds = birthDate.getTime();
  const agiMiliseconds = agiDate.getTime();
  const currentMiliseconds = currentDate.getTime();
  const agiYear = agiDate.getFullYear();
  const years = _.range(birthYear, agiYear + 1);
  const msPerWeek = 1000 * 60 * 60 * 24 * 7;
  return (
    <div>
      <table className="border-separate border-spacing-1">
        <thead>
          <tr>
            <th />
            <th className="text-left" colSpan={weekNumbers.length}>
              Week
            </th>
          </tr>
          <tr>
            <th scope="col"></th>
            {weekNumbers.map((number) => (
              <th className="w-4 overflow-hidden" scope="col" key={number}>
                {(number % 5 === 0 || number === 1) && number}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {years.map((year) => (
            <tr key={year}>
              <th scope="row">
                {(year === birthYear || year === agiYear || year % 5 === 0) &&
                  year}
              </th>
              {weekNumbers.map((weekNumber) => {
                const squareDateInMiliseconds =
                  new Date(year, 0, 1).getTime() + weekNumber * msPerWeek;
                if (
                  squareDateInMiliseconds < birthMiliseconds ||
                  squareDateInMiliseconds > agiMiliseconds
                ) {
                  return (
                    <td key={weekNumber}>
                      <div className="bg-white h-4 w-4" />
                    </td>
                  );
                }
                if (squareDateInMiliseconds < currentMiliseconds) {
                  return (
                    <td key={weekNumber}>
                      <div className="border bg-green-600 w-4 h-4"></div>
                    </td>
                  );
                } else {
                  return (
                    <td key={weekNumber}>
                      <div className="border bg-gray-400 w-4 h-4"></div>
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
