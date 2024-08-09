export interface  ResponseModel {
  message: string;
}

export interface AuthResponseModel{
    message:string;
    userId : number;
    email : string;
    firstName : string;
    lastName : string;
}
