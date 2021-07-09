import React, { useCallback, useEffect, useState } from 'react';
import TestingService from './TestingService';

const testingService = new TestingService();

const withTestingData = Component => {
  return () => {
    const [topics, setTopics] = useState(null);

    useEffect(() => {
      testingService.getTopics(336)
        .then(({ data }) => {
          setTopics(data.mastering_of_themes_lvl);
        })
        .catch(e => console.error(e))
    }, []);

    return topics && <Component topics={topics} />
  }
};

export default withTestingData;
