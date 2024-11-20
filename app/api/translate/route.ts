import { NextResponse } from 'next/server';
import OpenAI from 'openai';

let openai: OpenAI;

try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
  });
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const { text, fromLanguage, toLanguage, engine } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    // Select the model based on the engine
    const model = engine === 'gpt4' ? 'gpt-4' : 'gpt-3.5-turbo';

    const translationResponse = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text from ${fromLanguage} to ${toLanguage}. Provide only the translation without any explanations or additional text.`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    });

    const translatedText = translationResponse.choices[0].message.content;

    return NextResponse.json({ translatedText });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate text' },
      { status: 500 }
    );
  }
} 