import type { Block } from "payload";
import Container from "../fields/Container";

const TextImage: Block = {
    slug: 'text-image',
    labels: {
        singular: 'Bloc Texte Image',
        plural: 'Blocs Texte Image',
    },
    fields: [
        Container,
        {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true,
        }
    ]
}

export default TextImage;