import { Button, Input } from "antd";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { PiTrashLight } from "react-icons/pi";
import ReactQuill from "react-quill";
import { CustomUpload } from "../../../../../components";
import { UpdateCoursePayload } from "../../../../../query";
import { baseUrl } from "../../../../../utils";

interface QuestionDetailProps {
  control: Control<UpdateCoursePayload, any>;
  errors: FieldErrors<UpdateCoursePayload>;
  watch: UseFormWatch<UpdateCoursePayload>;
  setValue: UseFormSetValue<UpdateCoursePayload>;
}

const GeneralInformationForm: React.FC<QuestionDetailProps> = ({
  control,
  errors,
  watch,
  setValue,
}) => {
  const handleUploadImage = (fileName: string) => {
    setValue("imageUrl", fileName);
  };

  return (
    <div className="border border-dashed p-4 rounded-xl flex flex-wrap">
      <div className="w-1/3">
        <p>Tên khóa học</p>
        <Controller
          name={`title`}
          control={control}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                placeholder="Enter course title"
                status={errors?.title && "error"}
              />
              <p className="text-red-600">{errors?.title?.message}</p>
            </div>
          )}
        />
      </div>
      <div className="w-1/6 ml-2">
        <p>Giá</p>
        <Controller
          name={`price`}
          control={control}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                placeholder="Enter course price"
                status={errors?.price && "error"}
              />
              <p className="text-red-600">{errors?.price?.message}</p>
            </div>
          )}
        />
      </div>
      <div className="w-1/6 ml-2">
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
      <div className="w-2/3 mt-2">
        <p>Mô tả khóa học</p>
        <Controller
          name={`description`}
          control={control}
          render={({ field }) => (
            <div className="h-32">
              <ReactQuill {...field} theme="snow" className="h-2/3" />
              <p className="text-red-600">{errors?.description?.message}</p>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default GeneralInformationForm;
