import {
    Box,
    Flex,
    Button,
    Stack,
    Avatar,
} from "@chakra-ui/react"
import PatientLayout from "@/Layouts/PatientLayout"
import { useEffect, useMemo, useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import _ from "lodash";
import { Upload, Button as AntButton } from "antd";
import { LuHardDriveUpload } from "react-icons/lu";
import { useMediaQuery } from "react-responsive";
import { FaCamera } from "react-icons/fa";

const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
};

export default function PatientProfile() {
    const { auth } = usePage().props
    const { patient } = auth
    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const { data, setData, patch, post, put, reset, processing } = useForm({
        avatar: {}
    })
    const isMobile = useMediaQuery({ query: '(max-width: 844px)' })

    const resetAll = () => {
        reset('avatar')
        setImageUrl('')
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true)
          return
        }
        if (info.file.status === 'done') {
            setData('avatar', info.file.originFileObj)
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false)
                setImageUrl(url)
            })
        }
    }

    const handleSubmit = () => {
        post(route('patient.update.avatar', { patient: patient.id }), {
            onSuccess: () => resetAll()
        })
    }

    return (
        <PatientLayout state={'profile'}>
            <Box mt={'80px'}>
                <Box
                    fontSize={'32px'}

                    bg={isMobile ? '#E8F0FC' : 'white'}

                    color={'#1366DE'}
                    
                    w={isMobile ? '100%' : "fit-content"}
                    py={isMobile ? '20px' : ''}
                    mx={'auto'}
                    my={!isMobile ? '36px' : ''}

                    textAlign={isMobile ? 'center' : ''}
                >
                    Profile
                </Box>

                {!isMobile ? 
                    <Box
                        w={'100%'}
                        h={'auto'}
                        pt={'10px'}

                        bg={'#E8F0FC'}
                    >
                        <Box
                            w={'60%'}
                            h={'100%'}
                            p={'20px 36px 60px'}

                            borderTopRadius={'25px'}
                            border={'gray.200'}
                            mx={'auto'}

                            bg={'white'}
                        >
                            <Flex
                                justify={'space-between'}
                                align={'center'}

                                fontSize={'34px'}
                            >
                                <Box fontWeight={'bold'}>Your profile</Box>
                            </Flex>
                            <Stack
                                w={'100%'}
                                h={'60vh'}
                                mt={'20px'}

                                spacing={2}
                            >
                                <Flex
                                    w={'100%'}

                                    justify={'center'}
                                    >
                                    <Box
                                        position={'relative'}

                                        onMouseEnter={() => setHovered(true)}
                                        onMouseLeave={() => setHovered(false)}
                                    >
                                        <Avatar
                                            name={patient.name}
                                            src={imageUrl ? imageUrl :  patient.avatar}
                                            
                                            bg={'#1366DE'}
                                            color={'white'}
                                            
                                            size={'2xl'}
                                        />
                                        {hovered ?                      
                                            <Flex
                                                justify={'center'}
                                                align={'center'}
                                                
                                                position={'absolute'}
                                                top={0}
                                                left={'50%'}
                                                right={0}
                                                bottom={0}

                                                transform={'translateX(-50%)'}

                                                w={'100%'}
                                                borderRadius={'50%'}

                                                bg={'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0.7591841668307948) 88%)'}
                                            >
                                                <Box
                                                    pl={'9px'}
                                                >
                                                    <Upload
                                                        accept='image/*'
                                                        listType="picture-circle"
                                                        showUploadList={false}
                                                        maxCount={1}
                                                        customRequest={({ onSuccess }) => setTimeout(() => { onSuccess("ok", null); }, 0) }
                                                        onChange={handleChange}
                                                    >
                                                        <Flex
                                                            w={'100%'}
                                                            direction={'column'}
                                                            align={'center'}
                                                            
                                                            fontWeight={'bold'}
                                                            color={'white'}
                                                        >
                                                            <Box mt={'8px'}>Upload</Box>
                                                            <Box mt={'4px'}>Avatar</Box>
                                                        </Flex>
                                                    </Upload>
                                                </Box>
                                            </Flex>
                                        :
                                            ''
                                        }
                                    </Box>
                                </Flex>

                                <Flex
                                    w={'100%'}

                                    justify={'center'}
                                >
                                    <Box
                                        fontWeight={'bold'}
                                        fontSize={'20px'}
                                    >
                                        {patient.name}
                                    </Box>
                                </Flex>

                                <Box mt={'56px'} mx={'10%'} fontWeight={'bold'}>General information</Box>

                                <Stack
                                    w={'90%'}
                                    p={'16px'}
                                    mx={'10%'}
                                    fontSize={'16px'}

                                    spacing={2}

                                    border={'1px solid gray'}
                                    borderRadius={'lg'}
                                >
                                    <Flex
                                        w={'100%'}
                                    >
                                        <Box
                                            fontWeight={'bold'}

                                            w={'20%'}
                                        >
                                            Email:
                                        </Box>

                                        <Box
                                            w={'80%'}
                                        >
                                            {patient.email}
                                        </Box>
                                    </Flex>

                                    <Flex
                                        w={'100%'}
                                    >
                                        <Box
                                            fontWeight={'bold'}

                                            w={'20%'}
                                        >
                                            Phone:
                                        </Box>

                                        <Box
                                            w={'80%'}
                                        >
                                            {patient.phone}
                                        </Box>
                                    </Flex>

                                    <Flex
                                        w={'100%'}
                                    >
                                        <Box
                                            fontWeight={'bold'}

                                            w={'20%'}
                                        >
                                            Date of birth:
                                        </Box>

                                        <Box
                                            w={'80%'}
                                        >
                                            {patient.date_of_birth}
                                        </Box>
                                    </Flex>

                                    <Flex
                                        w={'100%'}
                                    >
                                        <Box
                                            fontWeight={'bold'}

                                            w={'20%'}
                                        >
                                            Age:
                                        </Box>

                                        <Box
                                            w={'80%'}
                                        >
                                            {patient.age}
                                        </Box>
                                    </Flex>
                                </Stack>
                                {imageUrl ? 
                                    <Flex
                                        w={'90%'}
                                        mx={'10%'}
                                        mt={'16px'}

                                        justify={'flex-end'}
                                    >
                                        <Button
                                            onClick={resetAll}
                                            
                                            colorScheme={'red'}
                                            color={'white'}

                                            isDisabled={processing}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            onClick={handleSubmit}
                                            
                                            colorScheme={'blue'}
                                            color={'white'}

                                            isDisabled={processing}
                                        
                                            ml={'8px'}
                                        >
                                            Save
                                        </Button>
                                    </Flex>
                                    :
                                    <></>
                                }
                            </Stack>
                        </Box>
                    </Box>
                :
                <Box
                    w={'100%'}
                    h={'auto'}
                >
                    <Box
                        w={'100%'}
                        h={'100%'}
                        p={'20px 36px 60px'}

                        borderTopRadius={'25px'}
                        border={'gray.200'}
                        mx={'auto'}

                        bg={'white'}
                    >
                        <Stack
                            w={'100%'}
                            h={'60vh'}
                            mt={'20px'}

                            spacing={2}
                        >
                            <Flex
                                w={'100%'}

                                justify={'center'}
                                >
                                <Box
                                    position={'relative'}

                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                >
                                    <Avatar
                                        name={patient.name}
                                        src={imageUrl ? imageUrl :  patient.avatar}
                                        
                                        bg={'#1366DE'}
                                        color={'white'}
                                        
                                        size={'2xl'}
                                    />
                                    <Box
                                        position={'absolute'}
                                        right={0}
                                        bottom={0}
                                    >
                                        <Box>
                                            <Upload
                                                accept='image/*'
                                                showUploadList={false}
                                                maxCount={1}
                                                customRequest={({ onSuccess }) => setTimeout(() => { onSuccess("ok", null); }, 0) }
                                                onChange={handleChange}
                                            >
                                                <FaCamera />
                                            </Upload>
                                        </Box>
                                    </Box>    
                                </Box>
                            </Flex>

                            <Flex
                                w={'100%'}

                                justify={'center'}
                            >
                                <Box
                                    fontWeight={'bold'}
                                    fontSize={'20px'}
                                >
                                    {patient.name}
                                </Box>
                            </Flex>

                            <Box mt={'56px'} mx={'auto'} fontWeight={'bold'}>General Information</Box>

                            <Stack
                                w={'100%'}
                                p={'20px'}
                                mx={'auto'}
                                fontSize={'16px'}

                                spacing={2}

                                border={'1px solid gray'}
                                borderRadius={'lg'}
                            >
                                <Flex
                                    w={'100%'}
                                >
                                    <Box
                                        fontWeight={'bold'}

                                        w={'40%'}
                                    >
                                        Email:
                                    </Box>

                                    <Box
                                        w={'60%'}
                                    >
                                        {patient.email}
                                    </Box>
                                </Flex>

                                <Flex
                                    w={'100%'}
                                >
                                    <Box
                                        fontWeight={'bold'}

                                        w={'40%'}
                                    >
                                        Phone:
                                    </Box>

                                    <Box
                                        w={'60%'}
                                    >
                                        {patient.phone}
                                    </Box>
                                </Flex>

                                <Flex
                                    w={'100%'}
                                >
                                    <Box
                                        fontWeight={'bold'}

                                        w={'40%'}
                                    >
                                        Date of birth:
                                    </Box>

                                    <Box
                                        w={'60%'}
                                    >
                                        {patient.date_of_birth}
                                    </Box>
                                </Flex>

                                <Flex
                                    w={'100%'}
                                >
                                    <Box
                                        fontWeight={'bold'}

                                        w={'40%'}
                                    >
                                        Age:
                                    </Box>

                                    <Box
                                        w={'60%'}
                                    >
                                        {patient.age}
                                    </Box>
                                </Flex>
                            </Stack>
                            {imageUrl ? 
                                <Flex
                                    w={'90%'}
                                    mx={'10%'}
                                    mt={'16px'}

                                    justify={'flex-end'}
                                >
                                    <Button
                                        onClick={resetAll}
                                        
                                        colorScheme={'red'}
                                        color={'white'}

                                        isDisabled={processing}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        onClick={handleSubmit}
                                        
                                        colorScheme={'blue'}
                                        color={'white'}

                                        isDisabled={processing}
                                    
                                        ml={'8px'}
                                    >
                                        Save
                                    </Button>
                                </Flex>
                                :
                                <></>
                            }
                        </Stack>
                    </Box>
                </Box>
                }

            </Box>
        </PatientLayout>
    )
}