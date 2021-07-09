import React, { useEffect, useState } from 'react';
import CourseProfileService from './service';
import { processRouteData } from './utils';

const courseProfileService = new CourseProfileService();

const withCourseProfileDate = Component => {
  return (props) => {
    const [course, setCourse] = useState(null);
    const [courseTopics, setCourseTopics] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [account, setAccount] = useState(null)
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      courseProfileService.getIndividualRoute(336)
        .then(({ data }) => {
          setCourse(data.course);
          setCourseTopics(data.mastering_of_themes_lvl);
          setRouteData(processRouteData(data.graph));
          setAccount(data.account);
          setIsReady(true);
        })
        .catch(e => console.error(e))
    }, [])

    return isReady && (
      <Component
        {...props}
        course={course}
        courseTopics={courseTopics}
        routeData={routeData}
        account={account}
      />
    )
  }
};

export default withCourseProfileDate;
