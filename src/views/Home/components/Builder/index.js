/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable function-paren-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import * as objectPath from 'object-path-immutable'
import AnimateHeight from 'react-animate-height'
import { Transition, TransitionGroup } from 'react-transition-group'
import copy from 'copy-to-clipboard'
import YAML from 'yaml'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import useTimeTravel from '~/hooks/useTimeTravel'
import folderCollectionIcon from '~/images/widgets/grid-even.svg'
import filesCollectionIcon from '~/images/widgets/grid.svg'
import nothingIcon from '~/images/widgets/dog-call.svg'
import modalStyles from '~/constants/modalStyles'
import widgets from '~/constants/widgets'
import { templates, fileOptions, commonWidgetOptions, collectionFolderOptions, collectionFilesOptions } from '~/constants/configs'
import Input from '~/components/Input'
import Textarea from '~/components/Textarea'
import Toggle from '~/components/Toggle'
import Button from '~/components/Button'
import Select from '~/components/Select'
import Pulse from '~/components/Pulse'
import IconInfoWrapper from '~/components/IconInfoWrapper'
import FieldTitle from '~/components/FieldTitle'
import FieldSubtitle from '~/components/FieldSubtitle'

import Item from './components/Item'

import defaultConfig from '../defaultConfig'

Modal.setAppElement('#root')

const Builder = () => {
   const [config, setConfig, undoConfig, redoConfig, pastConfig, futureConfig, setPresentConfig] = useTimeTravel(defaultConfig)

   const [transitionCollection, setTransitionCollection] = useState(1)

   // SELECTED THINGS
   const [selectedCollectionIndex, setSelectedCollectionIndex, undoSelectedCollection, redoSelectedCollection] = useTimeTravel(null)
   const [selectedFile, setSelectedFile] = useState({})
   const [selectedField, setSelectedField] = useState({})

   // MODALS
   const [isInputOptionsModalOpen, setInputOptionsModalOpen] = React.useState(false)
   const [isAddWidgetModalOpen, setAddWidgetModalOpen] = React.useState(false)
   const [isFileModalOpen, setFileModalOpen] = React.useState(false)
   const [isImportModalOpen, setImportModalOpen] = React.useState(false)

   // PATHS
   const [newWidgetPath, setNewWidgetPath] = React.useState('')

   // INPUTS
   const [inputs, setInputs] = useState({})
   const [collectionInputs, setCollectionInputs] = useState({})
   const [importInput, setImportInput] = useState('')

   const selectedCollection = selectedCollectionIndex === null ? false : config.collections[selectedCollectionIndex]

   const undo = () => {
      undoConfig()
      undoSelectedCollection()
   }

   const redo = () => {
      redoConfig()
      redoSelectedCollection()
   }

   const set = {
      config: (newConfig, willUpdateCollection = true) => {
         setConfig(newConfig)
         if (willUpdateCollection) setSelectedCollectionIndex(selectedCollectionIndex)
      },
      selectedCollectionIndex: (newSelectedCollectionIndex, willUpdateConfig = true) => {
         setSelectedCollectionIndex(newSelectedCollectionIndex)
         if (willUpdateConfig) setConfig(config)
      }
   }

   // SELECTORS

   const selectCollection = (i) => {
      if (i === selectedCollectionIndex) return
      set.selectedCollectionIndex(i)
      setTransitionCollection(transitionCollection + 1)
      const collection = config.collections[i]
      const initialValues = {}
      const configs = collection.fields ? collectionFolderOptions : collectionFilesOptions
      Object.entries(configs).map(([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || ''))
      setCollectionInputs({ ...initialValues, ...collection })
   }

   const selectFile = (file, filePath) => {
      const initialValues = {}
      Object.entries(fileOptions).map(([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || ''))
      setInputs({ ...initialValues, ...file })
      setSelectedFile({ file, filePath })
      setFileModalOpen(true)
   }

   const selectField = (field, widget, fieldPath) => {
      const initialValues = {}
      Object.entries({ ...commonWidgetOptions, ...widget.options }).map(
         ([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || '')
      )
      setInputs({ ...initialValues, ...field })
      setSelectedField({ field, widget, fieldPath })
      setInputOptionsModalOpen(true)
   }

   // LISTERS
   const fieldLister = (field, fieldPath) => {
      const rightWidget = widgets.find((widget) => widget.widget === field.widget)
      const fieldPathCopy = [...fieldPath]
      fieldPathCopy.pop()
      fieldPathCopy.push(field.name)
      const uniqueKey = fieldPathCopy.join('-')
      const index = fieldPath[fieldPath.length - 1]
      return (
         <Draggable key={uniqueKey} draggableId={uniqueKey} index={index === 'field' ? 0 : index}>
            {(provided, { isDragging }) => (
               <DraggableWrapper
                  isDragging={isDragging}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
               >
                  <Item
                     noMargin
                     icon={rightWidget.icon}
                     title={field.label}
                     subtitle={rightWidget.name}
                     onClick={() => selectField(field, rightWidget, fieldPath)}
                     onDelete={(e) => deleteItem(e, ['collections', selectedCollectionIndex, ...fieldPath])}
                  />
                  {(field.widget === 'list' || field.widget === 'object') && (
                     <Child>
                        <Droppable droppableId={`droppable-${fieldPath[fieldPath.length - 1]}`} type={`${field.name}-SUBFIELDS`}>
                           {(listProvided) => (
                              <div ref={listProvided.innerRef} {...listProvided.droppableProps}>
                                 {!!field.field && fieldLister(field.field, [...fieldPath, 'field'])}
                                 {!!field.fields &&
                                    field.fields.map((childField, childFieldIndex) => fieldLister(childField, [...fieldPath, 'fields', childFieldIndex]))}
                                 {listProvided.placeholder}
                              </div>
                           )}
                        </Droppable>
                        <Button onClick={() => newWidget([...fieldPath, 'fields'])}>Add new widget</Button>
                     </Child>
                  )}
               </DraggableWrapper>
            )}
         </Draggable>
      )
   }

   const inputLister = ([optionName, optionSettings], values, setter) => {
      const setFunction = (e) => setter({ ...values, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
      switch (optionSettings.type) {
         case 'string':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Input name={optionName} value={values[optionName]} onChange={setFunction} type="text">
                     {optionName}
                  </Input>
               </div>
            )
         case 'number':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Input name={optionName} value={values[optionName]} onChange={setFunction} type="number">
                     {optionName}
                  </Input>
               </div>
            )
         case 'boolean':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Toggle name={optionName} checked={values[optionName]} onChange={setFunction}>
                     {optionName}
                  </Toggle>
               </div>
            )
         case 'select':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Select name={optionName} id={optionName} value={values[optionName]} onChange={setFunction}>
                     <option disabled value={optionName}>
                        {optionName}
                     </option>
                     {optionSettings.options.map((option) => (
                        <option key={option} value={option}>
                           {option}
                        </option>
                     ))}
                  </Select>
               </div>
            )
         case 'checkboxes':
            return (
               <div key={optionName} className="col xs12">
                  <FieldSubtitle>Available formatting buttons:</FieldSubtitle>
                  {optionSettings.options.map((option) => (
                     <Toggle
                        name={`${optionName}[${option}]`}
                        key={option}
                        checked={values[optionName].includes(option)}
                        onChange={() =>
                           setter({
                              ...values,
                              [optionName]: values[optionName].includes(option)
                                 ? values[optionName].filter((crtOpt) => crtOpt !== option)
                                 : [...values[optionName], option]
                           })
                        }
                     >
                        {option}
                     </Toggle>
                  ))}
               </div>
            )
         case 'array':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Input
                     required
                     name={optionName}
                     value={values[optionName]}
                     onChange={(e) => setter({ ...values, [e.target.name]: e.target.value.split(',') })}
                     type="text"
                  >
                     {optionName}
                  </Input>
               </div>
            )
         default:
            return null
      }
   }

   // ON SUBMIT HANDLERS
   const onModifyField = (e, cb) => {
      e.preventDefault()
      const newField = { ...selectedField.field, ...inputs }
      const prefixedPath = ['collections', selectedCollectionIndex, ...selectedField.fieldPath]
      set.config(objectPath.set(config, prefixedPath, newField))
      setInputOptionsModalOpen(false)
      if (cb) cb()
   }

   const onModifyCollection = (e, cb) => {
      e.preventDefault()
      const newCollectionInputs = { ...collectionInputs }
      delete newCollectionInputs.fields
      delete newCollectionInputs.files
      const newCollection = { ...selectedCollection, ...newCollectionInputs }
      const prefixedPath = ['collections', selectedCollectionIndex]
      set.config(objectPath.set(config, prefixedPath, newCollection))
      if (cb) cb()
   }

   const onModifyFile = (e, cb) => {
      e.preventDefault()
      const newFile = { ...selectedFile.file, ...inputs }
      const prefixedPath = ['collections', selectedCollectionIndex, ...selectedFile.filePath]
      set.config(objectPath.set(config, prefixedPath, newFile))
      setFileModalOpen(false)
      if (cb) cb()
   }

   // NEW WIDGET MODAL METHODS
   const newWidget = (path) => {
      setNewWidgetPath(['collections', selectedCollectionIndex, ...path])
      setAddWidgetModalOpen(true)
   }

   const addWidget = (widget) => {
      set.config(objectPath.push(config, newWidgetPath, templates.widget(widget)))
      setAddWidgetModalOpen(false)
   }

   // ADD NEW STUFF METHODS
   const addFile = () => set.config(objectPath.push(config, ['collections', selectedCollectionIndex, 'files'], templates.file()))

   const addFolderCollection = () => set.config(objectPath.push(config, ['collections'], templates.folderCollection()))

   const addFilesCollection = () => set.config(objectPath.push(config, ['collections'], templates.filesCollection()))

   // DELETE STUFF METHODS
   const deleteItem = (e, path) => {
      e.stopPropagation()
      if (confirm('Are you sure you wanna delete this item?')) set.config(objectPath.del(config, path))
   }

   const importYaml = () => {
      set.config(YAML.parse(importInput))
      setImportModalOpen(false)
      setImportInput('')
   }

   const onDragEnd = (result) => {
      if (!result.destination || result.source.index === result.destination.index) return
      const draggableIdSplitted = result.draggableId.split('-')
      draggableIdSplitted.pop()
      const isCollection = draggableIdSplitted[0] === 'collection'
      const listPath = isCollection ? 'collections' : ['collections', selectedCollectionIndex, ...draggableIdSplitted]
      const list = [...objectPath.get(config, listPath)]
      const [removed] = list.splice(result.source.index, 1)
      list.splice(result.destination.index, 0, removed)
      const willUpdateSelectedCollection = selectedCollectionIndex !== null && isCollection && selectedCollectionIndex === result.source.index
      if (willUpdateSelectedCollection) {
         set.selectedCollectionIndex(result.destination.index, false)
      }
      set.config(objectPath.set(config, listPath, list), !willUpdateSelectedCollection)
   }

   // Download default files
   const downloadDefaultFiles = () => {
      const { collections } = config
      const zipContent = new JSZip()
      collections.forEach((collection) => {
         if (collection.folder) {
            zipContent.folder(collection.name)
         } else {
            collection.files.forEach((file) => {
               let fileContent = '---\n'
               file.fields.forEach((field) => {
                  if (!field.default) return
                  fileContent += `${field.name}: ${field.default}\n`
               })
               fileContent += '---'
               zipContent.file(`${file.name}.md`, fileContent)
            })
         }
      })
      zipContent
         .generateAsync({ type: 'blob' })
         .then((content) => saveAs(content, 'defaultFiles.zip'))
         .catch((err) => console.log(err))
   }

   // List widget fix
   useEffect(() => {
      let wasFixed = false
      const fixLists = (obj) => {
         if (obj instanceof Array) {
            obj.forEach((el) => fixLists(el))
         } else if (obj instanceof Object) {
            if (obj.widget === 'list') {
               if (obj.field && obj.fields) {
                  obj.fields = [...obj.fields, obj.field]
                  delete obj.field
                  wasFixed = true
               } else if (obj.fields && obj.fields.length === 1) {
                  obj.field = obj.fields[0]
                  delete obj.fields
                  wasFixed = true
               }
            } else {
               Object.keys(obj).forEach((key) => fixLists(obj[key]))
            }
         }
      }
      const newConfig = { ...config }
      fixLists(newConfig)
      if (wasFixed) setPresentConfig(newConfig)
   }, [config])

   return (
      <DragDropContext onDragEnd={onDragEnd}>
         <Modal isOpen={isImportModalOpen} onRequestClose={() => setImportModalOpen(false)} style={modalStyles} closeTimeoutMS={300}>
            <Textarea value={importInput} onChange={(e) => setImportInput(e.target.value)} placeholder="Paste your YML here" />
            <div className="right-align">
               <Button onClick={importYaml}>Import YML</Button>
            </div>
         </Modal>
         <Modal isOpen={isFileModalOpen} onRequestClose={() => setFileModalOpen(false)} style={modalStyles} closeTimeoutMS={300}>
            {!!selectedFile.file && (
               <IconInfoWrapper nonHoverable>
                  <div>
                     <div className="row">
                        <div className="col xs12">
                           <FieldTitle big>{inputs.label}</FieldTitle>
                           <FieldSubtitle big>{selectedFile.file.name}</FieldSubtitle>
                        </div>
                     </div>
                     <form className="row no-mrg" onSubmit={onModifyFile}>
                        {Object.entries({ ...fileOptions }).map((fileOption) => inputLister(fileOption, inputs, setInputs))}
                        <div className="col xs12 right-align">
                           <Button type="submit">Save</Button>
                        </div>
                     </form>
                  </div>
               </IconInfoWrapper>
            )}
         </Modal>
         <Modal isOpen={isAddWidgetModalOpen} onRequestClose={() => setAddWidgetModalOpen(false)} style={modalStyles} closeTimeoutMS={300}>
            <Title>Add widget</Title>
            {widgets.map((widget) => (
               <MiniCard key={widget.name} onClick={() => addWidget(widget)}>
                  <img src={widget.icon} alt="" />
                  <div>{widget.name}</div>
               </MiniCard>
            ))}
         </Modal>
         <div className="container">
            <div className="row">
               <div className="col xs12">
                  <div className="section right-align">
                     <Button onClick={() => setImportModalOpen(true)}>Import YML</Button>
                     <Pulse>
                        {(pulse) => (
                           <Button
                              onClick={() => {
                                 pulse()
                                 copy(YAML.stringify(config))
                              }}
                           >
                              Copy YML to clipboard
                           </Button>
                        )}
                     </Pulse>
                     <Pulse>
                        {(pulse) => (
                           <Button
                              onClick={() => {
                                 pulse()
                                 copy(JSON.stringify(config))
                              }}
                           >
                              Copy JSON to clipboard
                           </Button>
                        )}
                     </Pulse>
                     <Pulse>
                        {(pulse) => (
                           <Button
                              onClick={() => {
                                 pulse()
                                 downloadDefaultFiles()
                              }}
                           >
                              Download default files
                           </Button>
                        )}
                     </Pulse>
                     <Pulse>
                        {(pulse) => (
                           <Button
                              disabled={!pastConfig.length}
                              onClick={() => {
                                 pulse()
                                 undo()
                              }}
                           >
                              Undo
                           </Button>
                        )}
                     </Pulse>
                     <Pulse>
                        {(pulse) => (
                           <Button
                              disabled={!futureConfig.length}
                              onClick={() => {
                                 pulse()
                                 redo()
                              }}
                           >
                              Redo
                           </Button>
                        )}
                     </Pulse>
                  </div>
               </div>
               <div className="col xs12 m5">
                  <Collections>
                     <Title>Collections</Title>
                     <div className="section">
                        <Droppable droppableId="collectionsDroppable" type="COLLECTIONS">
                           {(collectionsDroppableProvided) => (
                              <div ref={collectionsDroppableProvided.innerRef} {...collectionsDroppableProvided.droppableProps}>
                                 {config.collections.map((collection, i) => (
                                    <Draggable key={`collection-${collection.name}`} draggableId={`collection-${collection.name}`} index={i}>
                                       {(provided, { isDragging }) => (
                                          <DraggableWrapper
                                             isDragging={isDragging}
                                             ref={provided.innerRef}
                                             {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             style={provided.draggableProps.style}
                                          >
                                             <Item
                                                key={collection.label}
                                                active={i === selectedCollectionIndex}
                                                noMargin
                                                icon={collection.folder ? folderCollectionIcon : filesCollectionIcon}
                                                title={collection.label}
                                                subtitle={collection.folder ? 'Folder' : 'Files'}
                                                onClick={() => selectCollection(i)}
                                                onDelete={(e) => deleteItem(e, ['collections', i])}
                                             />
                                          </DraggableWrapper>
                                       )}
                                    </Draggable>
                                 ))}
                                 {collectionsDroppableProvided.placeholder}
                              </div>
                           )}
                        </Droppable>
                     </div>
                     <Button onClick={addFolderCollection}>Add folder collection</Button>
                     <Button onClick={addFilesCollection}>Add files collection</Button>
                     <Sidenotes>
                        Sidenotes:
                        <ul>
                           <li>Now you can drag everything to change the orders :D</li>
                           <li>List's widgets change between field and fields automagically as you add or remove widgets.</li>
                        </ul>
                     </Sidenotes>
                  </Collections>
               </div>
               <div className="col xs12 m7">
                  <TransitionGroup>
                     <Transition key={transitionCollection} timeout={500}>
                        {(state) => (
                           <AnimateHeight
                              duration={state === 'exiting' || state === 'exited' || state !== 'entering' ? 500 : 0}
                              height={state === 'entered' ? 'auto' : 0}
                           >
                              {!selectedCollection ? (
                                 <Card>
                                    <div className="center">
                                       <img src={nothingIcon} alt="" />
                                       <Title>Nothing selected yet</Title>
                                    </div>
                                 </Card>
                              ) : (
                                 <div>
                                    <Pulse>
                                       {(pulse) => (
                                          <Card>
                                             <Title>General</Title>
                                             <form className="row" onSubmit={(e) => onModifyCollection(e, pulse)}>
                                                {selectedCollection.fields
                                                   ? Object.entries(collectionFolderOptions).map((option) =>
                                                        inputLister(option, collectionInputs, setCollectionInputs)
                                                     )
                                                   : Object.entries(collectionFilesOptions).map((option) =>
                                                        inputLister(option, collectionInputs, setCollectionInputs)
                                                     )}
                                                <div className="col xs12 right-align">
                                                   <Button type="submit">Save</Button>
                                                </div>
                                             </form>
                                          </Card>
                                       )}
                                    </Pulse>
                                    <Pulse>
                                       {(pulse) => (
                                          <Card>
                                             <Modal
                                                isOpen={isInputOptionsModalOpen}
                                                onRequestClose={() => setInputOptionsModalOpen(false)}
                                                style={modalStyles}
                                                closeTimeoutMS={300}
                                             >
                                                {!!selectedField.widget && (
                                                   <IconInfoWrapper bigInfo nonHoverable>
                                                      <img src={selectedField.widget.icon} alt="" />
                                                      <div>
                                                         <div className="row">
                                                            <div className="col xs12">
                                                               <FieldTitle big>{inputs.label}</FieldTitle>
                                                               <FieldSubtitle big>{selectedField.widget.widget}</FieldSubtitle>
                                                            </div>
                                                         </div>
                                                         <form className="row no-mrg" onSubmit={(e) => onModifyField(e, pulse)}>
                                                            {Object.entries({ ...commonWidgetOptions, ...selectedField.widget.options }).map((option) =>
                                                               inputLister(option, inputs, setInputs)
                                                            )}
                                                            <div className="col xs12 right-align">
                                                               <Button type="submit">Save</Button>
                                                            </div>
                                                         </form>
                                                      </div>
                                                   </IconInfoWrapper>
                                                )}
                                             </Modal>
                                             <Title>Fields</Title>
                                             {selectedCollection.fields ? (
                                                <React.Fragment>
                                                   <Droppable droppableId="droppable-1" type="FIELDS">
                                                      {(provided) => (
                                                         <div ref={provided.innerRef} {...provided.droppableProps}>
                                                            {selectedCollection.fields.map((field, fieldIndex) => fieldLister(field, ['fields', fieldIndex]))}
                                                            {provided.placeholder}
                                                         </div>
                                                      )}
                                                   </Droppable>
                                                   <div className="right-align">
                                                      <Button onClick={() => newWidget(['fields'])}>Add new widget</Button>
                                                   </div>
                                                </React.Fragment>
                                             ) : (
                                                <React.Fragment>
                                                   <Droppable droppableId="filesDroppable" type="FILES">
                                                      {(filesDroppableProvided) => (
                                                         <div ref={filesDroppableProvided.innerRef} {...filesDroppableProvided.droppableProps}>
                                                            {selectedCollection.files.map((file, fileIndex) => (
                                                               <Draggable key={`files-${file.name}`} draggableId={`files-${file.name}`} index={fileIndex}>
                                                                  {(filesDraggableProvided, { isDragging }) => (
                                                                     <DraggableWrapper
                                                                        isDragging={isDragging}
                                                                        ref={filesDraggableProvided.innerRef}
                                                                        {...filesDraggableProvided.draggableProps}
                                                                        {...filesDraggableProvided.dragHandleProps}
                                                                        style={filesDraggableProvided.draggableProps.style}
                                                                     >
                                                                        <div className="section">
                                                                           <Item
                                                                              title={file.label}
                                                                              subtitle={file.name}
                                                                              onClick={() => selectFile(file, ['files', fileIndex])}
                                                                              onDelete={(e) =>
                                                                                 deleteItem(e, ['collections', selectedCollectionIndex, 'files', fileIndex])
                                                                              }
                                                                           />
                                                                           <Droppable droppableId={`droppable-${fileIndex}`} type={`${file.name}-FIELDS`}>
                                                                              {(widgetsDroppableProvided) => (
                                                                                 <div
                                                                                    ref={widgetsDroppableProvided.innerRef}
                                                                                    {...widgetsDroppableProvided.droppableProps}
                                                                                 >
                                                                                    {file.fields.map((field, fieldIndex) =>
                                                                                       fieldLister(field, ['files', fileIndex, 'fields', fieldIndex])
                                                                                    )}
                                                                                    {widgetsDroppableProvided.placeholder}
                                                                                 </div>
                                                                              )}
                                                                           </Droppable>
                                                                        </div>
                                                                        <div className="right-align">
                                                                           <Button onClick={() => newWidget(['files', fileIndex, 'fields'])}>
                                                                              Add new widget
                                                                           </Button>
                                                                        </div>
                                                                     </DraggableWrapper>
                                                                  )}
                                                               </Draggable>
                                                            ))}
                                                            {filesDroppableProvided.placeholder}
                                                         </div>
                                                      )}
                                                   </Droppable>
                                                   <div className="right-align">
                                                      <Button onClick={addFile}>Add new file</Button>
                                                   </div>
                                                </React.Fragment>
                                             )}
                                          </Card>
                                       )}
                                    </Pulse>
                                 </div>
                              )}
                           </AnimateHeight>
                        )}
                     </Transition>
                  </TransitionGroup>
               </div>
            </div>
         </div>
         <div className="center">
            Made with <Heart>&#9829;</Heart> by{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://marcossi.com/en">
               Marcossi Design
            </a>
         </div>
      </DragDropContext>
   )
}

export default Builder

const DraggableWrapper = styled.div`
   background-color: ${({ isDragging }) => (isDragging ? 'white' : 'transparent')};
   box-shadow: ${({ isDragging }) => (isDragging ? '0px 8px 25px 0px rgba(0,0,0,0.15);' : 'none')};
   border-radius: 10px;
   transition: box-shadow 300ms ease-in-out, background-color 300ms ease-in-out;
   margin-bottom: 2px;
`

const Heart = styled.span`
   color: #e25555;
`

const Collections = styled.div`
   position: sticky;
   top: 15px;
`

const Title = styled.h4`
   font-size: 18px;
   text-transform: uppercase;
`

const Card = styled.div`
   background-color: white;
   border-radius: 15px;
   padding: 10px 20px;
   margin-bottom: 10px;
`

const MiniCard = styled.div`
   display: inline-block;
   margin: 2px;
   border-radius: 10px;
   cursor: pointer;
   padding: 10px;
   transition: 300ms background-color ease-out;
   font-size: 14px;
   text-align: center;
   &:hover {
      background-color: rgba(0, 0, 0, 0.1);
   }
`

const Child = styled.div`
   margin-left: 25px;
   padding-left: 10px;
   border-left: solid 1px #dedede;
`

const Sidenotes = styled.div`
   opacity: 0.5;
   font-size: 13px;
   padding: 20px 0;
   ul {
      margin: 0;
      padding-left: 23px;
   }
`
