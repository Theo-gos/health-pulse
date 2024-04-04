import {
    Avatar,
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    ListIcon,
    ListItem,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    UnorderedList,
} from "@chakra-ui/react";

import {
    BsFillGridFill,
    BsCalendar2EventFill,
    BsPersonFill,
    BsFillClockFill,
    BsCapsule,
    BsFillFolderFill,
    BsBellFill,
} from "react-icons/bs";

import SideBarItem from "./SideBarItem";
import { useEffect, useState } from "react";
import Logo from "@/Pages/Shared/Logo";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { usePage } from "@inertiajs/react";

const topOptions = ['dashboard', 'appointments', 'schedule']
const botOptions = ['records']
const otherOptions = ['notification']
const icons = {
    'dashboard': BsFillGridFill,
    'appointments': BsCalendar2EventFill,
    'records': BsPersonFill,
    'schedule': BsFillClockFill,
    'prescriptions': BsCapsule,
    'test_results': BsFillFolderFill,
    'notification': BsBellFill,
}

export default function DashboardSidebar({state}) {
    const [selected, setSelected] = useState('dashboard')
    const { auth } = usePage().props
    const { doctor } = auth

    useEffect(() => {
        if (state)
            setSelected(state)
    }, [])

    return (
        <Box
            border={'2px solid #F0F0F1'}
            
            borderRadius={'lg'}
            bg={'white'}

            my={'2px'}

            w={'200px'}
            h={'99vh'}
        >
            <Flex
                borderRadius={'lg'}
                direction={'column'}
                justify={'space-between'}
                align={'center'}

                bg={'white'}

                p={'10px'}
                h={'100%'}
            >
                <Flex
                    direction={'column'}

                    bg={'transparent'}

                    w={'100%'}
                >
                    <Flex
                        alignSelf={'center'}
                        color={'blue.400'}
                        
                        w={'85%'}
                        mt={'5px'}
                        mb={'36px'}
                        
                        align={'center'}
                        justify={'flex-start'}
                    >
                        <Logo width={'30px'} />
                        <Text ml={'5px'}>Healthpulse</Text>
                    </Flex>

                    <Box mb={'16px'}>
                        <Text fontSize={'13px'} mb={'5px'} color={'#637185'}>Manage</Text>
                        <UnorderedList
                            listStyleType={'none'}                      

                            ml={'5px'}

                            spacing={3}
                        >
                            {topOptions.map(option => (
                                <SideBarItem
                                    key={option}
                                    icon={icons[option]}
                                    title={option.charAt(0).toUpperCase() + option.slice(1)}
                                    onClick={() => { setSelected(option) }}
                                    href={route(`doctor.${option}`)}
                                    selected={selected === option ? true : false}
                                />
                            ))}

                        </UnorderedList>
                    </Box>

                    <Box>
                        <Text fontSize={'13px'} mb={'5px'} color={'#637185'}>Patients</Text>
                        <UnorderedList
                            listStyleType={'none'}

                            ml={'5px'}

                            spacing={3}
                        >
                            {botOptions.map(option => (
                                <SideBarItem
                                    key={option}
                                    icon={icons[option]}
                                    title={option.charAt(0).toUpperCase() + option.slice(1)}
                                    onClick={() => setSelected(option)}
                                    href={route(`doctor.${option}`)}
                                    selected={selected === option ? true : false}
                                />
                            ))}
                        </UnorderedList>
                    </Box>
                </Flex>

                <Flex
                    bg={'transparent'}
                    
                    w={'100%'}
                    
                    direction={'column'}
                    align={'center'}
                >
                    <Box
                        borderRadius={'lg'}
                        bg={selected === 'notification' ? '#F2F7FF' :'transparent'}
                        color={selected === 'notification' ? '#1366DE' : '#637185'}

                        _hover={selected === 'notification' ? '' :
                        {
                            backgroundColor: '#F2F7FF',
                        }}
                        style={{ cursor: 'pointer' }}
            
                        w={'92%'}
                        p={'5px 16px'}
                        mb={'16px'}

                        onClick={() => setSelected('notification')}
            
                        fontSize={'12px'}
                        textAlign={'left'}
                    >
                        <Icon as={BsBellFill} mr={'8px'} mb={'2px'}></Icon>
                        Notification
                    </Box>

                    <Box
                        borderRadius={'md'}
                        bg={'#F6F7FA'}
                        color={'#1366DE'}
            
                        w={'92%'}
                        p={'5px 16px'}
                        mb={'16px'}
            
                        fontSize={'12px'}
                    >
                        <Text>{ new Date().toDateString() }</Text>
                        <Text>{ new Date().toLocaleTimeString() }</Text>
                    </Box>

                    <Flex
                        align={'center'}
                        justify={'space-around'}

                        borderTop={'2px solid #F0F0F1'}
                        
                        w={'165px'}
                        pt={'12px'}
                        pl={'5px'}
                    >
                        <Avatar src={doctor.avatar} bg='blue.500' color={'white'} size={'sm'} name={doctor.name} />
                        <Box ml={'4px'}>
                            <Text fontSize={'11px'} fontWeight={'bold'} color={'black'}>{`Dr ${doctor.name.charAt(0).toUpperCase()}. ${doctor.name.split(' ')[1]}`}</Text>
                            <Text fontSize={'10px'} color={"#637185"}>{doctor.type}</Text>
                        </Box>
                        <Menu placement={'top'} offset={[-65, 10]}>
                            {({ isOpen }) => (
                                <>
                                    <MenuButton
                                        isActive={isOpen}
                                        icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}

                                        as={IconButton}
                                        variant={'unstyled'}
                                        aria-label={'Options'}

                                        minWidth={'20px'}
                                        height={'20px'}

                                        mr={'3px'}
                                        mb={'5px'}
                                    />
                                    <MenuList minW={'150px'}>
                                        <MenuItem fontSize={'12px'}>Profile</MenuItem>
                                        <MenuItem fontSize={'12px'}>Logout</MenuItem>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}6