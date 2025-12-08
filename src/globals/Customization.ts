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
                fields: []
            },
            {
                name: 'typography',
                label: 'Typographie',
                fields: []
            },
            {
                name: 'custom_css',
                label: 'CSS personnalisé',
                fields: []
            }
        ]
    }
  ],
}

export default Customization
