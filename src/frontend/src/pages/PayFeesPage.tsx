import { useState } from 'react';
import { CreditCard, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetPaymentSettings } from '../hooks/usePaymentSettings';

export function PayFeesPage() {
    const { data: settings, isLoading: loadingSettings } = useGetPaymentSettings();
    const [showFallback, setShowFallback] = useState(false);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const generateUpiUri = (feeAmount: string): string => {
        const pa = settings?.pa || 'yourupi@bank';
        const pn = settings?.pn || 'Bansal Tution Classes';
        const payeeName = encodeURIComponent(pn);
        return `upi://pay?pa=${pa}&pn=${payeeName}&am=${feeAmount}&cu=INR`;
    };

    const validateAmount = (value: string): boolean => {
        if (!value || value.trim() === '') {
            setError('Please enter an amount');
            return false;
        }
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue <= 0) {
            setError('Please enter a valid amount greater than 0');
            return false;
        }
        setError('');
        return true;
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        if (value) {
            validateAmount(value);
        } else {
            setError('');
        }
    };

    const handlePayment = () => {
        if (!validateAmount(amount)) {
            return;
        }

        const upiUri = generateUpiUri(amount);
        const newWindow = window.open(upiUri, '_blank');
        
        setTimeout(() => {
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                setShowFallback(true);
                toast.error('Unable to open UPI app', {
                    description: 'Please use the link below to complete payment',
                });
            }
        }, 1000);
    };

    const copyToClipboard = () => {
        if (!validateAmount(amount)) {
            return;
        }
        const upiUri = generateUpiUri(amount);
        navigator.clipboard.writeText(upiUri);
        toast.success('Copied to clipboard', {
            description: 'UPI link has been copied',
        });
    };

    const isPaymentDisabled = !amount || !!error || loadingSettings;
    const payeeName = settings?.pn || 'Bansal Tution Classes';

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Pay Fees</h2>
                <p className="text-muted-foreground mt-2">Complete your tuition fee payment to {payeeName}</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 space-y-6">
                {loadingSettings ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-3 text-muted-foreground">Loading payment settings...</span>
                    </div>
                ) : (
                    <>
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6 text-primary">
                                <CreditCard className="h-12 w-12" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount">Fee Amount (₹)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={handleAmountChange}
                                min="1"
                                step="0.01"
                                className="text-lg h-12"
                            />
                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Enter the fee amount as per your payment schedule
                            </p>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isPaymentDisabled}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full gap-2"
                        >
                            <ExternalLink className="h-4 w-4" />
                            {amount && !error ? `Pay ₹${amount} via UPI` : 'Pay via UPI'}
                        </button>

                        {showFallback && amount && !error && (
                            <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
                                <p className="text-sm font-medium">UPI Payment Link</p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 text-xs bg-background rounded px-3 py-2 overflow-x-auto">
                                        {generateUpiUri(amount)}
                                    </code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                        aria-label="Copy UPI link"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Copy this link and paste it in your UPI app to complete the payment
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
