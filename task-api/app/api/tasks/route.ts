import { NextResponse } from "next/server";
import { initializeDataSource } from "@/app/dbConfig/init-data-source";
import { TaskService } from "@/app/services/taskService";

export async function POST(req: Request) {
  try {
    // Inicializar la conexión a la base de datos
    await initializeDataSource();

    // Parsear el cuerpo de la solicitud
    const body = await req.json();

    // Validar campos requeridos
    if (!body.title || typeof body.title !== "string") {
      return NextResponse.json(
        { message: "El campo 'title' es obligatorio y debe ser una cadena." },
        { status: 400 }
      );
    }

    // Crear instancia del servicio
    const taskService = new TaskService();

    // Crear la tarea
    const task = await taskService.createTaskService(body.title, body.completed ?? false);

    // Responder con la tarea creada
    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear la tarea:", error);

    // Manejo de errores genéricos
    return NextResponse.json(
      { message: "Error al crear la tarea", error: error.message },
      { status: 500 }
    );
  }
}
