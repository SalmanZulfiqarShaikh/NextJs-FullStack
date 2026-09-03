import {NextRequest, NextResponse} from 'next/server'

import jwt from 'jsonwebtoken';


export const getTokenData = (req: NextRequest) => {
     try {
         const token = req.cookies.get('token')?.value || '';

         const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string };

         return decoded;
     } catch (error: any) {
         throw new Error(error.message || 'Invalid token');
     }
}


 