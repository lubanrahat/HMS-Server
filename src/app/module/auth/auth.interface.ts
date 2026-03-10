interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}
interface ILoginPatientPayload {
    email: string,
    password: string
}

export {
    IRegisterPatientPayload,
    ILoginPatientPayload
}
