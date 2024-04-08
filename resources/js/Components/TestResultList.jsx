import {
    Box,
    Flex,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import _ from "lodash"
import DisplayPdfThumbnail from "./DisplayPdfThumbnail"
import { Viewer } from "@react-pdf-viewer/core"

export default function testResultList({ data, width = '50%' }) {
    const [pdfUrl, setPdfUrl] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handlePdfClick = (url) => {
        setPdfUrl(url)
        onOpen()
    }

    return (
        data.tests.length > 0 ?
            data.tests.map(test => (
                <Flex
                    key={test.detail.id}
                    w={width}

                    borderRadius={'xl'}
                    bg={'#F2F7FF'}

                    align={'center'}

                    fontSize={'11px'}

                    _hover={{
                        backgroundColor: '#BEE3F8',
                        cursor: 'pointer',
                    }}

                    onClick={() => handlePdfClick(test.detail.result_url)}
                >
                    <Box
                        w={'fit-content'}
                    >
                        <DisplayPdfThumbnail fileUrl={test.detail.result_url} width={40} pageIndex={0} />
                    </Box>
                    <Flex
                        w={'90%'}
                        px={'18px'}

                        align={'center'}
                        justify={'space-between'}
                    >
                        <Box fontWeight={'bold'} fontSize={'13px'}>{test.detail.name}</Box>
                        <Box fontSize={'12px'} color={'gray'}>{test.detail.date}</Box>
                    </Flex>
                    <Drawer onClose={onClose} isOpen={isOpen} size={'xl'}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>{`Pdf Viewer - ${test.detail.name}`}</DrawerHeader>
                            <DrawerBody>
                                <Box
                                    w={'100%'}
                                >
                                    <Viewer fileUrl={pdfUrl}/>
                                </Box>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            ))
            :
            <Box>No available test results</Box>
        
    )
}