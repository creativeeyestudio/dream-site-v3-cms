import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const convertRichTextToHTML = (data?: SerializedEditorState): string => {
  if (!data) return ''
  try {
    return convertLexicalToHTML({ data })
  } catch (err) {
    // Log pour debug côté serveur — évite de planter l'app
    // eslint-disable-next-line no-console
    console.error('convertRichTextToHTML error:', err)
    return ''
  }
}

export default convertRichTextToHTML
