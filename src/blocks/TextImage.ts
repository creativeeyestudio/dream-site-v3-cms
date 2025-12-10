import type { Block } from "payload";
import Content from "../fields/Content";

const TextImage: Block = {
    slug: 'text-image',
    labels: {
        singular: 'Bloc Texte Image',
        plural: 'Blocs Texte Image',
    },
    fields: [
        Content,
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