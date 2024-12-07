import { NextResponse } from "next/server";
import { initializeDataSource } from "@/app/dbConfig/init-data-source";
import { TaskService } from "@/app/services/taskService";

// GET una tarea por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDataSource();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "El ID de la tarea es obligatorio." }, { status: 400 });
    }

    const taskService = new TaskService();
    const task = await taskService.getTaskById(id);

    if (!task) {
      return NextResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error: any) {
    console.error("Error al obtener la tarea:", error.message);
    return NextResponse.json({ message: "Error al obtener la tarea", error: error.message }, { status: 500 });
  }
}

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await initializeDataSource();
//     const { id } = params;
//     const taskService = new TaskService();
//     const task = await taskService.getTaskById(id);
//     if (!task) {
//       return NextResponse.json({ message: "Tarea no encontrada" }, { status: 404 });
//     }
//     return NextResponse.json(task, { status: 200 });
//   } catch (error: any) {
//     console.error("Error al obtener la tarea:", error);
//     return NextResponse.json({ message: "Error al obtener la tarea" }, { status: 500 });
//   }
// }

// PUT para actualizar una tarea por ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await initializeDataSource();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "El ID de la tarea es obligatorio." }, { status: 400 });
    }

    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ message: "No se proporcionaron datos para actualizar." }, { status: 400 });
    }

    const taskService = new TaskService();
    const updatedTask = await taskService.updateTask(id, body);

    if (!updatedTask) {
      return NextResponse.json({ message: "Tarea no encontrada o no actualizada" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error: any) {
    console.error("Error al actualizar la tarea:", error.message);
    return NextResponse.json({ message: "Error al actualizar la tarea", error: error.message }, { status: 500 });
  }
}

// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await initializeDataSource();
//     const { id } = params;
//     const body = await req.json();
//     const taskService = new TaskService();
//     const updatedTask = await taskService.updatetask(id, body);
//     if (!updatedTask) {
//       return NextResponse.json({ message: "Tarea no encontrada o no actualizada" }, { status: 404 });
//     }
//     return NextResponse.json(updatedTask, { status: 200 });
//   } catch (error: any) {
//     console.error("Error al actualizar la tarea:", error);
//     return NextResponse.json({ message: "Error al actualizar la tarea" }, { status: 500 });
//   }
// }
