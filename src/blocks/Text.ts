import type { Block } from "payload";
import Container from "../fields/Container";

const Text: Block = {
    slug: 'content',
    labels: {
        singular: 'Bloc Texte',
        plural: 'Blocs Texte',
    },
    fields: [Container]
}

export default Text;