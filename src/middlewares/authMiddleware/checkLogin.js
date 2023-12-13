import AppError from "../../utils/errorUtils/AppError.js"
import { catchAsync } from "../../utils/errorUtils/catchAsync.js"
import prisma from "../../DB/db.js";

export const checkLogin = catchAsync(async (req , res , next) => {
    if(req.headers.cookie) {
        return next(new AppError('You are logged in!', 400));
    }
    next();
});