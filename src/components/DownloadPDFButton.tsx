import { Button } from "@mui/material";
import html2pdf from "html2pdf.js";

interface DownloadPdfButtonProps {
  guestName: string;
}

export default function DownloadPdfButton({
  guestName,
}: Readonly<DownloadPdfButtonProps>) {
  const fileName = guestName
    ? `${guestName.replaceAll(/\s+/g, " ").trim()} Quotation.pdf`
    : "Quotation.pdf";

  const margin: [number, number, number, number] = [8, 8, 8, 8];

  const handleDownload = () => {
    const element = document.getElementById("quotation-preview");

    if (!element) {
      console.error("Quotation preview not found");
      return;
    }

    const options = {
      margin,
      filename: fileName,
      image: { type: "jpeg" as const, quality: 0.85 },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
      pagebreak: {
        mode: ["css", "legacy"],
      },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <Button variant="contained" onClick={handleDownload}>
      Download PDF
    </Button>
  );
}
