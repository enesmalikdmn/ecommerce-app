import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getProducts, deleteProduct, updateProduct } from '../../../services/api'
import { Table, Button } from 'antd'
import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, useDisclosure } from '@chakra-ui/react'
import AdminProducts from './adminProducts'

function Products() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal kontrolü için Chakra UI hook'u
  const [selectedProduct, setSelectedProduct] = useState(null); // Düzenlenecek ürünün verisi

  const { data, error, isLoading, isError } = useQuery('admin:products', getProducts);

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin:products');
    },
  });

  const editMutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin:products');
      onClose(); // Güncelleme sonrası modalı kapatın
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const onDelete = (id) => deleteMutation.mutate(id);

  // Edit butonuna tıklandığında çalışacak fonksiyon
  const onEdit = (product) => {
    setSelectedProduct(product); // Düzenlenecek ürünü state'e atayın
    onOpen();
  };

  // Düzenleme işlemini gerçekleştiren fonksiyon
  const handleEditSave = () => {
    editMutation.mutate(selectedProduct);
  };

  const columns = AdminProducts(onDelete, onEdit);

  return (
    <div>
      <Text fontSize="xl" mb="4">Products</Text>
      <Table dataSource={data} columns={columns} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              value={selectedProduct?.title || ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Price"
              value={selectedProduct?.price || ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Description"
              value={selectedProduct?.description || ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
            />
          </ModalBody>
          <ModalFooter className='flex gap-3'>
            <Button type='primary' onClick={handleEditSave}>Save</Button>
            <Button type='primary' danger onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Products;
