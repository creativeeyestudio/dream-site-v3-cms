import LinkField from '@/components/LinkField'
import type { Block } from 'payload'

const Text: Block = {
  slug: 'text',
  labels: {
    singular: 'Bloc Texte',
    plural: 'Blocs Texte',
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
      hidden: false,
    },
    {
      name: 'links',
      label: 'Liens',
      type: 'array',
      fields: [
        ...LinkField(),
      ]
    }
  ],
}

export default Text
