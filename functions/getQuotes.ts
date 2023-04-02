import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;

interface Event {
  httpMethod: string;
  body: string;
}

interface Context {}

const getPrompt = (inputText: string) => {

  const prompt = `
  Please return a list of 10 quotes from well known and respected authors.
  The quotes should be relevant to the following situation:
  ===START===
  ${inputText}
  ===END===
  Please use the following format for each quote (one quote per line):
  Author Name #### Quote

  For example:
  Albert Einstein #### Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.

  Quotes:
  `;
}

export const handler = async (event: Event, context: Context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { prompt } = JSON.parse(event.body);
  const finalPrompt = getPrompt(prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        finalPrompt,
        model:"text-davinci-003",
        max_tokens: 3000,
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

    console.log(response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ quote: response.data.choices[0].text.trim() }),
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
