import { useState } from "react";

type ProjectFormProps = {
    onSubmit: (projectData: { name: string; description: string }) => Promise<void>;
};

function ProjectForm({ onSubmit }: ProjectFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await onSubmit({ name, description });

        setName("");
        setDescription("");
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

            <button type="submit">Add Project</button>
        </form>
    );
}

export default ProjectForm;