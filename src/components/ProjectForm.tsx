import { useState } from "react";
import ImageUpload, { type ImagePreview } from "./ImageUpload";

type ProjectFormData = {
  name: string;
  description: string;
  imagePreview?: ImagePreview | null;
};

type ProjectFormProps = {
  onSubmit: (projectData: ProjectFormData) => Promise<void>;
};

function ProjectForm({ onSubmit }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const [resetKey, setResetKey] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onSubmit({
      name,
      description,
      imagePreview,
    });

    setName("");
    setDescription("");
    setImagePreview(null);
    setResetKey((prev) => prev + 1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Project</h2>

      <div>
        <label htmlFor="project-name">Project Name</label>
        <input
          id="project-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <ImageUpload
        key={resetKey}
        onImageSelect={setImagePreview}
      />

      <button type="submit">Add Project</button>
    </form>
  );
}

export default ProjectForm;