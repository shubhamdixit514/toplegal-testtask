import Grid from '@mui/material/Grid';
import CharacterCard from "components/CharacterCard";
import ModalWrap from "components/ModalWrapper";
import InfiniteLoader from "components/InfiniteLoader";
import { IRMCharacter } from "common/interface.common";

import useHome from "./useHome";
import './style.css'

export default function Home() {
  const {
    incrementPage,
    handleCardClick,
    setOpen,
    list,
    open,
    character,
    loading
  } = useHome()

  return (
    <>
      <InfiniteLoader cb={incrementPage} loading={loading}>
        <Grid container spacing={2} sx={{width: '90%', margin: 'auto'}} data-testid="character-card-container-345">
          {list?.map((character: IRMCharacter) => (
            <Grid item xs={6} md={3} lg={2} key={character?.id}
              sx={{
                cursor: 'pointer',
                transition: '1s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: '0.75s'
                }
              }}
              data-testid="character-card-123"
              >
              <CharacterCard
                handleCardClick={handleCardClick}
                character={character}
                />
            </Grid>
          ))}
        </Grid>
      </InfiniteLoader>
      {character &&
        <ModalWrap
          open={open}
          handleClose={() => setOpen(false)}
        >
          <CharacterCard
            handleCardClick={() => {}}
            character={character}
            detailedCard
          />
        </ModalWrap>
      }
    </>
  );
}
