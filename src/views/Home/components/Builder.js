/* eslint-disable function-paren-newline */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import * as objectPath from 'object-path-immutable'
import AnimateHeight from 'react-animate-height'
import { Transition, TransitionGroup } from 'react-transition-group'

import folderCollectionIcon from '~/images/widgets/grid-even.svg'
import filesCollectionIcon from '~/images/widgets/grid.svg'
import widgets, { commonWidgetOptions, collectionFolderOptions, collectionFilesOptions } from '~/constants/configs'
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
   const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(null)
   const [selectedField, setSelectedField] = useState({})
   const [isInputOptionsModalOpen, setInputOptionsModalOpen] = React.useState(false)
   const [isAddWidgetModalOpen, setAddWidgetModalOpen] = React.useState(false)
   const [newWidgetPath, setNewWidgetPath] = React.useState('')
   const [inputs, setInputs] = useState({})
   const [collectionInputs, setCollectionInputs] = useState({})
   const fieldsList = useRef(null)

   const selectedCollection = selectedCollectionIndex === null ? false : config.collections[selectedCollectionIndex]

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
            </IconInfoWrapper>
            {field.widget === 'list' && (
               <Child>
                  {!!field.fields && field.fields.map((childField, childFieldIndex) => fieldLister(childField, [...fieldPath, 'fields', childFieldIndex]))}
                  <Button onClick={() => newWidget([...fieldPath, 'fields'])}>Add new widget</Button>
               </Child>
            )}
         </React.Fragment>
      )
   }

   const inputLister = ([optionName, optionSettings], values, setter) => {
      switch (optionSettings.type) {
         case 'string':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Input name={optionName} value={values[optionName]} onChange={setter} type="text">
                     {optionName}
                  </Input>
               </div>
            )
         case 'number':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Input name={optionName} value={values[optionName]} onChange={setter} type="number">
                     {optionName}
                  </Input>
               </div>
            )
         case 'boolean':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Toggle name={optionName} checked={values[optionName]} onChange={setter}>
                     {optionName}
                  </Toggle>
               </div>
            )
         case 'select':
            return (
               <div key={optionName} className="col xs12 l4">
                  <Select name={optionName} id={optionName} value={values[optionName]} onChange={setter}>
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
         default:
            return null
      }
   }

   const setInputValue = e => setInputs({ ...inputs, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
   const setCollectionInputValue = e =>
      setCollectionInputs({ ...collectionInputs, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

   const onModifyField = e => {
      e.preventDefault()
      const newField = { ...selectedField.field, ...inputs }
      const prefixedPath = ['collections', selectedCollectionIndex, ...selectedField.fieldPath]
      setConfig(objectPath.set(config, prefixedPath, newField))
      setInputOptionsModalOpen(false)
   }

   const onModifyCollection = e => {
      e.preventDefault()
      const newCollection = { ...selectedCollection, ...collectionInputs }
      const prefixedPath = ['collections', selectedCollectionIndex]
      setConfig(objectPath.set(config, prefixedPath, newCollection))
   }

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
   }

   return (
      <React.Fragment>
         <Modal isOpen={isInputOptionsModalOpen} onRequestClose={() => setInputOptionsModalOpen(false)} style={customStyles} closeTimeoutMS={300}>
            {!!selectedField.widget && (
               <React.Fragment>
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
                           {Object.entries({ ...commonWidgetOptions, ...selectedField.widget.options }).map(option =>
                              inputLister(option, inputs, setInputValue)
                           )}
                           <div className="col xs12 right-align">
                              <Button type="submit">Save</Button>
                           </div>
                        </form>
                     </div>
                  </IconInfoWrapper>
               </React.Fragment>
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
                           </IconInfoWrapper>
                        ))}
                     </div>
                  </Collections>
               </div>
               <div className="col s7">
                  {!selectedCollection ? (
                     <Card>
                        <Title>Nothing selected yet</Title>
                     </Card>
                  ) : (
                     <div ref={fieldsList}>
                        <Card>
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
                                             ? Object.entries(collectionFolderOptions).map(option =>
                                                  inputLister(option, collectionInputs, setCollectionInputValue)
                                               )
                                             : Object.entries(collectionFilesOptions).map(option =>
                                                  inputLister(option, collectionInputs, setCollectionInputValue)
                                               )}
                                          <div className="col xs12 right-align">
                                             <Button type="submit">Save</Button>
                                          </div>
                                       </form>
                                    </AnimateHeight>
                                 )}
                              </Transition>
                           </TransitionGroup>
                        </Card>
                        <Card>
                           <Title>Fields</Title>
                           <TransitionGroup>
                              <Transition key={selectedCollectionIndex} timeout={500}>
                                 {state => (
                                    <AnimateHeight
                                       duration={state === 'exiting' || state === 'exited' || state !== 'entering' ? 500 : 0}
                                       height={state === 'entered' ? 'auto' : 0}
                                    >
                                       {selectedCollection.fields
                                          ? selectedCollection.fields.map((field, fieldIndex) => fieldLister(field, ['fields', fieldIndex]))
                                          : selectedCollection.files.map((file, fileIndex) => (
                                               <div className="section" key={file.name}>
                                                  <div>
                                                     <FieldTitle>{file.label}</FieldTitle>
                                                     <FieldSubtitle>{file.name}</FieldSubtitle>
                                                  </div>
                                                  {file.fields.map((field, fieldIndex) => fieldLister(field, ['files', fileIndex, 'fields', fieldIndex]))}
                                               </div>
                                            ))}
                                       <div className="right-align">
                                          <Button onClick={() => newWidget(['fields'])}>Add new widget</Button>
                                       </div>
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
      </React.Fragment>
   )
}

export default Builder

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
