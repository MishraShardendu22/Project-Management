import { sendResponse } from "@/util/Response";
import { NextRequest } from "next/server";
import { tasksTable } from "@/db/schema";
import { db } from "@/db";

export async function GET() {
    try {
        const tasks = await db.select().from(tasksTable);
        return sendResponse(200, "Tasks Fetched Perfectly", tasks);
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}

export async function POST(req: NextRequest) {
    try {
        const { dueDate, priority, projectId, description, title } = await req.json();
        if (!dueDate || !priority || !projectId || !description || !title) {
            return sendResponse(400, "Invalid Request");
        }

        const [task] = await db
            .insert(tasksTable)
            .values({ dueDate, priority, projectId, description, title })
            .returning();

        return sendResponse(200, "Task Created Successfully", task);
    } catch (error) {
        console.error(error);
        return sendResponse(500, "Internal Server Error");
    }
}
