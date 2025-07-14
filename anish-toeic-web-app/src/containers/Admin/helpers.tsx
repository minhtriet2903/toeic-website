import { MenuProps } from "antd";
import { BiPencil } from "react-icons/bi";
import { LuListChecks } from "react-icons/lu";
import { MdOutlineClass } from "react-icons/md";
import { PiExam, PiUser } from "react-icons/pi";
import { TbFileText, TbLetterA } from "react-icons/tb";

export type MenuItem = Required<MenuProps>["items"][number];

export const items: MenuItem[] = [
  { key: "vocab", icon: <TbLetterA />, label: "Từ vựng" },
  { key: "course", icon: <MdOutlineClass />, label: "Khóa học" },
  { key: "lesson", icon: <TbFileText />, label: "Lesson" },
  { key: "exam", icon: <PiExam />, label: "Bài kiểm tra" },
  { key: "result", icon: <LuListChecks />, label: "Kết quả" },
  { key: "user", icon: <PiUser />, label: "Người dùng" },
  // { key: "resource", icon: <SlNotebook />, label: "Tài liệu" },
  { key: "subscription", icon: <BiPencil />, label: "Subscription" },
];
