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
} from "@chakra-ui/react";

function CustomModal({ isOpen, onClose, address, setAddress, handleOrder }) {
  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Save Order</FormLabel>
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
