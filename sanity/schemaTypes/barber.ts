// sanity/schemas/barber.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'barber',
  title: 'Barbier',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
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
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\+253\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'specialties',
      title: 'Spécialités',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Coupe classique', value: 'coupe-classique' },
          { title: 'Dégradé', value: 'degrade' },
          { title: 'Barbe', value: 'barbe' },
          { title: 'Coloration', value: 'coloration' },
          { title: 'Enfants', value: 'enfants' },
          { title: 'Rasage', value: 'rasage' },
        ],
      },
    }),

    // Horaires de travail
    defineField({
      name: 'workingHours',
      title: 'Horaires de travail',
      type: 'array',
      of: [
        defineField({
          name: 'hours', // obligatoire pour object
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Jour',
              type: 'string',
              options: {
                list: [
                  { title: 'Lundi', value: 'monday' },
                  { title: 'Mardi', value: 'tuesday' },
                  { title: 'Mercredi', value: 'wednesday' },
                  { title: 'Jeudi', value: 'thursday' },
                  { title: 'Vendredi', value: 'friday' },
                  { title: 'Samedi', value: 'saturday' },
                  { title: 'Dimanche', value: 'sunday' },
                ],
              },
            }),
            defineField({
              name: 'isWorking',
              title: 'Travaille ce jour',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'startTime',
              title: 'Heure de début',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
            }),
            defineField({
              name: 'endTime',
              title: 'Heure de fin',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
            }),
          ],
        }),
      ],
    }),

    // Service à domicile
    defineField({
      name: 'homeServiceEnabled',
      title: '🏠 Je propose des services à domicile',
      type: 'boolean',
      initialValue: false,
      description: 'Activer si ce barbier se déplace à domicile',
    }),
    defineField({
      name: 'homeServiceNote',
      title: 'Note sur le service à domicile',
      type: 'text',
      hidden: ({ document }) => !document?.homeServiceEnabled,
      description: 'Informations complémentaires (zones préférées, conditions, etc.)',
    }),

    // Statut
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
      subtitle: 'organization.name',
      media: 'photo',
    },
  },
});
