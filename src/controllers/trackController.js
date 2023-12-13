import { catchAsync } from "../utils/errorUtils/catchAsync.js";
import prisma from "../DB/db.js";
import AppError from "../utils/errorUtils/AppError.js";



export const createTrack = catchAsync(async (req, res, next) => {
    const trackName = req.body.name;
    if(trackName) {
        const track = await prisma.track.create({
            data: {
                trackName,
                noStudentsEnrolled: 0,
            }
        });
        console.log(track);
        res.status(201).json({
            status: 'success',
            message: 'track created successfully!',
            data: track
        });
    } else {
        return next(new AppError('Please enter track name!', 400));
    }
});



export const updateTrack = catchAsync(async (req, res, next) => {
    const trackId = req.params.trackId;
    const body = req.body;

    // ------------ Valid fields to update ------------- //
    // >>>>>>>>>>>>>>> ONLY FOR ADMINS <<<<<<<<<<<<<<<<< // 
    const fields = {
        trackName: undefined,
        noStudentsEnrolled: undefined,
        mentors: undefined,
        students: undefined,
        courses: undefined
    };


    // Take only fileds we're interested in from req.body..
    Object.keys(body).forEach((key) => {
        if (fields.hasOwnProperty(key)) {
          fields[key] = body[key];
        }
    });

    let data = {};
    // filter out undefined fields (update only fields with value)
    Object.keys(fields).forEach((key) => {
        if(fields[key]) {
            data[key] = fields[key];
        }
    })

    const track = await prisma.track.update({
        where: {
            id: trackId
        },
        data
    });

    console.log('track created successfully!');
    console.log(track);
    res.status(200).json({
        status: 'success',
        message: 'track updated successfully',
        data: track
    });
});



export const deleteTrack = catchAsync(async (req, res, next) => {
    const trackId = req.params.trackId;
    await prisma.track.delete({
        where: {
            id: trackId
        }
    });

    console.log('Track deleted successfully!');
    res.status(200).json({
        status: 'success',
        message: 'task deleted successfully!'
    });
})



export const getTrack = catchAsync(async (req, res, next) => {
    const trackId = req.params.trackId;
    const track = await prisma.track.findFirst({
        where: {
            id: trackId
        }
    });

    if(!track) {
        return next(new AppError('Track not found!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: track
    });
})


export const getAllTracks = catchAsync(async (req, res, next) => {
    const tracks = await prisma.track.findMany({
        include: {
            students: true
        }
    });
    res.status(200).json({
        status: 'success',
        data: {
            noOfTracks: tracks.length,
            tracks
        }
    })
})