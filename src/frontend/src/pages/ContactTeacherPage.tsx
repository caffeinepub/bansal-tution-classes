import { useState } from 'react';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const WHATSAPP_URL = 'https://wa.me/919999999999';

export function ContactTeacherPage() {
    const [showFallback, setShowFallback] = useState(false);

    const handleWhatsApp = () => {
        const newWindow = window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
        
        setTimeout(() => {
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                setShowFallback(true);
                toast.info('Unable to open WhatsApp', {
                    description: 'Please use the link below',
                });
            }
        }, 1000);
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contact Teacher</h2>
                <p className="text-muted-foreground mt-2">Get in touch for any queries or support</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 space-y-6">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6 text-primary">
                        <MessageCircle className="h-12 w-12" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Chat on WhatsApp</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Connect with your teacher instantly for any questions or concerns
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full gap-2"
                >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                </button>

                {showFallback && (
                    <div className="rounded-lg border bg-muted/50 p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                            If the button doesn't work, click the link below:
                        </p>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                            Open WhatsApp
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
