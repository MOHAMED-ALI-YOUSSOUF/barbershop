import { type SchemaTypeDefinition } from 'sanity'
import organization from './organization'
import barber from './barber'
import service from './service'
import booking from './booking'
import customer from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    organization, barber, service, booking, customer
  ],
}
