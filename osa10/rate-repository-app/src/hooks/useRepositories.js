import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (variables) => {
  const [repositories, setRepositories] = useState();

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
    variables,
    onError: (err) => {
      console.log('EpäOnnistui!', err);
    }
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;

/* wanha:
const useRepositories = ({orderBy, orderDirection, searchKeyword}) => {
  const [repositories, setRepositories] = useState();

  const queryData = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
    variables: {
      orderBy,
      orderDirection,
      searchKeyword
    },
    onError: (err) => {
      console.log('EpäOnnistui!', err);
    }
  });

  const fetchRepositories = async () => {
    try {
      //console.log('QUERYDATA:', queryData);
      if (queryData && !queryData.loading) {
        setRepositories(queryData.data.repositories);
      }
    }
    catch (err) {
      console.log('EpäOnnistui!', err);
    }
    
    //setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, [queryData]);

  return { repositories, refetch: fetchRepositories };
};

export default useRepositories;

*/