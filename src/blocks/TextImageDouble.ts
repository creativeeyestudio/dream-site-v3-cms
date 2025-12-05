import LinkField from "@/components/LinkField";
import type { Block, Field } from "payload";

const ImageField = (name: string, label: string, required: boolean): Field => {
    return {
        name: name,
        label: label,
        type: 'upload',
        relationTo: 'media',
        required: required,
        admin: {
            width: '50%',
        },
    }
}

const TextImageDouble: Block = {
    slug: 'text-double-image',
    labels: {
        singular: 'Bloc Texte Image Double',
        plural: 'Blocs Texte Image Double',
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
            type: 'row',
            fields: [
                ImageField('image1', 'Image 1', true),
                ImageField('image2', 'Image 2', false),
            ]
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

export default TextImageDouble;