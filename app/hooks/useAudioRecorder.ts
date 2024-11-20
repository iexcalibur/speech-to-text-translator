import { useState, useCallback } from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      console.log('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone access granted');
      
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = (event) => {
        console.log('Received audio chunk:', event.data.size, 'bytes');
        if (event.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, event.data]);
        }
      };

      recorder.onstart = () => {
        console.log('MediaRecorder started');
        setAudioChunks([]);
      };

      recorder.onstop = () => {
        console.log('MediaRecorder stopped');
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
      };

      recorder.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }, []);

  const stopRecording = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        console.log('Stopping MediaRecorder...');
        
        mediaRecorder.addEventListener('stop', () => {
          console.log('MediaRecorder stopped, chunks:', audioChunks.length);
          resolve();
        });

        mediaRecorder.requestData();
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        setIsRecording(false);
      } else {
        resolve();
      }
    });
  }, [mediaRecorder, audioChunks]);

  const getAudioBlob = useCallback(() => {
    if (audioChunks.length === 0) {
      console.log('No audio chunks available');
      return null;
    }
    const blob = new Blob(audioChunks, { type: 'audio/mp3' });
    console.log('Created audio blob:', blob.size, 'bytes');
    return blob;
  }, [audioChunks]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    getAudioBlob,
  };
}; 