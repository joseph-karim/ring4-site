import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Components() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Components</CardTitle>
          <CardDescription>Standard UI components for consistent user experience</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Components content goes here</p>
        </CardContent>
      </Card>
    </div>
  )
}