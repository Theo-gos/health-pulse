import {
    Box,
    Flex,
    Image,
    Container,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import Logo from '../Pages/Shared/Logo'
import { Link } from '@inertiajs/react';


export default function DoctorLoginLayout({ children }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    window.addEventListener('resize', () => { 
        setWindowSize(window.innerWidth)
    })

    return (
        <Box
            backgroundImage="url('https://blogs.microsoft.com/wp-content/uploads/prod/2023/10/GettyImages-1208245030-scaled.jpg')"
            backgroundPosition="50% 90%"
            backgroundRepeat="no-repeat"
            backgroundSize= "cover"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            p={'1.5rem'}
            minH={'100vh'}
        >
            {windowSize < 1500 ? 
                <Flex
                    alignItems={'center'}
                    justifyContent={'center'}
                    borderRadius={'20'}
                    boxShadow={'1px 1px 70px 1px #000000'}
                    bg={'gray.100'}
                    width={'40%'}
                    height={'50vh'}
                    position={'relative'}
                >
                    <Flex
                        width={'100%'}
                        height={'100%'}
                        direction={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        p={'24px'}
                    >
                        <Link href='/'>
                            <Flex
                                alignItems={'center'}
                                position={'absolute'}
                                top={'6%'}
                                left={'2%'}
                            >
                                    <Logo />
                                    <Text ml={'1'} fontWeight={'500'} color={'blue.500'}>Health pulse</Text>
                            </Flex>
                        </Link>
                            
                        {children}
                        

                    </Flex>
                </Flex>
                
                :
                    
                <Flex
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    borderRadius={'20'}
                    boxShadow={'1px 1px 70px 1px #000000'}
                    bg={'gray.100'}
                    width={'60%'}
                    minH={'60vh'}
                    height={'100%'}
                    position={'relative'}
                >
                
                    <Flex
                        width={'40%'}
                        height={'100%'}
                        direction={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        p={'24px'}
                    >
                        <Link href='/'>
                            <Flex
                                alignItems={'center'}
                                position={'absolute'}
                                top={'6%'}
                                left={'2%'}
                            >
                                    <Logo />
                                    <Text ml={'1'} fontWeight={'500'} color={'blue.500'}>Health pulse</Text>
                            </Flex>
                        </Link>
                            
                        {children}

                    </Flex>

                    <Box
                        position={'absolute'}
                        top={'0'}
                        right={'0'}
                        display={'flex'}
                        width={'60%'}
                        height={'100%'}
                        bgGradient="linear(to left top, rgb(85, 88, 218) 0%, rgb(95, 209, 249) 100.2%)"
                        borderRightRadius={'20'}
                        justifyContent={'center'}
                    >
                        <Image
                            src='https://www.thousandeyes.com/dA/3494d05b-2edc-4abc-8bd8-59b385e5347b'
                            boxSize={'100%'}
                            objectFit={'contain'}
                        />
                    </Box>
                </Flex>
            }
        </Box>
    )
}