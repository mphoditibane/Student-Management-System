'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <GraduationCap className="h-16 w-16 text-blue-600 mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Student Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your academic journey with our secure platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>New Student?</CardTitle>
                <CardDescription>Create your account to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/register">
                  <Button className="w-full">Register</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Already Registered?</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/login">
                  <Button className="w-full" variant="outline">
                    Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}