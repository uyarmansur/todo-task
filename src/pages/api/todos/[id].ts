import { Todo } from "@/types/types";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (req.method === "PUT") {
      const { title, description, status } = req.body;

      const dataToUpdate: Todo = {} as Todo;
      if (title !== undefined) dataToUpdate.title = title;
      if (description !== undefined) dataToUpdate.description = description;
      if (status !== undefined) dataToUpdate.status = status;

      const updatedTodo = await prisma.todo.update({
        where: { id: id as string },
        data: dataToUpdate,
      });

      return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
      });
    }

    if (req.method === "DELETE") {
      await prisma.todo.delete({ where: { id: id as string } });
      return res
        .status(200)
        .json({ success: true, message: "Todo deleted successfully" });
    }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}
