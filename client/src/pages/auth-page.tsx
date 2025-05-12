import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Helmet } from 'react-helmet';
import { Loader2, UserCheck, UserPlus } from 'lucide-react';

// Login form schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Registration form schema
const registerSchema = z.object({
  full_name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['customer', 'csp_agent']).default('customer')
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if user is already logged in
  if (user) {
    navigate('/');
    return null;
  }

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Registration form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      phone: '',
      role: 'customer'
    }
  });

  // Handle login submission
  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password
    });
  };

  // Handle registration submission
  const onRegisterSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Helmet>
        <title>Login or Register | Fia Global Bank Correspondent System</title>
        <meta name="description" content="Login or register to access the Fia Global Bank Correspondent System. Manage transactions, audits, and more through our secure platform." />
      </Helmet>

      {/* Left side - Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Fia Global Bank
            </h1>
            <h2 className="mt-1 text-lg text-gray-500">Correspondent System</h2>
          </div>

          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                    <CardHeader>
                      <CardTitle>Welcome Back</CardTitle>
                      <CardDescription>
                        Sign in to your account to continue
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        type="submit" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Sign in
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                    <CardHeader>
                      <CardTitle>Create Account</CardTitle>
                      <CardDescription>
                        Join the Fia Global Bank network
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Register as</FormLabel>
                            <div className="flex space-x-4">
                              <Label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  value="customer"
                                  checked={field.value === 'customer'}
                                  onChange={() => field.onChange('customer')}
                                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                />
                                <span>Customer</span>
                              </Label>
                              <Label className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  value="csp_agent"
                                  checked={field.value === 'csp_agent'}
                                  onChange={() => field.onChange('csp_agent')}
                                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                />
                                <span>CSP Agent</span>
                              </Label>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        type="submit" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Create account
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:relative lg:block lg:flex-1 bg-gradient-to-r from-primary to-primary-dark">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Banking for Everyone</h1>
          <p className="text-xl max-w-lg text-center mb-6">
            Fia Global Bank Correspondent System bridges the gap between rural communities and financial services.
          </p>
          <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mt-10">
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-3">
                <h3 className="text-2xl font-bold">5M+</h3>
              </div>
              <p className="text-sm">Users Served</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-3">
                <h3 className="text-2xl font-bold">15K+</h3>
              </div>
              <p className="text-sm">CSP Agents</p>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-3">
                <h3 className="text-2xl font-bold">500+</h3>
              </div>
              <p className="text-sm">Rural Banks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}