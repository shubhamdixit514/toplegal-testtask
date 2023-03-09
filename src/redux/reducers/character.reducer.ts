import { createSlice } from '@reduxjs/toolkit'
import { IRMCharacter } from 'common/interface.common'

type InitialState = {
  list: IRMCharacter[]
}

const initialState : InitialState = { list: [] }

const character = createSlice({
  name: 'character',
  initialState,
  reducers: {
    getCharactersSuccess(state, { payload }) {
      state.list = [...state.list, ...payload.list]
    }
}})

export const { getCharactersSuccess } = character.actions
export default character.reducer