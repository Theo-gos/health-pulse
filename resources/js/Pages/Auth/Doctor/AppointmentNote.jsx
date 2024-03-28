import DashboardSidebar from "@/Components/DashboardSidebar";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    Square,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import { RxCrossCircled } from "react-icons/rx";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Upload, Button as AntButton } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { LuHardDriveUpload } from "react-icons/lu";



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

export default function AppointmentNote({ medicalInfo, appointment, icd }) {
    const [fileList, setFileList] = useState([])
    const simplifiedMedicalInfo = Object.values(medicalInfo)[0]
    const { get, data, post, setData, errors, setError, clearErrors, reset: resetData } = useForm({
        patient_id: simplifiedMedicalInfo.patient.id, 
        notes: {
            appointment_id: appointment.id,
            main_complaint: '',
            objective_note: '',
            subjective_note: '',
        },
        diagnoses: [],
        prescription: {
            date: today.format('YYYY-MM-DD'),
            medication_name: '',
            dose: '',
            dose_addon: 'mg oral',
            pill_per_day: '',
            pill_type: 'tablet',
            recommendation: '',
        },
        files: [],
    })
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('J00:Acute nasopharyngitis, common cold:Stable:#1366DE')
    const [isPrescribe, setIsPrescribe] = useState(false)

    const {auth} = usePage().props

    useMemo(() => {
        if (!isPrescribe) {
            resetData('prescription')
        }
    }, [isPrescribe])

    const handleAddingDiagnosis = () => {
        const icdData = selectedDiagnosis.split(':')

        const icd_code = icdData[0];
        const icd_name = icdData[1];
        const severity = icdData[2];
        const color = icdData[3];

        const diagnosisDetail = {
            date: today.format('YYYY-MM-DD'),
            icd_code: icd_code,
            icd_name: icd_name,
            severity: severity,
            color: color,
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

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('appointment.note', {appointment: appointment.id}))
    }
    console.log(data);

    return (
        <Box
            position={'relative'}
            bg={'#F5F7FB'}

            w={'100vw'}
            h={'100vh'}
        >
            <Flex
                w={'100%'}
                h={'95vh'}
            >
                <DashboardSidebar state={'none'} />
                <Box
                    w={'87vw'}
                    h={'99vh'}
                    
                    fontSize={'14px'}
                >
                    <Box
                        w={'100%'}
                        p={'8px'}
                    >
                        <Flex
                            align={'center'}
                            justify={'space-between'}
                            pt={'8px'}

                            w={'100%'}
                        >
                            <Box fontSize={'24px'} fontWeight={'bold'}>Office visit / {appointment.id}</Box>
                            <Box>
                                <Button
                                    type='submit'
                                    
                                    bg={'blue.400'}
                                    color={'white'}
                                    
                                    size={'sm'}
                                    p={'2px 16px'}
                                    
                                    _hover={{
                                        background: 'blue.500',
                                    }}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Flex>

                        <Flex>
                            <Box fontSize={'12px'}>Start time: {`${appointment.start_time.split(':')[0]}:${appointment.start_time.split(':')[1]}`}</Box>
                            <Box fontSize={'12px'} ml={'16px'}>Arrive time: {`${appointment.start_time.split(':')[0]}:${appointment.start_time.split(':')[1]}`}</Box>
                        </Flex>
                    </Box>

                    <HStack
                        w={'100%'}
                        h={'88vh'}
                        pl={'8px'}
                    >
                        <Box
                            w={'40%'}
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

                            <Box w={'100%'} py={'8px'}>
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
                                                                bg={diagnosis.color}
                                                                borderRadius={'md'}
                                                                
                                                                w={'fit-content'}
                                                                p={'1px 5px'}
                                                                
                                                                fontSize={'10px'}
                                                                color={'white'}
                                                            >
                                                                {diagnosis.icd_code}
                                                            </Box>
                                                        </Flex>
                                                        <Box fontSize={'11px'} w={'65%'} h={'100%'}>{diagnosis.icd_name}</Box>
                                                        <Flex align={'center'} justify={'center'} w={'20%'} h={'100%'} fontSize={'12px'}>{dateFormatter(diagnosis.date)}</Flex>
                                                    </Flex>
                                                })    
                                                :    
                                                <Box fontWeight={'bold'}>No Available Diagnoses</Box>
                                        }
                                    </Stack>
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
                                <Box fontWeight={'bold'} mb={'8px'}>Main complaint</Box>
                                <Textarea
                                    variant={'filled'}
                                    borderRadius={'md'}
                                    placeholder='Main complaint'
                                    size='sm'
                                    resize={'vertical'}
                                    value={data.notes.main_complaint}
                                    onChange={(e) => setData('notes', {
                                        ...data.notes,
                                        main_complaint: e.target.value,
                                    })}
                                />
                            </Box>

                            <Box
                                w={'100%'}
                                p={'16px'}
                            
                                bg={'white'}
                                borderRadius={'xl'}
                            >
                                <Box fontWeight={'bold'} mb={'8px'}>Objective note</Box>
                                <Textarea
                                    variant={'filled'}
                                    borderRadius={'md'}
                                    placeholder='Objective note'

                                    h={'160px'}

                                    fontSize={'14px'}
                                    resize={'vertical'}
                                    value={data.notes.objective_note}
                                    onChange={(e) => setData('notes', {
                                        ...data.notes,
                                        objective_note: e.target.value,
                                    })}
                                />
                            </Box>

                            <Box
                                w={'100%'}
                                p={'16px'}
                            
                                bg={'white'}
                                borderRadius={'xl'}
                            >
                                <Box fontWeight={'bold'} mb={'8px'}>Subjective note</Box>
                                <Textarea
                                    variant={'filled'}
                                    borderRadius={'md'}
                                    placeholder='Subjective note'

                                    h={'160px'}

                                    fontSize={'14px'}
                                    resize={'vertical'}
                                    value={data.notes.subjective_note}
                                    onChange={(e) => setData('notes', {
                                        ...data.notes,
                                        subjective_note: e.target.value,
                                    })}
                                />
                            </Box>

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
                                                                bg={diagnosis.color}
                                                                borderRadius={'md'}
                                                                
                                                                w={'fit-content'}
                                                                p={'1px 8px'}
                                                                
                                                                fontSize={'10px'}
                                                                color={'white'}
                                                            >
                                                                {diagnosis.icd_code}
                                                            </Box>
                                                        </Box>
                                                            
                                                        <Box w={'88%'} fontSize={'12px'}>{diagnosis.icd_name}</Box>
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
                                                        value={`${item.icd_code}:${item.icd_name}:${item.severity}:${item.color}`}
                                                    >
                                                        {item.icd_code}: {item.icd_name}
                                                    </option>
                                                })}
                                            </Select>
                                            <Button colorScheme={'blue'} ml={'2px'} size={'sm'} onClick={handleAddingDiagnosis}>Add</Button>
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
                                <Flex
                                    w={'100%'}
                                    borderBottom={'1px solid #ECEDED'}

                                    py={'8px'}

                                    align={'center'}
                                >
                                    <Box w={'40%'}>
                                        <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Medication name</Box>
                                        <Input 
                                            size={'sm'}  
                                            fontSize={'11px'}

                                            disabled={!isPrescribe}
                                            
                                            variant='filled' 
                                            
                                            borderRadius={'md'} 
                                            placeholder='Medication name'
                                        
                                            value={data.prescription.medication_name}
                                            onChange={e => setData('prescription', {
                                                ...data.prescription,
                                                medication_name: e.target.value,
                                            })}
                                        />
                                    </Box>

                                    <Box w={'30%'} ml={'5%'}>
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

                                                value={data.prescription.dose}
                                                onChange={e => setData('prescription', {
                                                    ...data.prescription,
                                                    dose: e.target.value,
                                                })}
                                            />

                                            <InputRightAddon fontSize={'11px'} borderRightRadius={'md'} style={!isPrescribe ? {opacity: 0.4} : {opacity: 1}}>
                                                mg
                                            </InputRightAddon>
                                        </InputGroup>
                                    </Box>

                                    <Box w={'30%'} ml={'5%'}>
                                        <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Pills per day</Box>
                                        <Flex
                                            align={'center'}

                                            w={'100%'}
                                        >
                                            <Input 
                                                type="number"
                                                size={'sm'}  
                                                fontSize={'11px'}

                                                w={'30%'}
                                                mr={'2px'}
                                                
                                                disabled={!isPrescribe}

                                                variant='filled' 
                                                borderRadius={'md'} 
                                                placeholder='Pills'
                                                
                                                value={data.prescription.pill_per_day}
                                                onChange={e => setData('prescription', {
                                                    ...data.prescription,
                                                    pill_per_day: e.target.value,
                                                })}
                                            />

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

                                                value={data.prescription.pill_type}

                                                onChange={e => {
                                                    setData('prescription', {
                                                        ...data.prescription,
                                                        pill_type: e.target.value
                                                    })
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
                                    <Box fontSize={'12px'} color={'gray'} fontWeight={'bold'} mb={'6px'}>Recommendation</Box>
                                    <Textarea
                                        variant={'filled'}
                                        borderRadius={'md'}

                                        disabled={!isPrescribe}

                                        placeholder='Recommendation'
                                        size='sm'
                                        resize={'vertical'}
                                        value={data.prescription.recommendation}
                                        onChange={(e) => setData('prescription', {
                                            ...data.prescription,
                                            recommendation: e.target.value,
                                        })}
                                    />
                                </Box>
                            </Box>

                            <Box
                                w={'100%'}
                                p={'16px'}
                            
                                bg={'white'}
                            >
                                <Upload
                                    accept='image/*,.pdf'
                                    listType="picture"
                                    customRequest={({ onSuccess }) => setTimeout(() => { onSuccess("ok", null); }, 0) }
                                    onChange={({file, fileList}) => {
                                        setData('files', fileList)
                                    }}
                                >
                                    <AntButton icon={<LuHardDriveUpload />}>Upload</AntButton>
                                </Upload>
                            </Box>

                            <Button
                                onClick={handleSubmit}
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
                        </Stack>
                    </HStack>
                </Box>
            </Flex>
        </Box>
    )
}