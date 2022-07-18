// Components
import { Card, InputWrapper } from "@mantine/core";
import { DropzoneImage } from "@components/ProfileComponents/Dropzone";

export default function PostImage({ image, setImage }) {
  return (
    <>
      <InputWrapper
        required
        label="รูปภาพ"
        description="รูปภาพจะแสดงอยู่ด้านบนสุดของโพสต์"
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
