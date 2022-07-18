import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { Upload, Photo, X } from "tabler-icons-react";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useModals } from "@mantine/modals";

const imageUpload = (image) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", image[0]);

    fetch(
      "https://api.imgbb.com/1/upload?key=c87f45db6d1d5ccc1b31d0f69d380463",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => resolve(result.data.url))
      // .then((result) => setImageURL(result.data.url))
      .catch(() => reject(new Error("Upload failed")));
  });

function ImageUploadIcon({ status, size }) {
  if (status.accepted) {
    return <Upload size={size} />;
  }

  if (status.rejected) {
    return <X size={size} />;
  }

  return <Photo size={size} />;
}

const dropzoneChildren = (status) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <ImageUploadIcon status={status} size={50} />

    <div>
      <Text size="xl" inline>
        ลากรูปภาพมาที่นี่ หรือ คลิกเพื่อเลือกไฟล์
      </Text>
      <Text size="sm" inline mt={7}>
        ไฟล์รูปภาพที่แนะนำ PNG, JPEG, SVG และ GIF แต่ละไฟล์ไม่ควรเกิน 5mb
      </Text>
    </div>
  </Group>
);

export function DropzoneImage({ setImage }) {
  const theme = useMantineTheme();

  const modals = useModals();

  const openConfirmModal = () => {
    const id = modals.openModal({
      title: "ไม่ลองรับไฟล์ประเภทนี้",
      zIndex: "999",
      centered: true,
      children: (
        <Stack>
          <Text size="sm">ประเภทไฟล์ที่แนะนำคือ PNG, JPEG และ SVG</Text>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-500 hover:opacity-75"
            size="xs"
            onClick={() => modals.closeModal(id)}
          >
            ลองใหม่อีกครั้ง
          </Button>
        </Stack>
      ),
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "sm",
    });
  };

  const handleImageUpload = (file) => {
    const imgRUL = imageUpload(file);

    const printAddress = async () => {
      const a = await imgRUL;
      setImage(a);
    };

    printAddress();
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={(file) => handleImageUpload(file)}
      //   onDrop={(files) => console.log("accepted files", files)}
      onReject={openConfirmModal}
      maxSize={3 * 1024 ** 2}
      accept={[
        MIME_TYPES.png,
        MIME_TYPES.jpeg,
        MIME_TYPES.svg,
        MIME_TYPES.webp,
      ]}
      className="absolute top-2 right-2 bottom-[85px] left-2 text-[#fff] bg-transparent  bg-opacity-30 hover:bg-black/30"
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}

export function DropzoneAvatar({ setImage }) {
  const theme = useMantineTheme();

  const modals = useModals();

  const openConfirmModal = () => {
    const id = modals.openModal({
      title: "ไม่ลองรับไฟล์ประเภทนี้",
      zIndex: "999",
      centered: true,
      children: (
        <Stack>
          <Text size="sm">ประเภทไฟล์ที่แนะนำคือ PNG, JPEG และ SVG</Text>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-500 hover:opacity-75"
            size="xs"
            onClick={() => modals.closeModal(id)}
          >
            ลองใหม่อีกครั้ง
          </Button>
        </Stack>
      ),
      classNames: {
        modal: "bg-foreground",
        overlay: "bg-background",
      },
      size: "sm",
    });
  };

  const handleImageUpload = (file) => {
    const imgRUL = imageUpload(file);

    const printAddress = async () => {
      const a = await imgRUL;
      setImage(a);
    };

    printAddress();
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={(file) => handleImageUpload(file)}
      //   onDrop={(files) => console.log("accepted files", files)}
      onReject={openConfirmModal}
      maxSize={3 * 1024 ** 2}
      accept={[
        MIME_TYPES.png,
        MIME_TYPES.jpeg,
        MIME_TYPES.svg,
        MIME_TYPES.webp,
      ]}
      className="absolute rounded-full top-2 right-2 bottom-2 left-2 text-[#fff] bg-transparent bg-opacity-30 hover:bg-black/30"
    >
      {(status) => (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <ImageUploadIcon status={status} size={80} />
          <Text size="sm" className="text-center">
            เปลี่ยนรูปโปรไฟล์
          </Text>
        </div>
      )}
    </Dropzone>
  );
}
