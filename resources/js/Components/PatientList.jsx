import {
    Box,
    Stack,
} from "@chakra-ui/layout";
import dayjs from "dayjs";

const today = dayjs().second(0).millisecond(0)

const getPatientData = (data) => {
    const patientData = {}
    patientData.patientId = data.patient.id
    patientData.name = data.patient.name
    if (data.appointments) {
        const foundItem = data.appointments.find(item => {
            const appointmentDate = dayjs(item.detail.date).second(0).millisecond(0)
            return appointmentDate.diff(today) >= 0;
        })
        patientData.date = foundItem.detail.date
        const startTime = `${foundItem.detail.start_time.split(':')[0]}:${foundItem.detail.start_time.split(':')[1]}`
        const endTime = `${foundItem.detail.end_time.split(':')[0]}:${foundItem.detail.end_time.split(':')[1]}`
        patientData.startTime = startTime
        patientData.endTime = endTime
    }
    return patientData
}

export default function PatientList({ selectManager, medicalInfo }) {
    const { selected, setSelected } = selectManager
    
    const data = Object.values(medicalInfo)

    return (
        <Box
            w={'100%'}
            h={'100%'}
            p={'16px'}

            borderRadius={'xl'}
            
            bg={'#F6F7FA'}
        >
            <Box
                fontSize={'20px'}
                fontWeight={'bold'}
                
                borderBottom={'1px solid black'}
                mb={'24px'}
            >
                Patients List
            </Box>
            <Box
                w={'100%'}
                h={'90%'}

                overflowY={'scroll'}
            >
                <Stack spacing={3}>
                    {data ?
                        data.map((item) => {
                            const { patientId, name, date, startTime, endTime } = getPatientData(item)
                            return (
                                <Box
                                    key={patientId}
                                    w={'100%'}
                                    p={'16px'}

                                    borderRadius={'xl'}
                                    border={'1px solid gray'}

                                    _hover={{
                                        cursor: 'pointer',
                                        backgroundColor: '#EAF1FA',
                                        color: '#1366DE'
                                    }}

                                    bg={selected === patientId ? '#EAF1FA' : 'transparent'}
                                    color={selected === patientId ? '#1366DE' : 'black'}
                                    onClick={() => setSelected(patientId)}

                                    fontSize={'14px'}
                                >
                                    <Box fontWeight={'bold'}>{name}</Box>
                                    <Box fontSize={'12px'}>{date}</Box>
                                    <Box fontSize={'12px'}>{`${startTime} - ${endTime}`}</Box>
                                </Box>
                            )
                        })    
                    : 
                        <Box fontWeight={'bold'}>No booked patients</Box>
                    }
                </Stack>
            </Box>
        </Box>
    )
}