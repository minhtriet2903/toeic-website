import { Button, Input } from "antd";
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { PiTrashLight } from "react-icons/pi";
import ReactQuill from "react-quill";
import { CustomUpload } from "../../../../../components";
import { CreateCoursePayload } from "../../../../../query";
import { baseUrl } from "../../../../../utils";

type Props = {
  control: Control<CreateCoursePayload, any>;
  watch: UseFormWatch<CreateCoursePayload>;
  setValue: UseFormSetValue<CreateCoursePayload>;
};

const CreateCourseForm: React.FC<Props> = ({ control, watch, setValue }) => {
  const handleUploadImage = (fileName: string) => {
    setValue("imageUrl", fileName);
  };

  return (
    <div className="space-y-2">
      <p>Tên khóa học</p>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input placeholder="Nhập tên khóa học" {...field} />
        )}
      />
      <p>Mô tả khóa học</p>
      <Controller
        name={`description`}
        control={control}
        render={({ field }) => (
          <div className="h-32">
            <ReactQuill {...field} theme="snow" className="h-2/3" />
          </div>
        )}
      />
      <p>Tải hình ảnh</p>
      {watch(`imageUrl`) ? (
        <div className="flex items-center space-x-2">
          <div>
            <img
              src={baseUrl + watch("imageUrl")}
              alt=""
              className="w-32 h-32"
            />
            <p>{watch(`imageUrl`)}</p>
          </div>
          <Button type="text" className="text-red-600">
            <PiTrashLight />
          </Button>
        </div>
      ) : (
        <CustomUpload onGetFileName={handleUploadImage} />
      )}
    </div>
  );
};

export default CreateCourseForm;
