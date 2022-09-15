import { useState, useEffect } from 'react';
import { GET_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useReviews = (variables) => {
  const [repositories, setRepositories] = useState();

  const { data, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    // Other options
    variables,
    onError: (err) => {
      console.log('EpäOnnistui!', err);
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data?.reviews,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;
