/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import objectPath from 'object-path'
import AnimateHeight from 'react-animate-height'
import { Transition, TransitionGroup } from 'react-transition-group'

import folderCollectionIcon from '~/images/widgets/grid-even.svg'
import filesCollectionIcon from '~/images/widgets/grid.svg'
import widgets, { commonOptions } from '~/constants/widgets'
import Input from '~/components/Input'
import Button from '~/components/Button'

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
      border: 'none'
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
   const [modalIsOpen, setIsModalOpen] = React.useState(false)
   const [inputs, setInputs] = useState({})
   const fieldsList = useRef(null)

   const selectedCollection = selectedCollectionIndex === null ? false : config.collections[selectedCollectionIndex]

   const modifyField = (field, widget, fieldPath) => {
      const initialValues = {}
      Object.entries(commonOptions).map(([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || ''))
      Object.entries(widget.options).map(([optionName, optionSettings]) => (initialValues[optionName] = optionSettings.defaultsTo || ''))
      setInputs({ ...initialValues, ...field })
      setSelectedField({ field, widget, fieldPath })
      setIsModalOpen(true)
   }

   const fieldLister = (field, fieldPath, childTimes = 1) => {
      const rightWidget = widgets.find(widget => widget.widget === field.widget)
      return (
         <React.Fragment key={field.name}>
            <IconInfoWrapper onClick={() => modifyField(field, rightWidget, fieldPath)}>
               <img src={rightWidget.icon} alt="" />
               <div>
                  <FieldTitle>{field.label}</FieldTitle>
                  <FieldSubtitle>{rightWidget.name}</FieldSubtitle>
               </div>
            </IconInfoWrapper>
            {!!field.fields && (
               <Child level={childTimes}>
                  {field.fields.map((childField, childFieldIndex) => fieldLister(childField, [...fieldPath, 'fields', childFieldIndex], childTimes + 1))}
               </Child>
            )}
         </React.Fragment>
      )
   }

   const setInputValue = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

   const onModifyField = e => {
      e.preventDefault()
      const newField = { ...selectedField.field, ...inputs }
      const newConfig = { ...config }
      const prefixedPath = ['collections', selectedCollectionIndex, ...selectedField.fieldPath]
      objectPath.set(newConfig, prefixedPath, newField)
      setConfig(newConfig)
      setIsModalOpen(false)
   }

   return (
      <React.Fragment>
         <Modal isOpen={modalIsOpen} onRequestClose={() => setIsModalOpen(false)} style={customStyles} closeTimeoutMS={300}>
            {!!selectedField.widget && (
               <React.Fragment>
                  <Title>{inputs.label}</Title>
                  <form className="row" onSubmit={onModifyField}>
                     {Object.entries({ ...commonOptions, ...selectedField.widget.options }).map(([optionName, optionSettings]) => {
                        switch (optionSettings.type) {
                           case 'string':
                              return (
                                 <div key={optionName} className="col xs12 l4">
                                    <Input name={optionName} value={inputs[optionName]} onChange={setInputValue} type="text">
                                       {optionName}
                                    </Input>
                                 </div>
                              )
                           case 'number':
                              return (
                                 <div key={optionName} className="col xs12 l4">
                                    <Input key={optionName} name={optionName} value={inputs[optionName]} onChange={setInputValue} type="number">
                                       {optionName}
                                    </Input>
                                 </div>
                              )
                           default:
                              return null
                        }
                     })}
                     <div className="col xs12 right-align">
                        <Button type="submit">Save</Button>
                     </div>
                  </form>
               </React.Fragment>
            )}
         </Modal>
         <div className="container">
            <div className="row">
               <div className="col s5">
                  <Collections>
                     <Title>Collections</Title>
                     <div className="section">
                        {config.collections.map((collection, i) => (
                           <IconInfoWrapper key={collection.label} active={i === selectedCollectionIndex} onClick={() => setSelectedCollectionIndex(i)}>
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
   display: flex;
   margin-bottom: 2px;
   border-radius: 10px;
   cursor: pointer;
   padding: 10px;
   background-color: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)')};
   transition: 300ms background-color ease-out;
   img {
      margin-right: 10px;
   }
   &:hover {
      background-color: rgba(0, 0, 0, 0.1);
   }
`

const FieldTitle = styled.h5`
   font-size: 16px;
   margin: 0;
`

const FieldSubtitle = styled.div`
   font-size: 14px;
   opacity: 50%;
`

const Card = styled.div`
   background-color: white;
   border-radius: 15px;
   padding: 20px;
   margin-bottom: 10px;
`

const Child = styled.div`
   margin-left: ${({ level }) => `${level * 25}px`};
   padding-left: 10px;
   border-left: solid 1px #dedede;
`
