import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface JWT {
    id: number;
    email: string;
    password: string;
    iat: number;
    exp: number;
}

export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).send('token is not valid');
    
    jwt.verify(token, process.env.JWT_SECRET, (error: jwt.VerifyErrors, decoded: JWT) => {
        if (error) return res.status(401).send('token is not valid');
        res.locals.userId = decoded.id;
    });
    
    next();
}