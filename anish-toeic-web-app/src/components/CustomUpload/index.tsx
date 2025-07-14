import { Button, notification, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { BiUpload } from "react-icons/bi";
import { uploadFileUrl } from "../../query";
import { normalizeFileName } from "../../utils";

type Props = {
  onGetFileName: (fileName: string) => void;
};

const CustomUpload: React.FC<Props> = ({ onGetFileName }) => {
  const handleBeforeUpload = (file: RcFile) => {
    const normalizedFileName = normalizeFileName(file.name);

    // Tạo một file mới với tên đã chuẩn hóa
    const normalizedFile = new File([file], normalizedFileName, {
      type: file.type,
    });

    // Gửi file đã chuẩn hóa
    uploadFileToServer(normalizedFile);
    onGetFileName(normalizedFileName);

    return false; // Ngăn Ant Design tự động upload file
  };

  const uploadFileToServer = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch(uploadFileUrl, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("auth_token"))
            ?.split("=")[1]
        }`,
      },
    })
      .then((res) => res.json())
      .then(() =>
        notification.success({
          message: `Upload successfully`,
        })
      )
      .catch((err) =>
        notification.error({
          message: `Upload failed ${err}`,
        })
      );
  };

  return (
    <div>
      <Upload beforeUpload={handleBeforeUpload}>
        <Button icon={<BiUpload />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default CustomUpload;
