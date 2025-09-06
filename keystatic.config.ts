import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'brentnauer', // Replace with your GitHub username or organization
      name: 'churchoftitor-com', // Replace with your repository name
    }
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    apocrypha: collection({
      label: 'Apocrypha',
      slugField: 'title',
      path: 'src/content/apocrypha/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage',
      format: 'json', // Stores data as a JSON file in your repo
      schema: {
        title: fields.text({ label: 'Page Title' }),
        components: fields.array(
          fields.object({
            type: fields.select({
              label: 'Component Type',
              options: [
                { label: 'Hero', value: 'hero' },
                { label: 'Text Block', value: 'textBlock' },
                { label: 'Image', value: 'image' },
              ],
              defaultValue: 'hero',
            }),
            properties: fields.conditional(
              fields.select({
                label: 'Component Type (for properties)',
                options: [
                  { label: 'Hero', value: 'hero' },
                  { label: 'Text Block', value: 'textBlock' },
                  { label: 'Image', value: 'image' },
                ],
                defaultValue: 'hero',
              }),
              {
                hero: fields.object({
                  heading: fields.text({ label: 'Heading' }),
                  subheading: fields.text({ label: 'Subheading' }),
                  backgroundImage: fields.image({ label: 'Background Image' }),
                }),
                textBlock: fields.object({
                  content: fields.markdoc({ label: 'Content' }),
                  alignment: fields.select({
                    label: 'Alignment',
                    options: [
                      { label: 'Left', value: 'left' },
                      { label: 'Center', value: 'center' },
                      { label: 'Right', value: 'right' },
                    ],
                    defaultValue: 'left',
                  }),
                }),
                image: fields.object({
                  src: fields.image({ label: 'Image' }),
                  alt: fields.text({ label: 'Alt Text' }),
                }),
              }
            ),
          }),
          { label: 'Page Components', itemLabel: (props) => props.fields.type.value },
        ),
      },
    }),
  },
});