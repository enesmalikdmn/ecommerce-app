import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getProducts, deleteProduct } from '../../../services/api'
import { Table } from 'antd'
import { Text } from '@chakra-ui/react'
import AdminProducts from './adminProducts'

function Products() {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery('admin:products', getProducts);

  // Silme işlemi için useMutation kullanarak optimistic update yapıyoruz
  const mutation = useMutation(deleteProduct, {
    onMutate: async (id) => {
      // 1. Geçerli veriyi önbellekten alarak saklayın (rollback için)
      const previousProducts = queryClient.getQueryData('admin:products');

      // 2. Ürün listesini optimistic olarak güncelleyin
      queryClient.setQueryData('admin:products', (old) =>
        old.filter((product) => product.id !== id)
      );

      // 3. Hata durumunda geri almak için önceki veriyi döndürün
      return { previousProducts };
    },
    onError: (error, id, context) => {
      // Hata durumunda önceki veriyi geri yükleyin
      queryClient.setQueryData('admin:products', context.previousProducts);
      console.error("Silme işlemi başarısız:", error);
    },
    onSettled: () => {
      // İşlem tamamlandıktan sonra veriyi yeniden fetch edin
      queryClient.invalidateQueries('admin:products');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  // Optimistic update işlemi için onDelete fonksiyonunu kullanın
  const onDelete = (id) => {
    mutation.mutate(id); // ID'yi silme işlemi için gönderiyoruz
  };

  // columns parametresi olarak onDelete fonksiyonunu geçiriyoruz
  const columns = AdminProducts(onDelete);

  return (
    <div>
      <Text fontSize="xl" mb="4">Products</Text>
      <Table dataSource={data} columns={columns} />
    </div>
  )
}

export default Products;
