import booleanIcon from '~/images/widgets/accordion-horizontal.svg'
import selectIcon from '~/images/widgets/accordion-vertical.svg'
import markdownIcon from '~/images/widgets/article.svg'
import numberIcon from '~/images/widgets/calculation.svg'
import dateIcon from '~/images/widgets/calendar.svg'
import fileIcon from '~/images/widgets/file.svg'
import hiddenIcon from '~/images/widgets/ghost.svg'
import imageIcon from '~/images/widgets/image.svg'
import relationIcon from '~/images/widgets/link.svg'
import listIcon from '~/images/widgets/list.svg'
import mapIcon from '~/images/widgets/map-pointer.svg'
import textIcon from '~/images/widgets/paper.svg'
import stringIcon from '~/images/widgets/pencil.svg'
import objectIcon from '~/images/widgets/sitemap1.svg'

export const commonOptions = {
   label: { type: 'string', defaultsTo: '' },
   name: { type: 'string', defaultsTo: '' },
   required: { type: 'boolean', defaultsTo: true },
   hint: { type: 'string', defaultsTo: '' }
}

export default [
   {
      name: 'String',
      icon: stringIcon,
      widget: 'string',
      options: {
         default: { type: 'string', defaultsTo: '' }
      }
   },
   {
      name: 'Text',
      icon: textIcon,
      widget: 'text',
      options: {
         default: { type: 'string', defaultsTo: '' }
      }
   },
   {
      name: 'Boolean',
      icon: booleanIcon,
      widget: 'boolean',
      options: {
         default: { type: 'boolean', defaultsTo: false }
      }
   },
   {
      name: 'DateTime',
      icon: dateIcon,
      widget: 'datetime',
      options: {
         default: { type: 'string', defaultsTo: () => Date.now() },
         format: { type: 'string', defaultsTo: '' },
         dateFormat: { type: 'string', defaultsTo: '' },
         timeFormat: { type: 'string', defaultsTo: '' }
      }
   },
   {
      name: 'File',
      icon: fileIcon,
      widget: 'file',
      options: {
         default: { type: 'string', defaultsTo: null },
         allow_multiple: { type: 'boolean', defaultsTo: true }
      }
   },
   {
      name: 'Image',
      icon: imageIcon,
      widget: 'image',
      options: {
         default: { type: 'string', defaultsTo: null },
         allow_multiple: { type: 'boolean', defaultsTo: true }
      }
   },
   {
      name: 'Hidden',
      icon: hiddenIcon,
      widget: 'hidden',
      options: {
         default: { type: 'string', defaultsTo: '' }
      }
   },
   {
      name: 'List',
      icon: listIcon,
      widget: 'list',
      options: {
         default: { type: 'string', defaultsTo: '' },
         allow_add: { type: 'boolean', defaultsTo: true },
         field: { type: 'widget' },
         fields: { type: 'widgets' }
      }
   },
   {
      name: 'Map',
      icon: mapIcon,
      widget: 'map',
      options: {
         default: { type: 'string', defaultsTo: '' },
         decimals: { type: 'number', defaultsTo: 7 },
         type: { type: 'select', options: ['Point', 'LineString', 'Polygon'], defaultsTo: 'Point' }
      }
   },
   {
      name: 'Markdown',
      icon: markdownIcon,
      widget: 'markdown',
      options: {
         default: { type: 'string', defaultsTo: '' },
         buttons: {
            type: 'checkboxes',
            options: [
               'bold',
               'italic',
               'code',
               'link',
               'heading-one',
               'heading-two',
               'heading-three',
               'heading-four',
               'heading-five',
               'heading-six',
               'quote',
               'code-block',
               'bulleted-list',
               'numbered-list'
            ],
            defaultsTo: 'Point'
         }
      }
   },
   {
      name: 'Number',
      icon: numberIcon,
      widget: 'number',
      options: {
         default: { type: 'number', defaultsTo: 0 },
         valueType: { type: 'select', options: ['int', 'float'], defaultsTo: 7 },
         min: { type: 'number', defaultsTo: undefined },
         max: { type: 'number', defaultsTo: undefined },
         step: { type: 'number', defaultsTo: 1 }
      }
   },
   {
      name: 'Object',
      icon: objectIcon,
      widget: 'object',
      options: {
         fields: { type: 'widgets', required: true }
      }
   },
   {
      name: 'Relation',
      icon: relationIcon,
      widget: 'relation',
      options: {
         default: { type: 'string', defaultsTo: '' },
         collection: { type: 'string', required: true },
         displayFields: { type: 'string', defaultsTo: '' },
         searchFields: { type: 'string', required: true },
         valueField: { type: 'string', required: true },
         multiple: { type: 'boolean', defaultsTo: false },
         optionsLength: { type: 'number', defaultsTo: 20 }
      }
   },
   {
      name: 'Select',
      icon: selectIcon,
      widget: 'select',
      options: {
         default: { type: 'string', defaultsTo: '' },
         options: { type: 'array', required: true },
         multiple: { type: 'boolean', defaultsTo: false }
      }
   }
]
