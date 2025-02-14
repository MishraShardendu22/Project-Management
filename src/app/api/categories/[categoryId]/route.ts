import { sendResponse } from '@/util/Response';
import { categoriesTable } from '@/db/schema';
import { NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export async function DELETE(
 req: NextRequest,
 { params }: { params: { categoryId: string } }
) {
 try {
  const { categoryId } = params;

  if (!categoryId) {
   return sendResponse(400, 'Invalid request');
  }

  await db
   .delete(categoriesTable)
   .where(eq(categoriesTable.id, Number(categoryId)));
  return sendResponse(200, 'Category deleted successfully');
 } catch (error) {
  console.error(error);
  return sendResponse(500, 'Internal Server Error');
 }
}
