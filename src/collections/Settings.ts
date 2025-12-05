import RequestProps from '@/interfaces/UserProps'
import { CollectionConfig } from 'payload'

const Settings: CollectionConfig = {
  slug: 'settings',
  labels: {
    singular: 'Site internet',
    plural: 'Sites internet',
  },
  access: {
    read: () => true,
    create: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor', 'author'].includes(req.user?.role ?? 'author'),

    update: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor', 'author'].includes(req.user?.role ?? 'author'),

    delete: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor'].includes(req.user?.role ?? 'author'),
  },
  admin: {
    useAsTitle: 'title',
    group: 'Administration',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du site',
      type: 'text',
      required: true,
    },
    {
      name: 'identityGroup',
      label: 'Identité du site',
      type: 'group',
      access: {
        read: ({ req }: { req: RequestProps }) =>
          ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
      },
      fields: [
        {
          name: 'logo',
          label: 'Logo du site',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'favicon',
          label: 'Favicon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'homepage',
          label: "Page d'accueil",
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
    {
      name: 'maintenanceGroup',
      label: 'Maintenance du site',
      type: 'group',
      access: {
        read: ({ req }: { req: RequestProps }) =>
          ['admin'].includes(req.user?.role ?? 'admin'),
      },
      fields: [
        {
          name: 'maintenance',
          label: 'Mettre le site en maintenance',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}

export default Settings
