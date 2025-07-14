import * as yup from "yup";
import { errorMessages } from "../../../../../utils";

export const schema = yup.object().shape({
  title: yup.string().required(errorMessages.requiredField),
  courseId: yup.string().required(errorMessages.requiredField),
});
