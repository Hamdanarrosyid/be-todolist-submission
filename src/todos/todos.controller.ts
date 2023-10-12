import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo-items')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne({ todo_id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update({
      where: { todo_id: Number(id) },
      data: updateTodoDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove({ todo_id: Number(id) });
  }
}
