import { MainLogo, PageWrapper } from '@/components'
import { useGameContext } from '@/contexts'
import { Button, Switch, Typography } from '@mui/material'
import { useCallback } from 'react'

export function TitleScreen() {
  const {naOnly, setNaOnly, startGame} = useGameContext()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNaOnly(event.target.checked);
  };

  const handleStart = useCallback(() => {
    startGame(20)
  }, [startGame])

  return (
    <PageWrapper>
      <MainLogo />

      <div className="py-8">
        <Typography variant='h5' align='center'>The degenerate FGO feet identification game</Typography>
      </div>

      <div className="py-8">
        <Typography variant="h6">Rules:</Typography>
        <ul>
          <li>
            <Typography>You will be shown a portrait of a servant&apos;s feet.</Typography>
          </li>
          <li>
            <Typography>Guessing the correct servant earns 5 points and goes to the next portrait.</Typography>
          </li>
          <li>
            <Typography>Guessing the wrong servant loses 1 point and will not go to the next portrait.</Typography>
          </li>
          <li>
            <Typography>You can choose to skip to prevent losing points on a servant you don&apos;t know.</Typography>
          </li>
          <li>
            <Typography>The correct answers will not be revealed if you miss them - only at the very end.</Typography>
          </li>
        </ul>
      </div>

      <div className='flex items-center py-4'>
        <Typography>NA Servants Only</Typography>
        <div className='px-2'>
          <Switch
            checked={naOnly}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        size='large'
        onClick={handleStart}
      >
        Start
      </Button>
    </PageWrapper>
  )
}
