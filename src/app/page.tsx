"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Info from "@/components/info";

type TFormLogin = {
  email: string;
  password: string;
};

export default function Home() {
  const form = useForm<TFormLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: TFormLogin) => {
    if (
      data.email === "andreohenriqueleite@gmail.com" &&
      data.password === "123"
    ) {
      redirect("/home");
    } else {
      console.log("senha incorreta!");
    }
  };

  return (
    <div className="font-[family-name:var(--font-inter)] min-h-screen flex flex-col ">
      <Info />
      <header className="text-5xl text-[#454444] text-center py-10 w-full">
        <h1>LOGO</h1>
        <h2 className="text-sm text-center ">Log in</h2>
      </header>
      <div className="flex mt-28 items-center justify-center">
        <Form {...form}>
          <form
            className="flex flex-col space-y-4 w-[57rem] "
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email Address</FormLabel>
                  <FormControl>
                    <input
                      className="border-b-1 w-full border-[#454444] p-2 cursor-pointer outline-hidden"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <input
                      className="border-b-1 w-full border-[#454444] p-2 cursor-pointer outline-hidden"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormLabel className="font-black ml-auto text-sm underline cursor-pointer p-3.5">
                    Esqueceu sua senha?
                  </FormLabel>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-full bg-[#454444] text-white p-6 text-2xl cursor-pointer"
            >
              LOGIN
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex items-center justify-center space-x-4 p-8">
        <div className="h-0.5 w-20 bg-gray-500"></div>
        <span className="text-gray-700 font-bold">Ou</span>
        <div className="h-0.5 w-20 bg-gray-500"></div>
      </div>
    </div>
  );
}
