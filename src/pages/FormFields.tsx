import { FormControl, InputLabel, OutlinedInput } from "@mui/material"

interface GenerateFormFieldsProps {
  formState: { [key: string]: string }
  handleFormChanges: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FormFields({
  formState,
  handleFormChanges,
}: GenerateFormFieldsProps) {
  return (
    <>
      {Object.keys(formState).map((fieldname, i) => (
        <FormControl
          key={fieldname}
          margin="normal"
          variant="outlined"
          fullWidth
        >
          <InputLabel
            htmlFor={fieldname}
            sx={{
              textTransform: "capitalize",
              bgcolor: "background.paper",
              px: 1,
            }}
          >
            {fieldname}
          </InputLabel>
          <OutlinedInput
            id={fieldname}
            key={fieldname}
            name={fieldname}
            type={fieldname === "password" ? "password" : "text"}
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

/* <TextField
key={fieldname}
margin="normal"
variant="outlined"
fullWidth
label={fieldname}
name={fieldname}
type={fieldname}
sx={{ textTransform: "capitalize" }}
value={formState[fieldname]}
onChange={handleFormChanges}
autoFocus={i === 0 ? true : false}
inputProps={{
  autoComplete: "new-password",
  form: {
    autoComplete: "off",
  },
}}
/> */
