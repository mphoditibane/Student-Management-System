'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setTwoFactorVerified } from '@/lib/store/slices/authSlice';
import QRCode from 'qrcode.js';

export default function TwoFactorSetupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const { user, twoFactorSecret } = useSelector((state: RootState) => state.auth);

  if (!user || !twoFactorSecret) {
    router.push('/login');
    return null;
  }

  const verifyCode = () => {
    // In a real app, verify the code against the secret
    if (code === '123456') {
      dispatch(setTwoFactorVerified(true));
      toast({
        title: '2FA Enabled',
        description: 'Two-factor authentication has been enabled for your account.',
      });
      router.push('/dashboard');
    } else {
      toast({
        title: 'Invalid Code',
        description: 'Please enter a valid verification code.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up Two-Factor Authentication</CardTitle>
          <CardDescription>
            Scan the QR code with your authenticator app and enter the verification code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div id="qrcode" className="bg-white p-4 rounded-lg">
              {/* QR code would be generated here in a real app */}
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                QR Code Placeholder
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
            <Button onClick={verifyCode} className="w-full">
              Verify Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}