export const ROUTES = {
  HOME: "/",
  LOGIN: "/signin",
  REGISTER: "/signup",
  VOCABULARY: "/vocabulary",
};

class DYNAMIC_ROUTES {
  public vocabulary = (id: string) => `${ROUTES.VOCABULARY}/${id}`;
}

export default new DYNAMIC_ROUTES();
