import { useState } from "react";

export type ImagePreview = {
  previewUrl: string;
  fileName: string;
};

type ImageUploadProps = {
  onImageSelect: (image: ImagePreview | null) => void;
};

function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      setPreviewUrl("");
      setFileName("");
      onImageSelect(null);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result as string;

      setPreviewUrl(imageDataUrl);
      setFileName(file.name);

      onImageSelect({
        previewUrl: imageDataUrl,
        fileName: file.name,
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="image-upload">
      <label htmlFor="project-image">Project Image</label>

      <input
        id="project-image"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {fileName && <p>Selected file: {fileName}</p>}

      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl} alt="Selected project preview" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;