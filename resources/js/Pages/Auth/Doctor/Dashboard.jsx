import { Grid, GridItem } from '@chakra-ui/react'
import DashboardSidebar from '@/Components/DashboardSidebar'
import DashboardSchedule from '@/Components/DashboardSchedule'
import DashboardAppointments from '@/Components/DashboardAppointments'
import DashboardAside from '@/Components/DashboardAside'

export default function Dashboard() {
  return (
    <Grid
      templateAreas={`"nav header aside"
                      "nav schedule aside"
                      "nav appointment aside"`}
      gridTemplateRows={'auto 8fr 11fr'}
      gridTemplateColumns={'200px 11fr 9fr'}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      bg={'#F6F7FA'}
      fontWeight='bold'
    >
      <GridItem area={'nav'}>
        <DashboardSidebar />
      </GridItem>
      <GridItem bg='orange.300' area={'header'}>
        Header
      </GridItem>
      <GridItem area={'schedule'}>
        <DashboardSchedule />
      </GridItem>
      <GridItem area={'appointment'}>
        <DashboardAppointments />
      </GridItem>
      <GridItem area={'aside'}>
        <DashboardAside />
      </GridItem>
    </Grid>
  )
}