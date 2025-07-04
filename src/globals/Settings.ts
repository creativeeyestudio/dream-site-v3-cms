import { GlobalConfig } from 'payload'

const LegalNotice: GlobalConfig = {
  slug: 'settings',
  label: 'Personnalisation du site',
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
  },
  admin: {
    group: 'Administration',
  },
  fields: [
    {
      name: 'websiteConfigGroup',
      label: 'Identité du site',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Titre du site',
          type: 'text',
        },
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
          label: 'Page d\'accueil',
          type: 'relationship',
          relationTo: 'pages'
        },
      ]
    },
    {
      name: 'mediasGroup',
      label: 'Médias',
      type: 'group',
      fields: [
        {
          name: 'defaultImg',
          label: 'Image par défaut',
          type: 'upload',
          relationTo: 'media',
        },
      ]
    },
    {
      name: 'maintenanceGroup',
      label: 'Maintenance du site',
      type: 'group',
      fields: [
        {
          name: 'maintenance',
          label: 'Mettre le site en maintenance',
          type: 'checkbox',
          defaultValue: false,
        }
      ]
    }
  ]
}

export default LegalNotice