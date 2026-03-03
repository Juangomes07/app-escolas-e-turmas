import { Button, ButtonText } from '@/components/gluestack-ui/button';
import { Heading } from '@/components/gluestack-ui/heading';
import { CloseIcon, Icon } from '@/components/gluestack-ui/icon';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@/components/gluestack-ui/modal';
import { Text } from '@/components/gluestack-ui/text';
import React, { forwardRef, useImperativeHandle } from 'react';

interface DeleteItemModalProps { 
   title:string
   subtitle:string
   performButtonLabel:string
   performButtonClassName?:string
   onPerform:() => void
}

export interface DeleteItemModalRefHandle {
   open: () => void;
}

const DeleteItemModal = forwardRef<DeleteItemModalRefHandle, DeleteItemModalProps>((props, ref) => {
   const [isVisible, setIsVisible] = React.useState(false);

   useImperativeHandle(ref, () => ({
      open: () => {
         setIsVisible(true);
      }
   }));

   return (
      <Modal
         isOpen={isVisible}
         onClose={() => {
            setIsVisible(false);
         }}
         size="md"
      >
         <ModalBackdrop />
         <ModalContent>
            <ModalHeader>
               <Heading size="lg">{props.title}</Heading>
               <ModalCloseButton>
                  <Icon as={CloseIcon} />
               </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
               <Text>{props.subtitle}</Text>
            </ModalBody>
            <ModalFooter>
               <Button
                  variant="outline"
                  action="secondary"
                  className="mr-3"
                  onPress={() => {
                     setIsVisible(false);
                  }}
               >
                  <ButtonText>Fechar</ButtonText>
               </Button>
               <Button
                  className={props.performButtonClassName}
                  onPress={() => {
                     props.onPerform()
                     setIsVisible(false);
                  }}
               >
                  <ButtonText>{props.performButtonLabel}</ButtonText>
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
});

export default DeleteItemModal;