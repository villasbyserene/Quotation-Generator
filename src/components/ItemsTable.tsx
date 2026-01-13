import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Controller, useFieldArray, useWatch } from "react-hook-form";

import { calculateAmount, calculateTotal } from "../utils/calculations";

import type { Control } from "react-hook-form";
import type { QuotationItemDTO } from "../types";

interface ItemsTableProps {
  control: Control<any>;
}

export default function ItemsTable({ control }: Readonly<ItemsTableProps>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems: QuotationItemDTO[] =
    useWatch({
      control,
      name: "items",
    }) || [];

  const safeItems = fields.map((field, index) => watchedItems[index] ?? field);

  const total = calculateTotal(safeItems);

  return (
    <Box mt={4} sx={{overflowX: 'hidden'}}>
      <Typography variant="h6" fontWeight={'600'} textAlign={'left'} gutterBottom>
        Enter Quotation Items
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {fields.map((field, index) => {
            const item = safeItems[index];

            const computedAmount =
              item?.pricingMode === "UNIT"
                ? calculateAmount(item.quantity, item.unitPrice)
                : item.amount ?? 0;

            return (
              <TableRow key={field.id}>
                {/* Description */}
                <TableCell>
                  <Controller
                    control={control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        fullWidth
                        placeholder="02/01/2026 (stay + meals)"
                      />
                    )}
                  />
                </TableCell>

                {/* Pricing Mode */}
                <TableCell>
                  <Controller
                    control={control}
                    name={`items.${index}.pricingMode`}
                    render={({ field }) => (
                      <Select {...field} size="small" fullWidth>
                        <MenuItem value="UNIT">Unit</MenuItem>
                        <MenuItem value="LUMPSUM">Lumpsum</MenuItem>
                      </Select>
                    )}
                  />
                </TableCell>

                {/* Quantity */}
                <TableCell align="right">
                  <Controller
                    control={control}
                    name={`items.${index}.quantity`}
                    render={({ field }) => (
                      <TextField {...field} size="small" />
                    )}
                  />
                </TableCell>

                {/* Unit Price */}
                <TableCell align="right">
                  <Controller
                    control={control}
                    name={`items.${index}.unitPrice`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        size="small"
                        disabled={item?.pricingMode === "LUMPSUM"}
                      />
                    )}
                  />
                </TableCell>

                {/* Amount */}
                <TableCell align="right">
                  <Controller
                    control={control}
                    name={`items.${index}.amount`}
                    defaultValue={0}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="number"
                        size="small"
                        disabled={item?.pricingMode === "UNIT"}
                        value={computedAmount}
                      />
                    )}
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => remove(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          startIcon={<Add />}
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              description: "",
              quantity: 1,
              unitPrice: 0,
              amount: 0,
              pricingMode: "UNIT",
            })
          }
        >
          Add Item
        </Button>

        <Typography variant="h6">
          Total: ₹{total.toLocaleString("en-IN")}
        </Typography>
      </Box>
    </Box>
  );
}
