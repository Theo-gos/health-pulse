import {
    Box,
    Flex,
    SimpleGrid,
} from "@chakra-ui/react";
import _ from "lodash";
import dayjs from "dayjs";

const today = dayjs()

function isValidDateString(dateString) {
    return !isNaN(Date.parse(dateString));
}

const dateFormatter = (date) => {
    const dateArray = date.split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

export default function PatientListsPrescriptions({prescriptionKeys, prescriptions}) {
    return (
        prescriptionKeys.length > 0 ? 
            prescriptionKeys.map(key => {
                return <Box
                    key={key}
                    w={'100%'}
                >
                    <Box
                        w={'100%'}
                        p={'8px'}

                        fontSize={'16px'}
                        fontWeight={'bold'}

                        borderBottom={'1px solid #ECEDED'}
                    >
                        {isValidDateString(key) ? dateFormatter(key) : `Dr. ${key}`}
                    </Box>
                    
                    <SimpleGrid
                        columns={{ sm: 1, md: 2, lg: 3 }}
                        w={'100%'}
                    
                        mt={'16px'}
                        spacingX={'16px'}
                        spacingY={'20px'}
                    >
                        {prescriptions[key].map(prescription => {
                            return <Box
                                key={prescription.id}
                                mr={'8px'}
                                w={'100%'}
                                h={'100%'}
                                p={'8px'}

                                flex={'0 0 auto'}

                                borderRadius={'xl'}

                                bg={'blue.100'}
                            >
                                <Flex
                                    w={'100%'}
                                    h={'25%'}
                                    p={'4px'}

                                    borderBottom={'1px solid #ECEDED'}

                                    justify={'space-between'}
                                >
                                    <Box
                                        w={'50%'}
                                    >
                                        <Box fontSize={'11px'} color={'gray'}>Pres. #</Box>
                                        <Box fontSize={'12px'} fontWeight={'bold'}>{prescription.id}</Box>
                                    </Box>

                                    <Box
                                        w={'50%'}
                                        textAlign={'right'}
                                    >
                                        <Box fontSize={'11px'} color={'gray'}>Date</Box>
                                        <Box fontSize={'12px'} fontWeight={'bold'}>{dateFormatter(prescription.date)}</Box>
                                    </Box>
                                </Flex>

                                <Box
                                    w={'100%'}
                                    h={'25%'}
                                    p={'8px 4px'}

                                    borderBottom={'1px solid #ECEDED'}
                                >
                                    <Box fontSize={'11px'} color={'gray'}>Issued By</Box>
                                    <Box fontSize={'12px'} fontWeight={'bold'}>Dr. {prescription.doctor_name}</Box>
                                </Box>

                                <Box
                                    w={'100%'}
                                    h={'50%'}
                                    px={'4px'}
                                    py={'16px'}
                                >
                                    <Box fontSize={'11px'} color={'gray'}>Medication and Dosage</Box>
                                    <Box
                                        w={'100%'}
                                        h={'95%'}
                                        p={'8px'}

                                        borderLeft={'1px solid green'}

                                        fontSize={'12px'}
                                    >
                                        <Box fontWeight={'bold'}>{prescription.medication_name}</Box>
                                        <Box color={'gray'}>{`${prescription.dose}, ${prescription.pill_per_day}`}</Box>
                                        <Box fontSize={'10px'} overflow={'hidden'}>{prescription.recommendation}</Box>
                                    </Box>
                                </Box>
                            </Box>       
                        })}
                    </SimpleGrid>
                </Box>
            })
            :
            <Box fontSize={'16px'} fontWeight={'bold'} textAlign={'center'} w={'100%'}>No available prescriptions.</Box>
    )
}