import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="grid h-screen grid-cols-12">
      <section className="col-span-6"></section>
      <section className="col-span-6 flex items-center justify-center">
        <SignIn path="/sign-in" />
      </section>
    </main>
  );
};

export default SignInPage;
