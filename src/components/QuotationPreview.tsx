import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { type Control, useWatch } from "react-hook-form";
import { calculateAmount, calculateTotal } from "../utils/calculations";
import logoBrown from "../assets/logo-brown.png";
import stamp from "../assets/stamp.png";
import type { QuotationItemDTO } from "../types";
import dayjs from "dayjs";

interface QuotationPreviewProps {
  control: Control<any>;
}

export default function QuotationPreview({
  control,
}: Readonly<QuotationPreviewProps>) {
  const guest = useWatch({ control, name: "guest" });
  const items: QuotationItemDTO[] = useWatch({ control, name: "items" }) || [];
  const notes: string = useWatch({ control, name: "notes" }) || "";

  const total = calculateTotal(items);

  return (
    <>
      <Typography
        variant="h6"
        textAlign={"left"}
        fontWeight={"600"}
        gutterBottom
        mt={10}
      >
        Quotation Preview
      </Typography>
      <Box
        sx={{
          width: "100%",
          overflowX: { xs: "auto", md: "visible" },
        }}
      >
        <Box
          id="quotation-preview"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap={{ xs: "wrap", sm: "nowrap" }}
            sx={{
              padding: "8px 16px 0px 16px",
            }}
          >
            <img
              src={logoBrown}
              alt="vbs logo"
              className="w-26 xl:w-26 h-auto"
            />
            <Box>
              <Typography fontWeight={400} variant="h4" align="right" mb={1}>
                QUOTATION
              </Typography>
              <Typography variant="body2" align="right">
                Villas By Serene
              </Typography>
              <Typography variant="body2" align="right">
                +91 95943 77736
              </Typography>
              <Typography variant="body2" align="right">
                villasbyserene@gmail.com
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              mt: 2,
              mb: 3,
              borderBottomWidth: 4,
              backgroundColor: "#fecc89",
            }}
          />

          {/* Guest / Company Details */}
          <Box
            mb={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              padding: "8px 16px 0px 16px",
            }}
          >
            <Typography align="left" variant="subtitle1" fontWeight={600}>
              Quotation For
            </Typography>

            <Typography align="left">Guest Name: {guest?.name}</Typography>

            {guest?.companyName && (
              <Typography align="left">
                Company Name: {guest.companyName}
              </Typography>
            )}

            <Typography align="left">Phone: {guest?.phone}</Typography>

            {guest?.companyPhone && (
              <Typography align="left">
                Company Phone: {guest.companyPhone}
              </Typography>
            )}

            <Typography align="left">
              Check-in / Check-out:{" "}
              {guest?.checkIn ? dayjs(guest.checkIn).format("DD/MM/YYYY") : ""}{" "}
              to{" "}
              {guest?.checkOut
                ? dayjs(guest.checkOut).format("DD/MM/YYYY")
                : ""}
            </Typography>

            <Typography align="left">
              Guest count: {guest?.guestCount} pax
            </Typography>
          </Box>

          {/* Items Table */}
          <Box
            sx={{
              padding: "8px 16px 0px 16px",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: "600", py: 1.5, verticalAlign: "middle" }}
                  >
                    Item
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", py: 1.5, verticalAlign: "middle" }}
                    align="right"
                  >
                    Qty
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", py: 1.5, verticalAlign: "middle" }}
                    align="right"
                  >
                    Unit Price
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "600", py: 1.5, verticalAlign: "middle" }}
                    align="right"
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((item, index) => {
                  const amount =
                    item.pricingMode === "UNIT"
                      ? calculateAmount(item.quantity, item.unitPrice)
                      : item.amount;

                  return (
                    <TableRow key={index}>
                      <TableCell
                        sx={{ py: 1.5, verticalAlign: "middle" }}
                        width={"60%"}
                      >
                        {item.description}
                      </TableCell>
                      <TableCell
                        sx={{ py: 1.5, verticalAlign: "middle" }}
                        align="right"
                      >
                        {item.quantity}
                      </TableCell>
                      <TableCell
                        sx={{ py: 1.5, verticalAlign: "middle" }}
                        align="right"
                      >
                        {item.pricingMode === "UNIT"
                          ? item.unitPrice?.toLocaleString("en-IN")
                          : "—"}
                      </TableCell>
                      <TableCell
                        sx={{ py: 1.5, verticalAlign: "middle" }}
                        align="right"
                      >
                        ₹{amount.toLocaleString("en-IN")}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* Total */}
                <TableRow
                  sx={{
                    borderBottom: "0px",
                    "& td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableCell colSpan={3} align="right">
                    <Typography fontWeight={600}>Total</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight={600}>
                      ₹{total.toLocaleString("en-IN")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          {/* Notes */}
          {notes && (
            <Box
              id="notes-preview"
              className="no-page-break"
              mt={4}
              sx={{
                padding: "8px 16px 0px 16px",
              }}
            >
              <Box
                sx={{ typography: "body2" }}
                dangerouslySetInnerHTML={{ __html: notes }}
                textAlign={"left"}
              />
            </Box>
          )}

          <Box
            mt={4}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            <img src={stamp} alt="stamp" className="w-20" />
            <Typography fontWeight={600}>Thank you!</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
