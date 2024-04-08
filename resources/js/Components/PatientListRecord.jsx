import {
    Box,
    Flex,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import _ from "lodash";
import dayjs from "dayjs";
import { useMemo } from "react";
import TestResultList from "@/Components/TestResultList"

const today = dayjs()
const icdObj = {}

const colors = {
    Stable: 'black',
    Fair: '#AF8CFA',
    Mild: '#FFC999',
    Severe: '#DE5031',
}

const dateFormatter = (date) => {
    const dateArray = date.split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

export default function PatientListRecord({ medicalInfo, icd }) {   
    useMemo(() => {
        icd.forEach(item => {
            icdObj[item.icd_code] = item
        })
    }, [icd])

    return (
        <Box
            w={'100%'}
            h={'60vh'}

            mt={'20px'}

            overflowY={'scroll'}
        >
            <Stack spacing={6}>
                <Box
                    w={'100%'}
                >
                    <Box fontWeight={'bold'} ml={'6px'}>Allergies</Box>
                    <SimpleGrid
                        mt={'16px'}

                        columns={3} spacing='16px'
                    >
                        <Box
                            p={'12px'}

                            fontSize={'12px'}

                            bg={'white'}
                            
                            border={'1px solid #EEEFF1'}
                            borderRadius={'xl'}
                        >
                            <Box color={'gray.500'}>Drug</Box>
                            <Stack
                                w={'100%'}
                                mt={'2px'}
                                
                                spacing={1}
                            >
                                {
                                    medicalInfo.allergies ?
                                        (medicalInfo.allergies.Drug ? 
                                            medicalInfo.allergies.Drug.map((allergy, index) => (
                                                <Flex
                                                    key={`drug-${index}`}
                                                    w={'100%'}
                                                    justify={'space-between'}
                                                    align={'center'}
                                                >
                                                    <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                    <Box>{allergy.name}</Box>
                                                </Flex>
                                            ))
                                            :
                                            <Box fontWeight={'bold'}>No known allergies</Box>
                                        )
                                        :
                                        <Box fontWeight={'bold'}>No known allergies</Box>
                                }
                            </Stack>
                        </Box>

                        <Box
                            p={'12px'}

                            fontSize={'12px'}

                            bg={'white'}
                            
                            border={'1px solid #EEEFF1'}
                            borderRadius={'xl'}
                        >
                            <Box color={'gray.500'}>Food</Box>
                            <Stack
                                w={'100%'}
                                mt={'2px'}
                                
                                spacing={1}
                            >
                                {
                                    medicalInfo.allergies ?
                                        (medicalInfo.allergies.Food ? 
                                            medicalInfo.allergies.Food.map((allergy, index) => (
                                                <Flex
                                                    key={`food-${index}`}
                                                    w={'100%'}
                                                    justify={'space-between'}
                                                    align={'center'}
                                                >
                                                    <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                    <Box>{allergy.name}</Box>
                                                </Flex>
                                            ))
                                            :
                                            <Box fontWeight={'bold'}>No known allergies</Box>
                                        )
                                        :
                                        <Box fontWeight={'bold'}>No known allergies</Box>
                                }
                            </Stack>
                        </Box>

                        <Box
                            p={'12px'}

                            fontSize={'12px'}

                            bg={'white'}
                            
                            border={'1px solid #EEEFF1'}
                            borderRadius={'xl'}
                        >
                            <Box color={'gray.500'}>Environmental</Box>
                            <Stack
                                w={'100%'}
                                mt={'2px'}
                                
                                spacing={1}
                            >
                                {
                                    medicalInfo.allergies ?
                                        (medicalInfo.allergies.Environmental ? 
                                            medicalInfo.allergies.Environmental.map((allergy, index) => (
                                                <Flex
                                                    key={`environment-${index}`}
                                                    w={'100%'}
                                                    justify={'space-between'}
                                                    align={'center'}
                                                >
                                                    <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                    <Box>{allergy.name}</Box>
                                                </Flex>
                                            ))
                                            :
                                            <Box fontWeight={'bold'}>No known allergies</Box>
                                        )
                                        :
                                        <Box fontWeight={'bold'}>No known allergies</Box>
                                }
                            </Stack>
                        </Box>
                    </SimpleGrid>
                </Box>

                <Box
                    w={'100%'}
                    h={'28vh'}
                >
                    <Box fontWeight={'bold'} ml={'6px'}>Diagnoses</Box>
                    <SimpleGrid
                        mt={'16px'}
                        h={'87%'}

                        overflowY={'scroll'}
                        columns={2} spacing='4px'
                    >
                        {medicalInfo.diagnoses.length > 0 ? 
                            medicalInfo.diagnoses.map((item, index) => (
                                <Box
                                    key={index}
                                    h={'11vh'}
                                    p={'12px'}

                                    fontSize={'12px'}

                                    bg={'white'}
                                    
                                    border={'1px solid #EEEFF1'}
                                    borderRadius={'xl'}
                                >
                                    <Flex
                                        align={'center'}
                                        justify={'space-between'}
                                        p={'2px 6px'}
                                        mb={'4px'}

                                        fontSize={'11px'}
                                    >
                                        <Box bg={icdObj[item.icd_code].color} p={'2px 6px'} borderRadius={'md'} color={'white'}>{item.icd_code}</Box>
                                        <Box fontSize={'13px'}>{dateFormatter(item.date)}</Box>
                                    </Flex>
                                    <Box p={'8px'} fontWeight={'bold'}>{icdObj[item.icd_code].icd_name}</Box>
                                </Box>
                            ))
                            :
                            <Box pl={'8px'}>No Available Diagnoses</Box>
                        }
                    </SimpleGrid>
                </Box>

                
                <Box
                    w={'100%'}
                    h={'28vh'}
                >
                    <Box fontWeight={'bold'} ml={'6px'}>Test Results</Box>
                    <Stack
                        w={'100%'}
                        h={'90%'}
                        mt={'18px'}

                        spacing={2}

                        overflowY={'scroll'}
                    >
                        <TestResultList data={medicalInfo} width={'70%'} />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}