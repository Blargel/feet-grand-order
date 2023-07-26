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
        <Typography variant='h2'>
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
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 800}}>
            <TableHead>
              <TableRow>
                <TableCell>Portrait</TableCell>
                <TableCell>Correct Answer</TableCell>
                <TableCell>Your Guesses</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                detailedResultsRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell><HeelPortrait footId={row.footId} /></TableCell>
                    <TableCell>
                      <Typography variant='body2'>{row.name}</Typography>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PageWrapper>
  )
}
