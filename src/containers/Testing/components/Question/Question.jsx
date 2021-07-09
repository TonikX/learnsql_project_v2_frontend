import React from 'react'

import { Box, Divider, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@material-ui/core'

const Question = ({ index, body, options, answer = null, setAnswer, img }) => {
  const handleChange = (e) => {
    setAnswer(index, +e.target.value)
  };

  return (
    <Paper style={{ padding: '30px' }}>
      <Box mb={2}>
        <Typography variant="body1">{body}</Typography>
        {img && <img src={img} alt="Картинка задания" style={{ marginTop: '10px' }} />}
      </Box>

      <Divider />

      <Box mt={2}>
        <RadioGroup value={answer} onChange={handleChange}>
          {
            options.map((item, i) => (
              <FormControlLabel value={i} key={i} control={<Radio />} label={item} />
            ))
          }
        </RadioGroup>
      </Box>

    </Paper>
  )
}

export default Question
