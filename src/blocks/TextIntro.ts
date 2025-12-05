import LinkField from "@/components/LinkField";
import type { Block } from "payload";

const TextIntro: Block = {
    slug: 'text-intro',
    labels: {
        singular: 'Bloc Introduction',
        plural: 'Blocs Introduction',
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
            name: 'links',
            label: 'Liens',
            type: 'array',
            fields: [
                ...LinkField(),
            ]
        }
    ]
}

export default TextIntro;