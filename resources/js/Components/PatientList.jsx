import {
    Box,
    Stack,
} from "@chakra-ui/layout";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";

const today = dayjs().second(0).millisecond(0)

const getPatientData = (data, user) => {
    const patientData = {}
    let minDiff = Number.MAX_SAFE_INTEGER;
    patientData.patientId = data.patient.id
    patientData.name = data.patient.name
    if (data.appointments) {
        const foundItem = data.appointments.reduce((accumulator, currentItem) => {
            const appointmentDate = dayjs(currentItem.detail.date).second(0).millisecond(0)
            const diff = Math.abs(appointmentDate.diff(today))
            
            if (diff < minDiff && currentItem.doctor.id === user.id) {
                minDiff = diff
                accumulator = currentItem
                return accumulator
            } else {
                return accumulator
            }
        }, {})
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
    const { auth } = usePage().props
    
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
                            const patientData = getPatientData(item, auth.doctor)
                            if (patientData) {
                                const { patientId, name, date, startTime, endTime } = patientData
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
                                        {dayjs(date).second(0).millisecond(0).diff(today) < 0 ? 
                                            <Box fontSize={'12px'} fontWeight={'bold'} mt={'4px'}>Last visit:</Box>
                                        :
                                            <Box fontSize={'12px'} fontWeight={'bold'} mt={'4px'}>Next Visit:</Box>
                                        }
                                        <Box fontSize={'12px'}>Date: {date}</Box>
                                        <Box fontSize={'12px'}>Time: {`${startTime} - ${endTime}`}</Box>
                                    </Box>
                                )
                            } else {
                                return <></>
                            }
                        })    
                    : 
                        <Box fontWeight={'bold'}>No booked patients</Box>
                    }
                </Stack>
            </Box>
        </Box>
    )
}