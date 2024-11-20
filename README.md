# Speech-to-text Translator

<img width="1754" alt="Screenshot 2024-11-21 at 3 12 26 AM" src="https://github.com/user-attachments/assets/88c24a03-2af4-43f2-86ae-17981bf88cd0">

This project is built using **Next.js** and integrates **ChatGPT API** with **Whisper Models** to provide a seamless text and speech translation experience.

## Features
- **Translation Engine**: Utilizes **GPT-4.0** for accurate language detection and translation.
- **Speech-to-Text**: Incorporates the **Whisper Model** to convert speech into text, which can then be translated.
- **Custom Language Selection**: 
  - Users can select both the source and target languages for translation.
  - Supports real-time language switching with a dedicated **switch button**.
- **Microphone Support**: Allows users to speak directly into the microphone, enabling real-time speech-to-text conversion followed by translation.
- **User-Friendly Interface**: Clean and intuitive design for easy navigation and usability.

## How It Works
1. Enter text manually or use the microphone to input speech.
2. Select the source language (or use automatic detection) and the desired target language for translation.
3. View the translated text instantly in the output section.
4. Switch between languages seamlessly using the **switch button**.

## Tech Stack
- **Frontend**: [Next.js](https://nextjs.org) for a modern and responsive UI.
- **API**: [OpenAI ChatGPT-4](https://openai.com/chatgpt) for language translation and detection.
- **Speech-to-Text**: [OpenAI Whisper Model](https://openai.com/whisper) for accurate speech processing.

## How to Use
1. Clone the repository:
   ```bash
   git clone https://github.com/iexcalibur/speech-to-text-translator.git
   ```
2. Navigate to the project directory:
   ```bash
   cd language-translator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add your OpenAI API key in the `.env` file:
   ```plaintext
   OPENAI_API_KEY=your_api_key_here
   ```
5. Run the application:
   ```bash
   npm run dev
   ```
6. Open your browser and go to `http://localhost:3000` to use the translator.



