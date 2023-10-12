import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';
import { ActivitiesService } from 'src/activities/activities.service';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(
    private prisma: PrismaService,
    private activity: ActivitiesService,
  ) {}

  async create(
    createData: Prisma.TodoCreateInput,
  ): Promise<{ status: string; message: string; data: Todo }> {
    console.log(createData);
    try {
      const createdTodo = await this.prisma.todo.create({
        data: createData,
      });

      return {
        status: 'Success',
        message: 'Success',
        data: createdTodo,
      };
    } catch (error) {
      this.logger.error(`failed create todo with input: ${createData}`);
      const missingField = !createData.title ? 'title' : 'activity_group_id';
      throw new HttpException(
        {
          status: 'Bad Request',
          message: `${missingField} cannot be null`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<{ status: string; message: string; data: Todo[] }> {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return {
      status: 'Success',
      message: 'Success',
      data,
    };
  }

  async findOne(
    TodoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<{ status: string; message: string; data: Todo }> {
    const data = await this.prisma.todo.findUnique({
      where: TodoWhereUniqueInput,
    });
    if (!data) {
      this.logger.error(
        `Failed to retrive todo with id: ${TodoWhereUniqueInput.todo_id}`,
      );
      throw new HttpException(
        {
          status: 'Not Found',
          message: `Todo with ID ${TodoWhereUniqueInput.todo_id} Not Found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: 'Success',
      message: 'Success',
      data,
    };
  }

  async update(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<{ status: string; message: string; data: Todo }> {
    try {
      const data = await this.prisma.todo.update({
        where: params.where,
        data: params.data,
      });
      return {
        status: 'Success',
        message: 'Success',
        data,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        this.logger.error(
          `Failed to retrive data with id:${params.where.todo_id}`,
        );
        throw new HttpException(
          {
            status: 'Not Found',
            message: `Todo with ID ${params.where.todo_id} Not Found`,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      this.logger.error(
        `Failed to update data with id: ${params.where.todo_id}`,
      );
      throw new HttpException(
        {
          status: 'Bad Request',
          message: `Failed to update data with id: ${params.where.todo_id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async remove(
    where: Prisma.TodoWhereUniqueInput,
  ): Promise<{ status: string; message: string; data: Todo }> {
    try {
      const data = await this.prisma.todo.delete({ where });
      return {
        status: 'Success',
        message: 'Success',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Not Found',
          message: `Todo with ID ${where.todo_id} Not Found`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
