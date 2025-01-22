"use server";

interface MetaculusPost {
  question: {
    possibilities: {
      scale: {
        min: string; // Date string
        max: string; // Date string
      };
    };
    aggregations: {
      recency_weighted: {
        latest: {
          centers: number[]; // Normalized prediction values
        };
      };
    };
  };
}

export async function getAgiDate(): Promise<Date> {
  const token = process.env.METACULUS_API_TOKEN;
  if (!token) {
    throw new Error("METACULUS_API_TOKEN environment variable is not set");
  }

  const response = await fetch("https://www.metaculus.com/api/posts/5121/", {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch Metaculus data");
  }

  const questionData: MetaculusPost = await response.json();
  console.log(questionData);

  const minDate = new Date(questionData.question.possibilities.scale.min);
  const maxDate = new Date(questionData.question.possibilities.scale.max);

  // Get the normalized median prediction (center value)
  const normalizedMedian =
    questionData.question.aggregations.recency_weighted.latest.centers[0];

  // Calculate the time range in milliseconds
  const timeRange = maxDate.getTime() - minDate.getTime();

  // Convert normalized prediction to actual date
  const predictionMs = minDate.getTime() + timeRange * normalizedMedian;

  return new Date(predictionMs);
}
