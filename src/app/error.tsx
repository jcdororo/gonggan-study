'use client'

import ErrorInfo from "./components/ErrorInfo"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

 
  return (
    <div>      
      <ErrorInfo reset={reset}/>
    </div>
  )
}
