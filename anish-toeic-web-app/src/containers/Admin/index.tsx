import { Menu } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { useNavigate, useParams } from "react-router-dom";
import CourseManagement from "./CourseManagement";
import ExamManagement from "./ExamManagement";
import { items } from "./helpers";
import LessonManagement from "./LessonManagement";
import ResultManagement from "./ResultManagement";
import SubscriptionManagement from "./SubscriptionManagement";
import UserManagement from "./UserManagement";
import VocabularyManagement from "./VocabularyManagement";

const AdminPage = () => {
  let { tab } = useParams();
  const navigate = useNavigate();

  const handleSelectMenuItem = (menuItem: MenuItemType) => {
    navigate("/admin/" + menuItem.key.toString());
  };

  const handleRender = () => {
    switch (tab) {
      case "vocab":
        return <VocabularyManagement />;
      case "course":
        return <CourseManagement />;
      case "lesson":
        return <LessonManagement />;
      case "exam":
        return <ExamManagement />;
      case "result":
        return <ResultManagement />;
      case "user":
        return <UserManagement />;
      // case "resource":
      //   return <ResourceManagement />;
      case "subscription":
        return <SubscriptionManagement />;
      default:
        return <div>Nothing</div>;
    }
  };

  return (
    <div className="pt-32 flex w-full">
      <div className="w-64 fixed top-32 left-0 bottom-0 overflow-y-auto">
        <Menu
          selectedKeys={[tab ?? "vocab"]}
          mode="inline"
          items={items}
          onClick={handleSelectMenuItem}
          className="h-full p-2 space-y-2"
        />
      </div>
      <div className="ml-64 flex-1">{handleRender()}</div>
    </div>
  );
};

export default AdminPage;
