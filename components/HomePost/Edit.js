import { RepeatIcon } from "@chakra-ui/icons";
import {
  EditablePreview,
  IconButton,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { Animate } from "react-simple-animate";
import {
  SquareX,
  CircleCheck,
  Edit,
  ChevronUp,
  Messages,
  AlertCircle,
} from "tabler-icons-react";
import HomePost from ".";

export default function EditPost(props) {
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
            icon={<SquareX boxsize={3} />}
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
              backgroundColor="#333"
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

  return (
    <div className="fixed z-10 h-full top-0 lg:pt-20 md:pt-10 pt-5 w-full p-2 text-white bg-[#181a1d] bg-opacity-75 backdrop-blur-sm">
      {props.open === true ? (
        <div className="flex justify-center items-center">
          <div className="max-w-[800px] w-full ">
            <Animate
              play
              start={{
                transform: "translateY(2%)",
                opacity: "0",
              }}
              end={{ transform: "translateY(0)", opacity: "1" }}
            >
              <div className="bg-[#444] rounded-md">
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
                <div className="pb-4">
                  <HomePost dummyData={data} isDisabled={true} />
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
            </Animate>
          </div>
        </div>
      ) : null}
    </div>
  );
}
