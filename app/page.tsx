'use client';
import { useState } from 'react';
import { useAudioRecorder } from './hooks/useAudioRecorder';
import { TranslationEngine } from './components/TranslationEngine';
import { LanguageSelector } from './components/LanguageSelector';
import { TextInput } from './components/TextInput';
import { TranslatedOutput } from './components/TranslatedOutput';
import { ActionButtons } from './components/ActionButtons';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [fromLanguage, setFromLanguage] = useState('detect');
  const [toLanguage, setToLanguage] = useState('en');
  const [selectedEngine, setSelectedEngine] = useState('gpt4');
  const { isRecording, startRecording, stopRecording, getAudioBlob } = useAudioRecorder();
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 5000;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const newCount = newText.length;
    
    if (newCount <= MAX_CHARS) {
      setInputText(newText);
      setCharCount(newCount);
    }
  };

  const handleMicClick = async () => {
    try {
      if (!isRecording) {
        if (charCount >= MAX_CHARS) {
          alert('Character limit reached. Cannot record more text.');
          return;
        }
        await startRecording();
      } else {
        setIsTranscribing(true);
        await stopRecording();
        const audioBlob = getAudioBlob();
        if (audioBlob) {
          const formData = new FormData();
          formData.append('audio', audioBlob);
          formData.append('fromLanguage', fromLanguage);
          formData.append('toLanguage', toLanguage);

          const response = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const { originalText, translatedText: transcribedTranslation } = await response.json();
            if (originalText) {
              if ((charCount + originalText.length) > MAX_CHARS) {
                alert('Transcription would exceed character limit. Text has been truncated.');
                const truncatedText = originalText.slice(0, MAX_CHARS - charCount);
                setInputText(prevText => prevText + truncatedText);
                setCharCount(MAX_CHARS);
              } else {
                setInputText(prevText => prevText + originalText);
                setCharCount(prevCount => prevCount + originalText.length);
              }
              if (transcribedTranslation) {
                setTranslatedText(transcribedTranslation);
              }
            }
          }
        }
        setIsTranscribing(false);
      }
    } catch (error) {
      console.error('Error handling recording:', error);
      setIsTranscribing(false);
    }
  };

  const handleSwapLanguages = () => {
    if (fromLanguage === 'detect') return;
    
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          fromLanguage,
          toLanguage,
          engine: selectedEngine
        }),
      });

      if (response.ok) {
        const { translatedText } = await response.json();
        setTranslatedText(translatedText);
      } else {
        console.error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setCharCount(0);
  };

  return (
    <div className="min-h-screen bg-red-200">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-[1288px] h-[696px] bg-white rounded-[14px] shadow-lg p-8 text-black">
          <h1 className="text-3xl font-bold text-center mb-12 text-black">Translate Your Text</h1>
          
          <div className="space-y-6">
            <TranslationEngine 
              selectedEngine={selectedEngine}
              setSelectedEngine={setSelectedEngine}
            />

            <LanguageSelector 
              fromLanguage={fromLanguage}
              toLanguage={toLanguage}
              setFromLanguage={setFromLanguage}
              setToLanguage={setToLanguage}
              onSwap={handleSwapLanguages}
            />

            <div className="flex gap-4">
              <TextInput 
                inputText={inputText}
                charCount={charCount}
                maxChars={MAX_CHARS}
                isRecording={isRecording}
                isTranscribing={isTranscribing}
                onInputChange={handleInputChange}
                onMicClick={handleMicClick}
              />

              <TranslatedOutput 
                translatedText={translatedText}
                onCopy={handleCopy}
              />
            </div>

            <ActionButtons 
              onTranslate={handleTranslate}
              onClear={handleClear}
              isTranslating={isTranslating}
              hasInput={!!inputText.trim()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
