import LinkField from "@/components/LinkField";
import type { Block } from "payload";

const TextImage: Block = {
    slug: 'text-image',
    labels: {
        singular: 'Bloc Texte Image',
        plural: 'Blocs Texte Image',
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
        },
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'links',
            label: 'Liens',
            type: 'array',
            fields: [
                ...LinkField(),
            ]
        }
    ]
}

export default TextImage;