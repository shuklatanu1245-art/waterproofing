"use client";

import { useState } from "react";
import { Upload, Loader2, Check, X } from "lucide-react";

interface CloudinaryUploadProps {
  onUploadSuccess?: (url: string) => void;
  folder?: string;
  resourceType?: "image" | "video";
  label?: string;
  name?: string;
}

export function CloudinaryUpload({ 
  onUploadSuccess, 
  folder = "waterproofing_site", 
  resourceType = "image",
  label = "Upload File",
  name = "url"
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError("File exceeds 50MB limit");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "j7fxnobg";
      const uploadPreset = "ml_default";

      // Upload directly to Cloudinary using Unsigned Upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      if (folder) {
        formData.append("folder", folder);
      }

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadRes.ok) {
        const errData = await uploadRes.json();
        throw new Error(errData.error?.message || "Failed to upload to Cloudinary");
      }

      const data = await uploadRes.json();
      
      setSuccess(true);
      setUploadedUrl(data.secure_url);
      if (onUploadSuccess) onUploadSuccess(data.secure_url);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        <label className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
          <Upload className="w-4 h-4 mr-2" />
          <span>Choose File</span>
          <input
            type="file"
            className="sr-only"
            accept={resourceType === "image" ? "image/*" : "video/*"}
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
        
        {isUploading && (
          <div className="flex items-center text-blue-600 text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Uploading...
          </div>
        )}
        
        {success && (
          <div className="flex items-center text-green-600 text-sm">
            <Check className="w-4 h-4 mr-1" />
            Uploaded successfully
          </div>
        )}
        
        {error && (
          <div className="flex items-center text-red-600 text-sm">
            <X className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </div>
      {uploadedUrl && <input type="hidden" name={name} value={uploadedUrl} />}
    </div>
  );
}
