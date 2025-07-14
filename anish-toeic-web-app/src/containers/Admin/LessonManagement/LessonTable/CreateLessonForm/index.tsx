import { Input } from "antd";
import { Control, Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import { CreateLessonPayload } from "../../../../../query";

type Props = {
  control: Control<CreateLessonPayload, any>;
};

const CreateLessonForm: React.FC<Props> = ({ control }) => {
  return (
    <div className="space-y-2">
      <p>Tên bài học</p>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <Input placeholder="Nhập tên bài học" {...field} />
        )}
      />
      <p>Khóa học</p>
      <Controller
        name="courseId"
        control={control}
        render={({ field }) => <Input {...field} disabled />}
      />
      <p>Mô tả bài học</p>
      <Controller
        name={`description`}
        control={control}
        render={({ field }) => (
          <div className="h-32">
            <ReactQuill {...field} theme="snow" className="h-2/3" />
          </div>
        )}
      />
    </div>
  );
};

export default CreateLessonForm;
