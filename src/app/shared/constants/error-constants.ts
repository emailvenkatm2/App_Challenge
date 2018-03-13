/*
A stitic class that holds all premade error messages which can be used for validation and error responses
*/
export interface CustomError {
code?: string;
message: string;
}
export class CustomErrorMessages {
    static NotFoundError: CustomError = {
     code: '404',
     message: 'Sorry! The resource you are looking does not exist.'
    };
    static InternalServerError: CustomError = {
        code: '500',
        message: 'Sorry! We currently facing technical issues. Will be back shorlty.'
    };
    static BadRequestError: CustomError = {
        code: '400',
        message: 'Sorry! Invalid request.'
    };
    static NotAuthorizedError: CustomError = {
        code: '401',
        message: 'Sorry! You are not authorized to see this.'
    };
    static OtherError: CustomError = {
        message: 'Sorry! Something went wrong. Please try after some time.'
    };
}
