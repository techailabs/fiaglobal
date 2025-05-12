import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const fillDemoCredentials = (email: string) => {
    form.setValue("email", email);
    form.setValue("password", "password123");
  };

  return (
    <Card className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary font-heading">Fia Global</h1>
        <p className="text-gray-600">Bank Correspondent System</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              )}
            />

            <Button variant="link" className="p-0 h-auto text-primary">
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-white font-bold"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      {/* Login Helper - This would not be in the real app */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 mb-2">Demo Login Credentials:</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowDemoAccounts(!showDemoAccounts)}
            className="text-xs h-6 px-2"
          >
            {showDemoAccounts ? "Hide" : "Show"}
          </Button>
        </div>
        
        {showDemoAccounts && (
          <>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button 
                variant="outline" 
                size="sm" 
                className="p-2 bg-neutral-light rounded justify-start h-auto"
                onClick={() => fillDemoCredentials("admin@fia.com")}
              >
                <strong>Admin:</strong> admin@fia.com
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-2 bg-neutral-light rounded justify-start h-auto"
                onClick={() => fillDemoCredentials("csp1@fia.com")}
              >
                <strong>CSP Agent:</strong> csp1@fia.com
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-2 bg-neutral-light rounded justify-start h-auto"
                onClick={() => fillDemoCredentials("auditor@fia.com")}
              >
                <strong>Auditor:</strong> auditor@fia.com
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="p-2 bg-neutral-light rounded justify-start h-auto"
                onClick={() => fillDemoCredentials("officer@fia.com")}
              >
                <strong>Bank Officer:</strong> officer@fia.com
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Password for all: <code>password123</code></p>
          </>
        )}
      </div>
    </Card>
  );
};

export default LoginForm;
