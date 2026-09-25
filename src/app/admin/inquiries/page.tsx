import { PrismaClient } from "@prisma/client";
import { Mail, Clock } from "lucide-react";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-10 border-b border-outline/10 pb-6">
        <h1 className="font-playfair text-3xl text-on-surface">Client Inquiries</h1>
        <p className="text-outline text-sm mt-1">Review messages from the storefront contact form.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="bg-surface-container rounded-lg border border-outline/10 p-6 hover:border-outline/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair text-lg text-on-surface">{inquiry.senderName}</h3>
                  <p className="text-xs text-primary">{inquiry.contactInfo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-outline uppercase tracking-wider">
                <Clock className="w-3 h-3" />
                {new Date(inquiry.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <div className="bg-surface p-4 rounded-md border border-outline/5">
              <p className="text-on-surface text-sm leading-relaxed whitespace-pre-wrap">
                {inquiry.message}
              </p>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="text-xs uppercase tracking-[0.1em] font-semibold text-primary hover:text-primary-container transition-colors">
                Reply via Email &rarr;
              </button>
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="text-center py-16 text-outline bg-surface-container rounded-lg border border-outline/10">
            <Mail className="w-8 h-8 mx-auto mb-4 opacity-20" />
            <p>No new client inquiries.</p>
          </div>
        )}
      </div>
    </div>
  );
}
