import { Button, Input, notification } from "antd";
import { Controller, useForm } from "react-hook-form";
import { createSubscription, CreateSubscriptionPayload } from "../../../query";
import { errorMessages } from "../../../utils";

const SubscriptionForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSubscriptionPayload>({
    mode: "onBlur",
  });

  const handleAddSubscription = (data: CreateSubscriptionPayload) => {
    createSubscription(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Add Subscription successfully",
        });
    });
  };

  return (
    <div className="flex flex-col items-center py-8">
      <h2 className="text-3xl font-bold leading-tight">Đăng ký nhận tư vấn</h2>
      <h2 className="text-xl font-semibold my-6">
        Vui lòng để lại thông tin phía dưới để được tư vấn miễn phí.
      </h2>
      <div className="bg-sky-50 flex flex-wrap justify-center p-4 rounded-xl w-full md:w-2/3">
        <div className="w-full md:w-1/2 p-3">
          <p>Họ và tên</p>
          <Controller
            name="name"
            control={control}
            rules={{
              required: errorMessages.requiredField,
            }}
            render={({ field }) => (
              <div>
                <Input
                  placeholder="Nhập họ và tên"
                  {...field}
                  status={errors?.name && "error"}
                  size="large"
                />
                <p className="text-red-600">{errors?.name?.message}</p>
              </div>
            )}
          />
        </div>
        <div className="w-full md:w-1/2 p-3">
          <p>Số điện thoại</p>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: errorMessages.requiredField,
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="0123456789"
                  size="large"
                  status={errors?.phoneNumber && "error"}
                />
                <p className="text-red-600">{errors?.phoneNumber?.message}</p>
              </div>
            )}
          />
        </div>
        <div className="w-full md:w-1/2 p-3">
          <p>Email</p>
          <Controller
            name="email"
            control={control}
            rules={{
              required: errorMessages.requiredField,
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="abc@example.com"
                  status={errors?.email && "error"}
                  size="large"
                />
                <p className="text-red-600">{errors?.email?.message}</p>
              </div>
            )}
          />
        </div>
        <div className="w-full md:w-1/2 p-3">
          <p>Mục tiêu</p>
          <Controller
            name="target"
            control={control}
            rules={{
              required: errorMessages.requiredField,
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  placeholder="TOEIC 750"
                  status={errors?.target && "error"}
                  size="large"
                />
                <p className="text-red-600">{errors?.target?.message}</p>
              </div>
            )}
          />
        </div>
        <div className="w-full md:w-1/3 p-3">
          <Button
            className="w-full font-semibold text-base"
            onClick={handleSubmit(handleAddSubscription)}
            type="primary"
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
