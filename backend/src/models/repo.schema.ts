import * as mongoose from 'mongoose';

export const RepoSchema = new mongoose.Schema({
    name: String,
    id: String,
    description: String,
    owner: String,
    slug: String,
    href: String,
    token: String,
    builds: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Build',
        },
    ],
});
