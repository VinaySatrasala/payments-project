import { Card } from '../../components/Card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '@repo/ui/Button'

export default function SignIn() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email-address">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="Email address"
              />
            </div>
            <div>
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-800 bg-neutral-900 text-white focus:ring-neutral-700"
              />
              <Label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-neutral-400 hover:text-white">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4"
            >
              Sign in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

