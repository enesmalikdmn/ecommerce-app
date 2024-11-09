import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
} from "@chakra-ui/react";

function CustomModal({ isOpen, onClose, address, setAddress, userName, setUserName, handleOrder }) {
  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <FormControl className="flex flex-col gap-4">
            <FormLabel>Save Order</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Name"
              resize={false}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Textarea
              ref={initialRef}
              placeholder="Address"
              resize={false}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter className="flex gap-4">
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleOrder}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
