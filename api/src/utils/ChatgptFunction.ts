import axios, { AxiosResponse } from 'axios';

const idModel = "gpt-3.5-turbo-16k";
const link = "https://api.openai.com/v1/chat/completions";

export async function callChatGPT(text: string): Promise<string> {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.API_KEY}`,
      'Content-Type': 'application/json'
    };

    const bodyMessage = {
      model: idModel,
      messages: [{ role: 'user', content: text }]
    };

    const response: AxiosResponse<any> = await axios.post(link, bodyMessage, { headers });
    const message = response.data.choices[0].message.content;

    return message;
    
  } catch (error: any) {
    console.error('Error calling ChatGPT:', error.response.statusText);
    throw error;
  }
}
