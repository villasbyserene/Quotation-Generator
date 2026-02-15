import { Box, Grid, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface GuestDetailsFormProps {
  control: Control<any>;
}

const GuestDetailsForm = ({ control }: Readonly<GuestDetailsFormProps>) => {
  return (
    <Box>
      <Typography
        variant="h6"
        textAlign={"left"}
        fontWeight={"600"}
        gutterBottom
      >
        Enter Guest Details
      </Typography>

      <Grid container spacing={2}>
        {/* Guest Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.name"
            control={control}
            rules={{ required: "Guest name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Guest Name"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        {/* Phone Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.phone"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.email"
            control={control}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Guest Email"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.companyName"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Company Name"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        {/* Phone Number */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.companyPhone"
            control={control}
            rules={{
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Company Phone Number"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.companyEmail"
            control={control}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Guest Company Email"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        {/* Check-in */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.checkIn"
            control={control}
            rules={{ required: "Check-in date required" }}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Check-in Date"
                format="DD/MM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date: Dayjs | null) =>
                  field.onChange(date ? date.format("YYYY-MM-DD") : "")
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            )}
          />
        </Grid>

        {/* Check-out Date */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.checkOut"
            control={control}
            rules={{ required: "Check-out date required" }}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Check-out Date"
                format="DD/MM/YYYY"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date: Dayjs | null) =>
                  field.onChange(date ? date.format("YYYY-MM-DD") : "")
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            )}
          />
        </Grid>

        {/* Guest Count */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.guestCount"
            control={control}
            rules={{
              required: "Guest count required",
              min: { value: 1, message: "Minimum 1 guest" },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Guest Count"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="guest.propertyName"
            control={control}
            rules={{
              required: "Property Name required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Property Name"
                fullWidth
                size="small"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GuestDetailsForm;
