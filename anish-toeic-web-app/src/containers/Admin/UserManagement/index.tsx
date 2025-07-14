import { useParams } from "react-router-dom";
import UserDetail from "./UserDetail";
import UserTable from "./UserTable";

const UserManagement = () => {
  let { id } = useParams();

  return id ? <UserDetail /> : <UserTable />;
};

export default UserManagement;
