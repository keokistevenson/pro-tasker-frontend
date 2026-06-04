import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../api/api";
import type { ImagePreview } from "./ImageUpload";

type ProjectWithImage = Project & {
    imagePreview?: ImagePreview | null;
};

type ProjectCardProps = {
    project: ProjectWithImage;
    onDelete: (projectId: string) => void;
    onUpdate: (
        projectId: string,
        projectData: { name: string; description: string }
    ) => Promise<void>;
};

function ProjectCard({ project, onDelete, onUpdate }: ProjectCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description || "");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await onUpdate(project._id, { name, description });
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <article className="card">
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            </article>
        );
    }

    return (
        <article className="card project-card">
            {project.imagePreview?.previewUrl && (
                <img
                    className="project-card-image"
                    src={project.imagePreview.previewUrl}
                    alt={`Preview for ${project.name}`}
                />
            )}

            <div>
                <h2>{project.name}</h2>
                <p>{project.description || "No description provided."}</p>

                <Link
                    to={`/projects/${project._id}`}
                    state={{ imagePreview: project.imagePreview }}
                >
                    View Details
                </Link>

                <button type="button" onClick={() => setIsEditing(true)}>
                    Edit
                </button>
                <button type="button" onClick={() => onDelete(project._id)}>
                    Delete
                </button>
            </div>
        </article>
    );
}

export default ProjectCard;