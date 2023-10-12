import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Activity } from '@prisma/client';

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger(ActivitiesService.name);

  constructor(private prisma: PrismaService) {}

  async create(
    createData: Prisma.ActivityCreateInput,
  ): Promise<{ status: string; message: string; data: Activity }> {
    try {
      const createdActivity = await this.prisma.activity.create({
        data: createData,
      });

      return {
        status: 'Success',
        message: 'Success',
        data: createdActivity,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        {
          status: 'Bad Request',
          message: 'title cannot be null',
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
    cursor?: Prisma.ActivityWhereUniqueInput;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }): Promise<{ status: string; message: string; data: Activity[] }> {
    const { skip, take, cursor, where, orderBy } = params;
    const data = await this.prisma.activity.findMany({
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
    activityWhereUniqueInput: Prisma.ActivityWhereUniqueInput,
  ): Promise<{ status: string; message: string; data: Activity }> {
    const data = await this.prisma.activity.findUnique({
      where: activityWhereUniqueInput,
    });
    if (!data) {
      this.logger.error(
        `Failed to retrive activity with id: ${activityWhereUniqueInput.activity_id}`,
      );
      throw new HttpException(
        {
          status: 'Not Found',
          message: `Activity with ID ${activityWhereUniqueInput.activity_id} Not Found`,
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
    where: Prisma.ActivityWhereUniqueInput;
    data: Prisma.ActivityUpdateInput;
  }): Promise<{ status: string; message: string; data: Activity }> {
    console.log(params.data);
    console.log(params.where);
    try {
      const data = await this.prisma.activity.update({
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
          `Failed to retrive data with id:${params.where.activity_id}`,
        );
        try {
          this.findOne({ activity_id: params.where.activity_id });
        } catch (error) {
          console.log(error);
        }
        throw new HttpException(
          {
            status: 'Not Found',
            message: `Activity with ID ${params.where.activity_id} Not Found`,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      this.logger.error(
        `Failed to update data with id: ${params.where.activity_id}`,
      );
      throw new HttpException(
        {
          status: 'Bad Request',
          message: 'Failed to update activity',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async remove(
    where: Prisma.ActivityWhereUniqueInput,
  ): Promise<{ status: string; message: string; data: Activity }> {
    try {
      const data = await this.prisma.activity.delete({ where });
      return {
        status: 'Success',
        message: 'Success to delete data activity',
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Not Found',
          message: `Activity with ID ${where.activity_id} Not Found`,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
}
