import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const queryData = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
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