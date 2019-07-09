import { Document } from 'mongoose';

export interface Repo extends Document {
    name: string;
    id: string;
    slug: string;
    href: string;
    token: string;
    type: string;
    workspace: string;
}
