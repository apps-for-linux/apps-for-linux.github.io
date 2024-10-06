import {
    defineConfig
} from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || "main";

export default defineConfig({
            branch,
            clientId: process.env.TINACLIENTID, // Get this from tina.io
            token: process.env.TINATOKEN, // Get this from tina.io

            build: {
                outputFolder: "admin",
                publicFolder: "public",
            },
            media: {
                tina: {
                    mediaRoot: "assets",
                    publicFolder: "public",
                },
            },
            schema: {
                collections: [{
                            name: "post",
                            label: "Posts",
                            path: "src/content/posts",
                            defaultItem: () => ({
                                title: "New Post",
                                layout: "../layouts/PostSingle.astro",
                                added: new Date(),
                                tags: [],
                            }),
                            ui: {
                                dateFormat: "MMM DD YYYY",
                                filename: {
                                    readonly: false,
                                    slugify: (values) => {
                                        return values?.slug?.toLowerCase().replace(/ /g, "-");
                                    },
                                },
                            },
                            fields: [{
                                    name: "title",
                                    label: "Title",
                                    type: "string",
                                    isTitle: true,
                                    required: true,
                                },
                                {
                                    {
                                        label: "Description",
                                        name: "description",
                                        type: "string",
                                        required: true,
                                    },
                                    {
                                        label: "Tags",
                                        name: "tags",
                                        type: "string",
                                        list: true,
                                        options: [{
                                                value: "community",
                                                label: "Community",
                                            },
                                            {
                                                value: "official",
                                                label: "Official",
                                            ],
                                        },
                                        {
                                            label: "Date",
                                            name: "date",
                                            type: "datetime",
                                            dateFormat: "DD MMM YYYY",
                                            required: true,
                                        },
                                        {
                                            label: "Image",
                                            name: "image",
                                            type: "string",
                                            required: true,
                                        },
                                        {
                                            label: "Categories",
                                            name: "categories",
                                            type: "string",
                                            list: true,
                                            options: [
																							{
                                                    value: "audio--video",
                                                    label: "Audio & Video",
                                                },
                                                {
                                                    value: "development",
                                                    label: "Development",
                                                },
																								{
																										value: "education",
																										label: "Education",
																								},
																								{
																										value: "finance",
																										label: "Finance",
																								},
																								{
																										value: "games",
																										label: "Games",
																								},
																								{
																										value: "graphics",
																										label: "Graphics",
																								},
																								{
																										value: "network",
																										label: "Network",
																								},
																								{
																										value: "productivity",
																										label: "Productivity",
																								},
																								{
																										value: "science",
																										label: "Science",
																								},
																								{
																										value: "system",
																										label: "System",
																								},
																								{
																										value: "utilities",
																										label: "Utilities",
																								},
																							],
                                            },

                                        },
                                    ],
                                },
                                search: {
                                    tina: {
                                        indexerToken: process.env.TINASEARCH,
                                        stopwordLanguages: ["eng"],
                                    },
                                    indexBatchSize: 50,
                                    maxSearchIndexFieldLength: 100,
                                },
                            });
