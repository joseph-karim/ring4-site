import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Typography() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Typography System</CardTitle>
          <CardDescription>
            The Ring4 typography system uses a carefully selected hierarchy of fonts to create a professional, modern appearance that balances readability with brand personality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8">
            {/* Primary Fonts */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Primary Fonts</h3>
              
              <div className="space-y-6">
                <TypeSample 
                  name="TT Commons" 
                  usage="Primary Headings, Hero Text, CTAs" 
                  weights={["Medium (500)", "Bold (700)"]}
                  sample="Your Brand. Your Calls. Actually Answered."
                  family="sans-serif"
                  className="text-4xl font-bold leading-tight"
                />
                
                <TypeSample 
                  name="Rubik" 
                  usage="Secondary Headings, Feature Descriptions" 
                  weights={["Regular (400)", "Medium (500)"]}
                  sample="Transform your customer conversations with Ring4"
                  family="sans-serif"
                  className="text-2xl font-medium leading-snug"
                />
              </div>
            </div>
            
            {/* Secondary Fonts */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Secondary Fonts</h3>
              
              <div className="space-y-6">
                <TypeSample 
                  name="Inter" 
                  usage="Body Text, UI Elements, Dashboard Content" 
                  weights={["Regular (400)", "Medium (500)", "Semi-Bold (600)"]}
                  sample="Ring4 helps sales teams upgrade their calling systems to increase conversions, improve team communication, and strengthen customer relationships."
                  family="sans-serif"
                  className="text-base leading-relaxed"
                />
                
                <TypeSample 
                  name="Poppins" 
                  usage="Navigation, Buttons, Form Labels" 
                  weights={["Medium (500)", "Semi-Bold (600)"]}
                  sample="BOOK A DEMO • TRY RING4 NOW • LEARN MORE"
                  family="sans-serif"
                  className="text-sm font-semibold tracking-wide uppercase"
                />
                
                <TypeSample 
                  name="Montserrat" 
                  usage="Numbers, Statistics, Data Visualization" 
                  weights={["Regular (400)", "Bold (700)"]}
                  sample="37% increase in answered calls • 24/7 availability • 5-star customer rating"
                  family="sans-serif"
                  className="text-xl font-bold"
                />
              </div>
            </div>
            
            {/* Type Scale */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Type Scale</h3>
              
              <div className="space-y-6 border rounded-md p-6 bg-gray-50">
                <div>
                  <h1 className="text-5xl font-bold mb-2">H1: Hero Headline (40px / 2.5rem)</h1>
                  <p className="text-gray-500">TT Commons Bold - Used for main page headlines and hero sections</p>
                </div>
                
                <div>
                  <h2 className="text-4xl font-bold mb-2">H2: Section Headline (32px / 2rem)</h2>
                  <p className="text-gray-500">TT Commons Bold - Used for major section headings</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-medium mb-2">H3: Subsection Headline (24px / 1.5rem)</h3>
                  <p className="text-gray-500">Rubik Medium - Used for subsection headings and card titles</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-medium mb-2">H4: Content Headline (20px / 1.25rem)</h4>
                  <p className="text-gray-500">Rubik Medium - Used for content block headings and feature titles</p>
                </div>
                
                <div>
                  <h5 className="text-lg font-medium mb-2">H5: Small Headline (18px / 1.125rem)</h5>
                  <p className="text-gray-500">Rubik Medium - Used for smaller content groupings and sidebar headings</p>
                </div>
                
                <div>
                  <p className="text-base mb-2">Body Text (16px / 1rem)</p>
                  <p className="text-gray-500">Inter Regular - Main body text throughout the site</p>
                </div>
                
                <div>
                  <p className="text-sm mb-2">Small Text (14px / 0.875rem)</p>
                  <p className="text-gray-500">Inter Regular - Used for supporting text, captions, and UI elements</p>
                </div>
              </div>
            </div>
            
            {/* Typography Guidelines */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Typography Guidelines</h3>
              
              <div className="grid gap-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-semibold mb-2">Line Height & Spacing</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Headings: Use tight line height (1.1-1.2) for impact</li>
                    <li>Body text: Use comfortable line height (1.5-1.6) for readability</li>
                    <li>Maintain consistent paragraph spacing (margin-bottom: 1rem)</li>
                    <li>Use ample white space between sections to create a clean, organized layout</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-semibold mb-2">Alignment & Hierarchy</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Left-align most text for optimal readability</li>
                    <li>Center alignment is permitted for hero headlines and certain call-to-action elements</li>
                    <li>Maintain a consistent hierarchical structure throughout the site</li>
                    <li>Use font weight and size variation to establish clear visual hierarchy</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h4 className="font-semibold mb-2">Responsive Considerations</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Scale down font sizes proportionally on smaller screens</li>
                    <li>Increase line height slightly on mobile for better readability</li>
                    <li>Maintain minimum 16px font size for body text on all devices</li>
                    <li>Ensure proper contrast between text and background colors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TypeSample({ 
  name, 
  usage, 
  weights, 
  sample,
  family,
  className
}: { 
  name: string;
  usage: string;
  weights: string[];
  sample: string;
  family: string;
  className: string;
}) {
  return (
    <div className="border rounded-md p-5">
      <div className="mb-3">
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-gray-600">{usage}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {weights.map((weight) => (
            <span key={weight} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{weight}</span>
          ))}
        </div>
      </div>
      <div className={`p-4 border-l-4 border-blue-600 ${className}`} style={{ fontFamily: family }}>
        {sample}
      </div>
    </div>
  )
}