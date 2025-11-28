import { AuthLayout } from "@/components/layouts/auth-layout"
import { SignupForm } from "@/components/forms/signup-form"

export default function SignupPage() {
  return (
    <AuthLayout title="Create an account" description="Get started with Althu Faltu today">
      <SignupForm />
    </AuthLayout>
  )
}
