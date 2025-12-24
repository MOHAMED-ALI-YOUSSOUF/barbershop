// sanity/schemas/service.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du service',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Barbershop',
      type: 'reference',
      to: [{ type: 'organization' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Prix (DJF)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'duration',
      title: 'Durée (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      options: { list: [15, 30, 45, 60, 90, 120] },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Coupe', value: 'coupe' },
          { title: 'Barbe', value: 'barbe' },
          { title: 'Coloration', value: 'coloration' },
          { title: 'Rasage', value: 'rasage' },
          { title: 'Soin', value: 'soin' },
          { title: 'Forfait', value: 'forfait' },
        ],
      },
    }),
    defineField({
      name: 'availableAtHome',
      title: 'Disponible à domicile',
      type: 'boolean',
      initialValue: true,
      description: 'Ce service peut être effectué à domicile',
    }),
    defineField({
      name: 'homeServiceSurcharge',
      title: 'Supplément service à domicile (DJF)',
      type: 'number',
      hidden: ({ document }) => !document?.availableAtHome,
      description: 'Frais supplémentaires pour ce service à domicile (en plus des frais de zone)',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${subtitle} DJF`,
        media,
      };
    },
  },
});
