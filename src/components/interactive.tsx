"use client";

import React, { useState } from "react";
import { getAgiDate } from "@/lib/get-agi-date";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GridTimeline } from "@/components/grid-timeline";
import { useQuery } from "@tanstack/react-query";

const AGILifeTimeline: React.FC = () => {
  const [birthdate, setBirthdate] = useState<string>("");

  const {
    data: agiDate,
    isLoading: agiDateIsLoading,
    error: agiDateError,
  } = useQuery({
    queryKey: ["agiDate"],
    queryFn: getAgiDate,
  });

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const formData = new FormData(form);
  //   const birthdayValue = formData.get("birthday") as string;
  //   setBirthdate(birthdayValue);
  // };

  return (
    <>
      <div>
        <Input
          className="w-[200px]"
          type="date"
          id="birthday"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
        {birthdate !== "" &&
          (agiDateIsLoading ? (
            <div>Loading...</div>
          ) : agiDateError || !agiDate ? (
            <div>
              Error retrieving expected AGI arrival date from Metaculus.
            </div>
          ) : (
            <GridTimeline
              birthDate={new Date(birthdate)}
              currentDate={new Date()}
              agiDate={agiDate}
            />
          ))}
      </div>

      {/* <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-700"
            >
              Your birthday
            </label>
            <Input
              className="w-[200px]"
              type="date"
              id="birthday"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Give me existential dread</Button>
        </form>

        {agiDate && (
          <>
            <GridTimeline
              birthDate={new Date("2003-03-01")}
              currentDate={new Date()}
              agiDate={agiDate}
            />
          </>
        )} */}
      {/* </div> */}
    </>
  );
};

export default AGILifeTimeline;
