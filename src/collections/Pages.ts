import type { CollectionConfig } from 'payload'
import TextIntro from '@/blocks/TextIntro'
import HtmlContent from '@/blocks/HtmlContent'
import Heroscreen from '@/blocks/Heroscreen'
import Parallax from '@/blocks/Parallax'
import TextDoubleImage from '@/blocks/TextImageDouble'
import TextImage from '@/blocks/TextImage'

/* -------------------------------------------------------------------------- */
/*  Collection                                                                */
/* -------------------------------------------------------------------------- */
const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenu',
    hidden: ({ user }) => {
      return !['admin', 'editor'].includes(user?.role)
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
    update: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
    delete: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
  },
  fields: [
    /* ------------------------ Métadonnées basiques ------------------------ */
    {
      name: 'title',
      label: 'Titre de la page',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'URL',
      type: 'text',
      required: true,
      unique: true,
    },

    /* ------------------------------ Contenu ------------------------------ */
    {
      name: 'content',
      label: 'Contenu de la page',
      type: 'group',
      fields: [
        {
          name: 'layout',
          label: false,
          labels: {
            singular: 'Bloc de page',
            plural: 'Blocs de page'
          },
          type: 'blocks',
          blocks: [TextIntro, TextImage, TextDoubleImage, Heroscreen, Parallax, HtmlContent],
          required: false,
          localized: true,
        },
      ],
    },

    /* ------------------------ Options de publication ------------------------ */
    {
      name: 'config',
      label: 'Paramètres de la page',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'published',
          type: 'radio',
          label: 'État de publication',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'Publié', value: '1' },
          ],
        },
      ],
    },
  ],
}

export default Pages
