import { FormControl, Input, InputLabel } from "@mui/material"

interface GenerateFormFieldsProps {
  formState: { [key: string]: string }
  handleFormChanges: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function GenerateFormFields({
  formState,
  handleFormChanges,
}: GenerateFormFieldsProps) {
  return (
    <>
      {Object.keys(formState).map((fieldname, i) => (
        <FormControl
          key={fieldname}
          margin="normal"
          variant="standard"
          fullWidth
        >
          <InputLabel htmlFor={fieldname} sx={{ textTransform: "capitalize" }}>
            {fieldname}
          </InputLabel>
          <Input
            id={fieldname}
            key={fieldname}
            name={fieldname}
            value={formState[fieldname]}
            onChange={handleFormChanges}
            autoFocus={i === 0 ? true : false}
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
          />
        </FormControl>
      ))}
    </>
  )
}
