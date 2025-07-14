import { ReactNode } from "react";
import AdminPage from "../containers/Admin";
import Login from "../containers/Auth";
import CoursePage from "../containers/Course";
import ExamPage from "../containers/Exam";
import ResultDetail from "../containers/Exam/ResultDetail";
import LandingPage from "../containers/LandingPage";
import Profile from "../containers/Profile";
import Resource from "../containers/Resource";
import Vocab from "../containers/Vocab";
import { routePaths } from "./helpers";

const createRoute = (
  path: string,
  element: ReactNode,
  privateRoute?: boolean
) => ({
  path,
  element,
  private: privateRoute,
});

const routes = [
  createRoute("/", <LandingPage />),
  createRoute(routePaths.login, <Login />),
  createRoute(routePaths.vocabularies, <Vocab />),
  createRoute(routePaths.courses, <CoursePage />),
  createRoute(routePaths.resource, <Resource />),
  createRoute(routePaths.courseDetail, <CoursePage />),
  createRoute(routePaths.examDetail, <ExamPage />),
  createRoute(routePaths.resultDetail, <ResultDetail />),
  createRoute(routePaths.profile, <Profile />, true),
  createRoute(routePaths.admin, <AdminPage />, true),
  createRoute(routePaths.adminDetail, <AdminPage />, true),
];

export default routes;
