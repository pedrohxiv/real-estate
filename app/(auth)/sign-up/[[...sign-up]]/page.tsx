import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="grid h-screen grid-cols-12">
      <section className="col-span-6"></section>
      <section className="col-span-6 flex items-center justify-center">
        <SignUp path="/sign-up" />
      </section>
    </main>
  );
};

export default SignUpPage;
