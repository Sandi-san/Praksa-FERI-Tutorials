//ALLOW ROUTES TO BE ACCESSED BY EVERY USER

import { SetMetadata } from '@nestjs/common'

export const Public = () => SetMetadata('isPublic', true)
