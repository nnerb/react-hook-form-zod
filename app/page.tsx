"use client";

import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

export default function FormWithReactFormHook() {
  const { 
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset,
    getValues
   } = useForm();


   const onSubmit = async (data: FieldValues) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
   }
 
  return (
    <div className="grid place-items-center gap-3 bg-gray-100 h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 p-5 w-1/4 rounded-md">
        <input  
          {...register('email', {
            required: "Email is required"
          })}
          type="email" 
          placeholder="Email"
          className="px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}

        <input 
          {...register('password', {
            required: 'Password required',
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters. "
            }
          })}
          type="password" 
          placeholder="Password"
          className="px-4 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input 
          {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) => value === getValues("password") || "Password must match"
          })}
          type="password" 
          placeholder="Confirm password"
          className="px-4 py-2 rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <button 
          disabled={isSubmitting}
          className="py-2 bg-blue-300 rounded-sm disabled:bg-gray-500"
          type="submit"
          >
            Submit
        </button>
      </form>

    </div>
   
  )
}
