import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="grid h-screen grid-cols-12">
      <div className="col-span-6"></div>
      <div className="col-span-6 flex items-center justify-center">
        <SignUp path="/sign-up" />
      </div>
    </div>
  );
};

export default SignUpPage;
