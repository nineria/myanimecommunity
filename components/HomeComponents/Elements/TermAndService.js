import React from "react";

export default function TermAndService() {
  return (
    <div className="flex flex-row items-center gap-2 text-xs">
      <span className="w-4/5">
        ผู้ดูแลระบบขอสงวนสิทธิ์ในการลบโพสต์ของผู้ที่ไม่ปฏิบัติตาม{" "}
        <span className="text-content underline cursor-pointer">
          กฎ กติกา และมารยาท
        </span>{" "}
        ของเว็บไซต์ MyAnimeCommu
        <p>เพื่อรักษาบรรยากาศการพูดคุยของชุมชนคนรักอนิเมะ</p>
      </span>
    </div>
  );
}
