import { Grid, GridItem } from '@chakra-ui/react'

export default function Welcome() {
  return (
    <Grid
      templateAreas={`"nav header aside"
                      "nav schedule aside"
                      "nav appointment aside"`}
      gridTemplateRows={'50px 1fr 1fr'}
      gridTemplateColumns={'200px 2fr 1fr'}
      h='1000px'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='pink.300' area={'nav'}>
        Nav
      </GridItem>
      <GridItem pl='2' bg='orange.300' area={'header'}>
        Header
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'schedule'}>
        Schedule
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'appointment'}>
        Appointment
      </GridItem>
      <GridItem pl='2' bg='red.300' area={'aside'}>
        Aside
      </GridItem>
    </Grid>
  )
}