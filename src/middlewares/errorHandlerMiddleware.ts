import {Request, Response, NextFunction} from 'express';

export default async function errorHandlerMiddleware(error, req: Request, res: Response, next: NextFunction) {
    console.log(error);
    
    if(error.type) return res.status(errorTypeToStatusCode(error.type)).send(error.message);
    return res.sendStatus(500);
}

function errorTypeToStatusCode(errorType: string) {
    if (errorType === "conflict") return 409;
    if (errorType === "not_found") return 404;
    if (errorType === "unauthorized") return 401;
    if (errorType === "unprocessable_entity") return 422;
    
    return 400;
}