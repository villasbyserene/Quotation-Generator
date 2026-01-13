import { Box, Typography } from "@mui/material";
import { Controller, type Control } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface NotesEditorProps {
  control: Control<any>;
}

const toolbarOptions = [
  [{ size: ["small", false, "large"] }],
  ["bold", "italic", "underline"],
  [{ list: "bullet" }],
  ["clean"],
];

export default function NotesEditor({ control }: Readonly<NotesEditorProps>) {
  return (
    <Box mt={4}>
      <Typography
        variant="h6"
        fontWeight={"600"}
        textAlign={"left"}
        gutterBottom
      >
        Additional Notes / Food Menu
      </Typography>

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <ReactQuill
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
            modules={{ toolbar: toolbarOptions }}
            formats={["bold", "italic", "underline", "list", "bullet", "size"]}
            style={{ height: 180, marginBottom: 40 }}
          />
        )}
      />
    </Box>
  );
}
