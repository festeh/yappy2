import { TodoistApi } from "@doist/todoist-api-typescript"

const apiKey = import.meta.env.VITE_TODOIST_API_KEY

export async function getProjectName(projectId: string) {
  if (localStorage.getItem(`project-${projectId}`)) {
    return localStorage.getItem(`project-${projectId}`)
  }
  const api = new TodoistApi(apiKey)
  const project = await api.getProject(projectId)
  localStorage.setItem(`project-${projectId}`, project.name)
  return project.name
}

function getRandomString(length: number) {
  const alphanumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length))
  }
  return result
}

export async function getTodayTasks() {
  const api = new TodoistApi(apiKey)
  // Add a random string to the search query to prevent caching
  const args = {
    filter: "today&!search:" + getRandomString(10),
  }
  let tasks = await api.getTasks(args)
  return await Promise.all(tasks.map(async task => {
    return {
      id: task.id,
      content: task.content,
      projectId: task.projectId,
    }
  }))
}
