import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Image,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import _ from "lodash";
import dayjs from "dayjs";

export default function DoctorCard({ data, selectedManager, dataManager, modalManager }) {
    const { onOpen } = modalManager
    const { selected, changeSelected } = selectedManager

    return (
        <Card position={'relative'} onMouseEnter={() => changeSelected(data.id)} onMouseLeave={() => changeSelected(0)}>
            <CardBody>
                <Flex
                    justify={'center'}
                    w={'100%'}
                >
                    <Image
                        bg={'blue.100'}
                        borderRadius={'50%'}
                        w={'50%'}
                        src={data.avatar}
                    />
                </Flex>

                <Stack mt={'20px'} spacing={1} textAlign={'center'}>
                    <Box color={'#1366DE'} fontWeight={'bold'} fontSize={'13px'}>{data.name}</Box>
                    <Box color={'gray.500'} fontSize={'12px'}>{`${data.type.charAt(0).toUpperCase()}${data.type.slice(1)}`}</Box>
                    <Stack
                        borderRadius={'md'}
                        spacing={1}
                        bg={'blue.100'}
                        p={'4px'}
                    >
                        <Box fontSize={'12px'}>Next Available Time</Box>
                        <Box fontSize={'12px'} color={'#1366DE'} fontWeight={'bold'}>Today at time</Box>
                    </Stack>
                </Stack>
            </CardBody>

            {selected === data.id ? 
                <Flex
                    justify={'center'}
                    align={'center'}
                    
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}

                    borderRadius={'xl'}

                    bg={'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0.7591841668307948) 88%)'}
                >
                    <Box>
                        <Button
                            size={'md'}
                            colorScheme={'blue'}
                            onClick={() => {
                                dataManager.changeData('doctor', data.id)
                                onOpen()
                            }}
                        >
                            Book Appointment
                        </Button>
                    </Box>
                </Flex>
            :
                ''}
        </Card>
    )
}