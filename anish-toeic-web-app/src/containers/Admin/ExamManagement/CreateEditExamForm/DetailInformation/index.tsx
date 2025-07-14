import { Button, Input, notification, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { PiTrashLight } from "react-icons/pi";
import ReactQuill from "react-quill";
import { CustomUpload } from "../../../../../components";
import { Question, updateQuestion } from "../../../../../query";
import { baseUrl, handleFetchAudio, isEmptyObj } from "../../../../../utils";
import { questionTypeOptions } from "../helpers";

interface QuestionDetailProps {
  question: Question;
  parentQuestions?: Question[];
  setIsEditingDetail: (value: boolean) => void;
  setIsRefetchExamData: (value: boolean) => void;
}

const { Group: RadioGroup } = Radio;

const EditQuestionDetailForm: React.FC<QuestionDetailProps> = ({
  question,
  parentQuestions,
  setIsEditingDetail,
  setIsRefetchExamData,
}) => {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<Question>({
    mode: "onBlur",
  });

  const {
    fields: answersFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name: `answers`,
  });

  useEffect(() => {
    reset(question);
  }, [question, reset]);

  const handleUploadImage = (fileName: string) => {
    setValue("imageUrl", fileName);
  };

  const handleDeleteImage = () => {
    setValue("imageUrl", "");
  };

  const handleUploadAudio = (fileName: string) => {
    setValue("audioUrl", fileName);
  };

  const handleDeleteAudio = () => {
    setValue("audioUrl", "");
  };

  const handleUpdateQuestion: SubmitHandler<Question> = (data) => {
    updateQuestion(data).then((res) => {
      if (res.data)
        notification.info({
          message: `Save Question ${data.title} successfully`,
        });
      setIsRefetchExamData(true);
      setIsEditingDetail(false);
    });
  };

  useEffect(() => {
    setIsEditingDetail(!isEmptyObj(touchedFields));
  }, [isEmptyObj(touchedFields)]);

  const handleCorrectAnswerChange = (value: boolean, index: number) => {
    if (value) {
      answersFields.forEach((_, i) => {
        if (i !== index) {
          setValue(`answers.${i}.isCorrect`, false);
        }
      });
    }
  };

  return (
    <div className="border border-dashed p-4 rounded-xl space-y-2">
      <div className="flex justify-between">
        <p className="font-bold">Câu {question.index + 1}</p>
        <Button onClick={handleSubmit(handleUpdateQuestion)} type="primary">
          Lưu
        </Button>
      </div>
      <div className="flex space-x-4">
        <div>
          <p>Câu hỏi cha</p>
          {parentQuestions && (
            <Controller
              name={`parentId`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-52"
                  options={parentQuestions.map((item) => ({
                    label: `Câu ${item.index + 1}`,
                    value: item.index,
                  }))}
                  defaultValue={question.parentId}
                />
              )}
            />
          )}
        </div>
        <div>
          <p>Loại câu hỏi</p>
          <Controller
            name={`type`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className="w-52"
                options={questionTypeOptions}
                defaultValue={questionTypeOptions[0].value}
                value={question.type}
              />
            )}
          />
        </div>
      </div>
      <p>Câu hỏi</p>
      <Controller
        name={`title`}
        control={control}
        render={({ field }) => (
          <div>
            <Input
              {...field}
              placeholder="Enter question title"
              status={errors?.title && "error"}
            />
            <p className="text-red-600">{errors?.title?.message}</p>
          </div>
        )}
      />
      <p>Chú thích</p>
      <Controller
        name={`note`}
        control={control}
        render={({ field }) => <TextArea {...field} />}
      />
      <p>Nội dung câu hỏi</p>
      <Controller
        name={`content`}
        control={control}
        render={({ field }) => (
          <div className="h-32">
            <ReactQuill {...field} theme="snow" className="h-2/3" />
          </div>
        )}
      />
      <p>Giải thích đáp án</p>
      <Controller
        name={`explanation`}
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
              src={`${baseUrl}${watch("imageUrl")}`}
              alt=""
              className="w-32 h-32"
            />
            <p>{watch(`imageUrl`)}</p>
          </div>
          <Button
            type="text"
            className="text-red-600"
            onClick={handleDeleteImage}
          >
            <PiTrashLight />
          </Button>
        </div>
      ) : (
        <CustomUpload onGetFileName={handleUploadImage} />
      )}
      <p>Tải âm thanh</p>
      {watch(`audioUrl`) ? (
        <div className="flex items-center space-x-2">
          <p>{watch(`audioUrl`)}</p>
          <Button onClick={() => handleFetchAudio(watch(`audioUrl`) ?? "")}>
            <HiOutlineSpeakerWave />
          </Button>
          <Button
            type="text"
            className="text-red-600"
            onClick={handleDeleteAudio}
          >
            <PiTrashLight />
          </Button>
        </div>
      ) : (
        <CustomUpload onGetFileName={handleUploadAudio} />
      )}
      <div className="mt-5 space-y-2">
        <p className="font-bold">Đáp án</p>
        <p className="font-light">Chọn vào đáp án đúng để tính điểm</p>
        {answersFields.map((_, index) => (
          <div
            key={"answer-" + index}
            className="flex items-center space-x-2 w-5/6"
          >
            <Controller
              name={`answers.${index}.text`}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter answer text" />
              )}
            />
            <Controller
              name={`answers.${index}.isCorrect`}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleCorrectAnswerChange(e.target.value === true, index);
                  }}
                >
                  <Radio value={true} className="text-nowrap">
                    Is Correct
                  </Radio>
                </RadioGroup>
              )}
            />
          </div>
        ))}
        <Button onClick={() => appendAnswer({ text: "" })} type="dashed">
          Thêm đáp án
        </Button>
        {answersFields.length > 1 && (
          <Button
            onClick={() => removeAnswer(answersFields.length - 1)}
            type="text"
            className="text-red-600"
          >
            Xóa đáp án cuối
          </Button>
        )}
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={handleSubmit(handleUpdateQuestion)} type="primary">
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default EditQuestionDetailForm;
