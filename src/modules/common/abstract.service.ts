import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common'
import { PaginatedResult } from 'interfaces/paginated-result.interface'
import Logging from 'library/Logging'
import { Repository } from 'typeorm'

//USTVARI ABSTRACTNE METODE ISKANJA PO DB, ZA POUPORABO V OSTALIH ENTITETAH/TABELAH

@Injectable()
export abstract class AbstractService {
  constructor(protected readonly repository: Repository<any>) {}

  //"CRUD"

  async findAll(relations: [], errorMessage?: string): Promise<any[]> {
    try {
      //ni treba dodat await, ker samo returnamo
      return this.repository.find({
        relations, //'role' iz user.entity
      })
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(
        errorMessage ? errorMessage : 'Something went wrong when searching for elements.',
      )
    }
  }

  async findBy(condition, relations: [], errorMessage?: string): Promise<any[]> {
    try {
      //ni treba dodat await, ker samo returnamo
      return this.repository.findOne({
        where: condition, //where stavek
        relations, //'role' iz user.entity
      })
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(
        errorMessage ? errorMessage : `Something went wrong when searching for element with condition: ${condition}`,
      )
    }
  }

  //TODO: morda moral tu dat relations = [] ??
  async findById(id: string, relations?: [], errorMessage?: string): Promise<any[]> {
    try {
      const element = await this.repository.findOne({
        where: { id }, //id : id
        relations,
      })
      if (!element) {
        throw new BadRequestException(`Cannot find element with id of ${id}`)
      }
      return element
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(
        errorMessage ? errorMessage : `Something went wrong when searching for element with id: ${id}`,
      )
    }
  }

  async remove(id: string): Promise<any> {
    //potrebni await ker imamo const (najprej poiscemo id od funkcije)
    const element = await this.findById(id)
    try {
      return this.repository.remove(element)
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(`Something went wrong while removing element with id of ${id}`)
    }
  }

  //Service za findAll (vseh tabel)
  async paginate(page = 1, relations = []): Promise<PaginatedResult> {
    const take = 10 //max stevilo za current display
    try {
      const [data, total] = await this.repository.findAndCount({
        take,
        skip: (page - 1) * take,
        relations,
      })
      return {
        data: data,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / take),
        },
      }
    } catch (error) {
      Logging.error(error)
      throw new InternalServerErrorException(`Something went wrong while searching for paginated elements`)
    }
  }
}
