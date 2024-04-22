export type JobOffer = {
  description: string;
  courses: string[];
  applicants: string[];
};

export type JobOfferCreation = {
  description: string;
  courses: string[];
  companyId: string;
  dateInit: string;
  dateEnd: string;
  hours: string;
  salary: string;
};
