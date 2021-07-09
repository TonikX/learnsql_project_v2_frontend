import React, { useCallback, useMemo, useState } from 'react'

import { Box, Button } from '@material-ui/core'
import Question from './components/Question'
import CircularProgressWithLabel from '../../components/CircularProgressWithLabel'

import { withRouter } from 'react-router'
import { processTopicData } from './utils'
import withTestingData from './withTestingData'
import TestingService from './TestingService'

const testingService = new TestingService();

const Testing = ({ topics, match: { params: { id } }, history }) => {
  processTopicData(topics);
  const [state, setState] = useState({ ...processTopicData(topics), current: 0 })

  const progress = useMemo(() => state.questions.reduce((prev, item) => {
    return item.answer !== null && item.answer !== undefined ? prev + 1 : prev
  }, 0) * 100 / state.questions.length, [state])


  const changeAnswer = useCallback((index, answer) => {
    const question = state.questions[index];
    let degree = 0;

    switch (answer) {
      case 0:
        degree = 90;
        break;
      case 1:
        degree = 75;
        break;
      case 2:
        degree = 45;
        break;
      case 3:
        degree = 5;
        break;
      default:
        degree = 0;
    }

    testingService.saveResult(question.id, question.themeId, 336, degree)
      .then(() => {
        setState(prev => ({
          ...prev,
          questions: prev.questions.map((item, i) => i === index ? { ...item, answer } : item)
        }))
      })

  }, [state.questions])

  const handleNext = () => {
    if (state.current + 1 === state.questions.length) {
      localStorage.setItem("passed", 'true');
      history.push(`/course/${id}`)
    }

    setState(prev => ({ ...prev, current: state.current + 1 }))
  }

  return (
    <Box mt={6} ml="auto" mr="auto" width="65%">
      <Box mb={1} ml={2}>
        <CircularProgressWithLabel value={progress} />
      </Box>

      <Question
        index={state.current}
        body={state.questions[state.current].body}
        options={state.questions[state.current].options}
        answer={state.questions[state.current].answer}
        setAnswer={changeAnswer}
        img={state.questions[state.current].img}
      />

      <Box m={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant='contained'
          color="primary"
          disabled={state.current === 0}
          onClick={() => setState(prev => ({ ...prev, current: state.current - 1 }))}
        >
          Назад
      </Button>

        <Button
          variant='contained'
          color="primary"
          disabled={state.questions[state.current].answer === undefined}
          onClick={handleNext}
        >
          {state.questions.length === state.current + 1 ? 'Закончить тест' : 'Вперед'}
        </Button>
      </Box>
    </Box>
  )
}

export default withTestingData(withRouter(Testing))
