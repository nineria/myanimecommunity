// Components
import { InputWrapper } from "@mantine/core";
import RichTextEditor from "utils/RichText";

const handleImageUpload = (image) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", image);

    fetch(
      "https://api.imgbb.com/1/upload?key=c87f45db6d1d5ccc1b31d0f69d380463",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => resolve(result.data.url))
      .catch(() => reject(new Error("Upload failed")));
  });

export default function PostContent(props) {
  return (
    <InputWrapper
      required
      label="เนื้อหา"
      description="รายระเอียดเนื้อหาของโพสต์ เช่น รูปภาพ หรือ วิดีโอ รวมไปถึง Link ต่างๆ"
    >
      <RichTextEditor
        sticky={true}
        stickyOffset={-55}
        {...props}
        placeholder="คุณกำลังคิดอะไรอยู่"
        onImageUpload={handleImageUpload}
        classNames={{
          root: "bg-black/5 text-title border-[#fff] border-opacity-20",
          toolbar: "bg-foreground text-title",
          toolbarControl:
            "bg-foreground border-title border-opacity-20 hover:bg-background",
        }}
      />
    </InputWrapper>
  );
}
