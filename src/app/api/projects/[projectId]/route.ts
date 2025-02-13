import { sendResponse } from "@/util/Response";
import { projectsTable } from "@/db/schema";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";

export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const { projectId } = params;
        if (!projectId) {
            return sendResponse(400, "Bad Request");
        }

        const project = await db.select().from(projectsTable).where(eq(projectsTable.id, Number(projectId)));
        return sendResponse(200, "Successfully Fetched Data", project);
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}

export async function PUT(req: NextRequest, { params }: { params: { projectId: string } }) {
    try {
        const { projectId } = params;
        const { name, description, dueDate } = await req.json();
        if (!projectId || !name || !description || !dueDate) {
            return sendResponse(400, "Bad Request");
        }

        const project = await db.update(projectsTable).set({ name, description, dueDate }).where(eq(projectsTable.id, Number(projectId)));
        return sendResponse(200, "Successfully Updated Project", project);
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const projectId = req.nextUrl.searchParams.get('projectId');
        if (!projectId) {
            return sendResponse(400, "Bad Request");
        }

        await db.delete(projectsTable).where(eq(projectsTable.id, Number(projectId)));
        return sendResponse(200, "Successfully Deleted Project");
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}
