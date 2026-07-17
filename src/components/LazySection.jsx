import { useEffect, useRef, useState, Suspense } from 'react'

// Monte une section seulement quand on s'en approche au scroll (rootMargin large).
// Le wrapper porte l'id de navigation : les ancres et la navbar fonctionnent
// même avant le montage du contenu. Allège énormément le chargement initial.
export default function LazySection({ id, children }) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          obs.disconnect()
        }
      },
      { rootMargin: '500px 0px' }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div id={id} ref={ref} className={show ? '' : 'min-h-screen'}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  )
}
