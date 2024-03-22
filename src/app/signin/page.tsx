import { getServerSession } from 'next-auth';
import SignInForm from '../components/SignInForm';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function SignupPage() {
  const session = await getServerSession(authOptions)

  return(
    <div>
      <SignInForm session={session}/>
    </div>
  )
}