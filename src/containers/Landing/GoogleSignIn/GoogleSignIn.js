import React, { useEffect } from 'react'
import {useHistory, useLocation} from 'react-router'
import { service } from '../service'
import {service as userService} from "../../../service/user-service";
import actions from "../../../layout/actions";
import {appRouter} from "../../../service/router-service";
import {useDispatch} from "react-redux";

function parseQuery(queryString) {
  let query = {}
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&')
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

export default () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const getToken = async () => {
    const query = parseQuery(location.hash)
    try {
      const res = await service.getTokens(query['#access_token'])
      const token = res?.data?.access_token
      const refresh_token = res?.data?.refresh_token
      userService.setToken(token)
      userService.setRefreshToken(refresh_token)
      dispatch(actions.setAuthTrue())
      history.push(appRouter.getAllCoursesRoute())
    } catch (e) {
      dispatch(actions.fetchingFailed(e));
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return <></>
}
