import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button"
import { SignUpValidation as SignInValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import {useSignInAccount} from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/authContext"


const SigninForm = () => {
  const { toast } = useToast();
  const {mutateAsync: signInAccount, isPending} = useSignInAccount();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    // console.log(values);
    
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({
        title: "Sign In failed, please try again",
      });
    }
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/')
    } else{
      return toast({
        title: "Sign in failed, please try again",
      })
    }


  }
  return (
    <div>

      <Form {...form}>

        <div className="sm:w-full flex-center flex-col">

          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in to your account</h2>

          <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your email and passward</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="shad-input"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="shad-button_primary">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ): "Sign In"}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
              <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1 ">Don't have an account? Sign up here!</Link>
            </p>
          </form>
        </div>

      </Form>

    </div>
  )
}

export default SigninForm