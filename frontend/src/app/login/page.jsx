import Link from "next/link"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold ">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm">
                        Or{" "}
                        <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            create a new account
                        </Link>
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
}