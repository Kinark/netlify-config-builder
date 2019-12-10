import randomWords from 'random-words'

import widgets from './widgets'

export const templates = {
   widget(widget = widgets[0]) {
      const random = randomWords()
      const newWidgetObject = {
         label: random.replace(/^\w/, c => c.toUpperCase()),
         name: random,
         required: true,
         widget: widget.widget,
         hint: ''
      }
      Object.entries(widget.options).map(([optionName, optionSettings]) => (newWidgetObject[optionName] = optionSettings.defaultsTo || ''))
      return newWidgetObject
   },
   file() {
      const random = randomWords()
      return {
         file: `src/pages/${random}.md`,
         label: random.replace(/^\w/, c => c.toUpperCase()),
         name: random,
         fields: [this.widget()]
      }
   },
   folderCollection() {
      const random = randomWords()
      return {
         name: random,
         label: random.replace(/^\w/, c => c.toUpperCase()),
         folder: `src/pages/${random}`,
         create: true,
         slug: '{{slug}}',
         fields: [this.widget()]
      }
   },
   filesCollection() {
      const random = randomWords()
      return {
         name: random,
         label: random.replace(/^\w/, c => c.toUpperCase()),
         delete: false,
         files: [this.file()]
      }
   }
}

export const collectionFolderOptions = {
   label: { type: 'string', defaultsTo: '' },
   name: { type: 'string', defaultsTo: '' },
   slug: { type: 'string', defaultsTo: '' },
   folder: { type: 'string', defaultsTo: '' },
   create: { type: 'boolean', defaultsTo: true },
   identifier_field: { type: 'string', defaultsTo: '' }
}

export const collectionFilesOptions = {
   label: { type: 'string', defaultsTo: '' },
   name: { type: 'string', defaultsTo: '' },
   delete: { type: 'boolean', defaultsTo: false }
}

export const fileOptions = {
   file: { type: 'string', defaultsTo: '' },
   label: { type: 'string', defaultsTo: '' },
   name: { type: 'string', defaultsTo: '' }
}

export const commonWidgetOptions = {
   label: { type: 'string', defaultsTo: '' },
   name: { type: 'string', defaultsTo: '' },
   required: { type: 'boolean', defaultsTo: true },
   hint: { type: 'string', defaultsTo: '' }
}
