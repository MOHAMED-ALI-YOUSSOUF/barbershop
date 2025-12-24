// sanity/schemas/booking.ts
import { Booking } from '@/types';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'booking',
  title: 'Réservation',
  type: 'document',
  fields: [
    // RÉFÉRENCES
    defineField({
      name: 'organization',
      title: 'Barbershop',
      type: 'reference',
      to: [{ type: 'organization' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'barber',
      title: 'Barbier',
      type: 'reference',
      to: [{ type: 'barber' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (Rule) => Rule.required(),
    }),

    // INFORMATIONS CLIENT (pas de compte requis)
    defineField({
      name: 'customerName',
      title: 'Nom du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerPhone',
      title: 'Téléphone du client',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email du client',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    // DATE ET HEURE
    defineField({
      name: 'date',
      title: 'Date et heure',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Durée (minutes)',
      type: 'number',
      description: 'Copié du service',
    }),

    // 🏠 TYPE DE SERVICE ET ADRESSE
    defineField({
      name: 'serviceType',
      title: 'Type de service',
      type: 'string',
      options: {
        list: [
          { title: 'Au salon', value: 'salon' },
          { title: 'À domicile', value: 'home' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homeAddress',
      title: 'Adresse de service à domicile',
      type: 'object',
      hidden: ({ document }) => document?.serviceType !== 'home',
      fields: [
        defineField({
          name: 'street',
          title: 'Rue/Adresse complète',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'zone',
          title: 'Quartier/Zone',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'city',
          title: 'Ville',
          type: 'string',
          initialValue: 'Djibouti',
        }),
        defineField({
          name: 'instructions',
          title: 'Instructions pour trouver',
          type: 'text',
        }),
      ],
    }),

    // TARIFICATION
    defineField({
      name: 'price',
      title: 'Prix du service (DJF)',
      type: 'number',
      description: 'Prix de base du service',
    }),
    defineField({
      name: 'homeServiceFee',
      title: 'Frais de service à domicile (DJF)',
      type: 'number',
      description: 'Frais de déplacement + supplément service',
    }),
    defineField({
      name: 'totalPrice',
      title: 'Prix total (DJF)',
      type: 'number',
      description: 'Prix final incluant tous les frais',
    }),

    // STATUT DE LA RÉSERVATION
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '⏳ En attente', value: 'pending' },
          { title: '✅ Confirmée', value: 'confirmed' },
          { title: '✂️ Terminée', value: 'completed' },
          { title: '❌ Annulée', value: 'cancelled' },
          { title: '🚫 No-show', value: 'no-show' },
        ],
      },
      initialValue: 'pending',
    }),

    // PAIEMENT
    defineField({
      name: 'paymentMethod',
      title: 'Méthode de paiement',
      type: 'string',
      options: {
        list: [
          { title: '💵 Cash', value: 'cash' },
          { title: '📱 D-Money', value: 'd-money' },
          { title: '📱 Waafi', value: 'waafi' },
          { title: '❓ Non spécifiée', value: 'not-specified' },
        ],
      },
      initialValue: 'not-specified',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Statut du paiement',
      type: 'string',
      options: {
        list: [
          { title: '⏳ En attente', value: 'pending' },
          { title: '✅ Payé', value: 'paid' },
          { title: '↩️ Remboursé', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'transactionId',
      title: 'ID de transaction',
      type: 'string',
      description: 'Référence de paiement Mobile Money',
    }),

    // NOTES
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
    defineField({
      name: 'adminNotes',
      title: 'Notes administrateur',
      type: 'text',
      description: 'Notes internes, invisibles pour le client',
    }),

    // TOKEN UNIQUE POUR GESTION SANS COMPTE
    defineField({
      name: 'cancellationToken',
      title: "Token d'annulation",
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),

    // DATES
    defineField({
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Dernière mise à jour',
      type: 'datetime',
    }),
  ],

  preview: {
  select: {
    customerName: 'customerName',
    serviceName: 'service.name',
    date: 'date',
    status: 'status',
    serviceType: 'serviceType',
  },
  prepare: (data: any) => {
    const { customerName, serviceName, date, status, serviceType } = data as Booking;

    const statusEmoji: Record<Booking['status'], string> = {
      pending: '⏳',
      confirmed: '✅',
      completed: '✂️',
      cancelled: '❌',
      'no-show': '🚫',
    };

    const typeEmoji = serviceType === 'home' ? '🏠' : '🏢';

    return {
      title: `${statusEmoji[status]} ${customerName} - ${serviceName}`,
      subtitle: `${typeEmoji} ${new Date(date).toLocaleString('fr-FR')}`,
    };
  },
}

});
