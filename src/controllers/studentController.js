import { catchAsync } from "../utils/errorUtils/catchAsync.js";
import prisma from "../DB/db.js";
import AppError from "../utils/errorUtils/AppError.js";
export const takeTrack = catchAsync(async (req, res, next) => {
  const trackId = req.params.trackId;
  const studentId = req.user.id;
  const student = await prisma.student.findFirst({
    where: {
      studentID: studentId,
    }
  })
  console.log(trackId);
  console.log(studentId);
  const alreadyEnrolled = await prisma.student.findFirst({
    where: {
      studentID: studentId,
      tracks: {
        some: {
          id: trackId
        }
      }
    },
  
    include: {
      tracks: true
    }
  });

  console.log('=-=-=-=-=-=-=-=-=-=-=');
  console.log(alreadyEnrolled);
  // const test = await prisma.student.findFirst({
  
  // });
  // console.log(test);
  if (alreadyEnrolled)
    return next(new AppError("You are already enrolled in this track", 400));
  const track = await prisma.track.update({
    where: { id: trackId },
    data: {
      noStudentsEnrolled: {
        increment: 1,
      },
      students: {
        // connect: [{ studentID: studentId }],
        connect: [{studentID: studentId}]
      }
    },
    include: {
      students: true
    }
  });

  console.log(track.students);

  const updatedStudent = await prisma.student.update({
    where: { studentID: studentId },
    data: {
      tracks: {
        connect: [{ id: trackId }],
      },
    },
    include: {
      tracks: true
    }
  });

  res.status(200).json({
    status: "success",
    message: "You have been successfully registered",
    trackId,
  });
});

export const viewTracks = catchAsync(async (req, res, next) => {
  const student = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    include: {
      tracks: true,
    },
  });
  res.status(200).json({
    status: "success",
    tracks: student.tracks,
  });
});


export const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await prisma.student.findMany({});
  res.status(200).json({
    status: 'success',
    data: students
  });
})


export const deleteStudent = catchAsync(async (req, res, next) => {
  //////////////////////////////////////////// Check the correctness of the id ////////////////////////////////
  const studentId = req.params.studentId;
  const student = await prisma.student.findFirst({
    where: {
      id: studentId,
    },
    include: {
      tracks: true
    }
  });

  if(!student) {
    return next(new AppError('No student with this id', 400));
  }

  console.log('*****************');
  console.log(student);
  //////////// Delete the student from all tracks attached to him ....
  const tracks = student.tracks.map((track) => prisma.track.update({
    where: {
      id: track.id
    }, 
    data: {
      noStudentsEnrolled: {
        increment: -1,
      },
      students: {
        // connect: [{ studentID: studentId }],
        disconnect: [{studentID: student.studentID}]
      }
    },
    include: {
      students: true
    }
  }));

  Promise.all(tracks)
    .then(() => {
      console.log(
        'Tracks Updated Successfully'
      )
      // Now, delete the student ...
  })

  await prisma.student.delete({
    where: {
      studentID: student.studentID
    }
  });

  // Before deleting the user, delete verification token:
  await prisma.verificationToken.delete({
    where: {
      userId: student.studentID,
    },
  }); 

  // Last thing, delete the user 
  await prisma.user.delete({
    where: {
      id: student.studentID
    }
  });

  res.status(200).json({
    status: "success",
    message: "student deleted successfully."
  });
})
  

