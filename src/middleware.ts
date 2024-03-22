import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from './pages/api/auth/[...nextauth]'
 
// This function can be marked `async` if using `await` insid e
export async function middleware(request: NextRequest) {
  // let session = await getServerSession(authOptions)
  // if (request.nextUrl.pathname.startsWith('/likeTest')) {
  //   return NextResponse.rewrite(new URL('/', request.url))
  // }
  // if (request.nextUrl.pathname.startsWith('/admin/propose')) {
  //   return NextResponse.rewrite(new URL('/admin/propose/list', request.url))
  // }
  // if (request.nextUrl.pathname.startsWith('/admin/contact')) {
  //   return NextResponse.rewrite(new URL('/admin/contact/list', request.url))
  // }
  // if (request.nextUrl.pathname.startsWith('/admin/police')) {
  //   return NextResponse.rewrite(new URL('/admin/police/list', request.url))
  // }
}
 