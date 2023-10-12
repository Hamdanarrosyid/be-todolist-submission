import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity-groups')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  findAll(@Param() { skip, take, orderBy }) {
    return this.activitiesService.findAll({ skip, take, orderBy });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne({ activity_id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update({
      where: { activity_id: Number(id) },
      data: updateActivityDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove({ activity_id: Number(id) });
  }
}
