import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignUpValidation } from "@/lib/validation"
import { Loader } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount} from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/authContext"


const SignupForm = () => {
  const { toast } = useToast();
  const {mutateAsync: signInAccount} = useSignInAccount();
  const {mutateAsync : createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();
  const {checkAuthUser} = useUserContext()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {

    const newUser = await createUserAccount(values);
    if(!newUser){
      return toast({
        title: "Sign up failed, please try again",
        
      });
    }
    
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({
        title: "Sign Up failed, please try again",
      });
    }
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate('/')
    } else{
      return toast({
        title: "Sign up failed, please try again",
      })
    }


  }
  return (
    <div>

      <Form {...form}>

        <div className="sm:w-full flex-center flex-col">

          <img src="/assets/images/logo.svg" alt="logo" />

          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>

          <p className="text-light-3 small-medium md:base-regular mt-2">To Start Chat with your account details</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {isCreatingUser ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ): "Sign up"}
            </Button>

            <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1 ">Sign In here!</Link>
            </p>
          </form>
        </div>

      </Form>

    </div>
  )
}

export default SignupForm