"use client";

import React, { useState } from "react";
import { getAgiDate } from "@/lib/get-agi-date";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GridTimeline } from "@/components/grid-timeline";
import { useQuery } from "@tanstack/react-query";

const AGILifeTimeline: React.FC = () => {
  const [birthday, setBirthday] = useState<string>("");

  const {
    data: agiDate,
    isLoading: agiDateIsLoading,
    error: agiDateError,
  } = useQuery({
    queryKey: ["agiDate"],
    queryFn: getAgiDate,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const birthdayValue = formData.get("birthday") as string;
    setBirthday(birthdayValue);
  };

  return (
    <div>
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
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
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
      )}
    </div>
  );
};

export default AGILifeTimeline;
