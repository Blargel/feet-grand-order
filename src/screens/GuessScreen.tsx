import {
  HeelPortrait,
  PageWrapper,
  ServantAutocomplete,
  ServantAutocompleteOption,
} from "@/components";
import { useGameContext } from "@/contexts";
import { Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";

export function GuessScreen() {
  const { servants, guesses, index, score, skipServant, guessServant } =
    useGameContext();

  const currentServant = servants[index];
  const currentGuesses = guesses[index];
  const mostRecentGuess =
    currentGuesses[currentGuesses.length - 1]?.servantName;

  const [servantGuess, setServantGuess] =
    useState<ServantAutocompleteOption | null>(null);

  const handleGuess = useCallback(() => {
    if (servantGuess?.id != null) {
      guessServant(servantGuess.id);
      setServantGuess(null);
    }
  }, [servantGuess?.id, guessServant]);

  return (
    <PageWrapper>
      <div className="flex flex-col pt-4 items-center">
        <Typography>Score: {score}</Typography>
        <Typography variant="subtitle1">
          Portrait {index + 1} of {servants.length}
        </Typography>
      </div>

      <HeelPortrait url={currentServant.imageUrl} />

      {mostRecentGuess != null && (
        <div className="mt-4">
          <Typography color="error" variant="body2" display="inline">
            Sorry,
          </Typography>
          <Typography color="error" variant="subtitle2" display="inline">
            {" " + mostRecentGuess + " "}
          </Typography>
          <Typography color="error" variant="body2" display="inline">
            is incorrect!
          </Typography>
        </div>
      )}

      <div className="m-4 w-full flex justify-center">
        <ServantAutocomplete
          value={servantGuess}
          onValueChange={setServantGuess}
        />
      </div>

      <div className="flex">
        <div className="px-2">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={servantGuess == null}
            onClick={handleGuess}
          >
            Guess
          </Button>
        </div>
        <div className="px-2">
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={skipServant}
          >
            Skip
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
