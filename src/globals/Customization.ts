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
  fields: [],
}

export default Customization
