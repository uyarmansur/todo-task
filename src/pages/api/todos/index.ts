import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: todos,
    });
  }
  if (req.method === "POST") {
    const todo = req.body;
    const newTodo = await prisma.todo.create({
      data: todo,
    });
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  }
}
