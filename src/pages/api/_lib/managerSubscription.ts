import { query as q } from "faunadb";
import { Fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

// Salvar essas informações no banco de dados //
export default async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {
    // Buscar o usuário no banco de dados com o ID customer ID //
    const userRef = await Fauna.query(
        q.Select('ref',
            q.Get(
                q.Match(
                    q.Index("user_by_stripe_customer_id"),
                    customerId
                )
            )
        )
    )

    // Salvar os dados da subscription do usuário no BD //
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    if (createAction) {
        await Fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                { data: subscriptionData }
            )
        )
    } else {
        await Fauna.query(
            q.Replace(
                q.Select("ref",
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }
}