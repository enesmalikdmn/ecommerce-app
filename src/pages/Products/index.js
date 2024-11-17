import React, { useRef, useEffect } from 'react';
import Card from '../../components/Card';
import { Grid, Spinner, Box } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';
import { getProducts } from '../../services/api';

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('products', getProducts, {
    getNextPageParam: (lastPage, pages) => {
      const hasMorePage = lastPage?.length === 12;
      if (!hasMorePage) return undefined;
      return pages.length + 1; // Sonraki sayfa numarasını belirle
    },
  });

  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === 'loading') return <Spinner size="xl" />;

  if (status === 'error') return <div>An error has occurred: {error.message}</div>;

  return (
    <div>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </React.Fragment>
        ))}
      </Grid>

      {isFetchingNextPage && (
        <Box textAlign="center" mt={4}>
          <Spinner size="lg" />
        </Box>
      )}

      {/* Intersection Observer'ın tetikleneceği yer */}
      <div ref={observerRef} style={{ height: '1px' }} />
    </div>
  );
}

export default Products;
