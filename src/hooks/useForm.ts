import { useState } from "react"

type FormState = {
  [key: string]: string
}

export function useForm(initState: FormState) {
  const [formState, setForm] = useState(initState)

  const handleFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }
  return { formState, handleFormChanges }
}
