import { Box } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import ItemsTable from "./ItemsTable";
import GuestDetailsForm from "./GuestDetailsForm";
import NotesEditor from "./NotesEditor";
import QuotationPreview from "./QuotationPreview";
import DownloadPdfButton from "./DownloadPDFButton";

const ContentContainer = () => {
  const { control } = useForm({
    defaultValues: {
      guest: {
        name: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guestCount: 1,
      },
      items: [],
      notes: "",
    },
  });

  const guestName = useWatch({
    control,
    name: "guest.name",
  });

  return (
    <div className="p-6">
      <Box>
        <GuestDetailsForm control={control} />
        <ItemsTable control={control} />
        <NotesEditor control={control} />
        <QuotationPreview control={control} />
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "20px" }}>
          <DownloadPdfButton guestName={guestName} />
        </Box>
      </Box>
    </div>
  );
};

export default ContentContainer;
