import { Block } from 'payload'

const HtmlContent: Block = {
  slug: 'html-content',
  labels: {
    singular: 'Contenu HTML',
    plural: 'Contenus HTML',
  },
  fields: [
    {
      name: 'htmlCode',
      label: 'Code HTML',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
      },
    },
  ],
}

export default HtmlContent
