import Container from "@/fields/Container";
import type { Block } from "payload";

const TextIntro: Block = {
    slug: 'text-intro',
    labels: {
        singular: 'Bloc Introduction',
        plural: 'Blocs Introduction',
    },
    fields: [Container]
}

export default TextIntro;