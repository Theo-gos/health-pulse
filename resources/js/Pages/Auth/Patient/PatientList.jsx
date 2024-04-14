import {
    Box,
    Flex,
} from "@chakra-ui/react";
import PatientLayout from "@/Layouts/PatientLayout";
import { useEffect, useMemo, useState } from "react";
import { usePage } from "@inertiajs/react";
import _ from "lodash"
import PatientListing from "@/Components/PatientListing";
import PatientListRecord from "@/Components/PatientListRecord";
import { useMediaQuery } from "react-responsive";

const TAB = {
    APPOINTMENTS: 'appointments',
    PRESCRIPTIONS: 'prescriptions',
    RECORD: 'record',
}

export default function PatientList({ medicalInfo, icd, medications }) {
    const { data } = usePage().props
    const [tab, setTab] = useState(TAB.APPOINTMENTS)
    const isMobile = useMediaQuery({ query: '(max-width: 844px)' })

    const tabManager = {
        tab: tab,
        setTab: setTab,
    }
    
    useEffect(() => {
        if (data) {
            setTab(data)
        }
    }, [data])

    return (
        <PatientLayout state={'patient'}>
            <Box mt={'80px'}>
                <Box
                    fontSize={'32px'}

                    bg={isMobile ? '#E8F0FC' : 'white'}

                    color={'#1366DE'}
                    
                    w={isMobile ? '100%' : "fit-content"}
                    py={isMobile ? '20px' : ''}
                    mx={'auto'}
                    my={!isMobile ? '36px' : ''}

                    textAlign={isMobile ? 'center' : ''}
                >
                    Patient
                </Box>

                <Box
                    w={'100%'}
                    h={'auto'}
                    pt={'10px'}

                    bg={isMobile ? 'white' : '#E8F0FC'}
                >
                    <Box
                        w={isMobile ? '100%' : '60%'}
                        h={'100%'}
                        p={'20px 36px 60px'}

                        borderTopRadius={'25px'}
                        border={'gray.200'}
                        mx={'auto'}

                        bg={'white'}
                    >
                        <Flex
                            justify={'space-between'}
                            align={'center'}

                            fontSize={'34px'}
                        >
                            {isMobile ? 
                                <></>
                                :
                                <Box fontWeight={'bold'}>Your {tab}</Box>
                            }
                            <Flex
                                w={isMobile ? '100%' : '40%'}
                                h={'100%'}

                                borderRadius={'20px'}
                                border={'1px solid #ECEDED'}
                            >
                                <Box
                                    w={'34%'}
                                    h={'100%'}
                                    pt={!isMobile ? '2px' : ''}
                                    p={isMobile ? '8px 16px' : ''}

                                    borderLeftRadius={'20px'}
                                    _hover={tab !== TAB.APPOINTMENTS ? {
                                        backgroundColor: '#EAF1FA',
                                        color: '#1366DE',
                                        cursor: 'pointer',
                                    } : {
                                        cursor: 'default',
                                    }} 
                                    bg={tab === TAB.APPOINTMENTS ? 'blue.100' : 'white'}
                                    color={tab === TAB.APPOINTMENTS ? '#1366DE' : 'gray'}
                                    fontWeight={tab === TAB.APPOINTMENTS ? 'bold' : ''}

                                    fontSize={'10px'}
                                    textAlign={'center'}

                                    onClick={() => setTab(TAB.APPOINTMENTS)}
                                >
                                    Appointments
                                </Box>

                                <Box
                                    w={'34%'}
                                    h={'100%'}
                                    pt={!isMobile ? '2px' : ''}
                                    p={isMobile ? '8px 16px' : ''}

                                    _hover={tab !== TAB.PRESCRIPTIONS ? {
                                        backgroundColor: '#EAF1FA',
                                        color: '#1366DE',
                                        cursor: 'pointer',
                                    } : {
                                        cursor: 'default',
                                    }} 
                                    bg={tab === TAB.PRESCRIPTIONS ? 'blue.100' : 'white'}
                                    color={tab === TAB.PRESCRIPTIONS ? '#1366DE' : 'gray'}
                                    fontWeight={tab === TAB.PRESCRIPTIONS ? 'bold' : ''}

                                    fontSize={'10px'}
                                    textAlign={'center'}

                                    onClick={() => setTab(TAB.PRESCRIPTIONS)}
                                >
                                    Prescriptions
                                </Box>

                                <Box
                                    w={'34%'}
                                    h={'100%'}
                                    pt={!isMobile ? '2px' : ''}
                                    p={isMobile ? '8px 16px' : ''}

                                    borderRightRadius={'20px'}

                                    _hover={tab !== TAB.RECORD ? {
                                        backgroundColor: '#EAF1FA',
                                        color: '#1366DE',
                                        cursor: 'pointer',
                                    } : {
                                        cursor: 'default',
                                    }} 
                                    bg={tab === TAB.RECORD ? 'blue.100' : 'white'}
                                    color={tab === TAB.RECORD ? '#1366DE' : 'gray'}
                                    fontWeight={tab === TAB.RECORD ? 'bold' : ''}
                                    
                                    fontSize={'10px'}
                                    textAlign={'center'}

                                    onClick={() => setTab(TAB.RECORD)}
                                >
                                    Record
                                </Box>
                            </Flex>
                        </Flex>

                        {tab !== TAB.RECORD ?
                            <PatientListing tabManager={tabManager} medicalInfo={medicalInfo} medications={medications} />
                            :
                            <PatientListRecord medicalInfo={medicalInfo} icd={icd} />
                        }
                    </Box>
                </Box>
            </Box>
        </PatientLayout>
    )
}