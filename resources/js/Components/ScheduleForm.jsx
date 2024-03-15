import {
    Box,
    Button,
    Flex,
    Text,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import _ from "lodash";

const today = dayjs()

export default function ScheduleForm({ modeManager, idManager, editData }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data, setData, errors, setError, post, patch, delete: destroy, processing, reset } = useForm({
        task: '',
        office: 'north office',
        floor: 'floor 1',
        room: 'room C206',
        date: '',
        time_start: '08:00',
        time_end: '09:00',
    })

    const { changeMode, mode } = modeManager
    const { changeId, id } = idManager

    const { message } = usePage().props
    
    if (message) {
        console.log(message)
        changeId(0)
    }

    useEffect(() => {
        if (!_.isEmpty(editData)) {
            setData({
                task: editData[0].task,
                office: editData[0].location.split(', ')[0],
                floor: editData[0].location.split(', ')[1],
                room: editData[0].location.split(', ')[2],
                date: editData[0].date,
                time_start: editData[0].start_time,
                time_end: editData[0].end_time,
            })
        }
    }, [editData])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.time_end <= data.time_start) {
            setError('end_time', 'End time is required to be after start time')
            return
        }

        if (data.date < today.format('YYYY-MM-DD')) {
            setError('date', 'Cannot add schedule to a past date')
            return
        }

        if (mode === 'add') {
            post(route('schedule.store'), {
                onSuccess: () => reset(),
            })
        } else {
            patch(route('schedule.update', {id: id}), {
                onSuccess: () => {
                    changeMode('add')
                }
            })
        }

    }

    const handleDelete = (id) => {
        destroy(route('schedule.delete', {id: id}))
    }

    return (
        <Box
            border={'2px solid #F0F0F1'}
            
            borderRadius={'xl'}
            bg={'white'}

            w={'100%'}
            h={'100%'}
        >
            <form
                onSubmit={handleSubmit}  
                style={{
                    width: '100%',
                    height: '100%',
                    padding: '8px',
                }}
            >
                <Flex
                    w={'100%'}
                    h={'10%'}
                    p={'8px'}

                    align={'center'}
                    justify={'space-between'}

                    fontSize={'12px'}
                >
                    <Box
                        fontWeight={'bold'}
                    >
                        Manage your schedule
                    </Box>               

                    <Flex
                        align={'center'}
                        justify={'space-between'}

                        bg={'white'}
                        border={'1px solid #F0F0F1'}
                        borderRadius={'xl'}

                        fontSize={'11px'}

                        w={'20%'}
                    >
                        <Box
                            w={'50%'}
                            h={'100%'}
                            p={'4px'}

                            borderLeftRadius={'xl'}
                            borderRight={'1px solid #F0F0F1'}

                            textAlign={'center'}
                            bg={mode == 'add' ? 'blue.200' : 'gray.100'}
                            color={mode == 'add' ? 'white' : 'black'}

                            style={mode == 'add' ? {cursor: 'default'} : { cursor: 'pointer' }}

                            onClick={() => {
                                if (mode !== 'add') {
                                    changeMode('add')
                                    setData({
                                        task: '',
                                        office: 'north office',
                                        floor: 'floor 1',
                                        room: 'C206',
                                        date: '',
                                        time_start: '08:00',
                                        time_end: '09:00',
                                    })
                                }
                            }}

                            _hover={mode == 'edit' ? {
                                backgroundColor: '#90CDF4',
                                color: 'white',
                            }: ''}
                        >
                            Add
                        </Box>
                        <Box
                            w={'50%'}
                            h={'100%'}
                            p={'4px'}

                            borderRightRadius={'xl'}

                            textAlign={'center'}
                            bg={mode == 'edit' ? 'blue.200' : 'gray.100'}
                            color={mode == 'edit' ? 'white' : 'gray.300'}

                            style={{ cursor: 'default' }}
                        >
                            Edit
                        </Box>
                    </Flex>
                </Flex>

                <Flex
                    w={'100%'}
                    h={'75%'}
                >
                    <Box
                        w={'60%'}
                        h={'100%'}
                        p={'8px'}
                        
                        fontSize={'5px'}
                    >
                        <Text mb={'8px'} fontSize={'13px'} fontWeight={'bold'}>Title: </Text>
                        <FormControl ml={'10px'} w={'87%'} isInvalid={errors.task}>
                            <Input
                                variant='outline'

                                size={'sm'}
                                fontSize={'12px'}

                                id='task'
                                name='task'
 
                                placeholder='Title'
                                
                                borderRadius={'md'}
                                focusBorderColor='blue.500'
                                borderColor='gray.400'
                                
                                value={data.task}
                                onChange={e => {
                                    setData('task', e.target.value)
                                    setError('task', '')
                                }}
                            />
                            <FormErrorMessage>{errors.task}</FormErrorMessage>
                        </FormControl>

                        <Text mt={'10px'} mb={'8px'} fontSize={'13px'} fontWeight={'bold'}>Location: </Text>
                        <Box
                            w={'100%'}
                            pl={'4px'}
                                    
                            fontSize={'12px'}
                        >
                            <FormControl
                                isInvalid={errors.office}
                                w={'90%'}
                            >
                                <Flex
                                    w={'100%'}
                                    align={'center'}
                                    p={'4px'}
                                >
                                    <Text w={'21%'} mr={'5px'} fontSize={'12px'}>Office: </Text>
                                    <Select
                                        
                                        w={'77%'}
                                        variant='outline'

                                        size={'sm'}
                                        fontSize={'12px'}

                                        id='office'
                                        name='office'

                                        placeholder='Office'
                                        
                                        borderRadius={'md'}
                                        focusBorderColor='blue.500'
                                        borderColor='gray.400'
                                        
                                        value={data.office}
                                        onChange={e => {
                                            setData('office', e.target.value)
                                            setError('office', '')
                                        }}
                                    >
                                        <option value='north office'>North Office</option>
                                        <option value='south office'>South Office</option>
                                        <option value='east office'>East Office</option>    
                                        <option value='west office'>West Office</option>    
                                    </Select>
                                </Flex>
                                <FormErrorMessage ml={'24%'}>{errors.office}</FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={errors.floor}
                                w={'90%'}
                                p={'4px'}
                            >
                                <Flex
                                    w={'100%'}
                                    align={'center'}
                                    p={'4px'}
                                >
                                    <Text w={'20%'} mr={'10px'} fontSize={'12px'}>Floor: </Text>
                                    <Select
                                        w={'80%'}
                                        variant='outline'

                                        size={'sm'}
                                        fontSize={'12px'}

                                        id='floor'
                                        name='floor'
                                        
                                        placeholder='Floor'
                                        
                                        borderRadius={'md'}
                                        focusBorderColor='blue.500'
                                        borderColor='gray.400'
                                        
                                        value={data.floor}
                                        onChange={e => {
                                            setData('floor', e.target.value)
                                            setError('floor', '')
                                        }}
                                    >
                                        <option value='floor 1'>Floor 1</option>
                                        <option value='floor 2'>Floor 2</option>  
                                    </Select>
    
                                </Flex>
                                <FormErrorMessage ml={'24%'}>{errors.floor}</FormErrorMessage>
                            </FormControl>

                            <FormControl
                                isInvalid={errors.room}
                                w={'90%'}
                                p={'4px'}
                            >
                                <Flex
                                    w={'100%'}
                                    align={'center'}
                                    p={'4px'}
                                >
                                    <Text w={'20%'} mr={'10px'} fontSize={'12px'}>Room: </Text>
                                    <Select
                                        w={'80%'}
                                        variant='outline'

                                        size={'sm'}
                                        fontSize={'12px'}

                                        id='room'
                                        name='room'
                                        
                                        placeholder='Room'
                                        
                                        borderRadius={'md'}
                                        focusBorderColor='blue.500'
                                        borderColor='gray.400'
                                        
                                        value={data.room}
                                        onChange={e => {
                                            setData('room', e.target.value)
                                            setError('room', '')
                                        }}
                                    >
                                        <option value='room C206'>Room C206</option>
                                        <option value='room C207'>Room C207</option>  
                                    </Select>
    
                                </Flex>
                                <FormErrorMessage ml={'24%'}>{errors.room}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box
                        w={'40%'}
                        h={'100%'}
                        p={'8px'}
                    >
                        <Text mb={'8px'} fontSize={'13px'} fontWeight={'bold'}>Date: </Text>
                        <FormControl ml={'10px'} w={'85%'} isInvalid={errors.date}>
                            <Input
                                type={'date'}
                                variant='outline'

                                size={'sm'}
                                fontSize={'12px'}

                                id='date'
                                name='date'
                                
                                borderRadius={'md'}
                                focusBorderColor='blue.500'
                                borderColor='gray.400'
                                
                                value={data.date}
                                onChange={e => {
                                    setData('date', e.target.value)
                                    setError('date', '')
                                }}
                            />
                            <FormErrorMessage>{errors.date}</FormErrorMessage>
                        </FormControl>

                        <Text mt={'10px'} mb={'8px'} fontSize={'13px'} fontWeight={'bold'}>Time: </Text>

                        <Box
                            w={'100%'}
                            // h={'100%'}
                            px={'8px'}
                        >
                            <Flex
                                w={'100%'}

                                align={'flex-start'}
                            >
                                <Text w={'20%'} mt={'8px'} fontSize={'12px'}>From: </Text>

                                <FormControl ml={'10px'} w={'67%'} isInvalid={errors.time_start}>
                                    <Input
                                        type={'time'}
                                        variant='outline'

                                        size={'sm'}
                                        fontSize={'12px'}

                                        id='time_start'
                                        name='time_start'
                                        
                                        borderRadius={'md'}
                                        focusBorderColor='blue.500'
                                        borderColor='gray.400'
                                        
                                        value={data.time_start}
                                        onChange={e => {
                                            setData('time_start', e.target.value)
                                            setError('time_start', '')
                                        }}
                                    />
                                <FormErrorMessage>{errors.time_start}</FormErrorMessage>
                                </FormControl>
                            </Flex>

                            <Flex
                                mt={'8px'}
                                w={'100%'}

                                align={'flex-start'}
                            >
                                <Text w={'20%'} mt={'8px'} fontSize={'12px'}>To: </Text>

                                <FormControl ml={'10px'} w={'67%'} isInvalid={errors.time_end}>
                                    <Input
                                        type={'time'}
                                        variant='outline'

                                        size={'sm'}
                                        fontSize={'12px'}

                                        id='time_end'
                                        name='time_end'
                                        
                                        borderRadius={'md'}
                                        focusBorderColor='blue.500'
                                        borderColor='gray.400'
                                        
                                        value={data.time_end}
                                        onChange={e => {
                                            setData('time_end', e.target.value)
                                            setError('time_end', '')
                                        }}
                                    />
                                    <FormErrorMessage>{errors.time_end}</FormErrorMessage>
                                </FormControl>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>

                <Flex
                    w={'100%'}
                    h={'15%'}
                    p={'8px'}

                    align={'center'}
                    justify={'flex-end'}
                >
                    <Box>
                        <Button type={'submit'} size={'sm'} bg={'blue.300'} _hover={{opacity: '0.7'}} color={'white'} mr={'2px'}>Save</Button>
                        {mode === 'edit' ? 
                            <Button onClick={onOpen} size={'sm'} bg={'red.300'} color={'white'}>Delete</Button>
                            :
                            ''
                        }
                    </Box>
                </Flex>
            </form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>You sure you want to delete this item?</Box>
                    </ModalBody>

                    <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                        <Button colorScheme='red' onClick={() => {
                            onClose()
                            changeMode('add')
                            handleDelete(id)
                        }}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}