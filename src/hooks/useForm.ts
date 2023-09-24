import { useCallback, useState } from "react"

type FormState = {
  [key: string]: string
}

export function useForm(initState: FormState) {
  const [formState, setForm] = useState(initState)

  const handleFormChanges = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    [setForm],
  )

  return { formState, handleFormChanges }
}
