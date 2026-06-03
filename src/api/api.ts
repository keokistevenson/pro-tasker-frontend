const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export type Project = {
    _id: string;
    name: string;
    description?: string;
    user: string;
    createdAt?: string;
    updatedAt?: string;
};

export type Task = {
    _id: string;
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Done";
    project: string;
    createdAt?: string;
    updatedAt?: string;
};

function getAuthHeaders(token: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Request failed.");
    }

    return data;
}

export async function getProjects(token: string) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<Project[]>(response);
}

export async function getProjectById(projectId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<Project>(response);
}

export async function createProject(
    projectData: { name: string; description: string },
    token: string
) {
    const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(projectData),
    });

    return handleResponse<Project>(response);
}

export async function updateProject(
    projectId: string,
    projectData: { name: string; description: string },
    token: string
) {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify(projectData),
    });

    return handleResponse<Project>(response);
}

export async function deleteProject(projectId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
    });

    return handleResponse<{ message: string; project: Project }>(response);
}

export async function getTasksForProject(projectId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<Task[]>(response);
}

export async function getTaskById(taskId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<Task>(response);
}

export async function createTask(
    projectId: string,
    taskData: {
        title: string;
        description: string;
        status: "To Do" | "In Progress" | "Done";
    },
    token: string
) {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskData),
    });

    return handleResponse<Task>(response);
}

export async function updateTask(
    taskId: string,
    taskData: Partial<{
        title: string;
        description: string;
        status: "To Do" | "In Progress" | "Done";
    }>,
    token: string
) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: getAuthHeaders(token),
        body: JSON.stringify(taskData),
    });

    return handleResponse<Task>(response);
}

export async function deleteTask(taskId: string, token: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
    });

    return handleResponse<{ message: string; task: Task }>(response);
}