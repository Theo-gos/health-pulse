import {
    Box,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import PatientListsAppointments from "@/Components/PatientListsAppointments";
import PatientListsPrescriptions from "@/Components/PatientListsPrescriptions";
import _ from "lodash"

const TAB = {
    APPOINTMENTS: 'appointments',
    PRESCRIPTIONS: 'prescriptions',
    RECORD: 'record',
}

const FILTER = {
    DATE: 'date',
    DOCTOR: 'doctor_name',
}

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

export default function PatientListing({ tabManager, medicalInfo }) {
    const [filter, setFilter] = useState(FILTER.DATE)
    const [listData, setListData] = useState({})

    const dataKeys = Object.keys(listData)
    
    const [currentTab, setCurrentTab] = useState(<PatientListsAppointments medicalInfo={medicalInfo}/>)
    const RenderedContent = currentTab

    const {tab, setTab} = tabManager

    useEffect(() => {
        if (!_.isEmpty(medicalInfo) && tab !== TAB.RECORD) {
            setListData(getDataFilteredByKey(medicalInfo[tab], filter))
        }
    }, [tab, filter])
    
    useMemo(() => {
        if (tab !== TAB.RECORD) {
            switch (tab) {
                case TAB.APPOINTMENTS:
                    setCurrentTab(<PatientListsAppointments appointmentKeys={dataKeys} appointments={listData}  />)
                    break
                case TAB.PRESCRIPTIONS:
                    setCurrentTab(<PatientListsPrescriptions prescriptionKeys={dataKeys} prescriptions={listData} />)
                    break
                default:
                    setCurrentTab(<PatientListsAppointments medicalInfo={medicalInfo}/>)
                    break
            }
        }
    }, [tab, listData])

    return (
        <>
            <Box
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
            </Box>

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