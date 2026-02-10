import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useGetPaymentSettings, useSavePaymentSettings } from '../../hooks/usePaymentSettings';
import { useActor } from '../../hooks/useActor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AccessDeniedScreen } from '../../components/AccessDeniedScreen';

export function PaymentSettingsPage() {
    const { actor } = useActor();
    const { data: settings, isLoading: loadingSettings } = useGetPaymentSettings();
    const saveMutation = useSavePaymentSettings();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [checkingAdmin, setCheckingAdmin] = useState(true);

    const [pa, setPa] = useState('');
    const [pn, setPn] = useState('');
    const [errors, setErrors] = useState({ pa: '', pn: '' });

    useEffect(() => {
        async function checkAdmin() {
            if (!actor) return;
            try {
                const adminStatus = await actor.isCallerAdmin();
                setIsAdmin(adminStatus);
            } catch (error) {
                setIsAdmin(false);
            } finally {
                setCheckingAdmin(false);
            }
        }
        checkAdmin();
    }, [actor]);

    useEffect(() => {
        if (settings) {
            setPa(settings.pa);
            setPn(settings.pn);
        }
    }, [settings]);

    const validate = (): boolean => {
        const newErrors = { pa: '', pn: '' };
        let isValid = true;

        if (!pa || pa.trim() === '') {
            newErrors.pa = 'UPI ID is required';
            isValid = false;
        }

        if (!pn || pn.trim() === '') {
            newErrors.pn = 'Payee name is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        if (!validate()) return;

        try {
            await saveMutation.mutateAsync({ pa, pn });
            toast.success('Payment settings saved successfully', {
                description: 'Your changes have been saved and will be used for all future payments.',
            });
        } catch (error: any) {
            toast.error('Failed to save payment settings', {
                description: error.message || 'An error occurred while saving your changes.',
            });
        }
    };

    if (checkingAdmin) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isAdmin === false) {
        return <AccessDeniedScreen />;
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Payment Settings</h2>
                <p className="text-muted-foreground mt-2">Configure your UPI payment details for fee collection</p>
            </div>

            <div className="rounded-2xl border bg-card p-8 space-y-6">
                {loadingSettings ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="pa">UPI ID / VPA</Label>
                            <Input
                                id="pa"
                                type="text"
                                placeholder="yourname@bank"
                                value={pa}
                                onChange={(e) => {
                                    setPa(e.target.value);
                                    if (errors.pa) setErrors({ ...errors, pa: '' });
                                }}
                                className={errors.pa ? 'border-destructive' : ''}
                            />
                            {errors.pa && (
                                <p className="text-sm text-destructive">{errors.pa}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Your UPI ID where payments will be received (e.g., yourname@paytm, yourname@ybl)
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pn">Payee Name</Label>
                            <Input
                                id="pn"
                                type="text"
                                placeholder="Bansal Tution Classes"
                                value={pn}
                                onChange={(e) => {
                                    setPn(e.target.value);
                                    if (errors.pn) setErrors({ ...errors, pn: '' });
                                }}
                                className={errors.pn ? 'border-destructive' : ''}
                            />
                            {errors.pn && (
                                <p className="text-sm text-destructive">{errors.pn}</p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                The name that will appear in the payment request
                            </p>
                        </div>

                        <Button
                            onClick={handleSave}
                            disabled={saveMutation.isPending}
                            className="w-full"
                            size="lg"
                        >
                            {saveMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Settings
                                </>
                            )}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
