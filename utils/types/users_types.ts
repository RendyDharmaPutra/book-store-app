type user = {
  username: string;
  name: string;
  address: string;
  year: number;
};

type userTable = user & {
  id: number;
  birthDate: string;
  role: string;
};

type insertUser = user & {
  password: string;
  birth_date: string;
  admin: boolean;
};

type insertProfile = user & {
  password: string;
  birth_date: string;
};
