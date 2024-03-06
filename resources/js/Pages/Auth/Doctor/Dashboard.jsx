import { Grid, GridItem } from '@chakra-ui/react'
import DashboardSidebar from '@/Components/DashboardSidebar'
import DashboardSchedule from '@/Components/DashboardSchedule'

export default function Dashboard() {
  return (
    <Grid
      templateAreas={`"nav header aside"
                      "nav schedule aside"
                      "nav appointment aside"`}
      gridTemplateRows={'50px 1fr 1fr'}
      gridTemplateColumns={'200px 2fr 1fr'}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      bg={'#F6F7FA'}
      fontWeight='bold'
    >
      <GridItem bg='#F6F7FA' area={'nav'}>
        <DashboardSidebar />
      </GridItem>
      <GridItem bg='orange.300' area={'header'}>
        Header
      </GridItem>
      <GridItem bg='#F6F7FA' area={'schedule'}>
        <DashboardSchedule />
      </GridItem>
      <GridItem bg='blue.300' area={'appointment'}>
        Appointment
      </GridItem>
      <GridItem bg='red.300' area={'aside'}>
        Aside
      </GridItem>
    </Grid>
  )
}