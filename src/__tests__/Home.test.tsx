import React, { PropsWithChildren } from 'react'
import { MockedProvider } from "@apollo/client/testing";
import { screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { faker } from '@faker-js/faker';
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userEvent from "@testing-library/user-event";

import rootReducer from 'redux/reducers/'
import { IRMCharacter } from 'common/interface.common'
import { GET_CHARACTERS } from "graphql/queries/character";
import Home from "pages/Home";

type RootState = ReturnType<typeof rootReducer>

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: { rootReducer?: PreloadedState<RootState> }
  store?: any
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const randomOptionsPicker = (options: string[]) => {
    return options[Math.floor(Math.random()*options.length)]
}

const randomWord = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

export const characterFactory = (): IRMCharacter => ({
    id: faker.datatype.number({ min: 10000 }),
    name: faker.name.firstName(),
    episode: [faker.image.imageUrl(), faker.image.imageUrl()],
    created: faker.datatype.datetime().toString(),
    gender: faker.name.gender() ,
    image: faker.image.imageUrl(),
    location: {
      name: 'Earth',
      url: faker.image.imageUrl()
    },
    origin: {
      name: 'Earth',
      url: faker.image.imageUrl()
    },
    species: 'Human',
    status: randomWord(['Alive', 'Dead', 'unknown']),
    type: "",
    url: faker.image.imageUrl(), 
    __typename: 'Character',
  })
  
const randomCharacters = (qty: number) => Array.from({ length: qty }).map(() => characterFactory())

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 1
      }
    },
    result: jest.fn(() => ({
      data: {
        characters: {
          results: randomCharacters(20),
          __typename: 'Characters',
        }
      },
      loading: false
    }))
  },
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 2
      }
    },
    result: jest.fn(() => ({
      data: {
        characters: {
          results: randomCharacters(8),
          __typename: 'Characters',
        }
      },
      loading: false
    }))
  }
];

describe("<Home/> Component", () => {
  let mockSpy: jest.Mock<any, any>
  beforeEach(() => {
    mockSpy = mocks[0].result;
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    cleanup()
  });

  it("should render successfully", () => {
    renderWithProviders(<MockedProvider mocks={mocks}><Home/></MockedProvider>)
  });

  it("should render 20 cards", async () => {
    renderWithProviders(<MockedProvider mocks={mocks}><Home/></MockedProvider>)
    await waitFor(() => expect(mockSpy).toHaveBeenCalled())
    await waitFor(() => {
      const cards = screen.getAllByTestId('character-card-123')
      expect(cards).toHaveLength(20)
    })
  });

  it("should display modal on card click and remove on backdrop click or escape", async () => {
    renderWithProviders(<MockedProvider mocks={mocks}><Home/></MockedProvider>)
    await waitFor(() => expect(mockSpy).toHaveBeenCalled());
    const cards = screen.getAllByTestId('character-card-123')
    fireEvent.click(cards?.[0]?.firstChild as Element)
    expect(screen.getByTestId("modal__reusable__component")).toBeInTheDocument();
    userEvent.keyboard('{esc}');
    expect(screen.queryByTestId("modal__reusable__component")).not.toBeInTheDocument();
  });

  it("should render more elements on scroll", async () => {
    renderWithProviders(<MockedProvider mocks={mocks}><Home/></MockedProvider>)
    await waitFor(() => expect(mockSpy).toHaveBeenCalled());
    const scrollContainer = screen.getByTestId('infinite__loader__rm')
    fireEvent.scroll(scrollContainer, { target: { scrollY: 100 } })
    mockSpy = mocks[1].result;
    await waitFor(() => expect(mockSpy).toHaveBeenCalled());
    await waitFor(() => {
      const cards = screen.getAllByTestId('character-card-123')
      expect(cards).toHaveLength(28)
    });

  });
});
