import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CustomUpload } from "../../../../components";
import { Vocabulary } from "../../../../query";
import { errorMessages } from "../../../../utils";

type Props = {
  control: Control<Vocabulary>;
  errors: FieldErrors<Vocabulary>;
  onGetFileName: (fileName: string) => void;
};

const CreateEditVocabularyForm: React.FC<Props> = ({
  control,
  errors,
  onGetFileName,
}) => {
  return (
    <div className="space-y-2">
      <div>
        <p>Từ vựng</p>
        <Controller
          name="word"
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => (
            <div>
              <Input
                placeholder="Nhập từ vựng"
                {...field}
                status={errors?.word && "error"}
              />
              <p className="text-red-600">{errors?.word?.message}</p>
            </div>
          )}
        />
      </div>
      <div>
        <p>Phiên âm</p>
        <Controller
          name="pronunciation"
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => (
            <div>
              <Input
                placeholder="Nhập phiên âm"
                {...field}
                status={errors?.pronunciation && "error"}
              />
              <p className="text-red-600">{errors?.pronunciation?.message}</p>
            </div>
          )}
        />
      </div>
      <div>
        <p>Nghĩa</p>
        <Controller
          name="meaning"
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => (
            <div>
              <Input
                placeholder="Nhập nghĩa của từ vựng"
                {...field}
                status={errors?.meaning && "error"}
              />
              <p className="text-red-600">{errors?.meaning?.message}</p>
            </div>
          )}
        />
      </div>
      <div>
        <p>Ví dụ</p>
        <Controller
          name="example"
          control={control}
          rules={{
            required: errorMessages.requiredField,
          }}
          render={({ field }) => (
            <div>
              <TextArea
                placeholder="Ví dụ"
                {...field}
                status={errors?.example && "error"}
              />
              <p className="text-red-600">{errors?.example?.message}</p>
            </div>
          )}
        />
      </div>
      <div>
        <p>Âm thanh</p>
        <CustomUpload onGetFileName={onGetFileName} />
      </div>
    </div>
  );
};

export default CreateEditVocabularyForm;
