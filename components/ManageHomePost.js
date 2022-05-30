import { RepeatIcon } from "@chakra-ui/icons";
import {
  EditablePreview,
  Box,
  useColorModeValue,
  IconButton,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Editable,
  Tooltip,
  EditableInput,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";

import React, { useState, useEffect, useMemo } from "react";
import {
  SquareX,
  CircleCheck,
  Edit,
  ChevronUp,
  Messages,
  Refresh,
  Markdown,
  AlertCircle,
} from "tabler-icons-react";

export default function ManageHomePost(props) {
  const [toggle, setTogle] = useState(true);

  const [reload, setReload] = useState(false);

  const data = props.postData;

  const HandleChange = (e, type) => {
    switch (type) {
      case "title":
        data.title = e;
        break;
      case "titleLink":
        data.titleLink = e;
        break;
      case "header":
        data.header = e;
        break;
      case "headerLink":
        data.headerLink = e;
        break;
      case "body":
        data.body = e;
        break;
    }

    console.log("Testing", data);
    props.handlePostDataChange(data);
  };

  const EditPost = () => {
    function EditableControls() {
      const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
        useEditableControls();

      return isEditing ? (
        <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
          <IconButton
            color="whtie"
            backgroundColor="green.400"
            icon={<CircleCheck />}
            {...getSubmitButtonProps()}
          />
          <IconButton
            color="whtie"
            backgroundColor="red.400"
            icon={<SquareX boxSize={3} />}
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      ) : null;
    }

    const Edit = (props) => {
      return (
        <Editable
          defaultValue={props.text}
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          onSubmit={(e) => HandleChange(e, props.type)}
        >
          <Tooltip label="กดเพื่อแก้ไข" bg="gray">
            <EditablePreview
              py={2}
              px={4}
              _hover={{
                background: "#fff",
                color: "#111",
              }}
              backgroundColor="#3a3939"
              w="full"
            />
          </Tooltip>
          <Input py={2} px={4} as={EditableInput} />
          <EditableControls />
        </Editable>
      );
    };

    return (
      <div>
        <div className="flex flex-row justify-between bg-[#ec5555] py-2 px-3 rounded-t-md ">
          <h1 className="">แก้ไขโพสต์ - หน้าหลัก</h1>
          <SquareX
            className="cursor-pointer hover:translate-y-[1px] hover:opacity-75"
            onClick={props.handleOpenMenu}
          />
        </div>
        <div className="py-2 px-3 flex flex-col gap-3">
          <h1>หัวข้อโพสต์</h1>
          <div className="flex flex-row gap-2">
            <div className="rounded-md">
              <Edit text={data.titleLink} type="titleLink" />
            </div>
            <div className="rounded-md w-full">
              <Edit text={data.title} type="title" />
            </div>
          </div>
          <h1>หัวข้อย่อย</h1>
          <div className="flex flex-row gap-2">
            <div className="rounded-md">
              <Edit text={data.headerLink} type="headerLink" />
            </div>
            <div className="rounded-md w-full">
              <Edit text={data.header} type="header" />
            </div>
          </div>
          <h1>เนื้อหา</h1>
          <Edit text={data.body} type="body" />
        </div>
      </div>
    );
  };

  const ExamplePost = () => {
    return (
      <div className="rounded-sm bg-[#242629] w-full ">
        <h2
          className={`flex flex-row justify-between items-center bg-[#ec5555] py-1 px-3 font-bold text-md text-white ${
            toggle === true ? "rounded-t-sm" : "rounded-sm"
          }`}
        >
          <a>
            <span className="cursor-pointer hover:underline">{data.title}</span>
          </a>
          <div className="flex flex-row gap-2 ">
            <Edit className="hover:translate-y-[1px] hover:opacity-75 cursor-pointer" />
            <ChevronUp
              size={22}
              onClick={() => setTogle(!toggle)}
              className={`${
                toggle === false ? "rotate-180" : ""
              } cursor-pointer transition-all hover:translate-y-[1px] hover:opacity-75`}
            />
          </div>
        </h2>
        <div className="flex flex-col bg-[#aaa] gap-[1px]">
          {toggle ? (
            <div
              className={`flex lg:flex-row flex-col lg:justify-between lg:items-center px-3 py-2 text-[#ec5555] bg-[#242629]`}
            >
              <div className="flex gap-2">
                <Messages size={45} />
                <div className={`"flex items-center"}`}>
                  <div className="flex flex-row justify-start gap-2 items-center ">
                    <a className="truncate text-white cursor-pointer hover:underline w-fit">
                      {data.header}
                    </a>
                    <div className="px-1 bg-[#ec5555] w-fit h-fit rounded-sm text-white text-xs">
                      ใหม่
                    </div>
                  </div>
                  <p className="truncate w-full text-[#aaa] text-xs">
                    {data.body}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 text-white">
                <div className="flex lg:flex-col lg:items-center items-end gap-1">
                  <div>25</div>
                  <div className="text-sm text-[#aaa]">โพสต์</div>
                </div>
                <div className="lg:border-r-[1px] lg:border-[#aaa]" />
                <div className="flex lg:flex-col lg:items-center items-end gap-1">
                  <div>3.6K</div>
                  <div className="text-sm text-[#aaa]">ข้อความ</div>
                </div>
                <div className="flex lg:flex-col lg:items-center items-end gap-1">
                  <div>แก้ไขล่าสุด</div>
                  <div className="text-sm text-[#aaa]">28/5/2565 - Admin</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div>
      {props.open === true ? (
        <div className="fixed top-0 z-10 text-white">
          <div className="bg-[#242629] opacity-90 w-screen h-screen"></div>
          <div className="flex justify-center items-center w-full h-full">
            <div className="fixed  top-20  max-w-[800px] w-full px-2">
              <div className="bg-[#474545] rounded-md">
                <EditPost />
                <div className="h-[1px] bg-neutral-500 mt-4"></div>
                <div className="flex flex-row items-center gap-3 mb-2">
                  <h1 className="py-2 pl-3">ตัวอย่างโพสต์</h1>
                  <Tooltip hasArrow label="กดเพื่อรีโหลดตัวอย่าง" bg="gray">
                    <div
                      onClick={() => setReload(!reload)}
                      className="bg-neutral-500 p-1 rounded-sm flex hover:translate-y-[1px] hover:opacity-75 cursor-pointer group"
                    >
                      <RepeatIcon className="group-hover:rotate-180 transition-all" />
                    </div>
                  </Tooltip>
                </div>
                <div className="bg-[#181a1d] py-4 px-8 ">
                  <ExamplePost postData={data} />
                </div>
                <div className="flex flex-row gap-2 pl-3 pt-2 text-xs">
                  <AlertCircle size={24} />
                  <span className="w-4/5">
                    ผู้ดูแลระบบขอสงวนสิทธิ์ในการลบโพสต์ของผู้ที่ไม่ปฏิบัติตาม{" "}
                    <span className="text-[#ec5555] underline cursor-pointer">
                      กฎ กติกา และมารยาท
                    </span>{" "}
                    ของเว็บไซต์ MyAnimeCommu
                    <p>เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ</p>
                  </span>
                </div>
                <div className="flex flex-row justify-between p-2 items-center">
                  <div className="flex flex-row gap-2">
                    <div
                      onClick={props.handleOpenMenu}
                      className="py-1 px-3 bg-neutral-500 rounded-sm cursor-pointer hover:opacity-75 hover:translate-y-[1px]"
                    >
                      ยกเลิก
                    </div>
                    <div
                      onClick={props.handleOpenMenu}
                      className="py-1 px-3 bg-[#ec5555] rounded-sm cursor-pointer hover:opacity-75 hover:translate-y-[1px]"
                    >
                      ลบโพสต์
                    </div>
                  </div>
                  <div
                    onClick={props.handleOpenMenu}
                    className="py-1 px-3 bg-green-500 rounded-sm cursor-pointer hover:opacity-75 hover:translate-y-[1px]"
                  >
                    ยืนยัน
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
