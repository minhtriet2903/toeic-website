import { Input, Select } from "antd";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateExamPayload } from "../../../../../query";
import { errorMessages } from "../../../../../utils";
import { examDurationOptions } from "../../CreateEditExamForm/helpers";

type Props = {
  control: Control<CreateExamPayload>;
  errors: FieldErrors<CreateExamPayload>;
};

const CreateExamForm: React.FC<Props> = ({ control, errors }) => {
  return (
    <div className="space-y-2">
      <div>
        <p>Tên bài kiểm tra</p>
        <Controller
          name="title"
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => (
            <Input placeholder="Nhập tên bài kiểm tra" {...field} />
          )}
        />
        <p className="text-red-600">{errors?.title?.message}</p>
      </div>
      <div>
        <p>Bài học liên kết</p>
        <Controller
          name={`lessonId`}
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => <Input {...field} disabled />}
        />
        <p className="text-red-600">{errors?.title?.message}</p>
      </div>
      <div>
        <p>Thời gian làm bài</p>
        <Controller
          name={`duration`}
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => (
            <Select
              {...field}
              className="w-1/3"
              defaultValue={45}
              options={examDurationOptions}
            />
          )}
        />
        <p className="text-red-600">{errors?.title?.message}</p>
      </div>
    </div>
  );
};

export default CreateExamForm;
