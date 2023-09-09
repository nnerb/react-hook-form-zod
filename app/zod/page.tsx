"use client";

import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function FormWithReactFormHookWitZod() {
  const { 
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    },
    reset,
    setError
   } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema)
   });


   const onSubmit = async (data: TSignUpSchema) => {

    const response = await fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const responseData = await response.json();
    
    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword
        });
      } else {
        alert("Something went wrong!");
      }
    }
    // reset();
   }
 
  return (
    <div className="grid place-items-center gap-3 bg-gray-100 h-full w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2 p-5 w-1/4 rounded-md">
        <input  
          {...register("email")}
          type="email" 
          placeholder="Email"
          className="px-4 py-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}

        <input 
          {...register('password')}
          type="password" 
          placeholder="Password"
          className="px-4 py-2 rounded"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input 
          {...register('confirmPassword')}
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
