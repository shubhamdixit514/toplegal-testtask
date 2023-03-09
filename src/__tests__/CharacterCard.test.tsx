import React from "react";
import { render , screen} from "@testing-library/react";
import CharacterCard from "components/CharacterCard";
import { IRMCharacter } from "common/interface.common";

const testCharacter: IRMCharacter = {
  name: 'Rick fellow',
  episode: ['abc', 'tpl'],
  created: 'January 15, 2023',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  location: {
    name: 'Earth',
    url: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
  },
  origin: {
    name: 'Earth',
    url: 'thttps://rickandmortyapi.com/api/character/avatar/3.jpeg'
  },
  species: 'Human',
  status: 'Alive',
  type: "",
  url: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  id: 45,
  __typename: 'Character'

}

describe("<CharacterCard/> Component", () => {
  it("should render successfully", () => {
    render(<CharacterCard character={testCharacter} handleCardClick={(() => {})}/>)
    const card = screen.getByTestId('character-card')
    expect(card).not.toBe(null || undefined)
  });
});
