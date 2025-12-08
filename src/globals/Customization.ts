import { GlobalConfig } from 'payload'

const Customization: GlobalConfig = {
  slug: 'customization',
  label: 'Personnalisation du site',
  access: {
    read: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
  },
  admin: {
    group: 'Administration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'identity',
          label: 'Identité du site',
          fields: [
            {
              type: 'text',
              name: 'site_title',
              label: 'Titre du site',
            },
            {
              type: 'relationship',
              name: 'homepage',
              relationTo: 'pages',
              label: "Page d'accueil",
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'upload',
                  name: 'site_logo',
                  relationTo: 'media',
                  label: 'Logo du site',
                  admin: {
                    width: '50%'
                  }
                },
                {
                  type: 'upload',
                  name: 'site_favicon',
                  relationTo: 'media',
                  label: 'Favicon du site',
                  admin: {
                    width: '50%'
                  }
                },
              ],
            },
          ],
        },
        {
          name: 'typography',
          label: 'Typographie',
          fields: [],
        },
        {
          name: 'custom_css',
          label: 'CSS personnalisé',
          fields: [],
        },
      ],
    },
  ],
}

export default Customization
