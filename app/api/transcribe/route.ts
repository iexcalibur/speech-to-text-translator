import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not configured in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;
    const fromLanguage = formData.get('fromLanguage') as string;
    const toLanguage = formData.get('toLanguage') as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    console.log('Received audio file:', {
      type: audioFile.type,
      size: audioFile.size,
      fromLanguage,
      toLanguage
    });

    // Step 1: Transcribe audio to text
    const formDataForApi = new FormData();
    formDataForApi.append('file', audioFile, 'audio.mp3');
    formDataForApi.append('model', 'whisper-1');

    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formDataForApi,
    });

    if (!transcriptionResponse.ok) {
      const errorData = await transcriptionResponse.json();
      console.error('Transcription API Error:', errorData);
      throw new Error(`Transcription API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const transcriptionData = await transcriptionResponse.json();
    const transcribedText = transcriptionData.text;

    // Step 2: Translate the text using GPT-4
    const translationResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate the following text from ${fromLanguage} to ${toLanguage}. Provide only the translation without any explanations or additional text.`
        },
        {
          role: "user",
          content: transcribedText
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent translations
      max_tokens: 1000
    });

    const translatedText = translationResponse.choices[0].message.content;

    return NextResponse.json({ 
      originalText: transcribedText,
      translatedText: translatedText 
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Error processing request', details: error },
      { status: 500 }
    );
  }
} 