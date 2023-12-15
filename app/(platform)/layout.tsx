import { QueryProvider } from '@/components/provider/query-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

const PlatformLayout = ({
    children
} : { children : React.ReactNode}) => {
    return(
        <ClerkProvider>
            <QueryProvider>
                <Toaster />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}

export default PlatformLayout;