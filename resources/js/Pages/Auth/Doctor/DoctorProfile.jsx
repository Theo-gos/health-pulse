import {
    Box,
    Flex,
    Button,
    Stack,
    Avatar,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import _ from "lodash";
import { Upload, Button as AntButton } from "antd";
import { LuHardDriveUpload } from "react-icons/lu";
import DoctorLayout from "@/Layouts/DoctorLayout";

const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
};

export default function DoctorProfile() {
    const { auth } = usePage().props
    const { doctor } = auth
    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const { data, setData, patch, post, put, reset, processing } = useForm({
        avatar: {}
    })

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
        post(route('doctor.update.avatar', { doctor: doctor.id }), {
            onSuccess: () => resetAll()
        })
    }

    return (
        <DoctorLayout state={'none'}>
            <Box w={'100%'} h={'100vh'}>
                <Box
                    w={'100%'}
                    h={'100%'}
                    pt={'10px'}

                    bg={'#EDEEF3'}
                >
                    <Box
                        w={'60%'}
                        h={'87%'}
                        p={'20px 36px 60px'}
                        mt={'7vh'}
                        mx={'auto'}

                        borderRadius={'25px'}
                        border={'gray.200'}

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
                            mt={'50px'}

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
                                        name={doctor.name}
                                        src={imageUrl ? imageUrl :  doctor.avatar}
                                        
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
                                    {doctor.name}
                                </Box>
                            </Flex>

                            <Box mt={'70px'} mx={'7%'} fontWeight={'bold'}>General information</Box>

                            <Stack
                                w={'90%'}
                                p={'16px'}
                                mx={'7%'}
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
                                        {doctor.email}
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
                                        {doctor.phone}
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
                                        {doctor.age}
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
            </Box>
        </DoctorLayout>
    )
}