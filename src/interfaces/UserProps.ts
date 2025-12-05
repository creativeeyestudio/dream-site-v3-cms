export default interface RequestProps {
    user?: UserProps;
}

export interface UserProps {
    id: number;
    role: 'admin' | 'editor' | 'author'
}