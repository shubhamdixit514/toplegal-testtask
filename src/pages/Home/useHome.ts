import { useState, useEffect } from "react";
import { IRMCharacter } from "common/interface.common";
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from "graphql/queries/character";
import { useDispatch, useSelector } from 'react-redux';
import { getCharactersSuccess } from "redux/reducers/character.reducer"
import { charactersListSelectors } from "redux/selectors/character.selector";

interface IRMCharacterData {
  characters: {
    results: IRMCharacter[];
  }
}

interface IRMCharacterDataVars {
  page: number;
}

const useHome = () => {
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [character, setCharcter]= useState<IRMCharacter>();
  const { loading, data } = useQuery<IRMCharacterData, IRMCharacterDataVars>(GET_CHARACTERS, { variables: { page }});
  const dispatch = useDispatch();
  const charactersList = useSelector(charactersListSelectors);
  
  useEffect(() => {
    data && dispatch(getCharactersSuccess({list: data.characters.results}))
  }, [data, dispatch])

  const incrementPage = () => {
    setPage(prev => prev + 1)
  }

  const handleCardClick = (character: IRMCharacter) => (e: React.MouseEventHandler<HTMLDivElement> )=> {
    setCharcter(character)
    setOpen(true)
  }
    
  return {
    incrementPage,
    handleCardClick,
    setOpen,
    list: charactersList,
    open,
    character,
    loading
  }
}

export default useHome