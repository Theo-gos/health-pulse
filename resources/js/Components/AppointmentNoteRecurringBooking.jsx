import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    SimpleGrid,
    Square,
    Stack,
    CircularProgress,
    useDisclosure,
} from "@chakra-ui/react";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import _ from 'lodash'
import { useEffect, useMemo, useState } from "react";

const today = dayjs().hour(0).minute(0).second(0).millisecond(0)

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
                if (todayObj.add(30, 'minute').diff(anchor) >= 0) {
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
            if (todayObj.add(30, 'minute').diff(anchor) >= 0) {
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

let currentTimeline = []

export default function AppointmentNoteRecurringBooking({ dataManager }) {
    const { get, data, setData, errors, setError, clearErrors, reset: resetData, processing } = dataManager
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedTime, setSelectedTime] = useState({})
    const [selected, setSelected] = useState({})

    const { flash } = usePage().props


    const resetModal = () => {
        setSelectedTime({})
        setData({
            ...data,
            duration: '',
            recurringDate: '',
        })
        currentTimeline = []
        onClose()
    }

    const handlePick = () => {
        if (data.duration != '') {
            if ((data.duration == 'custom' && data.recurringDate == '')) {
                setError('recurringDate', 'Please pick a date!')
                return
            } else if (data.duration != 'custom') {
                const durationArray = data.duration.split(' ')
                const timeValue = Number(durationArray[0])
                const timeType = durationArray[1]
                
                data.recurringDate = today.add(timeValue, timeType).format('YYYY-MM-DD')
            }

            get(route('doctor.recurring'), {
                preserveState: true,
                onSuccess: () => {
                    onOpen()
                }
            })
        } else {
            setError('duration', 'This field is required!')
            return
        }
    }

    const handleSelectTime = () => {
        if (_.isEmpty(selectedTime)) {
            setError('recurringTime', 'Please pick a time!')
            return
        }

        setData({
            ...data,
            duration: '',
            recurringTime: selectedTime,
        })
        setSelectedTime({})
        setSelected(0)
        currentTimeline = []
        onClose()
    }

    useMemo(() => {
        if (flash.appointment && data.recurringDate) {
            currentTimeline = getTimeline(flash.appointment.list, data.recurringDate, flash.appointment.service.duration)
        }
    }, [flash.appointment])

    return (
        <>
            <Flex
                w={'100%'}
                p={'16px'}

                align={'center'}
                justify={'space-between'}
            
                bg={'white'}
            >
                <Flex w={'30%'}>
                    <Box fontSize={'12px'} fontWeight={'bold'} me={'4px'}>Re-visit?</Box>
                    <Checkbox ml={'20px'} isDisabled={!_.isEmpty(data.recurringTime)} isChecked={data.isReVisit} onChange={() => {
                        clearErrors('duration')
                        setData('isReVisit', !data.isReVisit)
                    }} />
                </Flex>
                <FormControl isInvalid={errors.duration} w={'70%'} mr={'2px'}>
                    <Select
                        style={{
                            paddingBottom: '8px',
                        }}

                        disabled={!data.isReVisit || !_.isEmpty(data.recurringTime)}

                        variant={'filled'}
                        
                        borderRadius={'md'}

                        fontSize={'10px'}
                        
                        w={'100%'}

                        size={'sm'}

                        value={data.duration}

                        onChange={e => {
                            setData('duration', e.target.value)
                            clearErrors('duration')
                        }}
                    >
                        <option value={''}>Duration</option>
                        <option value={'1 year'}>One Year Later</option>
                        <option value={'1 month'}>One Month Later</option>
                        <option value={'1 week'}>One Week Later</option>
                        <option value={'custom'}>Custom</option>
                    </Select>
                    <FormErrorMessage w={'20vw'} fontSize={'10px'}>{errors.duration}</FormErrorMessage>
                </FormControl>
                <Button isDisabled={!data.isReVisit || !_.isEmpty(data.recurringTime)} colorScheme={'blue'} ml={'2px'} size={'sm'} onClick={handlePick}>Pick</Button>

                <Modal isOpen={isOpen} size={'lg'} onClose={resetModal} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Please Pick A Time Slot</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {flash.appointment && currentTimeline.length > 0 ? 
                                <FormControl isInvalid={errors.recurringTime} w={'100%'} h={'50vh'}>
                                    <Stack
                                        w={'100%'}
                                        h={'100%'}

                                        spacing={2}

                                        overflow={'scroll'}
                                    >
                                        {
                                            currentTimeline.map((item, index) => (
                                                <Flex
                                                    key={index}
                                                    border={'1px solid #BEE3F8'}
                                                    borderRadius={'xl'}
                                                        
                                                    w={'100%'}
                                                    h={'auto'}
                                                    mb={'6px'}
                                
                                                    fontSize={'10px'}
                                                >
                                                    <Flex
                                                        direction={'column'}
                                                        align={'center'}
                                                        justify={'center'}
                    
                                                        color={item.state == 'free' ? '#1366DE': 'black'}
                                                        bg={item.state == 'free' ? '#BEE3F8' : 'gray.500'}
                                                        borderLeftRadius={'xl'}
                                
                                                        w={'45px'}
                                                        h={'7vh'}
                                                        py={'3px'}
                    
                                                        style={{
                                                            cursor: 'default'
                                                        }}
                                                    >
                                                        <Box>{`${item.start_time.split(':')[0]}:${item.start_time.split(':')[1]}`}</Box>
                                                        <Box>-</Box>
                                                        <Box>{`${item.end_time.split(':')[0]}:${item.end_time.split(':')[1]}`}</Box>
                                                    </Flex>
                                                    <Flex
                                                        align={'center'}
                    
                                                        p={'13px 15px'}
                                                        h={'7vh'}
                                                        w={'97%'}
                    
                                                        borderRightRadius={'xl'}
                    
                                                        bg={item.state == 'free' ? (selected == index ? '#E8F0FC' : 'white') : 'gray.300'}
                                                        color={selected == index ? '#1366DE' : 'black'}
                    
                                                        onClick={() => {
                                                            if (item.state == 'free') {
                                                                setSelectedTime({
                                                                    start_time: item.start_time,
                                                                    end_time: item.end_time
                                                                })
                                                                setSelected(index)
                                                                clearErrors('recurringTime')
                                                            }
                                                        }}
                    
                                                        style={
                                                            item.state == 'free' ?
                                                                {
                                                                    cursor: 'pointer'
                                                                }
                                                            :
                                                                {
                                                                    cursor: 'not-allowed'
                                                                }
                                                        }
                    
                                                        _hover={
                                                            item.state == 'free' && selected != index ?
                                                                {
                                                                    opacity: '0.7',
                                                                    backgroundColor: '#E8F0FC',
                                                                    color: '#1366DE',
                                                                }
                                                            :   ''
                                                        }
                                                    >
                                                        <Box fontWeight={'bold'}>{`${item.state.charAt(0).charAt(0).toUpperCase()}${item.state.slice(1)}`}</Box>
                                                    </Flex>
                                                </Flex>
                                            ))
                                        }
                                    </Stack>
                                    <FormErrorMessage w={'20vw'} fontSize={'10px'}>{errors.recurringTime}</FormErrorMessage>
                                </FormControl>
                            :
                                <CircularProgress mx={'auto'} mt={'45%'} isIndeterminate color='blue.300' />
                            }
                        </ModalBody>

                        <ModalFooter>
                            <Flex
                                justify={'space-between'}
                                align={'center'}

                                w={'100%'}
                            >
                                <Button
                                    isLoading={processing}
                                    onClick={handleSelectTime}
                                    
                                    bg={'blue.400'}
                                    color={'white'}

                                    py={'8px'}
                                    
                                    _hover={{
                                        background: 'blue.500',
                                    }}
                                >
                                    Select
                                </Button>
                                <Button variant={'ghost'} colorScheme={'red'} ml={3} onClick={resetModal}>
                                    Close
                                </Button>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
            
            {data.duration === 'custom' ? 
                <Box
                    w={'96%'}
                    borderBottom={'1px solid #ECEDED'}

                    py={'8px'}
                    ml={'16px'}
                >
                    <Box w={'50%'} mr={'5%'}>
                        <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Pick a date</Box>
                        <Flex
                            align={'center'}

                            w={'100%'}
                        >
                            <FormControl isInvalid={errors.recurringDate} w={'100%'} mr={'2px'}>
                                <Input 
                                    type="date"
                                    size={'sm'}  
                                    fontSize={'11px'}

                                    w={'100%'}
                                    
                                    disabled={!data.isReVisit}

                                    variant='filled' 
                                    borderRadius={'md'} 
                                    
                                    value={data.recurringDate}
                                    onChange={e => {
                                        setData('recurringDate', e.target.value)
                                        clearErrors('recurringDate')
                                    }}
                                />
                                <FormErrorMessage w={'20vw'} fontSize={'10px'}>{errors.recurringDate}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                    </Box>
                </Box>
            :
                <></>
            }
        </>
    )
}