import { type SchemaTypeDefinition } from 'sanity'
import organization from './organization'
import barber from './barber'
import service from './service'
import booking from './booking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    organization, barber, service, booking
  ],
}
