import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export default function Report(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>เหตุผลที่รายงาน</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column">
            <Checkbox colorScheme="red">ชื่อผู้ใช้ไม่เหมาะสม</Checkbox>
            <Checkbox colorScheme="red">
              ใช้วาจาไม่เหมาะสม / ทัศนคติเชิงลบ
            </Checkbox>
            <Checkbox colorScheme="red">โฆษณาขายของ / การสแปมข้อความ</Checkbox>
            <Checkbox colorScheme="red">คำพูดแสดงถึงความเกลียดชัง</Checkbox>
            <Checkbox colorScheme="red">เนื้อหามีการอัพเดท</Checkbox>
            <Checkbox colorScheme="red" mt="4">
              อื่นๆ
            </Checkbox>
            <Textarea placeholder="โปรดระบุข้อมูลเพิ่มเติม" my="8px" />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={props.onClose}>
            ยกเลิก
          </Button>
          <Button variant="ghost">ส่งเรื่อง</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
