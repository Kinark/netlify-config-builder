/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable function-paren-newline */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import Modal from 'react-modal'
import * as objectPath from 'object-path-immutable'
import AnimateHeight from 'react-animate-height'
import { Transition, TransitionGroup } from 'react-transition-group'
import copy from 'copy-to-clipboard'
import YAML from 'json-to-pretty-yaml'

import folderCollectionIcon from '~/images/widgets/grid-even.svg'
import filesCollectionIcon from '~/images/widgets/grid.svg'
import deleteIcon from '~/images/widgets/cross.svg'
import widgets, { fileOptions, commonWidgetOptions, collectionFolderOptions, collectionFilesOptions } from '~/constants/configs'
import Input from '~/components/Input'
import Toggle from '~/components/Toggle'
import Button from '~/components/Button'
import Select from '~/components/Select'

import defaultConfig from './defaultConfig'

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '15px',
      border: 'none',
      maxWidth: '720px'
   },
   overlay: {
      backdropFilter: 'blur(5px)',
      backgroundColor: 'rgba(0,0,0,0.25)'
   }
}

Modal.setAppElement('#root')

const Builder = () => {
   const [config, setConfig] = useState(defaultConfig)

   // SELECTED THINGS
   const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(null)
   const [selectedFile, setSelectedFile] = useState({})
   const [selectedField, setSelectedField] = useState({})

   // MODALS
   const [isInputOptionsModalOpen, setInputOptionsModalOpen] = React.useState(false)
   const [isAddWidgetModalOpen, setAddWidgetModalOpen] = React.useState(false)
   const [isFileModalOpen, setFileModalOpen] = React.useState(false)

   // PATHS
   const [newWidgetPath, setNewWidgetPath] = React.useState('')

   // SAVE EFFECTS
   const [saveGeneral, setSaveGeneral] = React.useState(false)
   const [saveFields, setSaveFields] = React.useState(false)

   // INPUTS
   const [inputs, setInputs] = useState({})
   const [collectionInputs, setCollectionInputs] = useState({})

   // REFS
   const fieldsList = useRef(null)

   const selectedCollection = selectedCollectionIndex === null ? false : config.collections[selectedCollectionIndex]

   // FX TRIGGERS
   const triggerSaveFxGeneral = () => {
      setSaveGeneral(true)
      setTimeout(() => {
         setSaveGeneral(false)
      }, 1000)
   }
   const triggerSaveFxFields = () => {
      setSaveFields(true)
      setTimeout(() => {
         setSaveFields(false)
      }, 1000)
   }

   // SELECTERS
   const selectField = (field, widget, fieldPath) => {
      const initialValues = {}
      Object.entries(commonWidgetOptions).map(([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || ''))
      Object.entries(widget.options).map(([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || ''))
      setInputs({ ...initialValues, ...field })
      setSelectedField({ field, widget, fieldPath })
      setInputOptionsModalOpen(true)
   }

   const selectCollection = i => {
      setSelectedCollectionIndex(i)
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

   // LISTERS
   const fieldLister = (field, fieldPath) => {
      const rightWidget = widgets.find(widget => widget.widget === field.widget)
      return (
         <React.Fragment key={field.name}>
            <IconInfoWrapper onClick={() => selectField(field, rightWidget, fieldPath)}>
               <img src={rightWidget.icon} alt="" />
               <div>
                  <FieldTitle>{field.label}</FieldTitle>
                  <FieldSubtitle>{rightWidget.name}</FieldSubtitle>
               </div>
               <DeleteBtn onClick={e => deleteItem(e, ['collections', selectedCollectionIndex, ...fieldPath])}>
                  <img src={deleteIcon} alt="" />
               </DeleteBtn>
            </IconInfoWrapper>
            {(field.widget === 'list' || field.widget === 'object') && (
               <Child>
                  {!!field.fields && field.fields.map((childField, childFieldIndex) => fieldLister(childField, [...fieldPath, 'fields', childFieldIndex]))}
                  <Button onClick={() => newWidget([...fieldPath, 'fields'])}>Add new widget</Button>
               </Child>
            )}
         </React.Fragment>
      )
   }

   const inputLister = ([optionName, optionSettings], values, setter) => {
      const setFunction = e => setter({ ...values, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
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
                     {optionSettings.options.map(option => (
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
                  {optionSettings.options.map(option => (
                     <Toggle
                        name={`${optionName}[${option}]`}
                        key={option}
                        checked={values[optionName].includes(option)}
                        onChange={() =>
                           setter({
                              ...values,
                              [optionName]: values[optionName].includes(option)
                                 ? values[optionName].filter(crtOpt => crtOpt !== option)
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
                     onChange={e => setter({ ...values, [e.target.name]: e.target.value.split(',') })}
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
   const onModifyField = e => {
      e.preventDefault()
      const newField = { ...selectedField.field, ...inputs }
      const prefixedPath = ['collections', selectedCollectionIndex, ...selectedField.fieldPath]
      setConfig(objectPath.set(config, prefixedPath, newField))
      setInputOptionsModalOpen(false)
      triggerSaveFxFields()
   }

   const onModifyCollection = e => {
      e.preventDefault()
      const newCollectionInputs = { ...collectionInputs }
      delete newCollectionInputs.fields
      delete newCollectionInputs.files
      const newCollection = { ...selectedCollection, ...newCollectionInputs }
      const prefixedPath = ['collections', selectedCollectionIndex]
      setConfig(objectPath.set(config, prefixedPath, newCollection))
      triggerSaveFxGeneral()
   }

   const onModifyFile = e => {
      e.preventDefault()
      const newFile = { ...selectedFile.file, ...inputs }
      const prefixedPath = ['collections', selectedCollectionIndex, ...selectedFile.filePath]
      setConfig(objectPath.set(config, prefixedPath, newFile))
      setFileModalOpen(false)
      triggerSaveFxFields()
   }

   // NEW WIDGET MODAL METHODS
   const newWidget = path => {
      setNewWidgetPath(['collections', selectedCollectionIndex, ...path])
      setAddWidgetModalOpen(true)
   }

   const addWidget = widget => {
      const newWidgetObject = {
         label: `New ${widget.name}`,
         name: `new_${widget.widget}`,
         required: true,
         widget: widget.widget,
         hint: ''
      }
      Object.entries(widget.options).map(([optionName, optionSettings]) => (newWidgetObject[optionName] = optionSettings.defaultsTo || ''))
      const newConfig = objectPath.push(config, newWidgetPath, newWidgetObject)
      setConfig(newConfig)
      setAddWidgetModalOpen(false)
      triggerSaveFxFields()
   }

   // ADD NEW STUFF METHODS
   const addFile = () => {
      const newFileObject = {
         file: 'src/pages/newFile.md',
         label: 'New File',
         name: 'newFile',
         fields: [
            {
               label: 'Title',
               name: 'title',
               widget: 'string',
               default: '',
               required: true,
               hint: ''
            }
         ]
      }
      const newConfig = objectPath.push(config, ['collections', selectedCollectionIndex, 'files'], newFileObject)
      setConfig(newConfig)
   }

   const addFolderCollection = () => {
      const newFileObject = {
         name: 'newFolderCollection',
         label: 'New Folder Collection',
         folder: 'src/pages/newFolderCollection',
         create: true,
         slug: '{{slug}}',
         fields: [
            {
               label: 'Title',
               name: 'title',
               widget: 'string',
               default: '',
               required: true,
               hint: ''
            }
         ]
      }
      const newConfig = objectPath.push(config, ['collections'], newFileObject)
      setConfig(newConfig)
   }

   const addFilesCollection = () => {
      const newFileObject = {
         name: 'newFolderCollection',
         label: 'New Folder Collection',
         delete: false,
         files: [
            {
               file: 'src/pages/newFile.md',
               label: 'New File',
               name: 'index',
               fields: [
                  {
                     label: 'Title',
                     name: 'title',
                     widget: 'string',
                     default: '',
                     required: true,
                     hint: ''
                  }
               ]
            }
         ]
      }
      const newConfig = objectPath.push(config, ['collections'], newFileObject)
      setConfig(newConfig)
   }

   // DELETE STUFF METHODS
   const deleteItem = (e, path) => {
      e.stopPropagation()
      setConfig(objectPath.del(config, path))
   }

   return (
      <React.Fragment>
         <Modal isOpen={isFileModalOpen} onRequestClose={() => setFileModalOpen(false)} style={customStyles} closeTimeoutMS={300}>
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
                        {Object.entries({ ...fileOptions }).map(fileOption => inputLister(fileOption, inputs, setInputs))}
                        <div className="col xs12 right-align">
                           <Button type="submit">Save</Button>
                        </div>
                     </form>
                  </div>
               </IconInfoWrapper>
            )}
         </Modal>
         <Modal isOpen={isInputOptionsModalOpen} onRequestClose={() => setInputOptionsModalOpen(false)} style={customStyles} closeTimeoutMS={300}>
            {!!selectedField.widget && (
               <IconInfoWrapper nonHoverable>
                  <img src={selectedField.widget.icon} alt="" />
                  <div>
                     <div className="row">
                        <div className="col xs12">
                           <FieldTitle big>{inputs.label}</FieldTitle>
                           <FieldSubtitle big>{selectedField.widget.widget}</FieldSubtitle>
                        </div>
                     </div>
                     <form className="row no-mrg" onSubmit={onModifyField}>
                        {Object.entries({ ...commonWidgetOptions, ...selectedField.widget.options }).map(option => inputLister(option, inputs, setInputs))}
                        <div className="col xs12 right-align">
                           <Button type="submit">Save</Button>
                        </div>
                     </form>
                  </div>
               </IconInfoWrapper>
            )}
         </Modal>
         <Modal isOpen={isAddWidgetModalOpen} onRequestClose={() => setAddWidgetModalOpen(false)} style={customStyles} closeTimeoutMS={300}>
            <Title>Add widget</Title>
            {widgets.map(widget => (
               <MiniCard key={widget.name} onClick={() => addWidget(widget)}>
                  <img src={widget.icon} alt="" />
                  <div>{widget.name}</div>
               </MiniCard>
            ))}
         </Modal>
         <div className="container">
            <div className="row">
               <div className="col xs12">
                  <div className="right-align">
                     <Button onClick={() => copy(YAML.stringify(config))}>Copy YML to clipboard</Button>
                  </div>
               </div>
               <div className="col s5">
                  <Collections>
                     <Title>Collections</Title>
                     <div className="section">
                        {config.collections.map((collection, i) => (
                           <IconInfoWrapper key={collection.label} active={i === selectedCollectionIndex} onClick={() => selectCollection(i)}>
                              <img src={collection.folder ? folderCollectionIcon : filesCollectionIcon} alt="" />
                              <div>
                                 <FieldTitle>{collection.label}</FieldTitle>
                                 <FieldSubtitle>{collection.folder ? 'Folder' : 'Files'}</FieldSubtitle>
                              </div>
                              <DeleteBtn onClick={e => deleteItem(e, ['collections', i])}>
                                 <img src={deleteIcon} alt="" />
                              </DeleteBtn>
                           </IconInfoWrapper>
                        ))}
                     </div>
                     <Button onClick={addFolderCollection}>Add folder collection</Button>
                     <Button onClick={addFilesCollection}>Add files collection</Button>
                  </Collections>
               </div>
               <div className="col s7">
                  {!selectedCollection ? (
                     <Card>
                        <Title>Nothing selected yet</Title>
                     </Card>
                  ) : (
                     <div ref={fieldsList}>
                        <Card save={saveGeneral}>
                           <Title>General</Title>
                           <TransitionGroup>
                              <Transition key={selectedCollectionIndex} timeout={500}>
                                 {state => (
                                    <AnimateHeight
                                       duration={state === 'exiting' || state === 'exited' || state !== 'entering' ? 500 : 0}
                                       height={state === 'entered' ? 'auto' : 0}
                                    >
                                       <form className="row" onSubmit={onModifyCollection}>
                                          {selectedCollection.fields
                                             ? Object.entries(collectionFolderOptions).map(option => inputLister(option, collectionInputs, setCollectionInputs))
                                             : Object.entries(collectionFilesOptions).map(option => inputLister(option, collectionInputs, setCollectionInputs))}
                                          <div className="col xs12 right-align">
                                             <Button type="submit">Save</Button>
                                          </div>
                                       </form>
                                    </AnimateHeight>
                                 )}
                              </Transition>
                           </TransitionGroup>
                        </Card>
                        <Card save={saveFields}>
                           <Title>Fields</Title>
                           <TransitionGroup>
                              <Transition key={selectedCollectionIndex} timeout={500}>
                                 {state => (
                                    <AnimateHeight
                                       duration={state === 'exiting' || state === 'exited' || state !== 'entering' ? 500 : 0}
                                       height={state === 'entered' ? 'auto' : 0}
                                    >
                                       {selectedCollection.fields ? (
                                          <React.Fragment>
                                             {selectedCollection.fields.map((field, fieldIndex) => fieldLister(field, ['fields', fieldIndex]))}
                                             <div className="right-align">
                                                <Button onClick={() => newWidget(['fields'])}>Add new widget</Button>
                                             </div>
                                          </React.Fragment>
                                       ) : (
                                          <React.Fragment>
                                             {selectedCollection.files.map((file, fileIndex) => (
                                                <React.Fragment key={file.name}>
                                                   <div className="section">
                                                      <IconInfoWrapper onClick={() => selectFile(file, ['files', fileIndex])}>
                                                         <div>
                                                            <FieldTitle>{file.label}</FieldTitle>
                                                            <FieldSubtitle>{file.name}</FieldSubtitle>
                                                         </div>
                                                         <DeleteBtn onClick={e => deleteItem(e, ['collections', selectedCollectionIndex, 'files', fileIndex])}>
                                                            <img src={deleteIcon} alt="" />
                                                         </DeleteBtn>
                                                      </IconInfoWrapper>
                                                      {file.fields.map((field, fieldIndex) => fieldLister(field, ['files', fileIndex, 'fields', fieldIndex]))}
                                                   </div>
                                                   <div className="right-align">
                                                      <Button onClick={() => newWidget(['files', fileIndex, 'fields'])}>Add new widget</Button>
                                                   </div>
                                                </React.Fragment>
                                             ))}
                                             <div className="right-align">
                                                <Button onClick={addFile}>Add new file</Button>
                                             </div>
                                          </React.Fragment>
                                       )}
                                    </AnimateHeight>
                                 )}
                              </Transition>
                           </TransitionGroup>
                        </Card>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div className="center">
         Made with <Heart>&#9829;</Heart> by <a targer="_blank" href="https://marcossi.com/en">Marcossi Design</a>
         </div>
      </React.Fragment>
   )
}

export default Builder

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(106, 119, 162, 0.4);
  }
  70% {
      box-shadow: 0 0 0 10px rgba(106, 119, 162, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(106, 119, 162, 0);
  }
`

const Heart = styled.span`
   color: #e25555;
`;

const Collections = styled.div`
   position: sticky;
   top: 15px;
`

const Title = styled.h4`
   font-size: 18px;
   text-transform: uppercase;
`

const IconInfoWrapper = styled.div`
   align-items: flex-start;
   display: flex;
   margin-bottom: 2px;
   border-radius: 10px;
   cursor: ${({ nonHoverable }) => (nonHoverable ? 'unset' : 'pointer')};
   padding: 10px;
   background-color: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)')};
   transition: 300ms background-color ease-out;
   img {
      margin-top: 5px;
      margin-right: 10px;
   }
   &:hover {
      background-color: ${({ nonHoverable }) => (nonHoverable ? 'none' : 'rgba(0, 0, 0, 0.1)')};
   }
   position: relative;
`

const DeleteBtn = styled.button`
   position: absolute;
   top: 0;
   bottom: 0;
   right: 10px;
   margin: auto;
   border-radius: 50%;
   background-color: rgba(0, 0, 0, 0);
   transition: 300ms background-color ease-out;
   height: 40px;
   width: 40px;
   display: flex;
   justify-content: center;
   &:hover {
      background-color: ${({ nonHoverable }) => (nonHoverable ? 'none' : 'rgba(0, 0, 0, 0.1)')};
   }
   img {
      margin: 0;
   }
`

const FieldTitle = styled.h5`
   font-size: ${({ big }) => (big ? '18px' : '16px')};
   margin: 0;
`

const FieldSubtitle = styled.div`
   font-size: ${({ big }) => (big ? '16px' : '14px')};
   opacity: 50%;
`

const Card = styled.div`
   background-color: white;
   border-radius: 15px;
   padding: 10px 20px;
   margin-bottom: 10px;
   animation: ${({ save }) => (save ? css`1s ${pulse} ease-out` : 'none')};
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
