import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { CiPen } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Course, Lesson } from "../../../../query";
import { MenuItem } from "../../../Admin/helpers";

type Props = {
  course: Course;
  lessons: Lesson[];
  selectedCourseItemKey: string;
  setSelectedCourseItemKey: (lesson: string) => void;
};

const CourseItems: React.FC<Props> = ({
  course,
  lessons,
  selectedCourseItemKey,
  setSelectedCourseItemKey,
}) => {
  const items: MenuItem[] = [
    {
      key: "introduction",
      icon: <IoDocumentTextOutline />,
      label: "Introduction",
    },
    ...lessons.map((lesson) => ({
      key: lesson._id,
      icon: <CiPen />,
      label: (
        <div className="flex justify-between items-center">
          <p>{lesson.title}</p>
          <FaCheckCircle color="green" />
        </div>
      ),
    })),
  ];

  const handleSelectMenuItem = (menuItem: MenuItemType) => {
    setSelectedCourseItemKey(menuItem.key.toString());
  };

  return (
    course && (
      <Menu
        defaultSelectedKeys={[selectedCourseItemKey ?? "introduction"]}
        mode="inline"
        items={items}
        onSelect={handleSelectMenuItem}
        className="h-full"
      />
    )
  );
};

export default CourseItems;
