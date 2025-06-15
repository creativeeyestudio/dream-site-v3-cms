import type { Block } from 'payload'

const Text: Block = {
  slug: 'text',
  labels: {
    singular: 'text-block',
    plural: 'text-blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      required: true,
      access: {
        read: ({ req }) => {
          // visible dans l'admin, caché dans l'API publique
          if (req?.api === 'local') return false
          return true
        },
      },
    },
  ],
}

export default Text
