import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";
import { tasksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const { projectId } = params;
        if (!projectId) {
            return sendResponse(400, "Bad Request");
        }

        const project = await db.select().from(tasksTable).where(eq(tasksTable.id, Number(projectId)));
        return sendResponse(200, "Successfully Fetched Data", project);
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}

export async function PUT(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const { projectId } = params;
        const { title, description, dueDate } = await req.json();
        if (!projectId || !title || !description || !dueDate) {
            return sendResponse(400, "Bad Request");
        }

        const updatedProject = await db
            .update(tasksTable)
            .set({ title, description, dueDate })
            .where(eq(tasksTable.id, Number(projectId)))
            .returning();

        return sendResponse(200, "Successfully Updated Project", updatedProject);
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const projectId = req.nextUrl.searchParams.get("projectId");
        if (!projectId) {
            return sendResponse(400, "Bad Request");
        }

        await db.delete(tasksTable).where(eq(tasksTable.id, Number(projectId)));
        return sendResponse(200, "Successfully Deleted Project");
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}
