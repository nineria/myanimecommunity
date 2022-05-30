# เขียนข้อความ Git Commit ยังไงให้ดี?

```
Capitalized, short (50 chars or less) summary

More detailed explanatory text, if necessary.  Wrap it to about 72
characters or so.  In some contexts, the first line is treated as the
subject of an email and the rest of the text as the body.  The blank
line separating the summary from the body is critical (unless you omit
the body entirely); tools like rebase can get confused if you run the
two together.

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Further paragraphs come after blank lines.

- Bullet points are okay, too

- Typically a hyphen or asterisk is used for the bullet, followed by a
  single space, with blank lines in between, but conventions vary here

- Use a hanging indent

If you use an issue tracker, add a reference(s) to them at the bottom,
like so:

Resolves: #123
```

1. ระบุประเภทของ commit:

   - feat: ฟีเจอร์ใหม่ที่คุณกำลังเพิ่มเข้าไปยังแอปพลิเคชัน
   - fix: แก้ไข Bug ต่างๆ
   - style: ฟีเจอร์ใหม่และการอัปเดตที่เพื่มเข้าไปที่เกี่ยวข้องกับสไตล์ (css, scss)
   - refactor: การปรับโครงสร้างส่วนของ codebase (Code หลัก ที่ไม่ใช่ Components เช่น Package.json, \_app.js, )
   - test: ทุกอย่างที่เกี่ยวข้องกับการทดสอบ
   - docs: ทุกอย่างที่เกี่ยวข้องกับเอกสารวิธีการใช้งาน เช่น README.md
   - chore: การ Clean Code แก้ไขให้มีประสิทธิภาพมากขึ้น [สามารถใช้อิโมจิเพื่อแสดงประเภทการ Commit ได้]

2. เมื่อต้อง Commit คำที่จำเป็น ไม่ควรผันคำ หรือใช้ Tense (เช่นถ้าจะเขียนคำว่า Add ไม่ควรเติม Adding หรือ Added ให้เขียนว่า Add ไปเลย)
3. แยกหัวเรื่องออกจากเนื้อหาด้วยการขี้นบรรทัดใหม่
4. ไม่ควรมีข้อความที่มีข้อผิดพลาด เช่น ช่องว่าง พิมพ์ผิด
5. ลบเครื่องหมายวรรคตอนที่ไม่จำเป็นออก
6. อย่าจบหัวเรื่องด้วยจุด
7. ใช้ตัวพิมพ์ใหญ่ใน หัวเรื่อง และแต่ละย่อหน้า
8. หัวเรื่องต้องมีความหมายชัดเจนในตัว ไม่ควรไปอธิบายเพิ่มในเนื้อหา (สั้นๆ เข้าใจง่าย)
9. ใช้เนื้อหาเพื่ออธิบายว่าเปลี่ยนแปลงอะไรไปบ้าง และทำไมถึงทำการเปลี่ยนแปลง
10. อย่าเดาว่าได้ตรวจทานเรียบร้อยแล้วว่าปัญหาเดิมคืออะไร ถูกเพิ่มเข้าไปหรือยัง ไปตรวจสอบให้แน่ใจก่อนว่าได้ถูกเพิ่มเข้าไปจริงๆแล้ว
11. อย่าคิดว่า Code ตัวเองอ่านง่าย
12. ปฏิบัติตามข้อตกลงที่กำหนดโดยทีมของคุณ

## ตัวอย่าง

```
Feat: New comment faces

Show recent commenters in the postcard in the feed.
```

```
Feat: Edit Home page

Add more posts and member status
```

```
Fix: User profile Image

Image in User profile can now be displayed.
```

```
Test: Navbar component

Navbar responsive in Mobile screen
```
