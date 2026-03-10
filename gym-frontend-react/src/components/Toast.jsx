import { useToast } from '../context/ToastContext.jsx'

export default function Toast() {
  const { toast } = useToast()

  if (!toast) return null

  const toastClass = `toast toast-${toast.type}`

  return (
    <div className={toastClass}>
      {toast.message}
    </div>
  )
}
