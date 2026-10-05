import { useStore } from '../context/StoreContext.jsx'

export default function Toast() {
  const { toast } = useStore()
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      {toast && <div className="toast" key={toast.key}>{toast.message}</div>}
    </div>
  )
}
