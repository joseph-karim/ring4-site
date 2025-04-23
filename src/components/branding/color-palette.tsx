import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ColorPalette() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            The official Ring4 color palette is dominated by shades of blue, complemented by neutral tones and accent colors for emphasis and interaction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Primary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ColorSwatch name="Primary Blue" hex="#0055FF" desc="Main brand color used for primary buttons, key headings, and important UI elements." />
                <ColorSwatch name="Deep Blue" hex="#003399" desc="Used for hover states, links, and to create depth in UI components." />
                <ColorSwatch name="Light Blue" hex="#E6F0FF" desc="Used for backgrounds, hover states, and highlighting selected items." />
              </div>
            </div>

            {/* Secondary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Secondary Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ColorSwatch name="Teal" hex="#00A3B4" desc="Used as an accent color for secondary elements and to highlight features." />
                <ColorSwatch name="Navy" hex="#001F5C" desc="Used for dark backgrounds, footer, and to create contrast." />
                <ColorSwatch name="Sky Blue" hex="#73B9FF" desc="Used for illustrations, icons, and subtle accents." />
              </div>
            </div>

            {/* Neutral Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Neutral Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ColorSwatch name="Dark Gray" hex="#333333" desc="Used for primary text content." />
                <ColorSwatch name="Medium Gray" hex="#757575" desc="Used for secondary text and inactive states." />
                <ColorSwatch name="Light Gray" hex="#E5E5E5" desc="Used for borders, dividers, and subtle backgrounds." />
                <ColorSwatch name="Off White" hex="#F8F9FA" desc="Background color for sections and cards." />
              </div>
            </div>

            {/* Feedback Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Feedback Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <ColorSwatch name="Success" hex="#28A745" desc="Used to indicate successful actions or positive statuses." />
                <ColorSwatch name="Warning" hex="#FFC107" desc="Used to indicate warnings or actions that require attention." />
                <ColorSwatch name="Error" hex="#DC3545" desc="Used to indicate errors or failed actions." />
                <ColorSwatch name="Info" hex="#17A2B8" desc="Used to indicate informational messages." />
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Color Usage Guidelines</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Primary Blue should be used for main call-to-action buttons like "Book a Demo" and "Try Ring4 Now".</li>
              <li>Maintain adequate contrast ratios between text and background colors to ensure readability and WCAG compliance.</li>
              <li>Use Secondary colors to create visual hierarchy and guide the user's attention.</li>
              <li>Feedback colors should be reserved specifically for their designated purposes to maintain clear communication.</li>
              <li>Light backgrounds with dark text are preferred for most content areas to maximize readability.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ColorSwatch({ name, hex, desc }: { name: string; hex: string; desc: string }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="h-20 rounded-md border" style={{ backgroundColor: hex }}></div>
      <div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{name}</span>
          <span className="text-sm text-gray-500">{hex}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  )
}