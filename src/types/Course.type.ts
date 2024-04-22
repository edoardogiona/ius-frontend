export type RequestOfCourse = {
  courseType: string;
  description: string;
  companyId:string;
};

export type CourseCreation = {
  title: string;
  description: string;
  offers: string[];
  teacherId: string;
  opportunities: string;
  duration: string;
};
