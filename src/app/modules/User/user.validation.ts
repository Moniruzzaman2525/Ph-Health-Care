import { Gender } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
    password: z.string({
        required_error: 'Password is required'
    }),
    admin: z.object({
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
    doctor: z.object({
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

const createPatient = z.object({
    password: z.string(),
    patient: z.object({
        email: z.string({
            required_error: "Email is required!"
        }).email(),
        name: z.string({
            required_error: "Name is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact number is required!"
        }),
        address: z.string({
            required_error: "Address is required"
        })
    })
});

export const userValidationSchemas = {
    createAdmin,
    createDoctor,
    createPatient
}
