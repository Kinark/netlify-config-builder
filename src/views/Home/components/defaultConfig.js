export default {
   backend: {
      name: 'git-gateway',
      branch: 'master'
   },
   media_folder: 'static/img',
   public_folder: '/img',
   collections: [
      {
         name: 'projects',
         label: 'Projects',
         folder: 'src/pages/projects',
         create: true,
         slug: '{{slug}}',
         fields: [
            {
               label: 'Template Key',
               name: 'templateKey',
               widget: 'hidden',
               default: 'project-page'
            },
            {
               label: 'Title',
               name: 'title',
               widget: 'string'
            },
            {
               label: 'Featured Post',
               name: 'featuredpost',
               widget: 'boolean',
               default: false
            },
            {
               label: 'Excerpt',
               name: 'excerpt',
               widget: 'markdown'
            },
            {
               label: 'Description',
               name: 'description',
               widget: 'markdown'
            },
            {
               label: 'Publish Date',
               name: 'date',
               widget: 'datetime'
            },
            {
               label: 'External link',
               name: 'externalLink',
               widget: 'string',
               required: false,
               default: ''
            },
            {
               label: 'Gallery',
               name: 'gallery',
               widget: 'list',
               fields: [
                  {
                     label: 'Image',
                     name: 'image',
                     widget: 'image'
                  },
                  {
                     label: 'Label',
                     name: 'label',
                     widget: 'markdown',
                     required: false,
                     default: ''
                  }
               ]
            }
         ]
      },
      {
         name: 'pages',
         label: 'Pages',
         delete: false,
         files: [
            {
               file: 'src/pages/index.md',
               label: 'Landing Page',
               name: 'index',
               fields: [
                  {
                     label: 'Template Key',
                     name: 'templateKey',
                     widget: 'hidden',
                     default: 'index-page'
                  }
               ]
            },
            {
               file: 'src/pages/index.md',
               label: 'About Page',
               name: 'about',
               fields: [
                  {
                     label: 'Template Key',
                     name: 'templateKey',
                     widget: 'hidden',
                     default: 'index-page'
                  }
               ]
            }
         ]
      }
   ]
}
