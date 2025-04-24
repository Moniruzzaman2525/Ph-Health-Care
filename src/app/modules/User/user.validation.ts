import { Gender } from "@prisma/client";
import { z } from "zod";
import app from "../../../app";

const createAdmin = z.object({
    password: z.string({
        required_error: 'Password is required'
    }),
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        contactNumber: z.string({
            required_error: 'Contact number is required'
        }),
    })
})

const createDoctor = z.object({
    password: z.string({
        required_error: 'Password is required'
    }),
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }),
        contactNumber: z.string({
            required_error: 'Contact number is required'
        }),
        address: z.string().optional(),
        registrationNumber: z.string({
            required_error: 'Registration number is required'
        }),
        experience: z.number().optional(),
        gender: z.enum([Gender.Male, Gender.Female], {
            required_error: 'Gender is required'
        }),
        appointmentFee: z.number({
            required_error: 'Appointment fee is required'
        }),
        qualification: z.string({
            required_error: 'Qualification is required'
        }),
        currentWorkingPlace: z.string({
            required_error: 'Current working place is required'
        }),
        designation: z.string({
            required_error: 'Designation is required'
        })
    })
})

export const userValidationSchemas = {
    createAdmin,
    createDoctor
}
