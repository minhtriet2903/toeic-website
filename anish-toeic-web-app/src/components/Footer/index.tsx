import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routePaths } from "../../routes/helpers";

const Footer = () => {
  return (
    <div className="flex justify-center bg-sky-100">
      <div className="flex justify-around w-2/3 p-4">
        <div>
          <img
            src="/anish-toeic-logo.jpg"
            alt=""
            className="h-20 w-20 rounded-md"
          />
          <p className="text-xl font-semibold my-6">
            Anish TOEIC (Thầy An Toeic)
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/Anish.English.Official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-nowrap"
            >
              <FaFacebook size={20} color="blue" />
            </a>
            <FaPhoneAlt size={20} />
          </div>
          <div>
            <Link
              to={routePaths.courses}
              className="text-lg font-semibold text-nowrap"
            >
              Khóa học
            </Link>
          </div>
          <p className="text-lg font-semibold text-nowrap">Tài liệu</p>
          <p className="text-lg font-semibold text-nowrap">Từ vựng</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
