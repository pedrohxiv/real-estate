import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-span-6"></div>
      <div className="col-span-6 flex items-center justify-center">
        <SignIn path="/sign-in" />
      </div>
    </div>
  );
};

export default SignInPage;
