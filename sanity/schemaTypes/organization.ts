// sanity/schemaTypes/organization.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'organization',
  title: 'Barbershop',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du salon',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL du salon',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ownerId',
      title: 'ID Propriétaire (Clerk)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^\+253\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/)
          .error('Format: +253 77 XX XX XX'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({ name: 'address', title: 'Adresse', type: 'text' }),
    defineField({ name: 'city', title: 'Ville', type: 'string', initialValue: 'Djibouti' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'currency', title: 'Devise', type: 'string', initialValue: 'DJF', readOnly: true }),

    // Horaires d'ouverture
    defineField({
      name: 'businessHours',
      title: "Horaires d'ouverture",
      type: 'array',
      of: [
        defineField({
          name: 'hours', // <-- Obligatoire
          type: 'object',
          fields: [
            defineField({ name: 'day', title: 'Jour', type: 'string', options: { list: [
              { title: 'Lundi', value: 'monday' },
              { title: 'Mardi', value: 'tuesday' },
              { title: 'Mercredi', value: 'wednesday' },
              { title: 'Jeudi', value: 'thursday' },
              { title: 'Vendredi', value: 'friday' },
              { title: 'Samedi', value: 'saturday' },
              { title: 'Dimanche', value: 'sunday' },
            ] }}),
            defineField({ name: 'isOpen', title: 'Ouvert', type: 'boolean', initialValue: true }),
            defineField({
              name: 'openTime',
              title: "Heure d'ouverture",
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
                  .error('Format: HH:MM (ex: 09:00)'),
            }),
            defineField({
              name: 'closeTime',
              title: "Heure de fermeture",
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
                  .error('Format: HH:MM (ex: 19:00)'),
            }),
          ],
        }),
      ],
    }),

    // Méthodes de paiement
    defineField({
      name: 'paymentMethods',
      title: 'Méthodes de paiement acceptées',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Cash', value: 'cash' },
          { title: 'D-Money', value: 'd-money' },
          { title: 'Waafi', value: 'waafi' },
        ],
      },
      initialValue: ['cash'],
    }),

    // Service à domicile
    defineField({
      name: 'homeServiceEnabled',
      title: '🏠 Service à domicile activé',
      type: 'boolean',
      initialValue: false,
      description: 'Activer cette option pour proposer des services à domicile',
    }),
    defineField({
      name: 'homeServiceZones',
      title: 'Zones de service à domicile',
      type: 'array',
      hidden: ({ document }) => !document?.homeServiceEnabled,
      of: [
        defineField({
          name: 'zone', // <-- Obligatoire
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom du quartier/zone',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'surcharge',
              title: 'Frais de déplacement (DJF)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'surcharge' },
            prepare({ title, subtitle }) { return { title, subtitle: `${subtitle} DJF` }; },
          },
        }),
      ],
    }),
    defineField({
      name: 'homeServiceMinimum',
      title: 'Montant minimum pour service à domicile',
      type: 'number',
      hidden: ({ document }) => !document?.homeServiceEnabled,
      description: 'Montant minimum de commande (en DJF)',
    }),

    // Statut
    defineField({ name: 'isActive', title: 'Actif', type: 'boolean', initialValue: true }),
    defineField({ name: 'createdAt', title: 'Date de création', type: 'datetime', readOnly: true, initialValue: () => new Date().toISOString() }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'city', media: 'logo' },
  },
});
