'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { logout } from '@/lib/store/slices/authSlice';
import { UserCircle, Book, GraduationCap, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, twoFactorVerified } = useSelector((state: RootState) => state.auth);
  const profile = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (!user || !twoFactorVerified) {
      router.push('/login');
    }
  }, [user, twoFactorVerified, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (!user || !twoFactorVerified) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCircle className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Student ID:</strong> {profile.studentId || 'Not set'}</p>
                <p><strong>Major:</strong> {profile.major || 'Not set'}</p>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => router.push('/profile')}
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Academic Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Year:</strong> {profile.year || 1}</p>
                <p><strong>GPA:</strong> {profile.gpa || '0.00'}</p>
                <p><strong>Enrolled Courses:</strong> {profile.courses?.length || 0}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  View Schedule
                </Button>
                <Button className="w-full" variant="outline">
                  Course Registration
                </Button>
                <Button className="w-full" variant="outline">
                  View Grades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}