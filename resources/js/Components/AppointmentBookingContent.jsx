import {
    Box,
    Flex,
    SimpleGrid,
} from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";
import DoctorCard from "./DoctorCard";

export default function AppointmentBookingContent({ data, viewManager, dataManager }) {
    let childData = data

    if (viewManager.view === 'Doctor') {
        childData = childData.filter(value => value.service_id === dataManager.data.service) 
    }

    return (
        <>
            <Flex
                justify={'space-between'}
                align={'center'}

                fontSize={'34px'}
            >
                <Box fontWeight={'bold'}>Choose a Service</Box>
                {viewManager.view === 'Doctor' ? <Box
                    fontSize={'16px'}
                    color={'#1366DE'}
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        viewManager.changeView('Service')
                        dataManager.changeData('service', 0)
                    }}
                >
                    Back to service
                </Box>
                    : ''}
            </Flex>

            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3 }}

                mt={'16px'}
                spacingX={'16px'}
                spacingY={'20px'}
            >
                {childData.map(item => (
                    <Box key={item.id}>
                        {viewManager.view === 'Service' ? 
                            <ServiceCard data={item} viewManager={viewManager} dataManager={dataManager}/>
                            :
                            <DoctorCard data={item} viewManager={viewManager} dataManager={dataManager} />
                        }
                    </Box>
                ))}
            </SimpleGrid>
        </>
    )
}