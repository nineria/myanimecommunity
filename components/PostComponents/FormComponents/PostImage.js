// Components
import { Card, InputWrapper } from "@mantine/core";
import { DropzoneImage } from "@components/Dropzone";

export default function PostImage({ image, setImage }) {
  return (
    <>
      <InputWrapper
        required
        label="รูปภาพประจำโพสต์"
        description="รูปภาพประจำโพสต์ที่แสดงให้ผู้ใช้คนอื่นเห็นก่อนกดเข้ามาที่โพสต์"
      >
        <Card p="md" radius="sm" className="bg-black/30">
          <Card.Section
            sx={{
              backgroundImage: `url(${image})`,
              minHeight: 300,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <DropzoneImage setImage={setImage} />
          </Card.Section>
        </Card>
      </InputWrapper>
    </>
  );
}
