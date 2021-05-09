import { NextApiRequest, NextApiResponse } from 'next'

import { stripe } from '../../services/stripe';
import { getSession } from 'next-auth/client';

import { Fauna } from '../../services/fauna';
import { query as q } from 'faunadb';

type User = {
    ref: { id: string },
    data: { stripe_customer_id: string }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {

        const session = await getSession({ req })

        const user = await Fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email) // Casefold = lowercase()
                )
            )
        )

        let customerId = user.data.stripe_customer_id

        if(!customerId){
            
            const stripeCustomer = await stripe.customers.create({
                email: session.user.email,
                //metadata:
            })
    
            await Fauna.query(
                q.Update(
                    q.Ref(
                        q.Collection('users'), user.ref.id),
                    {
                        data: {
                            stripe_customer_id: stripeCustomer.id
                        }
                    }
                ),
            )

            customerId = stripeCustomer.id
        }


        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required', // Não necessário para esta situação //
            success_url: process.env.STRIPE_API_SUCCESS_URL,
            cancel_url: process.env.STRIPE_API_CANCEL_URL,
            line_items: [
                { price: 'price_1Ib904FDWpQOlCUJNmoMsqX8', quantity: 1 },
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            customer: customerId
        });

        res.status(200).json({ sessionId: stripeCheckoutSession.id })

    } else {
        res.setHeader('Allow', 'Post')
        res.status(405).end('Method not Allow')
    }

}