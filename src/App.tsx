import { ThemeProvider } from "@/hooks/useTheme";
import { RootLayout } from "@/layout/RootLayout";

export default function App() {
  return (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  );
}
