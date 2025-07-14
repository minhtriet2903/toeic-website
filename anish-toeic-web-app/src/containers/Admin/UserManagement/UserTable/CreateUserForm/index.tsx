import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import { CreateUserPayload } from "../../../../../query";

type Props = {
  control: Control<CreateUserPayload>;
};

const CreateUserForm: React.FC<Props> = ({ control }) => {
  return (
    <div className="space-y-2">
      <div>
        <p>Họ và tên</p>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nhập họ và tên" {...field} />
          )}
        />
      </div>
      <div>
        <p>Tên tài khoản</p>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="Tài khoản" {...field} />}
        />
      </div>
      <div>
        <p>Mật khẩu</p>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nhập mật khẩu" {...field} />
          )}
        />
      </div>
    </div>
  );
};

export default CreateUserForm;
