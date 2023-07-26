import { HeelPortrait, PageWrapper } from '@/components'
import { useGameContext } from '@/contexts'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useCallback } from 'react'

export function ResultsScreen() {
  const {
    servants,
    guesses,
    score,
    goToScreen
  } = useGameContext()

  const detailedResultsRows = servants.map((servant, index) => {
    return {
      name: servant.name,
      footId: servant.footId,
      guesses: guesses[index]
    }
  })

  const handleRestart = useCallback(() => {
    goToScreen('title')
  }, [goToScreen])

  return (
    <PageWrapper>
      <div className='flex flex-col my-40 items-center'>
        <Typography variant='h2' align='center'>
          Final Score: {score}
        </Typography>
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          size='large'
          onClick={handleRestart}
        >
          Restart
        </Button>
      </div>

      <div className='mt-20'>
        <Typography variant='h3'>
          Detailed results
        </Typography>
      </div>

      <div className='mt-8'>
        {
          detailedResultsRows.map((row) => (
            <div key={row.name} className="flex flex-col items-center justify-center py-4">
              <HeelPortrait footId={row.footId} />
              <Typography variant='body2'>
                Correct answer: {row.name}
              </Typography>
              <Typography variant='body2'>
                Your answers:
              </Typography>
                {
                  row.guesses.length > 0 ?
                    row.guesses.map((guess, index) => (
                      <Typography
                        key={index}
                        variant='body2'
                        color={row.name === guess ? 'green' : 'red'}
                      >
                        {guess}
                      </Typography>
                    ))
                  :
                    <Typography variant='body2' color='gray'>
                      No guesses
                    </Typography>
                }
            </div>
          ))
        }
      </div>
    </PageWrapper>
  )
}
