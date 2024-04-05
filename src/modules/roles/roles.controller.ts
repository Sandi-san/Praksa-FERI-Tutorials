import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Role } from 'entities/role.entity'
import { User } from 'entities/user.entity'
import { PaginatedResult } from 'interfaces/paginated-result.interface'

import { CreateUpdateRoleDto } from './dto/create-update-role.dto'
import { RolesService } from './roles.service'

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll(['permissions'])
  }

  @Get('/paginated')
  @HttpCode(HttpStatus.OK)
  async paginated(@Query('page') page: number): Promise<PaginatedResult> {
    return this.rolesService.paginate(page, ['permissions'])
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.rolesService.findById(id, ['permissions'])
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createRoleDto: CreateUpdateRoleDto,
    @Body('permissions') permissionsIds: string[],
  ): Promise<Role> {
    if (permissionsIds.length === 0) throw new BadRequestException('There should be at least one permission selected.')
    //map: namesto [1,2] dobi [{id:1}, {id:2}]
    return this.rolesService.create(
      createRoleDto,
      permissionsIds.map((id) => ({
        id,
      })),
    )
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: CreateUpdateRoleDto,
    @Body('permissions') permissionsIds: string[],
  ): Promise<Role> {
    return this.rolesService.update(
      id,
      updateRoleDto,
      permissionsIds.map((id) => ({
        id,
      })),
    )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string): Promise<Role> {
    return this.rolesService.remove(id)
  }
}
