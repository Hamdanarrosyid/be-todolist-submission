import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivitiesService } from 'src/activities/activities.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService, PrismaService, ActivitiesService],
})
export class TodosModule {}
