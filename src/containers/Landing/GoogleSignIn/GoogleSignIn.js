import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { service } from '../service'

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
  
  useEffect(async () => {
    const search = location.search
    const query = parseQuery(search)
    console.log('search', search)
    console.log('query', query)
    try {
      const data = await service.getTokens(query.code, query.state)
      debugger
    } catch (e) {
      
    }
  }, [])
  
  return (
    <div>
      
    </div>
  )
}