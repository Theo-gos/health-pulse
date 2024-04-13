import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import PatientListsAppointments from "@/Components/PatientListsAppointments";
import PatientListsPrescriptions from "@/Components/PatientListsPrescriptions";
import _ from "lodash"
import dayjs from "dayjs";

const TAB = {
    APPOINTMENTS: 'appointments',
    PRESCRIPTIONS: 'prescriptions',
    RECORD: 'record',
}

const FILTER = {
    DATE: 'date',
    DOCTOR: 'doctor_name',
}

const APPOINTMENT = {
    DONE: 'doneAppointment',
    ACTIVE: 'activeAppointments',
    CANCELED: 'canceledAppointments',
}

const today = dayjs().hour(0).minute(0).second(0).millisecond(0)

const getDataFilteredByKey = (data, key = 'date') => {
    const dataObj = {}
    data.forEach((dataWithDoctor) => {
        const dataDetail = dataWithDoctor.detail
        dataDetail['doctor_name'] = dataWithDoctor.doctor.name
        if (dataObj[dataDetail[key]]) {
            dataObj[dataDetail[key]].push(dataDetail)
        } else {
            dataObj[dataDetail[key]] = [dataDetail]
        }
    })
    return dataObj
}

const filterAppointments = (appointments) => {
    const filteredAppointments = {
        doneAppointment: [],
        activeAppointments: [],
        canceledAppointments: [],
    }
    appointments.forEach((appointment) => {
        const status = appointment.detail.status
        if (status === 'active') { 
            filteredAppointments.activeAppointments.push(appointment)
        } else if (status === 'done') {
            filteredAppointments.doneAppointment.push(appointment)
        } else {
            filteredAppointments.canceledAppointments.push(appointment)
        }
    })
    return filteredAppointments
}

export default function PatientListing({ tabManager, medicalInfo, medications }) {
    const [filter, setFilter] = useState(FILTER.DATE)
    const [listData, setListData] = useState({})
    const [appointmentTab, setAppointmentTab] = useState(APPOINTMENT.ACTIVE);

    const dataKeys = Object.keys(listData)
    
    const [currentTab, setCurrentTab] = useState(<PatientListsAppointments medicalInfo={medicalInfo}/>)
    const RenderedContent = currentTab

    const { tab, setTab } = tabManager

    useMemo(() => {
        if (!_.isEmpty(medicalInfo) && tab !== TAB.RECORD) {
            if (tab === TAB.APPOINTMENTS) {
                console.log(tab);
                const filteredAppointments = filterAppointments(medicalInfo.appointments);
                setListData(getDataFilteredByKey(filteredAppointments[appointmentTab], filter))
            } else {
                setListData(getDataFilteredByKey(medicalInfo[tab], filter))
            }
        }
    }, [tab, filter, appointmentTab])
    
    useMemo(() => {
        if (tab !== TAB.RECORD) {
            switch (tab) {
                case TAB.APPOINTMENTS:
                    setCurrentTab(<PatientListsAppointments appointmentKeys={dataKeys} appointments={listData} tab={appointmentTab}  />)
                    break
                case TAB.PRESCRIPTIONS:
                    setCurrentTab(<PatientListsPrescriptions prescriptionKeys={dataKeys} prescriptions={listData} medications={medications}/>)
                    break
                default:
                    setCurrentTab(<PatientListsAppointments medicalInfo={medicalInfo}/>)
                    break
            }
        }
    }, [tab, listData]) 

    return (
        <>
            <Flex
                align={'center'}
                justify={'space-between'}

                w={'100%'}
                h={'20px'}

                mt={'20px'}
            >
                <Flex
                    w={'100px'}
                    h={'100%'}

                    borderRadius={'20px'}
                    border={'1px solid #ECEDED'}
                >
                    <Box
                        w={'50%'}
                        h={'100%'}
                        pt={'2px'}

                        borderLeftRadius={'20px'}
                        _hover={filter == FILTER.DOCTOR ? {
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE',
                            cursor: 'pointer',
                        } : {
                            cursor: 'default',
                        }} 
                        bg={filter == FILTER.DATE ? 'blue.100' : 'white'}
                        color={filter == FILTER.DATE ? '#1366DE' : 'gray'}
                        fontWeight={filter == FILTER.DATE ? 'bold' : ''}

                        fontSize={'10px'}
                        textAlign={'center'}

                        onClick={() => setFilter(FILTER.DATE)}
                    >
                        Date
                    </Box>

                    <Box
                        w={'50%'}
                        h={'100%'}
                        pt={'2px'}

                        borderRightRadius={'20px'}

                        _hover={filter == FILTER.DATE ? {
                            backgroundColor: '#EAF1FA',
                            color: '#1366DE',
                            cursor: 'pointer',
                        } : {
                            cursor: 'default',
                        }} 
                        bg={filter == FILTER.DOCTOR ? 'blue.100' : 'white'}
                        color={filter == FILTER.DOCTOR ? '#1366DE' : 'gray'}
                        fontWeight={filter == FILTER.DOCTOR ? 'bold' : ''}
                        
                        fontSize={'10px'}
                        textAlign={'center'}

                        onClick={() => setFilter(FILTER.DOCTOR)}
                    >
                        Doctor
                    </Box>
                </Flex>

                {tab === TAB.APPOINTMENTS ? 
                        <Flex
                            w={'300px'}
                            h={'100%'}
        
                            borderRadius={'20px'}
                            border={'1px solid #ECEDED'}
                        >
                            <Box
                                w={'50%'}
                                h={'100%'}
                                pt={'2px'}

                                borderLeftRadius={'20px'}
                                _hover={appointmentTab != APPOINTMENT.DONE ? {
                                    backgroundColor: '#EAF1FA',
                                    color: '#1366DE',
                                    cursor: 'pointer',
                                } : {
                                    cursor: 'default',
                                }} 
                                bg={appointmentTab == APPOINTMENT.DONE ? 'blue.100' : 'white'}
                                color={appointmentTab == APPOINTMENT.DONE ? '#1366DE' : 'gray'}
                                fontWeight={appointmentTab == APPOINTMENT.DONE ? 'bold' : ''}

                                fontSize={'10px'}
                                textAlign={'center'}

                                onClick={() => setAppointmentTab(APPOINTMENT.DONE)}
                            >
                                Done
                            </Box>

                            <Box
                                w={'50%'}
                                h={'100%'}
                                pt={'2px'}
                            
                                _hover={appointmentTab != APPOINTMENT.ACTIVE ? {
                                    backgroundColor: '#EAF1FA',
                                    color: '#1366DE',
                                    cursor: 'pointer',
                                } : {
                                    cursor: 'default',
                                }} 
                                bg={appointmentTab == APPOINTMENT.ACTIVE ? 'blue.100' : 'white'}
                                color={appointmentTab == APPOINTMENT.ACTIVE ? '#1366DE' : 'gray'}
                                fontWeight={appointmentTab == APPOINTMENT.ACTIVE ? 'bold' : ''}
                                
                                fontSize={'10px'}
                                textAlign={'center'}

                                onClick={() => setAppointmentTab(APPOINTMENT.ACTIVE)}
                            >
                                Upcoming
                            </Box>

                            <Box
                                w={'50%'}
                                h={'100%'}
                                pt={'2px'}

                                borderRightRadius={'20px'}

                                _hover={appointmentTab != APPOINTMENT.CANCELED ? {
                                    backgroundColor: '#EAF1FA',
                                    color: '#1366DE',
                                    cursor: 'pointer',
                                } : {
                                    cursor: 'default',
                                }} 
                                bg={appointmentTab == APPOINTMENT.CANCELED ? 'blue.100' : 'white'}
                                color={appointmentTab == APPOINTMENT.CANCELED ? '#1366DE' : 'gray'}
                                fontWeight={appointmentTab == APPOINTMENT.CANCELED ? 'bold' : ''}
                                
                                fontSize={'10px'}
                                textAlign={'center'}

                                onClick={() => setAppointmentTab(APPOINTMENT.CANCELED)}
                            >
                                Canceled
                            </Box>
                        </Flex>
                    :
                    <></>
                }
            </Flex>

            <Box
                w={'100%'}
                h={'70vh'}

                mt={'20px'}

                overflowY={'scroll'}
                onScroll={(e) => e.stopPropagation()}
            >
                {RenderedContent}
            </Box>
        </>
    )
}