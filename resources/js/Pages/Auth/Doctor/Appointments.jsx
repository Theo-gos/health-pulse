import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
    Box,
    CircularProgress,
    Flex,
    Grid,
    GridItem,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekday from  "dayjs/plugin/weekday";
import { BsCalendar2Event } from "react-icons/bs";
import { useForm, usePage } from "@inertiajs/react";
import AppointmentContent from "@/Components/AppointmentContent";
import DashboardSidebar from "@/Components/DashboardSidebar";
import DoctorLayout from "@/Layouts/DoctorLayout";

dayjs.extend(weekOfYear)
dayjs.extend(weekday)
const gridItems = []
const today = dayjs()
let time = 8

for (let i = 0; i <= 45; i++) { 
    const item = i % 3 === 0 ? <GridItem fontSize={'11px'} rowSpan={1} key={i}>{`${time++}:00`}</GridItem> : <GridItem rowSpan={1} key={i}></GridItem>
    gridItems.push(item)
}

const getDayName = (dateStr, locale) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'short' });        
}

export default function Appointments({appointments, startDate}) {
    const [dayObj, setDayObj] = useState(dayjs(startDate).weekday(1))
    const [data, setData] = useState(appointments)
    const { get, processing, data: query, setData: setQuery } = useForm({
        start_date: dayObj.format('YYYY-MM-DD'),
        end_date: dayObj.add(6, 'day').format('YYYY-MM-DD')
    })
    
    const handlePrev = () => { 
        query.start_date = dayjs(query.start_date).subtract(1, 'week').format('YYYY-MM-DD')
        query.end_date = dayjs(query.end_date).subtract(1, 'week').format('YYYY-MM-DD')
        get(route('doctor.appointments'))
    }

    const handleNext = () => { 
        query.start_date = dayjs(query.start_date).add(1, 'week').format('YYYY-MM-DD')
        query.end_date = dayjs(query.end_date).add(1, 'week').format('YYYY-MM-DD')
        get(route('doctor.appointments'))
    }

    console.log(appointments);

    return (
        <DoctorLayout state={'appointments'}>
            <Box h={'100%'}>
                <Box
                    w={'87vw'}
                    h={'100%'}
                    p={'8px 32px'}

                    fontSize={'14px'}
                >
                    <Flex
                        align={'center'}
                        justify={'flex-start'}

                        mb={'8px'}
                    >
                        <Box
                            border={'1px solid gray'}
                            borderRadius={'md'}
                            
                            p={'1px 10px'}
                            mr={'6px'}
                            
                            style={{
                                cursor: 'pointer'
                            }}

                            _hover={{
                                backgroundColor: 'blue.400',

                                color: 'white',
                            }}

                            onClick={() => {
                                query.start_date = ''
                                query.end_date = ''
                                get(route('doctor.appointments'))
                            }}
                            color={'#1366DE'}
                        >
                            Today
                        </Box>

                        <Box mx={'6px'}>
                            <BsCalendar2Event />
                        </Box>

                        <Flex
                            align={'center'}
                            justify={'space-evenly'}

                            ml={'6px'}
                        >
                            <Box
                                style={{
                                    cursor: 'pointer'
                                }}

                                onClick={handlePrev}
                            >
                                <ChevronLeftIcon />
                            </Box>
                            <Box fontWeight={'bold'} fontSize={'14px'} mr={'4px'}>{dayObj.format('MMMM YYYY')}</Box>
                            <Box>/</Box>
                            <Box fontSize={'13px'} color={'gray.400'} ml={'4px'}>{`week ${dayObj.week()}`}</Box>

                            <Box
                                style={{
                                    cursor: 'pointer'
                                }}
        
                                onClick={handleNext}
                            >
                                <ChevronRightIcon />
                            </Box>
                        </Flex>
                    </Flex>

                    <Flex
                        w={'100%'}
                        h={'95%'}
                        mt={'16px'}
                        p={'8px'}

                        // border={'1px solid #708CBB'}
                        borderRadius = {'md'}

                        overflow={'scroll'}

                        fontSize={'12px'}
                    >
                        <Grid templateRows='repeat(45, 1fr)' w={'2%'} height={'1225px'} mt={'24px'} pr={'40px'} borderRight={'1px solid #708CBB'}>
                            {gridItems}
                        </Grid>
                        <Box
                            w={'98%'}
                        >
                            <Grid templateColumns={'repeat(7, 1fr)'} gap={0} w={'100%'} h={'4%'} textAlign={'center'}>
                                <GridItem
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}
                                    
                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.toISOString())} ${dayObj.date()}`}
                                </GridItem>
                                <GridItem
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}
                                    
                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.add(1, 'day').date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.add(1, 'day').toISOString())} ${dayObj.add(1, 'day').date()}`}
                                </GridItem>
                                <GridItem
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}

                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.add(2, 'day').date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.add(2, 'day').toISOString())} ${dayObj.add(2, 'day').date()}`}
                                </GridItem>
                                <GridItem
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}
                                    
                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.add(3, 'day').date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.add(3, 'day').toISOString())} ${dayObj.add(3, 'day').date()}`}
                                </GridItem>
                                <GridItem
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}

                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.add(4, 'day').date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.add(4, 'day').toISOString())} ${dayObj.add(4, 'day').date()}`}
                                </GridItem>
                                <GridItem
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}

                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.add(5, 'day').date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.add(5, 'day').toISOString())} ${dayObj.add(5, 'day').date()}`}
                                </GridItem>
                                <GridItem 
                                    borderBottom={'1px solid #708CBB'}
                                    borderTopRadius={'md'}

                                    w={'100%'}
                                    
                                    bg={today.date() === dayObj.add(6, 'day').date() ? '#F2F7FF' : 'transparent'}
                                >
                                    {`${getDayName(dayObj.add(6, 'day').toISOString())} ${dayObj.add(6, 'day').date()}`}
                                </GridItem>
                            </Grid>
                            <Flex
                                w={'100%'}
                                h={'1225px'}
                            >
                                {!processing && data ?
                                    <AppointmentContent data={data} date={dayObj} />
                                    :
                                    <CircularProgress mx={'auto'} mt={'45vh'} isIndeterminate color='blue.300' />
                                }
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </DoctorLayout>
    )
}