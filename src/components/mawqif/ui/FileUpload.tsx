'use client';
import { useState, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  label: string;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  onFileChange?: (file: File | null) => void;
  hint?: string;
}

export default function FileUpload({
  label,
  required = false,
  accept = 'image/jpeg,image/png,application/pdf',
  maxSizeMB = 5,
  onFileChange,
  hint,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateUpload = (f: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 150);
  };

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (f.size > maxSizeMB * 1024 * 1024) {
      setError(`حجم الملف يتجاوز ${maxSizeMB}MB`);
      return;
    }
    setFile(f);
    onFileChange?.(f);
    if (f.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
    simulateUpload(f);
  }, [maxSizeMB, onFileChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    setUploadProgress(0);
    setError(null);
    onFileChange?.(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--mw-text)' }}>
        {label}
        {required && <span style={{ color: 'var(--mw-error)', marginRight: '0.25rem' }}>*</span>}
        {!required && <span style={{ color: 'var(--mw-muted)', fontSize: '0.8rem', marginRight: '0.4rem' }}>(اختياري)</span>}
      </label>

      {!file ? (
        <div
          className={`mw-upload-zone ${isDragging ? 'active' : ''}`}
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => document.getElementById(`upload-${label}`)?.click()}
          style={{ cursor: 'pointer' }}
        >
          <input
            id={`upload-${label}`}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              background: 'rgba(22,119,168,0.08)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--mw-secondary)',
            }}>
              <Upload size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--mw-text)', marginBottom: '0.25rem' }}>
                اسحب الملف هنا أو <span style={{ color: 'var(--mw-secondary)' }}>اضغط لاختياره</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--mw-muted)' }}>
                الصيغ المسموحة: JPG، PNG، PDF &nbsp;|&nbsp; الحجم الأقصى: {maxSizeMB}MB
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mw-upload-zone has-file" style={{ cursor: 'default', padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Preview or Icon */}
            {preview ? (
              <img
                src={preview}
                alt="preview"
                style={{ width: '4rem', height: '4rem', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, border: '1px solid var(--mw-border)' }}
              />
            ) : (
              <div style={{
                width: '4rem',
                height: '4rem',
                background: 'rgba(22,119,168,0.08)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--mw-secondary)',
              }}>
                <FileText size={28} />
              </div>
            )}

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--mw-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name}
                </span>
                <button onClick={removeFile} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--mw-muted)', padding: '0.125rem', flexShrink: 0, display: 'flex' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--mw-muted)', marginBottom: '0.5rem' }}>
                {file.type.split('/')[1]?.toUpperCase()} · {formatSize(file.size)}
              </div>

              {/* Progress Bar */}
              <div style={{ height: '4px', background: 'var(--mw-border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(uploadProgress, 100)}%`,
                  background: uploadProgress >= 100 ? 'var(--mw-accent)' : 'var(--mw-secondary)',
                  transition: 'width 0.2s ease',
                  borderRadius: '2px',
                }} />
              </div>

              {uploadProgress >= 100 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.35rem', color: 'var(--mw-success)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <CheckCircle size={13} />
                  تم الرفع بنجاح
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--mw-error)', fontSize: '0.82rem' }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {hint && !error && (
        <div style={{ fontSize: '0.8rem', color: 'var(--mw-muted)' }}>{hint}</div>
      )}
    </div>
  );
}
