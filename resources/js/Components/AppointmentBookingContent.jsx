import {
    Box,
    Flex,
    SimpleGrid,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Button,
    FormControl,
    FormErrorMessage,
} from "@chakra-ui/react";
import ServiceCard from "./ServiceCard";
import DoctorCard from "./DoctorCard";
import _ from "lodash";
import dayjs from "dayjs";
import { useEffect, useMemo, useReducer, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import { usePage } from "@inertiajs/react";

const today = dayjs()
let currentTimeline = []

// anchor init = '08:00:00'
// timeline is return array
// start while loop, ends when anchor == '23:00:00'
// inside loops:
//  - if first item of bAppointments array == anchor, then push an object with {start_time = item.start_time, end_time = item.end_time, state = booked}
//  - else if first item of bAppointments array != anchor, then push an object with {start_time = anchor, end_time = anchor + duration, state = empty}
//  - set anchor to new end_time (item.end_time or anchor + duration)
// return the timeline array
const getTimeline = (bookedAppointmentsOfSingleDay, anchorDate, duration) => {
    let anchor = dayjs(anchorDate).hour(8).minute(0).second(0).millisecond(0)
    let index = 0;
    
    const durationArray = duration.split(' ')
    const timeValue = Number(durationArray[0])
    const timeType = durationArray[1]
    const timeline = []
    
    while (anchor.format('HH:mm:ss') !== '23:00:00') {
        if (index < bookedAppointmentsOfSingleDay.length) {
            const bookedItem = bookedAppointmentsOfSingleDay[index]
            const bookedTime = dayjs(`${bookedItem.date} ${bookedItem.start_time}`).millisecond(0)

            if (bookedTime.diff(anchor) == 0) {
                timeline.push({
                    start_time: bookedItem.start_time,
                    end_time: bookedItem.end_time,
                    state: 'unavailable',
                })

                anchor = bookedTime.add(timeValue, timeType)
                index++;
            } else {
                const todayObj = dayjs()
                if (todayObj.diff(anchor) > 0) {
                    timeline.push({
                        start_time: anchor.format('HH:mm:ss'),
                        end_time: anchor.add(timeValue, timeType).format('HH:mm:ss'),
                        state: 'unavailable',
                    })
    
                    anchor = anchor.add(timeValue, timeType)
                } else {
                    timeline.push({
                        start_time: anchor.format('HH:mm:ss'),
                        end_time: anchor.add(timeValue, timeType).format('HH:mm:ss'),
                        state: 'free',
                    })
    
                    anchor = anchor.add(timeValue, timeType)
                }

            }
        } else {
            const todayObj = dayjs().millisecond(0)
            if (todayObj.diff(anchor) > 0) {
                timeline.push({
                    start_time: anchor.format('HH:mm:ss'),
                    end_time: anchor.add(timeValue, timeType).format('HH:mm:ss'),
                    state: 'unavailable',
                })

                anchor = anchor.add(timeValue, timeType)
            } else {
                timeline.push({
                    start_time: anchor.format('HH:mm:ss'),
                    end_time: anchor.add(timeValue, timeType).format('HH:mm:ss'),
                    state: 'free',
                })

                anchor = anchor.add(timeValue, timeType)
            }
        }
    }

    return timeline
}

export default function AppointmentBookingContent({ data, duration, bookedAppointments, viewManager, dataManager }) {
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    const { message } = usePage().props

    const [date, setDate] = useState(today)
    const dateManager = {
        selectedDate: date,
        setSelectedDate: setDate,
    }

    const [selected, setSelected] = useState(0)
    const selectedManager = {
        selected: selected,
        changeSelected: setSelected,
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalManager = {
        onOpen: onOpen,
        onClose: onClose,
    }

    let childData = data

    if (viewManager.view === 'Doctor') {
        childData = childData.filter(value => value.service_id === dataManager.data.service) 
    }

    useMemo(() => {
        currentTimeline = []
        if (dataManager.data.doctor > 0) {
            if (bookedAppointments[dataManager.data.doctor]) { 
                const bookedAppointmentsOfDoctor = bookedAppointments[dataManager.data.doctor]
                const bookedAppointmentsOfSingleDay = bookedAppointmentsOfDoctor[date.format('YYYY-MM-DD')];
                if (bookedAppointmentsOfSingleDay)
                    currentTimeline = getTimeline(bookedAppointmentsOfSingleDay, date.format('YYYY-MM-DD'), duration)
                else
                    currentTimeline = getTimeline([], date.format('YYYY-MM-DD'), duration)
            }  else {
                currentTimeline = getTimeline([], date.format('YYYY-MM-DD'), duration)
            }
        }
        forceUpdate()
    }, [dataManager.data.doctor, message, date])

    const reset = () => {
        setSelected(0)
        setDate(today)
        dataManager.changeData('doctor', 0)
        dataManager.changeData('date', '')
        onClose()
    }

    const handleSubmit = (e) => { 
        e.preventDefault()
        if (_.isEmpty(dataManager.data.time)) {
            dataManager.setError('time', 'Please pick a time!')
        } else {
            dataManager.post(route('patient.booking.store'), {
                onSuccess: () => onClose(),
            })
        }
    }

    return (
        <>
            <Flex
                justify={'space-between'}
                align={'center'}

                fontSize={'34px'}
            >
                <Box fontWeight={'bold'}>Choose a {viewManager.view}</Box>
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
                            <DoctorCard
                                data={item}
                                selectedManager={selectedManager}
                                dataManager={dataManager}
                                modalManager={modalManager}
                            />
                        }
                    </Box>
                ))}
            </SimpleGrid>

            <Modal isOpen={isOpen} onClose={reset} size={'xl'} scrollBehavior={'inside'} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Pick a time</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit} >
                        <FormControl isInvalid={dataManager.errors.time}>
                            <ModalBody>
                                <Box
                                    w={'100%'}
                                    h={'350px'}
                                >
                                    <BookingCalendar
                                        width={'100%'}
                                        height={'100%'}
                                        dateManager={dateManager}
                                        dataManager={dataManager}
                                        timeline={currentTimeline}
                                        error={dataManager.errors.time}
                                    />
                                </Box>
                            </ModalBody>
                            <FormErrorMessage ml={'5%'}>{dataManager.errors.time}</FormErrorMessage>
                        </FormControl>

                        <ModalFooter>
                            <Button variant='ghost' mr={3} onClick={reset}>
                            Close
                            </Button>
                            <Button type={'submit'} isDisabled={_.isEmpty(dataManager.data.time)} isLoading={dataManager.processing} colorScheme='blue'>Book now</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}