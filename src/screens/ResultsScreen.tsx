import { HeelPortrait, PageWrapper } from "@/components";
import { useGameContext } from "@/contexts";
import { Button, Typography } from "@mui/material";
import { useCallback } from "react";

export function ResultsScreen() {
  const { servants, guesses, score, goToScreen } = useGameContext();

  const detailedResultsRows = servants.map((servant, index) => {
    return {
      servant,
      guesses: guesses[index],
    };
  });

  const handleRestart = useCallback(() => {
    goToScreen("title");
  }, [goToScreen]);

  return (
    <PageWrapper>
      <div className="flex flex-col my-40 items-center">
        <Typography variant="h2" align="center">
          Final Score: {score}
        </Typography>
      </div>

      <div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleRestart}
        >
          Restart
        </Button>
      </div>

      <div className="mt-20">
        <Typography variant="h3" align="center">
          Detailed results
        </Typography>
      </div>

      <div className="mt-8 flex flex-wrap justify-center items-start">
        {detailedResultsRows.map((row) => (
          <div
            key={row.servant.id}
            className="flex-none flex flex-col items-center justify-center p-6 w-[208px]"
          >
            <HeelPortrait url={row.servant.imageUrl} />
            <Typography variant="body1" align="center">
              {row.servant.servantName}
            </Typography>
            <div className="mt-4">
              <Typography variant="body2" align="center">
                Your answers:
              </Typography>
              {row.guesses.length > 0 ? (
                row.guesses.map((guess, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    align="center"
                    color={row.servant.id === guess.servantId ? "green" : "red"}
                  >
                    {guess.servantName}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" align="center" color="gray">
                  Skipped
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
