import { CnButton } from "@/components/CnButton";
import { User, Mail, Phone, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl space-y-8">
      <h2 className="font-heading text-2xl font-bold text-foreground">Profile</h2>

      <div className="cn-card flex items-center gap-6">
        <div className="w-20 h-20 rounded-2xl cn-gradient-bg flex items-center justify-center text-primary-foreground text-2xl font-bold">
          JD
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">John Doe</h3>
          <p className="text-muted-foreground text-sm">Patient • Member since Jan 2026</p>
        </div>
      </div>

      <div className="cn-card">
        <h3 className="font-heading font-semibold text-lg mb-6">Personal Information</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                <User size={14} /> First Name
              </label>
              <input type="text" defaultValue="John" className="cn-input" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                <User size={14} /> Last Name
              </label>
              <input type="text" defaultValue="Doe" className="cn-input" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
              <Mail size={14} /> Email
            </label>
            <input type="email" defaultValue="john@example.com" className="cn-input" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
              <Phone size={14} /> Phone
            </label>
            <input type="tel" defaultValue="+1 (555) 123-4567" className="cn-input" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
              <MapPin size={14} /> Address
            </label>
            <input type="text" defaultValue="123 Oak Street, Apt 4B" className="cn-input" />
          </div>
          <CnButton type="submit">Save Changes</CnButton>
        </form>
      </div>
    </div>
  );
}
