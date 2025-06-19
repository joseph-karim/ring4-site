import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import { BusinessInfo } from '../lib/website-crawler'

interface BusinessInfoEditorProps {
  businessInfo: BusinessInfo
  onChange: (info: BusinessInfo) => void
  onSave: () => void
  onCancel: () => void
}

export default function BusinessInfoEditor({
  businessInfo,
  onChange,
  onSave,
  onCancel
}: BusinessInfoEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState<any>(null)

  const startEdit = (field: string, value: any) => {
    setEditingField(field)
    setTempValue(value)
  }

  const saveEdit = (field: string) => {
    onChange({
      ...businessInfo,
      [field]: tempValue
    })
    setEditingField(null)
    setTempValue(null)
  }

  const cancelEdit = () => {
    setEditingField(null)
    setTempValue(null)
  }

  const addService = () => {
    onChange({
      ...businessInfo,
      services: [...businessInfo.services, 'New service']
    })
  }

  const updateService = (index: number, value: string) => {
    const newServices = [...businessInfo.services]
    newServices[index] = value
    onChange({
      ...businessInfo,
      services: newServices
    })
  }

  const removeService = (index: number) => {
    onChange({
      ...businessInfo,
      services: businessInfo.services.filter((_, i) => i !== index)
    })
  }

  const addFAQ = () => {
    onChange({
      ...businessInfo,
      faqs: [...businessInfo.faqs, { question: 'New question?', answer: 'Answer here' }]
    })
  }

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaqs = [...businessInfo.faqs]
    newFaqs[index] = { ...newFaqs[index], [field]: value }
    onChange({
      ...businessInfo,
      faqs: newFaqs
    })
  }

  const removeFAQ = (index: number) => {
    onChange({
      ...businessInfo,
      faqs: businessInfo.faqs.filter((_, i) => i !== index)
    })
  }

  const updateHours = (day: string, hours: string) => {
    onChange({
      ...businessInfo,
      hours: {
        ...businessInfo.hours,
        [day]: hours
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header with Save/Cancel */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Customize Your AI's Knowledge</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700">
            Save & Continue
          </Button>
        </div>
      </div>

      <p className="text-gray-600">
        Review and edit the information extracted from your website. This will be used to train your AI receptionist.
      </p>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Business Name</Label>
            {editingField === 'name' ? (
              <div className="flex gap-2">
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={() => saveEdit('name')}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-lg">{businessInfo.name}</p>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => startEdit('name', businessInfo.name)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div>
            <Label>Business Description</Label>
            {editingField === 'description' ? (
              <div className="space-y-2">
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit('description')}>
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <p className="text-gray-600">{businessInfo.description}</p>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => startEdit('description', businessInfo.description)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Services Offered
            <Button size="sm" onClick={addService}>
              <Plus className="h-4 w-4 mr-1" /> Add Service
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {businessInfo.services.map((service, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={service}
                  onChange={(e) => updateService(index, e.target.value)}
                  className="flex-1"
                />
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => removeService(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(businessInfo.hours).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <Label className="text-right">{day}:</Label>
                <Input
                  value={hours}
                  onChange={(e) => updateHours(day, e.target.value)}
                  className="col-span-2"
                  placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Phone Number</Label>
            <Input
              value={businessInfo.contact.phone}
              onChange={(e) => onChange({
                ...businessInfo,
                contact: { ...businessInfo.contact, phone: e.target.value }
              })}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input
              value={businessInfo.contact.email}
              onChange={(e) => onChange({
                ...businessInfo,
                contact: { ...businessInfo.contact, email: e.target.value }
              })}
              placeholder="info@business.com"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={businessInfo.contact.address}
              onChange={(e) => onChange({
                ...businessInfo,
                contact: { ...businessInfo.contact, address: e.target.value }
              })}
              placeholder="123 Main St, City, State 12345"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Frequently Asked Questions
            <Button size="sm" onClick={addFAQ}>
              <Plus className="h-4 w-4 mr-1" /> Add FAQ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {businessInfo.faqs.map((faq, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-2">
                <div>
                  <Label>Question</Label>
                  <Input
                    value={faq.question}
                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Answer</Label>
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                    rows={2}
                  />
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => removeFAQ(index)}
                  className="mt-2"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Primary CTA */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Call-to-Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            What action should your AI receptionist guide callers toward?
          </p>
          <div>
            <Label>CTA Text</Label>
            <Input
              value={businessInfo.primaryCTA?.text || 'Schedule an appointment'}
              onChange={(e) => onChange({
                ...businessInfo,
                primaryCTA: { 
                  text: e.target.value, 
                  action: businessInfo.primaryCTA?.action || 'schedule' 
                }
              })}
              placeholder="e.g., Schedule a consultation"
            />
          </div>
          <div>
            <Label>CTA Goal</Label>
            <Textarea
              value={businessInfo.primaryCTA?.action || 'Help the caller schedule an appointment'}
              onChange={(e) => onChange({
                ...businessInfo,
                primaryCTA: { 
                  text: businessInfo.primaryCTA?.text || 'Schedule an appointment',
                  action: e.target.value
                }
              })}
              placeholder="Describe what should happen when someone wants this action"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}