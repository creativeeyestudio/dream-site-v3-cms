import type { CollectionConfig } from 'payload'
import Text from '@/blocks/Text'
import TextIntro from '@/blocks/TextIntro'
import HtmlContent from '@/blocks/HtmlContent'
import Heroscreen from '@/blocks/Heroscreen'
import Parallax from '@/blocks/Parallax'
import TextDoubleImage from '@/blocks/TextImageDouble'
import TextImage from '@/blocks/TextImage'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import convertRichTextToHTML from '@/utils/convertRichTextToHTML'

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
type LayoutBlock = {
  blockType: string
  blockName?: string
  content?: SerializedEditorState
  html?: string
  [key: string]: unknown
}

export async function enrichLayoutWithHTML(layout: LayoutBlock[] = []): Promise<LayoutBlock[]> {
  return Promise.all(
    layout.map(async (block) => {
      if (!block.content) return block

      // On extrait uniquement ce qu’on veut réellement renvoyer
      const { blockType, blockName, content, ...rest } = block

      return {
        blockType,
        blockName,
        html: convertRichTextToHTML(content),
        ...rest,
      }
    }),
  )
}

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
          label: 'Blocks de la page',
          type: 'blocks',
          blocks: [Text, TextIntro, TextImage, TextDoubleImage, Parallax, HtmlContent, Heroscreen],
          required: false,
          localized: true,
        },
      ],
    },

    /* ------------------------ Options de publication ------------------------ */
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'site',
          type: 'relationship',
          relationTo: 'settings',
          required: true,
        },
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'A relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
        },
      ],
    },
  ],

  /* ---------------------------------------------------------------------- */
  /*  Hooks                                                                 */
  /* ---------------------------------------------------------------------- */
  hooks: {
    /**
     * Enrichit les blocks avec du HTML côté lecture.
     */
    afterRead: [
      async ({ doc }) => {
        // Ton schema met le layout dans doc.content.layout (d'après ton code)
        const layout = doc?.content?.layout ?? doc?.layout ?? []

        // Si pas de layout, on renvoie doc tel quel
        if (!Array.isArray(layout) || layout.length === 0) return doc

        // On mappe et on protège le typage / les valeurs manquantes
        doc.content = doc.content ?? {}
        doc.content.layout = await Promise.all(
          layout.map(async (block: any) => {
            // Si pas de contenu richText, on ne touche pas au block
            if (!block || !block.content) return block

            // Convertit prudemment — convertRichTextToHTML gère undefined / erreurs
            const html = convertRichTextToHTML(block.content)

            return {
              ...block,
              html, // champ HTML ajouté
            }
          }),
        )

        return doc
      },
    ],
  },
}

export default Pages
