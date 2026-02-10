import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { PaymentSettings } from '../backend';

interface UpiPaymentSettings {
    pa: string;
    pn: string;
}

const DEFAULT_UPI_SETTINGS: UpiPaymentSettings = {
    pa: 'yourupi@bank',
    pn: 'Bansal Tution Classes',
};

function backendToUpi(settings: PaymentSettings): UpiPaymentSettings {
    return {
        pa: settings.paymentId || DEFAULT_UPI_SETTINGS.pa,
        pn: settings.paymentProviderUrl || DEFAULT_UPI_SETTINGS.pn,
    };
}

function upiToBackend(upi: UpiPaymentSettings): PaymentSettings {
    return {
        paymentId: upi.pa,
        paymentProviderUrl: upi.pn,
    };
}

export function useGetPaymentSettings() {
    const { actor, isFetching: actorFetching } = useActor();

    const query = useQuery<UpiPaymentSettings>({
        queryKey: ['paymentSettings'],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not available');
            const settings = await actor.getPaymentSettings();
            return backendToUpi(settings);
        },
        enabled: !!actor && !actorFetching,
    });

    return {
        ...query,
        isLoading: actorFetching || query.isLoading,
    };
}

export function useSavePaymentSettings() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (upiSettings: UpiPaymentSettings) => {
            if (!actor) throw new Error('Actor not available');
            const backendSettings = upiToBackend(upiSettings);
            await actor.setPaymentSettings(backendSettings);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['paymentSettings'] });
        },
    });
}
