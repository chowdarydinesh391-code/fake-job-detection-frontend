import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { FileUp, Loader2 } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const MAX_FILE_SIZE_MB = 5;

const DragDropUploader = ({
  onExtractedText,
}: {
  onExtractedText: (text: string) => void;
}) => {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setFileName('');
    setError('');
    setLoading(false);
    onExtractedText('');
  };

  const handlePDF = async (file: File) => {
    try {
      setLoading(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str).join(' ');
        text += strings + '\n';
      }
      const extracted = text.trim();
      if (!extracted) {
        throw new Error('No selectable text found in this PDF. If it is a scanned/image-only PDF, please use a text-based PDF or TXT file.');
      }
      onExtractedText(extracted);
      setFileName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error reading PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleText = async (file: File) => {
    try {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        onExtractedText(text.trim());
        setFileName(file.name);
        setLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Error reading text file.');
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setError('');
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isTxt = file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt');
    if (isPdf) {
      handlePDF(file);
    } else if (isTxt) {
      handleText(file);
    } else {
      setError('Only .txt and .pdf files are supported.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-4">
      <div
  {...getRootProps()}
  className={`
    border-dashed border-2 rounded-lg p-6 text-center cursor-pointer transition-colors
    bg-white border-gray-200 text-gray-700
    dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200
    ${isDragActive ? 'bg-blue-50 dark:bg-blue-900' : ''}
  `}
>

        <input {...getInputProps()} />
        <FileUp className="w-10 h-10 text-blue-500 mb-2 animate-bounce" />
        {isDragActive ? (
          <p className="text-blue-700 font-medium text-lg">Drop the file here...</p>
        ) : (
          <p className="text-gray-700 font-medium">
            <span className="text-blue-600 font-semibold">Drag & drop</span> a job description <br />
            <span className="text-sm text-gray-500">(.txt or .pdf) here, or click to select</span>
          </p>
        )}
      </div>

      {loading && (
        <div className="flex items-center space-x-2 text-blue-600 font-medium">
          <Loader2 className="animate-spin w-5 h-5" />
          <p>Extracting text, please wait...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default DragDropUploader;
