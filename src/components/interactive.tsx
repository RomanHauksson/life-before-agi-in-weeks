"use client";

import React, { useState } from "react";
import { getAgiDate } from "@/lib/get-agi-date";
import { Input } from "@/components/ui/input";
import { Timeline } from "@/components/timeline";
import { useQuery } from "@tanstack/react-query";

const Interactive: React.FC = () => {
  const [birthdate, setBirthdate] = useState<string>("");

  const {
    data: agiDate,
    isLoading: agiDateIsLoading,
    error: agiDateError,
  } = useQuery({
    queryKey: ["agiDate"],
    queryFn: getAgiDate,
  });

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-center w-full">
        <label htmlFor="birthday" className="font-medium text-lg">
          Your birthday:
        </label>
        <Input
          className="align-center text-lg w-48"
          type="date"
          id="birthday"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </div>
      {birthdate !== "" &&
      new Date(birthdate + "T12:00:00") >= new Date("1900-01-01") &&
      new Date(birthdate + "T12:00:00") <= new Date() ? (
        agiDateIsLoading ? (
          <div>Loading...</div>
        ) : agiDateError || !agiDate ? (
          <div>Error retrieving expected AGI arrival date from Metaculus.</div>
        ) : (
          <Timeline
            birthDate={new Date(birthdate + "T12:00:00")}
            currentDate={new Date()}
            agiDate={agiDate}
          />
        )
      ) : birthdate !== "" ? (
        <div>Please enter a date between 1900 and today.</div>
      ) : null}
    </>
  );
};

export default Interactive;
