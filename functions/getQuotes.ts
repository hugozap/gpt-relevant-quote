import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

interface Event {
  httpMethod: string;
  body: string;
}

interface Context {}

export const handler = async (event: Event, context: Context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { prompt } = JSON.parse(event.body);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ quote: response.data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
