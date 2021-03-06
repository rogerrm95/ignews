import { Session } from 'next-auth';
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss'

interface SessionData extends Session {
    activeSubscription: Object | null
}

export function SubscribeButton() {

    const [session] = useSession()
    const newSession = session as SessionData
    const router = useRouter()

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        if (newSession.activeSubscription) {
            router.push('/posts')
            return;
        }

        // Criação da Checkout da Session //
        try {
            const response = await api.post("subscribe")

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <button
            type='button'
            className={styles.subscribeButton}
            onClick={handleSubscribe}>
            Subscribe Now
        </button>
    )
}