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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box mt={4}>
      <Typography
        variant="h6"
        fontWeight={"600"}
        textAlign={"left"}
        gutterBottom
      >
        Enter Quotation Items
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  py: { xs: 0.5, sm: 1 },
                  px: { xs: 0.5, sm: 1.5 },
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                Item
              </TableCell>
              <TableCell
                sx={{
                  py: { xs: 0.5, sm: 1 },
                  px: { xs: 0.5, sm: 1.5 },
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                Mode
              </TableCell>
              <TableCell
                sx={{
                  py: { xs: 0.5, sm: 1 },
                  px: { xs: 0.5, sm: 1.5 },
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                Qty
              </TableCell>
              <TableCell
                sx={{
                  py: { xs: 0.5, sm: 1 },
                  px: { xs: 0.5, sm: 1.5 },
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                Unit Price
              </TableCell>
              <TableCell
                sx={{
                  py: { xs: 0.5, sm: 1 },
                  px: { xs: 0.5, sm: 1.5 },
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  py: { xs: 0.5, sm: 1 },
                  px: { xs: 0.5, sm: 1.5 },
                  verticalAlign: "middle",
                  whiteSpace: "nowrap",
                }}
              />
            </TableRow>
          </TableHead>

          <TableBody>
            {fields.map((field, index) => {
              const item = safeItems[index];

              const computedAmount =
                item?.pricingMode === "UNIT"
                  ? calculateAmount(item.quantity, item.unitPrice)
                  : item.amount ?? 0;

              /* 📱 MOBILE LAYOUT */
              if (isMobile) {
                return (
                  <TableRow
                    key={field.id}
                    sx={{
                      "& > td": {
                        py: 2.5,
                      },
                    }}
                  >
                    <TableCell colSpan={6} sx={{ px: 1 }}>
                      <Box display="flex" flexDirection="column" gap={1.3}>
                        <Controller
                          control={control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              size="small"
                              fullWidth
                              label="Item"
                              placeholder="02/01/2026 (stay + meals)"
                            />
                          )}
                        />

                        <Box display="flex" gap={1}>
                          <Controller
                            control={control}
                            name={`items.${index}.pricingMode`}
                            render={({ field }) => (
                              <Select {...field} size="small" sx={{width: '45%'}}>
                                <MenuItem value="UNIT">Unit</MenuItem>
                                <MenuItem value="LUMPSUM">Lumpsum</MenuItem>
                              </Select>
                            )}
                          />

                          <Controller
                            control={control}
                            name={`items.${index}.quantity`}
                            render={({ field }) => (
                              <TextField {...field} size="small" label="Qty" sx={{width: '55%'}}/>
                            )}
                          />
                        </Box>

                        <Box display="flex" gap={1} alignItems="center">
                          <Controller
                            control={control}
                            name={`items.${index}.unitPrice`}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                size="small"
                                type="number"
                                label="Unit ₹"
                                disabled={item?.pricingMode === "LUMPSUM"}
                                sx={{width: '44%'}}
                              />
                            )}
                          />

                          <TextField
                            size="small"
                            label="Amount ₹"
                            value={computedAmount}
                            sx={{width: '45%'}}
                            disabled
                          />

                          <IconButton
                            size="small"
                            onClick={() => remove(index)}
                            sx={{width: '5%'}}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              }

              return (
                <TableRow key={field.id}>
                  <TableCell
                    sx={{
                      py: 1,
                      px: 1,
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
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

                  <TableCell
                    sx={{
                      py: 1,
                      px: 1,
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
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

                  <TableCell
                    sx={{
                      py: 1,
                      px: 1,
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                    align="right"
                  >
                    <Controller
                      control={control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <TextField {...field} size="small" fullWidth />
                      )}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      py: 1,
                      px: 1,
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                    align="right"
                  >
                    <Controller
                      control={control}
                      name={`items.${index}.unitPrice`}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          size="small"
                          disabled={item?.pricingMode === "LUMPSUM"}
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      py: 1,
                      px: 1,
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                    align="right"
                  >
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
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      right: 0,
                      backgroundColor: "background.paper",
                      padding: 0,
                    }}
                  >
                    <IconButton size="small" onClick={() => remove(index)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

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
