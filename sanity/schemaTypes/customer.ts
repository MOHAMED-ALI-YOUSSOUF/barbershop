// sanity/schemas/customer.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'customer',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'organization',
      title: 'Barbershop',
      type: 'reference',
      to: [{ type: 'organization' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalBookings',
      title: 'Nombre de réservations',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'lastVisit',
      title: 'Dernière visite',
      type: 'datetime',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Notes privées sur le client',
    }),
    defineField({
      name: 'createdAt',
      title: 'Client depuis',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
      bookings: 'totalBookings',
    },
    prepare({ title, subtitle, bookings }) {
      return {
        title,
        subtitle: `${subtitle} • ${bookings || 0} réservations`,
      };
    },
  },
});
