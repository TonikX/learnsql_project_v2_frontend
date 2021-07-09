import React, { memo } from 'react'

import { Box, CircularProgress, Typography } from '@material-ui/core'

const CircularProgressWithLabel = props => {
  return (
    <Box style={{ position: "relative", display: "inline-flex", width: 'fit-content', height: 'fit-content' }} >
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

export default memo(CircularProgressWithLabel)
