import { NextResponse } from "next/server";
import { initializeDataSource } from "@/app/dbConfig/init-data-source";
import { TaskService } from "@/app/services/taskService";

// GET todas las tareas
export async function GET() {
  try {
    await initializeDataSource();
    const taskService = new TaskService();
    const tasks = await taskService.getAllTasksService();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener las tareas:", error);
    return NextResponse.json({ message: "Error al obtener las tareas" }, { status: 500 });
  }
}

// POST para crear una nueva tarea
export async function POST(req: Request) {
  try {
    await initializeDataSource();
    const body = await req.json();
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { message: "El campo 'title' es obligatorio y debe ser una cadena." },
        { status: 400 }
      );
    }
    const taskService = new TaskService();
    const task = await taskService.createTaskService(body.title, body.completed ?? false);
    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear la tarea:", error);
    return NextResponse.json({ message: "Error al crear la tarea" }, { status: 500 });
  }
}
