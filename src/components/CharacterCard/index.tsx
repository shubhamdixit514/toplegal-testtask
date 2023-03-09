import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, Typography, Box } from '@mui/material'
import { IRMCharacter } from 'common/interface.common';

interface ICharacterCard {
  handleCardClick: Function;
  character: IRMCharacter;
  detailedCard?: boolean
}

const CharacterCard = ({
    handleCardClick,
    character,
    detailedCard = false
}: ICharacterCard) => {
  return (
    <Card
      onClick={handleCardClick(character)} 
      sx={{ maxWidth: detailedCard ? 320 : 250 }}
      data-testid="character-card"
    >
    <CardHeader
      sx={{padding: '8px 16px', fontWeight: 600}}
      classes={{ content: 'card__header__content' }}
      title={character.name}
      titleTypographyProps={{variant: 'h6'}}
      data-testid="character__header"
    />
    <CardMedia
      sx={{objectFit: 'unset'}}
      component="img"
      height={detailedCard ? "250" : "150"}
      image={character.image}
      alt={character.name}
    />
    <CardContent classes={{root: "root--content--cart"}}>
        <Box sx={{
          textTransform: 'uppercase',
          width: '100%', 
          background: (() => {
            switch (character.status) {
              case 'Alive': return 'green';
              case 'Dead': return 'red';
              default: return 'grey'
            }
          })(), 
          textAlign: 'center', 
          fontWeight: 'bold',
          color: 'white',
          borderRadius: '2px',
          marginBottom: '5px'
          }}
        >
          {character.status}
        </Box>
        <Typography variant='body2'> <strong>Gender</strong>: {character.gender}</Typography>
        {
          detailedCard && (
            <>
              <Typography variant='body2'> <strong>Origin</strong>: {character.origin.name}</Typography>
              <Typography variant='body2'> <strong>Location</strong>: {character.location.name}</Typography>
              <Typography variant='body2'> <strong>Type</strong>: {character.type || 'N/A'} </Typography>
            </>
          )
        }
    </CardContent>
  </Card>
  )
}

export default CharacterCard