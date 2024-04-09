import DashboardSidebar from "@/Components/DashboardSidebar";
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
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import { RxCrossCircled } from "react-icons/rx";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, Button as AntButton } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { LuHardDriveUpload } from "react-icons/lu";
import SignatureCanvas from 'react-signature-canvas'
import DoctorLayout from "@/Layouts/DoctorLayout";
import TestResultList from "@/Components/TestResultList"
import _ from 'lodash'

const colors = {
    Stable: 'black',
    Fair: '#AF8CFA',
    Mild: '#FFC999',
    Severe: '#DE5031',
}

const today = dayjs().millisecond(0).second(0)

const dateFormatter = (date) => {
    const dateArray = date.split('-')
    return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`
}

const prescriptionFieldsToBeValidated = ['medication_name', 'dose', 'pill_per_day', 'recommendation']
const testFieldsToBeValidated = ['test_name', 'test_result', 'unit']
const icdObj = {}

export default function AppointmentNote({ medicalInfo, appointment, icd, note }) {
    const [fileList, setFileList] = useState([])
    const simplifiedMedicalInfo = Object.values(medicalInfo)[0]
    const { get, data, post, setData, errors, setError, clearErrors, reset: resetData, processing } = useForm({
        patient_id: simplifiedMedicalInfo.patient.id, 
        appointment_id: appointment.id,
        main_complaint: '',
        objective_note: '',
        test_name: '',
        test_result: '',
        unit: '',
        date: today.format('YYYY-MM-DD'),
        medication_name: '',
        dose: '',
        dose_addon: '',
        pill_per_day: '',
        pill_type: '',
        recommendation: '',
        diagnoses: [],
        prescriptions: [],
        files: [],
        tests: {},
        signature: null,
    })
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('J00')
    const [isPrescribe, setIsPrescribe] = useState(false)
    const [fileArray, setFileArray] = useState([])
    const [isSigned, setIsSigned] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sigRef = useRef()

    const testKey = Object.keys(data.tests)

    const handleSignatureEnd = () => {
        setData('signature', sigRef.current.toDataURL('image/png'))
    }

    const clearSignature = () => {
        sigRef.current.clear()
        setData('signature', null)
    }   

    const { auth } = usePage().props
    
    useEffect(() => { 
        if (fileArray.length > 0) { 
            setData('files', fileArray.map((file) => {
                return file.originFileObj
            }))
        }
    }, [fileArray])

    useMemo(() => {
        if (!isPrescribe) {
            setData({
                ...data,
                prescriptions: [],
                medication_name: '',
                dose: '',
                dose_addon: '',
                pill_per_day: '',
                pill_type: '',
                recommendation: '',
            })
        } else {
            setData({
                ...data,
                dose_addon: 'mg oral',
                pill_type: 'tablet',
            })
        }
    }, [isPrescribe])

    useMemo(() => {
        icd.forEach(item => {
            icdObj[item.icd_code] = item
        })
    }, [icd])

    useMemo(() => {
        if (note.length > 0) {
            setIsSigned(true)
            setData({
                ...data,
                main_complaint: note[0].main_complaint,
                objective_note: note[0].objective_note,
                tests: note[0].test_results,
            })
        }
    }, [note])

    const resetModal = () => {
        setData('signature', null)
        onClose()
    }

    const handleAddingDiagnosis = () => {
        const icd_code = selectedDiagnosis

        const diagnosisDetail = {
            date: today.format('YYYY-MM-DD'),
            icd_code: icd_code,
        }

        const foundDiagnosis = data.diagnoses.find(diagnosis => {
            return diagnosis.icd_code === icd_code
        })

        if (!foundDiagnosis) {
            setData('diagnoses', [
                ...data.diagnoses,
                diagnosisDetail,
            ])
        }
    }

    const handleRemovingDiagnosis = (icd_code) => {
        const foundDiagnosis = data.diagnoses.find(diagnosis => {
            return diagnosis.icd_code === icd_code
        })

        data.diagnoses.splice(data.diagnoses.indexOf(foundDiagnosis), 1)

        setData('diagnoses', data.diagnoses)
    }

    let isError = false

    const requireValidate = (key) => {
        if (!data[key]) {
            return false
        }
        return true
    }

    const handleAddingPrescription = () => {
        prescriptionFieldsToBeValidated.forEach(key => {
            if (!requireValidate(key)) {
                setError(key, 'This field is required')
                isError = true
            }
        })

        if (isError) {
            return
        }

        const prescriptionDetail = {
            patient_id: data.patient_id,
            doctor_id: auth.doctor.id,
            date: today.format('YYYY-MM-DD'),
            medication_name: data.medication_name,
            dose: `${data.dose} ${data.dose_addon}`,
            pill_per_day: `${data.pill_per_day} ${data.pill_type}`,
            recommendation: data.recommendation,
        }

        const foundPrescription = data.prescriptions.find(prescription => {
            return prescription.medication_name === data.medication_name
        })

        if (!foundPrescription) {
            setData({
                ...data,
                prescriptions: [
                ...data.prescriptions,
                prescriptionDetail,
                ],
                medication_name: '',
                dose: '',
                pill_per_day: '',
                recommendation: '',
            })
        } else {
            setError('medication_name', 'This medication already exists')
        }
    }

    const handleRemovingPrescription = (medication_name) => {
        const foundPrescription = data.prescriptions.find(prescription => {
            return prescription.medication_name === medication_name
        })

        data.prescriptions.splice(data.prescriptions.indexOf(foundPrescription), 1)

        setData('prescriptions', data.prescriptions)
    }

    const handleAddingTest = () => {
        testFieldsToBeValidated.forEach(key => {
            if (!requireValidate(key)) {
                setError(key, 'This field is required')
                isError = true
            }
        })

        if (isError) {
            return
        }

        const foundTest = testKey.find(key => {
            return key === data.test_name
        })

        if (!foundTest) { 
            data.tests[data.test_name] = `${data.test_result} ${data.unit}`
            setData({
                ...data,
                tests: data.tests,
                test_name: '',
                test_result: '',
                unit: '',
            })
        } else {
            setError('test_name', 'This test already exists')
        }
    }

    const handleRemovingTest = (key) => {
        delete data.tests[key]
        setData('tests', data.tests)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (sigRef.current.isEmpty()) {
            setError('signature', 'Please sign the document')
            return
        }

        post(route('appointment.note', {appointment: appointment.id}))
    }

    return (
        <DoctorLayout state={'none'}>
            <Box
                w={'87vw'}
                h={'99vh'}
                    
                fontSize={'14px'}
            >
                <Box
                    w={'100%'}
                    p={'8px'}
                    ml={'16px'}
                >
                    <Flex
                        align={'center'}
                        justify={'space-between'}
                        pt={'8px'}

                        w={'100%'}
                    >
                        <Box fontSize={'24px'} fontWeight={'bold'}>Office visit / {appointment.id}</Box>

                        {!isSigned ? 
                            <Box>
                                <Button
                                    type='submit'
                                    
                                    bg={'blue.400'}
                                    color={'white'}
                                    
                                    size={'sm'}
                                    p={'2px 16px'}

                                    onClick={onOpen}
                                    
                                    _hover={{
                                        background: 'blue.500',
                                    }}
                                >
                                    Sign & Save
                                </Button>
                            </Box>
                        :
                            ''
                        }
                    </Flex>

                    <Flex>
                        <Box fontSize={'12px'}>Start time: {`${appointment.start_time.split(':')[0]}:${appointment.start_time.split(':')[1]}`}</Box>
                        <Box fontSize={'12px'} ml={'16px'}>Arrive time: {`${appointment.start_time.split(':')[0]}:${appointment.start_time.split(':')[1]}`}</Box>
                    </Flex>
                </Box>

                <HStack
                    w={'100%'}
                    h={'87vh'}
                    pl={'8px'}
                >
                    <Box
                        w={'40%'}
                        h={'100%'}
                        p={'16px'}

                        bg={'white'}
                        borderRadius={'xl'}

                        alignSelf={'flex-start'}
                    >
                        <Flex
                            w={'100%'}
                            pb={'8px'}

                            align={'center'}
                            justify={'space-between'}

                            borderBottom={'1px solid #ECEDED'}
                        
                            fontSize={'16px'}
                            fontWeight={'bold'}
                        >
                            <Box>
                                {simplifiedMedicalInfo.patient.name}
                            </Box>

                            <Box>
                                {simplifiedMedicalInfo.patient.age} years old
                            </Box>                   
                        </Flex>

                        <Box
                            w={'100%'}
                            h={'100%'}
                            overflowY={'scroll'}
                        >
                            <Box w={'100%'} borderBottom={'1px solid #ECEDED'} py={'8px'}>
                                <Box
                                    fontSize={'16px'}
                                    fontWeight={'bold'}

                                    mb={'8px'}
                                >
                                    Allergies
                                </Box>
                                <Flex
                                    w={'100%'}
                                    mb={'8px'}

                                    align={'center'}
                                    justify={'space-between'}

                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                >
                                    <Box w={'30%'} h={'10vh'}>
                                        <Box color={'gray'}>Drug</Box>
                                        {simplifiedMedicalInfo.allergies.Drug ? 
                                            simplifiedMedicalInfo.allergies.Drug.map((allergy, index) => {
                                                return (
                                                    <Flex
                                                        key={`drug-${index}`}
                                                        w={'100%'}
                                                        justify={'space-between'}
                                                        align={'center'}
                                                        overflowY={'scroll'}
                                                    >
                                                        <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                        <Box>{allergy.name}</Box>
                                                    </Flex>
                                                )
                                            })
                                        :
                                            <Box fontWeight={'bold'}>No known allergies</Box>
                                        }
                                    </Box>

                                    <Box w={'30%'} h={'10vh'}>
                                        <Box color={'gray'}>Food</Box>
                                        {simplifiedMedicalInfo.allergies.Food ? 
                                            simplifiedMedicalInfo.allergies.Food.map((allergy, index) => {
                                                return (
                                                    <Flex
                                                        key={`drug-${index}`}
                                                        w={'100%'}
                                                        justify={'space-between'}
                                                        align={'center'}
                                                        overflowY={'scroll'}
                                                    >
                                                        <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                        <Box>{allergy.name}</Box>
                                                    </Flex>
                                                )
                                            })
                                        :
                                            <Box fontWeight={'bold'}>No known allergies</Box>
                                        }
                                    </Box>

                                    <Box w={'30%'} h={'10vh'}>
                                        <Box color={'gray'}>Environmental</Box>
                                        {simplifiedMedicalInfo.allergies.Environmental ? 
                                            simplifiedMedicalInfo.allergies.Environmental.map((allergy, index) => {
                                                return (
                                                    <Flex
                                                        key={`drug-${index}`}
                                                        w={'100%'}
                                                        justify={'space-between'}
                                                        align={'center'}
                                                        overflowY={'scroll'}
                                                    >
                                                        <Box color={colors[allergy.severity]} fontWeight={'bold'}>{allergy.severity}</Box>
                                                        <Box>{allergy.name}</Box>
                                                    </Flex>
                                                )
                                            })
                                        :
                                            <Box fontWeight={'bold'}>No known allergies</Box>
                                        }
                                    </Box>
                                </Flex>
                            </Box>

                            <Box w={'100%'} borderBottom={'1px solid #ECEDED'} py={'8px'}>
                                <Box
                                    fontSize={'16px'}
                                    fontWeight={'bold'}

                                    mb={'8px'}
                                >
                                    Diagnoses
                                </Box>
                                <Box
                                    w={'100%'}
                                    h={'23vh'}
                                    overflowY={'scroll'}
                                >
                                    <Stack w={'100%'} spacing={2}>
                                        {
                                            simplifiedMedicalInfo.diagnoses.length > 0 ?
                                                simplifiedMedicalInfo.diagnoses.map((diagnosis, index) => {
                                                    return <Flex
                                                        key={`diagnosis-${index}`}
                                                        align={'center'}
                                                        justify={'space-between'}

                                                        borderBottom={'1px solid #ECEDED'}
                                                        
                                                        px={'2px'}
                                                        pb={'4px'}
                                                        mb={'4px'}
                                                        w={'100%'}
                                                        h={'5vh'}
                                                    >
                                                        <Flex align={'center'} w={'12%'} h={'100%'}>
                                                            <Box
                                                                bg={icdObj[diagnosis.icd_code].color}
                                                                borderRadius={'md'}
                                                                
                                                                w={'fit-content'}
                                                                p={'1px 5px'}
                                                                
                                                                fontSize={'10px'}
                                                                color={'white'}
                                                            >
                                                                {diagnosis.icd_code}
                                                            </Box>
                                                        </Flex>
                                                        <Flex align={'center'} fontSize={'11px'} w={'65%'} h={'100%'}>{icdObj[diagnosis.icd_code].icd_name}</Flex>
                                                        <Flex align={'center'} justify={'center'} w={'20%'} h={'100%'} fontSize={'12px'}>{dateFormatter(diagnosis.date)}</Flex>
                                                    </Flex>
                                                })    
                                                :    
                                                <Box fontWeight={'bold'}>No Available Diagnoses</Box>
                                        }
                                    </Stack>
                                </Box>
                            </Box>

                            <Box w={'100%'} mt={'8px'} py={'8px'}>
                                <Box
                                    fontSize={'16px'}
                                    fontWeight={'bold'}

                                    mb={'8px'}
                                >
                                    Prescriptions
                                </Box>
                                <Box
                                    w={'100%'}
                                    h={'23vh'}
                                    overflowY={'scroll'}
                                >
                                    <Stack w={'100%'} spacing={2}>
                                        {
                                            simplifiedMedicalInfo.prescriptions.length > 0 ?
                                                simplifiedMedicalInfo.prescriptions.map((prescriptionWithDoctor, index) => {
                                                    const prescription = prescriptionWithDoctor.detail
                                                    return <Flex
                                                        key={`prescription-${index}`}
                                                        align={'center'}
                                                        justify={'space-between'}

                                                        borderBottom={'1px solid #ECEDED'}
                                                        
                                                        px={'2px'}
                                                        pb={'4px'}
                                                        mb={'4px'}
                                                        w={'100%'}
                                                        h={'5vh'}
                                                    >
                                                        <Flex align={'center'} w={'30%'} fontWeight={'bold'} fontSize={'12px'} h={'100%'}>{prescription.medication_name}</Flex>
                                                        <Flex align={'center'} fontSize={'11px'} w={'50%'} h={'100%'}>{`${prescription.dose}, ${prescription.pill_per_day}`}</Flex>
                                                        <Flex align={'center'} justify={'center'} w={'20%'} h={'100%'} fontSize={'12px'}>{dateFormatter(prescription.date)}</Flex>
                                                    </Flex>
                                                })    
                                                :    
                                                <Box fontWeight={'bold'}>No Available Prescriptions</Box>
                                        }
                                    </Stack>
                                </Box>
                            </Box>

                            <Box w={'100%'} mt={'8px'} py={'8px'}>
                                <Box
                                    fontSize={'16px'}
                                    fontWeight={'bold'}

                                    mb={'8px'}
                                >
                                    Test Results
                                </Box>
                                <Box
                                    w={'100%'}
                                    h={'23vh'}
                                    overflowY={'scroll'}
                                >
                                    <Stack w={'100%'} spacing={2}>
                                        <TestResultList data={simplifiedMedicalInfo} width={'90%'} />
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Stack
                        w={'60%'}
                        h={'100%'}
                        pr={'8px'}

                        overflowY={'scroll'}
                    >
                        <Box
                            w={'100%'}
                            p={'16px'}
                        
                            bg={'white'}
                            borderRadius={'xl'}
                        >
                            <FormControl isInvalid={errors.main_complaint}>
                                <Box fontWeight={'bold'} mb={'8px'}>Main complaint</Box>
                                <Textarea
                                    disabled={isSigned}
                                    variant={'filled'}
                                    borderRadius={'md'}
                                    placeholder='Main complaint'
                                    size='sm'
                                    resize={isSigned ? 'none' : 'vertical'}
                                    value={data.main_complaint}
                                    onChange={(e) => {
                                        setData('main_complaint', e.target.value)
                                        clearErrors('main_complaint')
                                    }}
                                />
                                <FormErrorMessage>{errors.main_complaint}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box
                            w={'100%'}
                            p={'16px'}
                        
                            bg={'white'}
                            borderRadius={'xl'}
                        >
                            <FormControl isInvalid={errors.objective_note}>
                                <Box fontWeight={'bold'} mb={'8px'}>Objective note</Box>
                                <Textarea
                                    disabled={isSigned}
                                    variant={'filled'}
                                    borderRadius={'md'}
                                    placeholder='Objective note'

                                    h={'160px'}
                                    
                                    fontSize={'14px'}
                                    resize={isSigned ? 'none' : 'vertical'}
                                    value={data.objective_note}
                                    onChange={(e) => {
                                        setData('objective_note', e.target.value)
                                        clearErrors('objective_note')
                                    }}
                                />
                                <FormErrorMessage>{errors.objective_note}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box
                            w={'100%'}
                            p={'16px'}
                            
                            bg={'white'}
                            borderRadius={'xl'}
                        >
                            <Box fontWeight={'bold'} mb={'8px'}>Test results</Box>

                            <Stack
                                w={'100%'}
                                pb={'8px'}

                                spacing={1}
                                borderBottom={'1px solid #ECEDED'}
                            >
                                {!isSigned ? 
                                
                                    (testKey.length > 0 ? 
                                        testKey.map((key, index) => {
                                            return <Flex
                                                key={index}
                                                align={'center'}
                                                py={'8px'}
                                            >
                                                <Box w={'5%'} style={{cursor: 'pointer'}} onClick={() => handleRemovingTest(key)}>
                                                    <RxCrossCircled />
                                                </Box>
                                                <HStack
                                                    w={'95%'}
                                                    spacing={3}
                                                    ml={'16px'}
                                                >
                                                    <Box w={'30%'}>{key}</Box>
                                                        
                                                    <Box w={'70%'} fontSize={'12px'}>{data.tests[key]}</Box>
                                                </HStack>
                                            </Flex>
                                        })
                                        :
                                        ''
                                    )
                                    :
                                    <>
                                        <Flex
                                            w={'100%'}
                                            h={'100%'}

                                            p={'8px'}

                                            align={'center'}
                                        >
                                            <Box w={'30%'} p={'8px'} borderBottom={'1px solid #ECEDED'}>Test name</Box>
                                            <Box w={'70%'} p={'8px'} borderBottom={'1px solid #ECEDED'}>Test results</Box>
                                        </Flex>

                                        {testKey.length > 0 ? 
                                            testKey.map((key, index) => {
                                                return <Flex
                                                    w={'100%'}
                                                    h={'100%'}
        
                                                    p={'8px'}
        
                                                    align={'center'}
                                                >   
                                                    <Box w={'30%'} p={'8px'}>{key}</Box>
                                                    <Box w={'70%'} p={'8px'}>{data.tests[key]}</Box>
                                                </Flex>
                                            })
                                            :
                                            ''
                                        }
                                    </>
                                }
                            </Stack>

                            {!isSigned ? 
                                <Flex
                                    w={'100%'}
                                    mt={'8px'}

                                    justify={'space-between'}
                                    align={'center'}
                                >
                                    <FormControl isInvalid={errors.test_name} w={'45%'}>
                                        <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Test Name</Box>
                                        <Input 
                                            size={'sm'}  
                                            fontSize={'11px'}
                                            
                                            variant='filled' 
                                            
                                            borderRadius={'md'} 
                                            placeholder='Test name'
                                        
                                            value={data.test_name}
                                            onChange={e => {
                                                setData('test_name', e.target.value)
                                                clearErrors('test_name')
                                            }}
                                        />
                                        <FormErrorMessage>{errors.test_name}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.test_result} w={'35%'} ml={'18px'}>
                                        <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Result</Box>
                                        <Input 
                                            size={'sm'}  
                                            fontSize={'11px'}
                                            
                                            variant='filled' 
                                            
                                            borderRadius={'md'} 
                                            placeholder='Result'
                                        
                                            value={data.test_result}
                                            onChange={e => {
                                                setData('test_result', e.target.value)
                                                clearErrors('test_result')
                                            }}
                                        />
                                        <FormErrorMessage>{errors.test_result}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl isInvalid={errors.unit} w={'10%'} ml={'8px'}>
                                        <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Unit</Box>
                                        <Input 
                                            size={'sm'}  
                                            fontSize={'11px'}
                                            
                                            variant='filled' 
                                            
                                            borderRadius={'md'} 
                                            placeholder='Unit'
                                        
                                            value={data.unit}
                                            onChange={e => {
                                                setData('unit', e.target.value)
                                                clearErrors('unit')
                                            }}
                                        />
                                        <FormErrorMessage>{errors.unit}</FormErrorMessage>
                                    </FormControl>


                                    <Button alignSelf={'flex-end'} colorScheme={'blue'} ml={'8px'} size={'sm'} onClick={handleAddingTest}>Add</Button>
                                </Flex>
                                :
                                <></>
                            }
                        </Box>

                        {!isSigned ? 
                            <>
                                <Box
                                    w={'100%'}
                                    p={'16px'}
                                
                                    bg={'white'}
                                    borderRadius={'xl'}
                                >
                                    <Box fontWeight={'bold'} mb={'8px'}>Diagnosis</Box>
                                    <Box
                                        w={'100%'}
                                    >
                                        <Stack
                                            w={'100%'}
                                            pb={'8px'}

                                            spacing={1}
                                            borderBottom={'1px solid #ECEDED'}
                                        >
                                            {data.diagnoses.length > 0 ? 
                                                data.diagnoses.map((diagnosis, index) => {
                                                    return <Flex
                                                        key={diagnosis.icd_code}
                                                        align={'center'}
                                                        py={'8px'}
                                                    >
                                                        <Box w={'5%'} style={{cursor: 'pointer'}} onClick={() => handleRemovingDiagnosis(diagnosis.icd_code)}>
                                                            <RxCrossCircled />
                                                        </Box>
                                                        <HStack
                                                            w={'95%'}
                                                            spacing={3}
                                                            ml={'16px'}
                                                        >
                                                            <Box
                                                                w={'12%'}
                                                            >
                                                                <Box
                                                                    bg={icdObj[diagnosis.icd_code].color}
                                                                    borderRadius={'md'}
                                                                    
                                                                    w={'fit-content'}
                                                                    p={'1px 8px'}
                                                                    
                                                                    fontSize={'10px'}
                                                                    color={'white'}
                                                                >
                                                                    {diagnosis.icd_code}
                                                                </Box>
                                                            </Box>
                                                                
                                                            <Box w={'88%'} fontSize={'12px'}>{icdObj[diagnosis.icd_code].icd_name}</Box>
                                                        </HStack>
                                                    </Flex>
                                                })
                                                :
                                                ''
                                            }
                                        </Stack>

                                        <Stack
                                            w={'100%'}

                                            spacing={2}
                                            pt={'8px'}
                                        >
                                            <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'}>Code and name</Box>
                                            <Flex
                                                w={'100%'}
                                            >
                                                <Select
                                                    style={{
                                                        paddingBottom: '8px',
                                                    }}

                                                    variant={'filled'}
                                                    
                                                    borderRadius={'md'}

                                                    fontSize={'10px'}
                                                    
                                                    pb={'8px'}
                                                    w={'93%'}

                                                    size={'sm'}

                                                    value={selectedDiagnosis}

                                                    onChange={e => {
                                                        setSelectedDiagnosis(e.target.value)
                                                    }}
                                                >
                                                    {icd.map((item) => {
                                                        return <option
                                                            key={item.icd_code}
                                                            value={item.icd_code}
                                                        >
                                                            {item.icd_code}: {item.icd_name}
                                                        </option>
                                                    })}
                                                </Select>
                                                <Button colorScheme={'blue'} ml={'16px'} size={'sm'} onClick={handleAddingDiagnosis}>Add</Button>
                                            </Flex>
                                        </Stack>
                                    </Box>
                                </Box>

                                <Box
                                    w={'100%'}
                                    p={'16px'}
                                
                                    bg={'white'}
                                    borderRadius={'xl'}
                                    
                                >
                                    <Flex
                                        justify={'space-between'}
                                        align={'center'}
                                        
                                        w={'100%'}
                                    >
                                        <Box fontWeight={'bold'} mb={'8px'}>Prescription</Box>
                                        
                                        <Flex>
                                            <Box fontSize={'12px'} fontWeight={'bold'} me={'4px'}>Make a prescription?</Box>
                                            <Checkbox onChange={() => setIsPrescribe(!isPrescribe)} />
                                        </Flex>
                                    </Flex>

                                    <Stack
                                        w={'100%'}
                                        pb={'8px'}

                                        spacing={1}
                                        borderBottom={'1px solid #ECEDED'}
                                    >
                                        {data.prescriptions.length > 0 ? 
                                            data.prescriptions.map((prescription, index) => {
                                                return <Flex
                                                    key={index}
                                                    align={'center'}
                                                    py={'8px'}
                                                >
                                                    <Box w={'5%'} style={{cursor: 'pointer'}} onClick={() => handleRemovingPrescription(prescription.medication_name)}>
                                                        <RxCrossCircled />
                                                    </Box>
                                                    <HStack
                                                        w={'95%'}
                                                        spacing={3}
                                                        ml={'16px'}
                                                    >
                                                        <Box w={'30%'} fontSize={'12px'}>{prescription.medication_name}</Box>
                                                        <Box w={'70%'} fontSize={'12px'}>{`${prescription.dose}, ${prescription.pill_per_day} per day`}</Box>
                                                    </HStack>
                                                </Flex>
                                            })
                                            :
                                            ''
                                        }
                                    </Stack>

                                    <Flex
                                        w={'100%'}
                                        borderBottom={'1px solid #ECEDED'}

                                        py={'8px'}

                                        align={'center'}
                                    >
                                        <FormControl isInvalid={errors.medication_name} w={'40%'}>
                                            <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Medication name</Box>
                                            <Input 
                                                size={'sm'}  
                                                fontSize={'11px'}

                                                disabled={!isPrescribe}
                                                
                                                variant='filled' 
                                                
                                                borderRadius={'md'} 
                                                placeholder='Medication name'
                                            
                                                value={data.medication_name}
                                                onChange={e => {
                                                    setData('medication_name', e.target.value)
                                                    clearErrors('medication_name')
                                                }}
                                            />
                                            <FormErrorMessage>{errors.medication_name}</FormErrorMessage>
                                        </FormControl>

                                        <Box w={'30%'} ml={'5%'}>
                                            <FormControl isInvalid={errors.dose}>
                                                <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Dose</Box>
                                                <InputGroup size={'sm'}>
                                                    <Input 
                                                        type="number"
                                                        size={'sm'}  
                                                        fontSize={'11px'} 

                                                        disabled={!isPrescribe}
                                                        
                                                        variant='filled' 
                                                        
                                                        borderRadius={'md'} 
                                                        placeholder='Dose'

                                                        value={data.dose}
                                                        onChange={e => {
                                                            setData('dose', e.target.value)
                                                            clearErrors('dose')
                                                        }}
                                                    />

                                                    <InputRightAddon fontSize={'11px'} borderRightRadius={'md'} style={!isPrescribe ? {opacity: 0.4} : {opacity: 1}}>
                                                        mg
                                                    </InputRightAddon>
                                                </InputGroup>
                                                <FormErrorMessage>{errors.dose}</FormErrorMessage>
                                            </FormControl>
                                        </Box>
                                        <Box w={'30%'} ml={'5%'}>
                                            <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Pills per day</Box>
                                            <Flex
                                                align={'center'}

                                                w={'100%'}
                                            >
                                                <FormControl isInvalid={errors.pill_per_day} w={'30%'} mr={'2px'}>
                                                    <Input 
                                                        type="number"
                                                        size={'sm'}  
                                                        fontSize={'11px'}

                                                        w={'100%'}
                                                        
                                                        disabled={!isPrescribe}

                                                        variant='filled' 
                                                        borderRadius={'md'} 
                                                        placeholder='Pills'
                                                        
                                                        value={data.pill_per_day}
                                                        onChange={e => {
                                                            setData('pill_per_day', e.target.value)
                                                            clearErrors('pill_per_day')
                                                        }}
                                                    />
                                                    <FormErrorMessage w={'20vw'} fontSize={'10px'}>{errors.pill_per_day}</FormErrorMessage>
                                                </FormControl>
                                                <Select     
                                                    style={{
                                                        paddingBottom: '8px',
                                                    }} 

                                                    variant={'filled'}
                                                    
                                                    borderRadius={'md'}
                                                    
                                                    fontSize={'10px'}
                                                    
                                                    disabled={!isPrescribe}

                                                    w={'70%'}
                                                    
                                                    size={'sm'}

                                                    value={data.pill_type}

                                                    onChange={e => {
                                                        setData('pill_type', e.target.value)
                                                    }}
                                                >
                                                    <option value={`tablet`}>Tablet</option>
                                                    <option value={`capsule`}>Capsule</option>
                                                </Select>

                                            </Flex>
                                        </Box>
                                    </Flex>

                                    <Box
                                        w={'100%'}
                                        pt={'8px'}
                                    >
                                        <FormControl isInvalid={errors.recommendation}>
                                            <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Recommendation</Box>
                                            <Textarea
                                                variant={'filled'}
                                                borderRadius={'md'}

                                                disabled={!isPrescribe}

                                                placeholder='Recommendation'
                                                size='sm'
                                                resize={isSigned ? 'none' : 'vertical'}

                                                value={data.recommendation}
                                                onChange={e => {
                                                    setData('recommendation', e.target.value)
                                                    clearErrors('recommendation')
                                                }}
                                            />
                                            <FormErrorMessage>{errors.recommendation}</FormErrorMessage>
                                        </FormControl>
                                    </Box>

                                    <Flex
                                        w={'100%'}
                                        pt={'8px'}

                                        justify={'flex-end'}
                                        align={'center'}
                                    >
                                        <Button isDisabled={!isPrescribe} colorScheme={'blue'} ml={'2px'} size={'sm'} onClick={handleAddingPrescription}>Add</Button>
                                    </Flex>
                                </Box>
                            </>
                        :
                            <></>
                        }

                        {!isSigned ? 
                            <Box
                                w={'100%'}
                                p={'16px'}
                            
                                bg={'white'}
                            >
                                <Box fontWeight={'bold'} mb={'8px'}>Additional documentation</Box>
                                <Upload
                                    accept='image/*,.pdf'
                                    listType="picture"
                                    customRequest={({ onSuccess }) => setTimeout(() => { onSuccess("ok", null); }, 0) }
                                    onChange={({ file, fileList }) => {
                                        setFileArray(fileList)
                                    }}
                                >
                                    <AntButton icon={<LuHardDriveUpload />}>Upload</AntButton>
                                </Upload>
                            </Box>
                            :
                            // <SimpleGrid columns={2} spacing={10} overflowY={'scroll'}>
                            //     {note[0]['image_url'].map((url, index) => {
                                //         return <Box key={index} bg={'red'} height={'320px'}>
                            //             <img src={url} />
                            //         </Box>
                            //     })}
                            // </SimpleGrid>
                            ''
                        }

                        {!isSigned ? 
                            <Button
                                onClick={onOpen}
                                type='submit'
                                
                                bg={'blue.400'}
                                color={'white'}
                                
                                w={'100%'}
                                py={'8px'}
                                
                                _hover={{
                                    background: 'blue.500',
                                }}
                            >
                                Sign & Save
                            </Button>
                            :
                            <Box
                                bg={'white'}
                                borderRadius={'md'}
                                
                                w={'100%'}
                                p={'16px'}
                            >
                                <Box fontWeight={'bold'} mb={'8px'}>Signature</Box>
                                <Flex w={'100%'} justify={'center'}>
                                    <img src={note[0].signature} alt="signature" width={'50%'} />
                                </Flex>
                            </Box>
                        }
                    </Stack>
                </HStack>

                <Modal isOpen={isOpen} size={'lg'} onClose={resetModal} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Please Sign</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl w={'100%'} isInvalid={errors.signature}>
                                <SignatureCanvas
                                    ref={sigRef}
                                    canvasProps={{className: 'signature'}}
                                    onEnd={handleSignatureEnd}
                                    onBegin={() => clearErrors('signature')}
                                    dotSize={0.1}
                                />

                                <FormErrorMessage>{errors.signature}</FormErrorMessage>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Flex
                                justify={'space-between'}
                                align={'center'}

                                w={'100%'}
                            >
                                <Button
                                    onClick={clearSignature}
                                    colorScheme={'gray'}

                                    py={'8px'}
                                >
                                    Clear
                                </Button>

                                <Box>
                                    <Button
                                        onClick={handleSubmit}
                                        isLoading={processing}
                                        type='submit'
                                        
                                        bg={'blue.400'}
                                        color={'white'}

                                        py={'8px'}
                                        
                                        _hover={{
                                            background: 'blue.500',
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button variant={'ghost'} colorScheme={'red'} ml={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </Box>
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </DoctorLayout>
    )
}