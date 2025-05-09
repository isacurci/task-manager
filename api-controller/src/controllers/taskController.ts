import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/errorHandler';

const prisma = new PrismaClient();

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, dueDate, assignedToId, priority } = req.body;
    const createdById = req.user!.id;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
        createdById,
        priority,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { createdById: userId },
          { assignedToId: userId },
          ...(userRole === 'ADMIN' ? [{}] : []),
        ],
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!task) {
      return next(new AppError('No task found with that ID', 404));
    }

    // Check if user has permission to view the task
    if (
      userRole !== 'ADMIN' &&
      task.createdById !== userId &&
      task.assignedToId !== userId
    ) {
      return next(new AppError('You do not have permission to view this task', 403));
    }

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const { title, description, status, dueDate, assignedToId, priority } = req.body;

    // Check if task exists and user has permission
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      return next(new AppError('No task found with that ID', 404));
    }

    if (
      userRole !== 'ADMIN' &&
      existingTask.createdById !== userId &&
      existingTask.assignedToId !== userId
    ) {
      return next(new AppError('You do not have permission to update this task', 403));
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedToId,
        priority,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Check if task exists and user has permission
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      return next(new AppError('No task found with that ID', 404));
    }

    if (
      userRole !== 'ADMIN' &&
      existingTask.createdById !== userId
    ) {
      return next(new AppError('You do not have permission to delete this task', 403));
    }

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const moveTaskStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Check if task exists and user has permission
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      return next(new AppError('No task found with that ID', 404));
    }

    if (
      userRole !== 'ADMIN' &&
      existingTask.createdById !== userId &&
      existingTask.assignedToId !== userId
    ) {
      return next(new AppError('You do not have permission to update this task', 403));
    }

    const task = await prisma.task.update({
      where: { id },
      data: { status },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
}; 