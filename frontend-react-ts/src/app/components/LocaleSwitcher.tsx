import { useTranslation } from "react-i18next";
import { Box, Button } from "@mui/material";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" }
];

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();

  return (
    <Box display="flex" gap={0.5}>
      {LOCALES.map(({ code, label }, index) => (
        <Box key={code} display="flex" alignItems="center">
          <Button
            size="small"
            onClick={() => i18n.changeLanguage(code)}
            sx={{
              minWidth: "auto",
              fontWeight: i18n.language === code ? "bold" : "normal",
              color: i18n.language === code ? "primary.main" : "text.secondary",
              textDecoration: i18n.language === code ? "underline" : "none"
            }}
          >
            {label}
          </Button>
          {index < LOCALES.length - 1 && (
            <Box component="span" sx={{ color: "text.disabled", userSelect: "none" }}>
              |
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
