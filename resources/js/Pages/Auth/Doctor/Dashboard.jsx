import { Grid, GridItem } from '@chakra-ui/react'
import DashboardSidebar from '@/Components/DashboardSidebar'
import DashboardSchedule from '@/Components/DashboardSchedule'
import DashboardAppointments from '@/Components/DashboardAppointments'
import DashboardAside from '@/Components/DashboardAside'
import { usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function Dashboard({appointments, current_appointment, schedules}) {
  const { flash } = usePage().props
  const [dashboardAppointments, setDashboardAppointments] = useState({
    list: appointments,
    current: current_appointment,
  })
  const [dashboardSchedule, setDashboardSchedule] = useState(schedules)

  useEffect(() => {
    if (flash) {
      if (flash.appointment) {
        setDashboardAppointments({
          list: flash.appointment.list,
          current: flash.appointment.current,
        })
      }
  
      if (flash.schedule) { 
        setDashboardSchedule(flash.schedule.list)
      }
    }
  }, [flash])

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
        <DashboardSidebar state={'dashboard'} />
      </GridItem>
      <GridItem bg='orange.300' area={'header'}>
        Header
      </GridItem>
      <GridItem area={'schedule'}>
        <DashboardSchedule width={'55vw'} height={'40vh'} schedule={dashboardSchedule} />
      </GridItem>
      <GridItem area={'appointment'}>
        <DashboardAppointments appointments={dashboardAppointments.list} current_appointment={dashboardAppointments.current} />
      </GridItem>
      <GridItem area={'aside'}>
        <DashboardAside />
      </GridItem>
    </Grid>
  )
}