import Container from "../fields/Container";
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
        Container,
        {
            type: 'row',
            fields: [
                ImageField('image1', 'Image 1', true),
                ImageField('image2', 'Image 2', false),
            ]
        },
    ]
}

export default TextImageDouble;